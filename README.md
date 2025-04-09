# 🧠 Designing a Scalable Microservice Architecture for a Twitter-Like Platform

This project is an in-progress architecture for a distributed Twitter/Pinterest-like social platform. The system is being designed with scalability, high throughput, and modular service composition in mind — optimized for real-time timelines, content search, and write-heavy workloads.

The goal is to strike a balance between **performance**, **developer agility**, and **read optimization** by leveraging purpose-fit databases, aggressive caching, and asynchronous pipelines.

---

## Vision

We're designing toward:
- Eventual consistency across replicated stores
- Write-optimized fan-out architecture
- Elastic scale via decoupled services
- Upgrade paths for semantic search and personalized content delivery

---

## Architectural Overview

### 1. **Application Layer**
The frontend (web) communicates directly with an API Gateway, which will route requests to stateless microservices.

---

### 2. **API Gateway**
Acts as the single entry point for:
- Tweet/Reply CRUD APIs
- User authentication and metadata access
- Timeline and feed generation
- Full-text and future semantic search
- Media upload and delivery

---

## In-Progress Microservices

### CRUD Tweets & Replies
- Tweets and replies will be handled as separate services.
- ElastiCache will provide read-through and write-through caching.
- Persistent storage will be handled by Apache Cassandra for scalable writes.

> We're intentionally keeping tweet and reply schemas separate to reduce coupling early on and make future evolution easier.

---

### Search Service
- Tweets will be indexed in **Elasticsearch**.
- We're planning to experiment with **vector databases** in the future to support semantic search and recommendations.

---

### Timeline Generation
- Implements **write-out fan-out architecture** — new tweets are pushed to followers' timeline caches upon creation.
- Future optimization will include multi-stage pipeline with Message Queues to decouple write latency from timeline construction.

---

### User Services
- Users, followers, and profile metadata will be split:
  - User info in a **relational DB**
  - Follower graph stored in **Neo4j** for efficient traversals
- Profile photos and other media will be stored in **S3** and delivered via **CDN**

---

### Authentication
- Using **Amazon Cognito** to manage user registration, login, and session lifecycle.

---

## Planned Storage Strategy

- **S3 + CDN** for blob storage (PFPs, media)
- **ElastiCache** for caching tweets, replies, timelines
- **Cassandra** as the main scalable write store
- **Neo4j** for the follower graph
- **Relational DB** for user metadata
- **ElasticSearch** for full-text tweet search
- **Message Queues** for async timeline propagation
- **CDC (Change Data Capture)** for event-driven indexing and analytics

---

## Planned Engineering Tradeoffs

- Avoiding read-time fan-out in favor of **write-time timeline generation**
- Prioritizing **read performance** over strict consistency
- Supporting **async eventual consistency** for search indexing and timeline propagation
- Modular design to allow drop-in replacement of search backend (e.g., Vector DBs)

---

## 🗺️ Diagram

The full architecture is illustrated below (see `docs/architecture.png`):



![Screenshot 2025-04-02 at 11 04 37 PM](https://github.com/user-attachments/assets/3251d08f-de00-43b5-9ff4-7e088a9ca711)

![Screenshot 2025-04-02 at 11 10 47 PM](https://github.com/user-attachments/assets/d6415583-78da-47da-93ce-68ca7c928e67)
