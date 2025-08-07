# infrastructure/outputs.tf

output "application_url" {
  description = "URL to access the web application"
  value       = "http://${module.alb.dns_name}"
}

output "application_https_url" {
  description = "HTTPS URL to access the web application (if SSL configured)"
  value       = "https://${module.alb.dns_name}"
}

# Load balancer details
output "load_balancer_dns" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.dns_name
}

output "load_balancer_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = module.alb.zone_id
}

# EC2 instance details
output "ec2_instance_ids" {
  description = "IDs of the EC2 instances"
  value       = module.ec2.instance_ids
}

output "ec2_private_ips" {
  description = "Private IP addresses of EC2 instances"
  value       = module.ec2.private_ips
}

# Database connection details
output "database_endpoint" {
  description = "Database endpoint"
  value       = module.rds.endpoint
  sensitive   = false
}

output "database_port" {
  description = "Database port"
  value       = module.rds.port
}

# S3 bucket for assets
output "s3_bucket_name" {
  description = "Name of the S3 bucket for static assets"
  value       = aws_s3_bucket.app_assets.id
}

# VPC details (useful for debugging)
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

# Security group IDs (useful for troubleshooting)
output "alb_security_group_id" {
  description = "Security group ID for ALB"
  value       = aws_security_group.alb.id
}

output "app_security_group_id" {
  description = "Security group ID for application servers"
  value       = aws_security_group.app.id
}

# CloudWatch log group
output "cloudwatch_log_group" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.app_logs.name
}