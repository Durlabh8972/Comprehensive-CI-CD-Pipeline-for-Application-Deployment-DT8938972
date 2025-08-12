#!/bin/bash

# Import CloudWatch Log Group
terraform import aws_cloudwatch_log_group.app_logs /aws/ec2/production-todo-app

# Import IAM Role
terraform import aws_iam_role.ec2_role production-ec2-role

# Import Load Balancer
terraform import module.alb.aws_lb.main production-alb

# Import Target Group
terraform import module.alb.aws_lb_target_group.app production-app-tg

# Import RDS Subnet Group
terraform import module.rds.aws_db_subnet_group.main production-db-subnet-group

# Import RDS Parameter Group
terraform import module.rds.aws_db_parameter_group.main production-db-params
