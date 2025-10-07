# Pre-Submission Checklist

Complete this checklist before submitting your DevOps Assessment.

## ✅ Code Completion

- [x] Next.js application created
- [x] Dockerfile with multi-stage build
- [x] .dockerignore file
- [x] GitHub Actions workflow
- [x] Kubernetes deployment.yaml
- [x] Kubernetes service.yaml
- [x] Kubernetes namespace.yaml
- [x] Health check API endpoint
- [x] Comprehensive documentation

## 📝 Customization Required

- [ ] Update `YOUR_GITHUB_USERNAME` in `k8s/deployment.yaml` (line 26)
- [ ] Update `YOUR_USERNAME` placeholders in `README.md`
- [ ] Update author information in `README.md` (bottom section)
- [ ] Update `SUBMISSION_TEMPLATE.md` with your personal details
- [ ] Review and customize any other placeholders

## 🔧 Local Testing

- [ ] Install dependencies: `npm install`
- [ ] Run development server: `npm run dev`
- [ ] Build production version: `npm run build`
- [ ] Test production server: `npm start`
- [ ] Verify app runs at http://localhost:3000
- [ ] Test health endpoint: http://localhost:3000/api/health

## 🐳 Docker Testing

- [ ] Build Docker image: `docker build -t nextjs-app:local .`
- [ ] Run Docker container: `docker run -p 3000:3000 nextjs-app:local`
- [ ] Access containerized app: http://localhost:3000
- [ ] Test health check in container: `curl http://localhost:3000/api/health`
- [ ] Verify image size is reasonable (should be < 200MB)
- [ ] Check container runs as non-root user

## 📦 GitHub Setup

- [ ] Create a PUBLIC repository on GitHub named `devops-assessment`
- [ ] Initialize Git: `git init`
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/devops-assessment.git`
- [ ] Stage all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit: Complete DevOps assessment"`
- [ ] Push to main: `git push -u origin main`

## 🚀 GitHub Actions

- [ ] Go to repository Settings → Actions → General
- [ ] Enable "Read and write permissions" for workflows
- [ ] Verify workflow runs successfully in Actions tab
- [ ] Wait for workflow to complete (usually 3-5 minutes)
- [ ] Check for any workflow errors

## 📦 GitHub Container Registry

- [ ] Verify image appears in your GitHub packages
- [ ] Go to your GitHub profile → Packages tab
- [ ] Find `devops-assessment` package
- [ ] Click on the package
- [ ] Click "Package settings" (right sidebar)
- [ ] Change visibility to PUBLIC
- [ ] Confirm visibility change
- [ ] Copy GHCR image URL: `ghcr.io/YOUR_USERNAME/devops-assessment:latest`

## ☸️ Kubernetes Testing

- [ ] Start Minikube: `minikube start --driver=docker --cpus=2 --memory=4096`
- [ ] Enable metrics: `minikube addons enable metrics-server`
- [ ] Verify Minikube is running: `minikube status`
- [ ] Update image reference in `k8s/deployment.yaml`
- [ ] Deploy to Kubernetes: `kubectl apply -f k8s/`
- [ ] Wait for pods to be ready: `kubectl get pods -w`
- [ ] Verify deployment: `kubectl get deployments`
- [ ] Verify service: `kubectl get services`
- [ ] Verify HPA: `kubectl get hpa`
- [ ] Get service URL: `minikube service nextjs-app-service --url`
- [ ] Access the application via the URL
- [ ] Test health endpoint: `curl http://$(minikube ip):30080/api/health`
- [ ] Check pod logs: `kubectl logs -l app=nextjs-app --tail=50`
- [ ] Verify health probes are passing: `kubectl describe pod <pod-name>`

## 📚 Documentation Review

- [ ] README.md is comprehensive and clear
- [ ] All code examples work correctly
- [ ] All URLs are updated with your username
- [ ] No placeholder text remains
- [ ] Screenshots added (optional but recommended)
- [ ] Makefile commands tested
- [ ] DEPLOYMENT.md is accurate
- [ ] PROJECT_STRUCTURE.md is up to date

## 🔍 Code Quality

- [ ] No syntax errors
- [ ] No linter warnings
- [ ] Proper indentation
- [ ] Comments where necessary
- [ ] No sensitive information (API keys, passwords)
- [ ] No console.log statements in production code
- [ ] TypeScript types are correct
- [ ] No unused imports

## 🔒 Security Check

- [ ] Container runs as non-root user
- [ ] No secrets in code or configs
- [ ] .gitignore excludes sensitive files
- [ ] .dockerignore excludes unnecessary files
- [ ] Resource limits configured in Kubernetes
- [ ] Health checks implemented
- [ ] No exposed ports beyond necessary

## 📧 Submission Preparation

- [ ] Repository is PUBLIC
- [ ] GHCR package is PUBLIC
- [ ] Repository URL noted: `https://github.com/YOUR_USERNAME/devops-assessment`
- [ ] GHCR image URL noted: `ghcr.io/YOUR_USERNAME/devops-assessment:latest`
- [ ] Fill out SUBMISSION_TEMPLATE.md
- [ ] Prepare email subject: "DevOps Assessment Submission - [Your Name]"
- [ ] Double-check all URLs work
- [ ] Repository README.md displays correctly on GitHub

## 🎯 Final Verification

- [ ] Clone your repository to a fresh directory
- [ ] Follow your own README.md instructions
- [ ] Verify everything works from scratch
- [ ] Test Docker build from fresh clone
- [ ] Test Kubernetes deployment from fresh clone
- [ ] All links in README work
- [ ] Images/badges display correctly (if any)

## 📤 Submission

- [ ] Send email with proper subject line
- [ ] Include repository URL
- [ ] Include GHCR image URL
- [ ] Professional email body
- [ ] No typos or grammatical errors
- [ ] Contact information included

## 🎉 Post-Submission

- [ ] Confirm email was sent successfully
- [ ] Keep repository and GHCR package PUBLIC
- [ ] Don't make major changes after submission
- [ ] Be ready to discuss the implementation
- [ ] Prepare for potential follow-up questions

---

## Quick Test Script

Run this script to test everything quickly:

```bash
#!/bin/bash

echo "Testing DevOps Assessment..."

# Test 1: Development server
echo "✓ Testing development server..."
npm install
npm run dev &
DEV_PID=$!
sleep 5
curl -f http://localhost:3000/api/health || echo "❌ Dev server failed"
kill $DEV_PID

# Test 2: Docker build
echo "✓ Testing Docker build..."
docker build -t test-build . || echo "❌ Docker build failed"

# Test 3: Docker run
echo "✓ Testing Docker container..."
docker run -d -p 3000:3000 --name test-container test-build
sleep 5
curl -f http://localhost:3000/api/health || echo "❌ Container health check failed"
docker stop test-container
docker rm test-container

# Test 4: Kubernetes deployment
echo "✓ Testing Kubernetes deployment..."
minikube start
kubectl apply -f k8s/
kubectl wait --for=condition=ready pod -l app=nextjs-app --timeout=300s
kubectl get all

echo "✓ All tests completed!"
```

Save this as `test.sh`, make it executable (`chmod +x test.sh`), and run it.

---

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| ImagePullBackOff | Make GHCR package public |
| Pods not starting | Check image reference in deployment.yaml |
| Health checks failing | Verify `/api/health` endpoint works |
| Can't access service | Use `minikube service` command |
| Build fails | Check Node.js version (need v20+) |
| GitHub Actions fails | Enable workflow permissions in settings |

---

**Good luck with your submission! 🚀**

