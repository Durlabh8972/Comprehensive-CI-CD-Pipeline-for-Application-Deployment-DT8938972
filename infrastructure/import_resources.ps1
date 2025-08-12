# Import base VPC resources first
terraform init

# Import VPC resources first
terraform apply -target=module.vpc.aws_vpc.main -auto-approve
terraform apply -target=module.vpc.aws_subnet.public -auto-approve
terraform apply -target=module.vpc.aws_subnet.private -auto-approve

# Import CloudWatch Log Group
terraform import aws_cloudwatch_log_group.app_logs "/aws/ec2/production-todo-app"

# Import IAM Role
terraform import aws_iam_role.ec2_role "production-ec2-role"

# Import Load Balancer and Target Group
terraform import module.alb.aws_lb.main "production-alb"
terraform import module.alb.aws_lb_target_group.app "production-app-tg"

# Import RDS resources
terraform import module.rds.aws_db_subnet_group.main "production-db-subnet-group"
terraform import module.rds.aws_db_parameter_group.main "production-db-params"

# Finally, apply all changes
terraform plan
Write-Host "Review the plan above. If it looks correct, run: terraform apply"
