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

variable "existing_vpc_id" {
  description = "ID of existing VPC to use"
  type        = string
  default     = "vpc-01e78b537c23ead47"  # prog8870-final-vpc
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