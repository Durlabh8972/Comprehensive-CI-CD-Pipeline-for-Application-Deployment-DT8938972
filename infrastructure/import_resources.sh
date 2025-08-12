#!/bin/bash
set -e  # Exit on any error (remove if you want to continue on failures)

# Import CloudWatch Log Group
terraform import aws_cloudwatch_log_group.app_logs /aws/ec2/production-todo-app || true

# Import IAM Role  
terraform import aws_iam_role.ec2_role production-ec2-role || true

# Import Load Balancer
terraform import module.alb.aws_lb.main production-alb || true

# Import Target Group
terraform import module.alb.aws_lb_target_group.app production-app-tg || true

# Import RDS Subnet Group
terraform import module.rds.aws_db_subnet_group.main production-db-subnet-group || true

# Import RDS Parameter Group
terraform import module.rds.aws_db_parameter_group.main production-db-params || true

# Import EC2 Instance Profile
terraform import aws_iam_instance_profile.ec2_profile production-ec2-profile || true