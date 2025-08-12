# variables.tf - Simplified variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.small"  # Slightly larger than t2.micro for running multiple containers
}

variable "key_pair_name" {
  description = "EC2 Key Pair name (optional)"
  type        = string
  default     = ""
}