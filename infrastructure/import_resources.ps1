# First, let's list existing VPCs and resources
Write-Host "Listing existing VPCs..."
aws ec2 describe-vpcs --query 'Vpcs[*].[VpcId,Tags[?Key==`Name`].Value]' --output table

Write-Host "`nListing IAM instance profiles..."
aws iam list-instance-profiles --query 'InstanceProfiles[*].[InstanceProfileName,InstanceProfileId]' --output table

$vpcId = Read-Host "Enter the VPC ID you want to import (vpc-xxxxxx)"
$profileId = Read-Host "Enter the Instance Profile ID you want to import"

# Initialize Terraform
terraform init

# Import existing VPC
Write-Host "`nImporting VPC..."
terraform import module.vpc.aws_vpc.main $vpcId

# Import existing instance profile
Write-Host "`nImporting IAM Instance Profile..."
terraform import aws_iam_instance_profile.ec2_profile "production-ec2-profile"

# Import other resources
Write-Host "`nImporting other resources..."
terraform import aws_cloudwatch_log_group.app_logs "/aws/ec2/production-todo-app"
terraform import aws_iam_role.ec2_role "production-ec2-role"
terraform import module.alb.aws_lb.main "production-alb"
terraform import module.alb.aws_lb_target_group.app "production-app-tg"
terraform import module.rds.aws_db_subnet_group.main "production-db-subnet-group"
terraform import module.rds.aws_db_parameter_group.main "production-db-params"

# Show current state
Write-Host "`nChecking Terraform state..."
terraform state list

# Plan changes
Write-Host "`nPlanning changes..."
terraform plan

Write-Host "`nReview the plan above. If it looks correct, run: terraform apply"

# Optional: List unused VPCs for cleanup
Write-Host "`nListing potentially unused VPCs (no Name tag)..."
aws ec2 describe-vpcs --query 'Vpcs[?!Tags[?Key==`Name`]].[VpcId]' --output table
