
# infrastructure/variables.tf
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
# This variable to determine if env is production
variable "use_aws_profile" {
  description = "Whether to use AWS profile for authentication"
  type        = bool
  default     = false
}

variable "aws_profile" {
  description = "AWS profile name for local development"
  type        = string
  default     = "default"
}

variable "ci_environment" {
  description = "Flag to indicate if running in CI environment"
  type        = string
  default     = ""
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_pair_name" {
  description = "EC2 Key Pair name"
  type        = string
  default     = ""
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "todoapp"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "todouser"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}
