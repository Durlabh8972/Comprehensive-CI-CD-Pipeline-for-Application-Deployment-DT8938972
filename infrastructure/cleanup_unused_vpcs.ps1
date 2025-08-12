# List all VPCs and their usage
Write-Host "Listing all VPCs and their details..."
aws ec2 describe-vpcs --query 'Vpcs[*].[VpcId,Tags[?Key==`Name`].Value,CidrBlock]' --output table

Write-Host "`nNOTE: Default VPC and VPCs with resources cannot be deleted."
Write-Host "The following script will help identify and optionally delete unused VPCs."

# Get list of VPCs without Name tags (potentially unused)
$unusedVpcs = aws ec2 describe-vpcs --query 'Vpcs[?!Tags[?Key==`Name`]].[VpcId]' --output text

if ($unusedVpcs) {
    Write-Host "`nFound potentially unused VPCs:"
    foreach ($vpc in $unusedVpcs.Split()) {
        Write-Host "VPC ID: $vpc"
        
        # Check for resources in the VPC
        $instances = aws ec2 describe-instances --filters "Name=vpc-id,Values=$vpc" --query 'Reservations[].Instances[]' --output text
        $subnets = aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpc" --query 'Subnets[]' --output text
        
        if (-not ($instances -or $subnets)) {
            $confirm = Read-Host "This VPC appears to be unused. Would you like to delete it? (y/n)"
            if ($confirm -eq 'y') {
                Write-Host "Deleting VPC $vpc..."
                aws ec2 delete-vpc --vpc-id $vpc
                Write-Host "VPC deleted successfully."
            }
        } else {
            Write-Host "VPC $vpc has associated resources and cannot be automatically deleted."
        }
    }
} else {
    Write-Host "No unused VPCs found."
}

Write-Host "`nCleanup complete. Remember to request a VPC limit increase if needed."
