# Project Structure

This document provides an overview of the project structure and file organization.

## Directory Tree

```
devops-assessment/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml      # GitHub Actions CI/CD workflow
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts               # Health check API endpoint
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout component
│   └── page.tsx                       # Home page component
├── k8s/
│   ├── deployment.yaml                # Kubernetes deployment + HPA
│   ├── namespace.yaml                 # Kubernetes namespace
│   ├── service.yaml                   # Kubernetes service (NodePort)
│   └── README.md                      # K8s deployment guide
├── .dockerignore                      # Docker ignore file
├── .gitignore                         # Git ignore file
├── Dockerfile                         # Multi-stage Docker build
├── Makefile                           # Convenience commands
├── next.config.js                     # Next.js configuration
├── package.json                       # Node.js dependencies
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── README.md                          # Main documentation
├── DEPLOYMENT.md                      # Detailed deployment guide
├── SUBMISSION_TEMPLATE.md             # Email submission template
└── PROJECT_STRUCTURE.md               # This file

```

## File Descriptions

### Application Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main landing page with project overview |
| `app/layout.tsx` | Root layout with metadata |
| `app/globals.css` | Global CSS with Tailwind directives |
| `app/api/health/route.ts` | Health check endpoint for K8s probes |

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config with standalone output |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS plugins configuration |
| `package.json` | npm dependencies and scripts |

### Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build for production |
| `.dockerignore` | Files to exclude from Docker context |

### Kubernetes Files

| File | Purpose |
|------|---------|
| `k8s/namespace.yaml` | Dedicated namespace for the app |
| `k8s/deployment.yaml` | Deployment with 3 replicas + HPA |
| `k8s/service.yaml` | NodePort service for external access |
| `k8s/README.md` | Quick reference for K8s deployment |

### CI/CD Files

| File | Purpose |
|------|---------|
| `.github/workflows/docker-build-push.yml` | Automated Docker build and push to GHCR |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation |
| `DEPLOYMENT.md` | Step-by-step deployment guide |
| `SUBMISSION_TEMPLATE.md` | Email template for assessment submission |
| `PROJECT_STRUCTURE.md` | This file - project structure overview |

### Utility Files

| File | Purpose |
|------|---------|
| `Makefile` | Common commands for development and deployment |
| `.gitignore` | Files to exclude from Git |

## Key Features by File

### Dockerfile
- ✅ Multi-stage build (deps, builder, runner)
- ✅ Alpine Linux base (minimal size)
- ✅ Non-root user (security)
- ✅ Health check configuration
- ✅ Standalone Next.js output

### GitHub Actions Workflow
- ✅ Triggers on push to main
- ✅ Multi-platform builds (AMD64, ARM64)
- ✅ Multiple tagging strategies
- ✅ Build caching for optimization
- ✅ Automated push to GHCR

### Kubernetes Deployment
- ✅ 3 replicas for high availability
- ✅ Resource limits and requests
- ✅ Liveness, readiness, and startup probes
- ✅ HPA for auto-scaling (2-10 replicas)
- ✅ Rolling update strategy

### Kubernetes Service
- ✅ NodePort for external access
- ✅ Port mapping (80 → 3000)
- ✅ Session affinity (ClientIP)
- ✅ Label selectors

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make install` | Install dependencies |
| `make dev` | Run development server |
| `make build` | Build production app |
| `make docker-build` | Build Docker image |
| `make docker-run` | Run Docker container |
| `make minikube-start` | Start Minikube cluster |
| `make k8s-deploy` | Deploy to Kubernetes |
| `make k8s-status` | Check deployment status |
| `make k8s-logs` | View application logs |
| `make k8s-url` | Get application URL |
| `make clean` | Clean up resources |

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV` - Node environment (production/development)
- `PORT` - Application port (default: 3000)
- `HOSTNAME` - Bind hostname (default: 0.0.0.0)

## Ports

- **Development**: 3000
- **Production (Container)**: 3000
- **Kubernetes Service**: 80 → 3000
- **NodePort**: 30080

## Dependencies

### Production Dependencies
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `next` ^15.0.0

### Development Dependencies
- `typescript` ^5
- `@types/node` ^20
- `@types/react` ^18
- `@types/react-dom` ^18
- `eslint` ^8
- `eslint-config-next` ^15.0.0

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build Docker image**:
   ```bash
   docker build -t nextjs-app:local .
   ```

4. **Deploy to Kubernetes**:
   ```bash
   kubectl apply -f k8s/
   ```

## Notes

- All TypeScript files use strict mode
- Tailwind CSS for styling
- ESLint for code quality
- Standalone Next.js output for Docker optimization
- Health check endpoint at `/api/health`
- Kubernetes manifests follow best practices
- CI/CD pipeline fully automated

## Customization Required

Before deployment, update:

1. **k8s/deployment.yaml**: Replace `YOUR_GITHUB_USERNAME` with actual username
2. **README.md**: Replace placeholder names and URLs
3. **SUBMISSION_TEMPLATE.md**: Fill in your personal information

## License

This project is created for the DevOps Internship Assessment.

