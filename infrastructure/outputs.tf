# outputs.tf - Simplified outputs
output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_eip.app.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.app.public_dns
}

output "frontend_url" {
  description = "URL to access the frontend application"
  value       = "http://${aws_eip.app.public_ip}"
}

output "backend_api_url" {
  description = "URL to access the backend API"
  value       = "http://${aws_eip.app.public_ip}:3000"
}

output "ssh_connection" {
  description = "SSH connection command"
  value       = var.key_pair_name != "" ? "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_eip.app.public_ip}" : "SSH key pair not configured"
}