# Kubernetes Manifests

This directory contains all Kubernetes manifests for deploying the Next.js application.

## Files

- `namespace.yaml` - Creates a dedicated namespace for the application
- `deployment.yaml` - Defines the application deployment with 3 replicas, health checks, and HPA
- `service.yaml` - Exposes the application via NodePort service

## Quick Deploy

```bash
# Deploy all resources
kubectl apply -f k8s/

# Check status
kubectl get all

# Get service URL
minikube service nextjs-app-service --url
```

## Resource Specifications

### Deployment

- **Replicas**: 3 (initial)
- **Image**: `ghcr.io/YOUR_GITHUB_USERNAME/devops-assessment:latest`
- **Resources**:
  - Requests: 100m CPU, 128Mi memory
  - Limits: 500m CPU, 512Mi memory
- **Health Checks**:
  - Liveness probe on `/api/health`
  - Readiness probe on `/api/health`
  - Startup probe on `/api/health`

### HorizontalPodAutoscaler

- **Min Replicas**: 2
- **Max Replicas**: 10
- **CPU Target**: 70%
- **Memory Target**: 80%

### Service

- **Type**: NodePort
- **Port**: 80 (maps to container port 3000)
- **NodePort**: 30080
- **Session Affinity**: ClientIP

## Customization

Before deploying, update the following in `deployment.yaml`:

```yaml
# Line 26: Update with your GitHub username
image: ghcr.io/YOUR_GITHUB_USERNAME/devops-assessment:latest
```

## Accessing the Application

### Method 1: NodePort

```bash
curl http://$(minikube ip):30080
```

### Method 2: Minikube Service

```bash
minikube service nextjs-app-service
```

### Method 3: Port Forward

```bash
kubectl port-forward service/nextjs-app-service 8080:80
```

