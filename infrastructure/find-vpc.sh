#!/bin/bash

echo "Finding existing VPCs in your AWS account..."
echo "=============================================="

# List all VPCs
aws ec2 describe-vpcs --query 'Vpcs[*].[VpcId,CidrBlock,State,Tags[?Key==`Name`].Value|[0]]' --output table

echo ""
echo "To use an existing VPC:"
echo "1. Copy the VPC ID from the table above"
echo "2. Update the 'existing_vpc_id' variable in variables.tf"
echo "3. Make sure the VPC has at least one subnet with auto-assign public IP enabled"
echo ""
echo "Example:"
echo "variable \"existing_vpc_id\" {"
echo "  description = \"ID of existing VPC to use\""
echo "  type        = string"
echo "  default     = \"vpc-xxxxxxxxx\"  # Replace with actual VPC ID"
echo "}"
