.PHONY: help install dev build start docker-build docker-run k8s-deploy k8s-delete k8s-logs clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Run development server
	npm run dev

build: ## Build production application
	npm run build

start: ## Start production server
	npm start

docker-build: ## Build Docker image
	docker build -t nextjs-app:local .

docker-run: ## Run Docker container
	docker run -p 3000:3000 nextjs-app:local

minikube-start: ## Start Minikube cluster
	minikube start --driver=docker --cpus=2 --memory=4096
	minikube addons enable metrics-server

k8s-deploy: ## Deploy to Kubernetes
	kubectl apply -f k8s/

k8s-delete: ## Delete Kubernetes resources
	kubectl delete -f k8s/

k8s-status: ## Check deployment status
	@echo "=== Deployments ==="
	kubectl get deployments
	@echo "\n=== Pods ==="
	kubectl get pods
	@echo "\n=== Services ==="
	kubectl get services
	@echo "\n=== HPA ==="
	kubectl get hpa

k8s-logs: ## View application logs
	kubectl logs -l app=nextjs-app --tail=50 -f

k8s-url: ## Get application URL
	minikube service nextjs-app-service --url

clean: ## Clean up resources
	rm -rf node_modules .next out
	docker rmi -f nextjs-app:local || true

