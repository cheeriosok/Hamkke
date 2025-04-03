package main

import (
	"context"
	"encoding/json"
	"log"
	"net/url"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/coreos/go-oidc"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/oauth2"
)

var (
	clientID     = mustGetEnv("COGNITO_CLIENT_ID")
	clientSecret = mustGetEnv("COGNITO_CLIENT_SECRET")
	redirectURL  = mustGetEnv("COGNITO_REDIRECT_URI")
	issuerURL    = mustGetEnv("COGNITO_ISSUER_URL")

	provider     *oidc.Provider
	oauth2Config oauth2.Config
)

func mustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Missing required environment variable: %s", key)
	}
	return val
}

func init() {
	var err error
	provider, err = oidc.NewProvider(context.Background(), issuerURL)
	if err != nil {
		log.Fatalf("Failed to create OIDC provider: %v", err)
	}

	oauth2Config = oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "email", "profile"},
	}
}

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch req.Path {
	case "/login":
		return handleLogin(req)
	case "/callback":
		return handleCallback(req)
	default:
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "Route not found",
		}, nil
	}
}

func handleLogin(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	provider := req.QueryStringParameters["provider"]

	params := url.Values{}
	params.Set("response_type", "code")
	params.Set("client_id", oauth2Config.ClientID)
	params.Set("redirect_uri", oauth2Config.RedirectURL)
	params.Set("scope", "openid email profile")
	params.Set("state", "random-state")

	if provider != "" {
		params.Set("identity_provider", provider)
	}

	authURL := oauth2Config.Endpoint.AuthURL + "?" + params.Encode()

	return events.APIGatewayProxyResponse{
		StatusCode: 302,
		Headers:    map[string]string{"Location": authURL},
	}, nil
}

func handleCallback(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	code, ok := req.QueryStringParameters["code"]
	if !ok || code == "" {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Missing authorization code"}, nil
	}

	token, err := oauth2Config.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Error exchanging code: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Token exchange failed"}, nil
	}

	rawToken := token.AccessToken
	parsedToken, _, err := new(jwt.Parser).ParseUnverified(rawToken, jwt.MapClaims{})
	if err != nil {
		log.Printf("Failed to parse JWT token: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "JWT parse failed"}, nil
	}

	claims := parsedToken.Claims.(jwt.MapClaims)

	body, _ := json.MarshalIndent(map[string]interface{}{
		"access_token":  token.AccessToken,
		"refresh_token": token.RefreshToken,
		"jwt_claims":    claims,
	}, "", "  ")

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(body),
	}, nil
}

func main() {
	log.Println("Lambda starting up (production)")
	lambda.Start(handler)
}
