# DevOps Assessment - Containerized Next.js Application

A production-ready Next.js application containerized with Docker and deployed to Kubernetes (Minikube) with automated CI/CD using GitHub Actions.

## 🚀 Project Overview

This project demonstrates:
- **Next.js Application**: Modern React framework with TypeScript and Tailwind CSS
- **Docker Containerization**: Multi-stage Dockerfile with optimized image size
- **CI/CD Pipeline**: Automated builds and deployments using GitHub Actions
- **Container Registry**: GitHub Container Registry (GHCR) integration
- **Kubernetes Deployment**: Production-ready manifests with health checks and autoscaling
- **Best Practices**: Security, performance, and scalability considerations

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Accessing the Application](#accessing-the-application)
- [Architecture](#architecture)
- [Best Practices](#best-practices)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or later)
- **npm** or **yarn**
- **Docker** (v20.10 or later)
- **Minikube** (v1.30 or later)
- **kubectl** (v1.26 or later)
- **Git**

## 💻 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/devops-assessment.git
cd devops-assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 🐳 Docker Setup

### Build Docker Image Locally

```bash
docker build -t nextjs-app:local .
```

### Run Docker Container

```bash
docker run -p 3000:3000 nextjs-app:local
```

Access the application at `http://localhost:3000`

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

### Docker Best Practices Implemented

- ✅ Multi-stage build for smaller image size
- ✅ Non-root user for security
- ✅ Layer caching optimization
- ✅ .dockerignore to exclude unnecessary files
- ✅ Health check configuration
- ✅ Environment variable management
- ✅ Standalone output for minimal dependencies

## 🔄 GitHub Actions CI/CD

### Workflow Overview

The GitHub Actions workflow (`.github/workflows/docker-build-push.yml`) automatically:

1. **Triggers** on push to `main` branch
2. **Builds** the Docker image using multi-platform support
3. **Tags** images with multiple strategies:
   - `latest` (for main branch)
   - Branch name
   - Commit SHA
   - Semantic versioning
4. **Pushes** to GitHub Container Registry (GHCR)
5. **Caches** layers for faster builds

### Setting Up GitHub Actions

1. **Enable GitHub Container Registry**:
   - Go to your GitHub repository
   - Navigate to Settings → Actions → General
   - Enable "Read and write permissions" for workflows

2. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Monitor Workflow**:
   - Go to the "Actions" tab in your repository
   - Watch the build progress

### View Published Images

Your images will be available at:
```
ghcr.io/YOUR_USERNAME/devops-assessment:latest
```

Visit: `https://github.com/YOUR_USERNAME?tab=packages`

## ☸️ Kubernetes Deployment

### Prerequisites for Kubernetes

Ensure Minikube and kubectl are installed:

```bash
# Start Minikube
minikube start --driver=docker --cpus=2 --memory=4096

# Verify Minikube is running
minikube status

# Enable metrics server for HPA
minikube addons enable metrics-server
```

### Deployment Steps

#### 1. Update Image Reference

Edit `k8s/deployment.yaml` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```yaml
image: ghcr.io/YOUR_GITHUB_USERNAME/devops-assessment:latest
```

#### 2. Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

#### 3. Deploy Application

```bash
# Apply all manifests
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Or deploy everything at once:

```bash
kubectl apply -f k8s/
```

#### 4. Verify Deployment

```bash
# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Check services
kubectl get services

# Check HPA
kubectl get hpa

# View pod logs
kubectl logs -l app=nextjs-app --tail=50
```

#### 5. Check Pod Health

```bash
# Describe pod to see health check status
kubectl describe pod <pod-name>

# Watch pod status in real-time
kubectl get pods -w
```

## 🌐 Accessing the Application

### Method 1: NodePort Service

```bash
# Get Minikube IP
minikube ip

# Access application
curl http://$(minikube ip):30080
```

Or open in browser:
```bash
minikube service nextjs-app-service --url
```

### Method 2: Port Forwarding

```bash
kubectl port-forward service/nextjs-app-service 8080:80
```

Then access at `http://localhost:8080`

### Method 3: Minikube Tunnel (LoadBalancer)

```bash
# In a separate terminal
minikube tunnel

# Access via localhost
curl http://localhost
```

### Health Check Endpoint

```bash
curl http://$(minikube ip):30080/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-07T...",
  "uptime": 123.456
}
```

## 🏗️ Architecture

### Application Components

```
┌─────────────────────────────────────────┐
│         Next.js Application             │
│  ┌────────────────────────────────────┐ │
│  │  Frontend (React + Tailwind CSS)   │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  API Routes (/api/health)          │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Kubernetes Architecture

```
┌──────────────────────────────────────────────────┐
│                  Minikube Cluster                │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  Service (NodePort :30080)                 │ │
│  │  - Load balancing across pods              │ │
│  │  - Session affinity                        │ │
│  └─────────┬──────────────────────────────────┘ │
│            │                                     │
│  ┌─────────▼──────────────────────────────────┐ │
│  │  Deployment (3 replicas)                   │ │
│  │  ┌──────┐  ┌──────┐  ┌──────┐             │ │
│  │  │ Pod  │  │ Pod  │  │ Pod  │             │ │
│  │  │      │  │      │  │      │             │ │
│  │  └──────┘  └──────┘  └──────┘             │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  HorizontalPodAutoscaler                   │ │
│  │  - Min: 2 replicas                         │ │
│  │  - Max: 10 replicas                        │ │
│  │  - CPU threshold: 70%                      │ │
│  │  - Memory threshold: 80%                   │ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Git Push   │────▶│GitHub Actions│────▶│     GHCR     │
│  to main     │     │   Workflow   │     │  Container   │
└──────────────┘     └──────────────┘     │   Registry   │
                                           └──────┬───────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │  Kubernetes  │
                                           │  pulls image │
                                           └──────────────┘
```

## ✨ Best Practices

### Docker Optimization

1. **Multi-stage Build**: Separate build and runtime stages
2. **Minimal Base Image**: Using Alpine Linux (node:20-alpine)
3. **Layer Caching**: Strategic COPY commands
4. **Security**: Non-root user (nextjs:nodejs)
5. **Health Checks**: Built-in container health monitoring
6. **Standalone Output**: Next.js standalone mode for smaller images

### Kubernetes Configuration

1. **Resource Limits**: CPU and memory constraints
2. **Health Probes**:
   - Liveness probe: Restarts unhealthy containers
   - Readiness probe: Controls traffic routing
   - Startup probe: Handles slow-starting containers
3. **Replicas**: Multiple instances for high availability
4. **HPA**: Auto-scaling based on resource utilization
5. **Labels**: Organized resource management
6. **NodePort**: External access without LoadBalancer
7. **Session Affinity**: Consistent user experience

### CI/CD Best Practices

1. **Automated Builds**: Trigger on main branch pushes
2. **Multi-platform Support**: ARM64 and AMD64 architectures
3. **Image Tagging Strategy**: Multiple tags for flexibility
4. **Layer Caching**: GitHub Actions cache for faster builds
5. **Security**: Using GITHUB_TOKEN for authentication
6. **Metadata**: Automated labels and annotations

## 📊 Monitoring and Debugging

### View Logs

```bash
# All pods
kubectl logs -l app=nextjs-app --tail=100 -f

# Specific pod
kubectl logs <pod-name> -f
```

### Execute Commands in Pod

```bash
kubectl exec -it <pod-name> -- /bin/sh
```

### Check Resource Usage

```bash
kubectl top pods
kubectl top nodes
```

### Debug Service

```bash
kubectl describe service nextjs-app-service
kubectl get endpoints
```

## 🧹 Cleanup

### Remove Kubernetes Resources

```bash
kubectl delete -f k8s/
```

### Stop Minikube

```bash
minikube stop
```

### Delete Minikube Cluster

```bash
minikube delete
```

### Remove Docker Images

```bash
docker rmi nextjs-app:local
docker rmi ghcr.io/YOUR_USERNAME/devops-assessment:latest
```

## 📝 Environment Variables

The application supports the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Node environment |
| PORT | 3000 | Application port |
| HOSTNAME | 0.0.0.0 | Bind hostname |

## 🔒 Security Considerations

- ✅ Non-root container user
- ✅ Minimal base image (Alpine)
- ✅ No sensitive data in images
- ✅ Read-only root filesystem (can be enabled)
- ✅ Resource limits to prevent DoS
- ✅ Health checks for reliability
- ✅ Network policies (can be added)
- ✅ Private registry with authentication

## 🚀 Production Recommendations

For production deployment, consider:

1. **Use a managed Kubernetes service** (GKE, EKS, AKS)
2. **Implement Ingress** for better routing and SSL/TLS
3. **Add monitoring** (Prometheus, Grafana)
4. **Set up logging** (ELK Stack, Loki)
5. **Configure secrets management** (Kubernetes Secrets, Vault)
6. **Implement Network Policies**
7. **Use PodDisruptionBudgets**
8. **Enable RBAC** for access control
9. **Set up CI/CD for auto-deployment**
10. **Implement backup strategies**

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

---

**Built with ❤️ for DevOps Assessment**

