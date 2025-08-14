#!/bin/bash

echo "VPC Cleanup Script"
echo "=================="
echo ""
echo "This script will help you identify and optionally delete unused VPCs."
echo "WARNING: Only run this if you're sure you want to delete VPCs!"
echo ""

# List VPCs with their resources
echo "Current VPCs and their resources:"
echo "=================================="

vpcs=$(aws ec2 describe-vpcs --query 'Vpcs[*].VpcId' --output text)

for vpc in $vpcs; do
    echo "VPC: $vpc"
    
    # Count instances
    instances=$(aws ec2 describe-instances --filters "Name=vpc-id,Values=$vpc" --query 'Reservations[*].Instances[*].InstanceId' --output text)
    if [ -n "$instances" ]; then
        echo "  - Has EC2 instances: $instances"
    else
        echo "  - No EC2 instances"
    fi
    
    # Count security groups
    sgs=$(aws ec2 describe-security-groups --filters "Name=vpc-id,Values=$vpc" --query 'SecurityGroups[*].GroupId' --output text)
    if [ -n "$sgs" ]; then
        echo "  - Security Groups: $sgs"
    fi
    
    # Count subnets
    subnets=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpc" --query 'Subnets[*].SubnetId' --output text)
    if [ -n "$subnets" ]; then
        echo "  - Subnets: $subnets"
    fi
    
    echo ""
done

echo ""
echo "To delete an unused VPC manually:"
echo "1. First delete all resources in the VPC (instances, security groups, subnets, etc.)"
echo "2. Then run: aws ec2 delete-vpc --vpc-id vpc-xxxxxxxxx"
echo ""
echo "Or use the AWS Console to delete VPCs safely."
