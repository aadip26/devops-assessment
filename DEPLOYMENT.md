# Deployment Guide

## Quick Start with Minikube

### 1. Prerequisites Check

```bash
# Check if Minikube is installed
minikube version

# Check if kubectl is installed
kubectl version --client

# Check if Docker is running
docker ps
```

### 2. Start Minikube

```bash
# Start Minikube with recommended settings
minikube start --driver=docker --cpus=2 --memory=4096

# Enable metrics server for autoscaling
minikube addons enable metrics-server

# Verify Minikube is running
minikube status
```

### 3. Update Kubernetes Manifests

Before deploying, update the image reference in `k8s/deployment.yaml`:

```yaml
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
image: ghcr.io/YOUR_GITHUB_USERNAME/devops-assessment:latest
```

### 4. Deploy the Application

```bash
# Apply all Kubernetes manifests
kubectl apply -f k8s/

# Or apply individually
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 5. Verify Deployment

```bash
# Check if pods are running
kubectl get pods

# Wait for all pods to be ready
kubectl wait --for=condition=ready pod -l app=nextjs-app --timeout=300s

# Check deployment status
kubectl get deployments

# Check service
kubectl get services
```

### 6. Access the Application

#### Option A: Using Minikube Service

```bash
# Get the URL
minikube service nextjs-app-service --url

# Or open directly in browser
minikube service nextjs-app-service
```

#### Option B: Using NodePort

```bash
# Get Minikube IP
MINIKUBE_IP=$(minikube ip)

# Access the application
echo "Application URL: http://$MINIKUBE_IP:30080"

# Test with curl
curl http://$MINIKUBE_IP:30080/api/health
```

#### Option C: Using Port Forward

```bash
# Forward port to localhost
kubectl port-forward service/nextjs-app-service 8080:80

# Access at http://localhost:8080
```

## Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl get pods

# Describe pod to see errors
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>
```

### Image Pull Errors

If you see `ImagePullBackOff` or `ErrImagePull`:

1. Make sure your GitHub Container Registry image is public
2. Or create an image pull secret:

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=YOUR_EMAIL
```

Then add to deployment.yaml:

```yaml
spec:
  imagePullSecrets:
  - name: ghcr-secret
```

### Health Check Failures

```bash
# Check health endpoint directly
kubectl port-forward <pod-name> 3000:3000

# In another terminal
curl http://localhost:3000/api/health
```

### Service Not Accessible

```bash
# Check service endpoints
kubectl get endpoints

# Check service details
kubectl describe service nextjs-app-service

# Verify Minikube tunnel (if using LoadBalancer)
minikube tunnel
```

## Scaling

### Manual Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment nextjs-app --replicas=5

# Verify scaling
kubectl get pods
```

### Auto-scaling (HPA)

```bash
# Check HPA status
kubectl get hpa

# Describe HPA
kubectl describe hpa nextjs-app-hpa

# Generate load to test autoscaling
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh

# Inside the pod, run:
while true; do wget -q -O- http://nextjs-app-service; done
```

## Updating the Application

### Rolling Update

```bash
# Update image to a new version
kubectl set image deployment/nextjs-app \
  nextjs-app=ghcr.io/YOUR_GITHUB_USERNAME/devops-assessment:v2.0.0

# Watch the rollout
kubectl rollout status deployment/nextjs-app

# Check rollout history
kubectl rollout history deployment/nextjs-app
```

### Rollback

```bash
# Rollback to previous version
kubectl rollout undo deployment/nextjs-app

# Rollback to specific revision
kubectl rollout undo deployment/nextjs-app --to-revision=2
```

## Monitoring

### Resource Usage

```bash
# Check node resources
kubectl top nodes

# Check pod resources
kubectl top pods
```

### Logs

```bash
# Stream logs from all pods
kubectl logs -l app=nextjs-app --tail=100 -f

# Logs from specific pod
kubectl logs <pod-name> -f

# Previous logs (if pod restarted)
kubectl logs <pod-name> --previous
```

## Cleanup

### Delete Application Resources

```bash
# Delete all resources
kubectl delete -f k8s/

# Or delete individually
kubectl delete deployment nextjs-app
kubectl delete service nextjs-app-service
kubectl delete hpa nextjs-app-hpa
```

### Stop Minikube

```bash
# Stop Minikube
minikube stop

# Delete Minikube cluster
minikube delete
```

## Advanced Configuration

### Using ConfigMap

Create a ConfigMap for configuration:

```bash
kubectl create configmap nextjs-config \
  --from-literal=NODE_ENV=production \
  --from-literal=PORT=3000
```

Update deployment to use ConfigMap:

```yaml
envFrom:
- configMapRef:
    name: nextjs-config
```

### Using Secrets

For sensitive data:

```bash
kubectl create secret generic nextjs-secrets \
  --from-literal=API_KEY=your-secret-key
```

Reference in deployment:

```yaml
env:
- name: API_KEY
  valueFrom:
    secretKeyRef:
      name: nextjs-secrets
      key: API_KEY
```

### Ingress Setup

Install NGINX Ingress:

```bash
minikube addons enable ingress
```

Create ingress resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nextjs-ingress
spec:
  rules:
  - host: nextjs.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nextjs-app-service
            port:
              number: 80
```

Add to `/etc/hosts`:

```
<minikube-ip> nextjs.local
```

## Production Checklist

- [ ] Update image references
- [ ] Configure resource limits appropriately
- [ ] Set up monitoring and alerting
- [ ] Configure logging aggregation
- [ ] Implement backup strategy
- [ ] Set up CI/CD for automated deployments
- [ ] Configure secrets management
- [ ] Enable network policies
- [ ] Set up pod security policies
- [ ] Configure RBAC
- [ ] Implement ingress with SSL/TLS
- [ ] Set up horizontal pod autoscaling
- [ ] Configure persistent storage if needed
- [ ] Test disaster recovery procedures

