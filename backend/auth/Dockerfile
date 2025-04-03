    FROM golang:1.23 AS builder

    WORKDIR /app
    COPY . .
    
    RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o bootstrap .
    
    FROM public.ecr.aws/lambda/provided:al2-arm64
    
    WORKDIR /var/task
    
    COPY --from=builder /app/bootstrap .
    
    RUN chmod +x bootstrap
    
    RUN rm -f /usr/local/bin/aws-lambda-rie || true
    