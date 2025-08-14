# VPC Limit Exceeded - Fix Guide

## Problem
Your GitHub Actions pipeline is failing with the error:
```
Error: creating EC2 VPC: operation error EC2: CreateVpc, https response error StatusCode: 400, RequestID: 28209510-6bb2-4392-8443-9d0885dc0a11, api error VpcLimitExceeded: The maximum number of VPCs has been reached.
```

This happens because AWS has a default limit of 5 VPCs per region, and you've reached that limit.

## Solution 1: Use Existing VPC (Recommended - Quick Fix)

### Step 1: Find an existing VPC
Run the provided script to find existing VPCs:
```bash
./find-vpc.sh
```

### Step 2: Update the configuration
1. Open `variables.tf`
2. Replace the placeholder VPC ID with an actual VPC ID from your account:
```hcl
variable "existing_vpc_id" {
  description = "ID of existing VPC to use"
  type        = string
  default     = "vpc-xxxxxxxxx"  # Replace with your actual VPC ID
}
```

### Step 3: Verify VPC has required resources
Make sure the VPC you choose has:
- At least one subnet
- Internet Gateway attached
- Route table with route to Internet Gateway (0.0.0.0/0 → igw-xxxxx)

## Solution 2: Clean up unused VPCs (Alternative)

If you prefer to create new VPCs:

### Step 1: Identify unused VPCs
```bash
./cleanup-vpcs.sh
```

### Step 2: Delete unused VPCs
1. Go to AWS Console → VPC
2. Delete VPCs that don't have running resources
3. Or use AWS CLI: `aws ec2 delete-vpc --vpc-id vpc-xxxxxxxxx`

### Step 3: Revert Terraform changes
If you want to go back to creating new VPCs, you'll need to revert the changes to `main.tf` and `variables.tf`.

## What Changed

The Terraform configuration now:
- ✅ Uses existing VPC instead of creating new ones
- ✅ Removes VPC, subnet, route table, and internet gateway creation
- ✅ References existing VPC resources via data sources
- ✅ Maintains all other functionality (EC2, security groups, etc.)

## Next Steps

1. Choose your preferred solution
2. Update the VPC ID in `variables.tf`
3. Commit and push your changes
4. Re-run the GitHub Actions pipeline

The pipeline should now succeed without the VPC limit error!
