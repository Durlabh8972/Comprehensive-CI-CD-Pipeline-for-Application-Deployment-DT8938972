# infrastructure/modules/ec2/main.tf 
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Creating direct instances
resource "aws_instance" "app" {
  count                  = 2
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = var.key_pair_name != "" ? var.key_pair_name : null
  subnet_id              = var.private_subnets[count.index % length(var.private_subnets)]
  vpc_security_group_ids = [var.security_group_id]
  iam_instance_profile   = var.instance_profile

  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    environment = var.environment
    port        = var.port
  }))

  tags = {
    Name = "${var.environment}-app-instance-${count.index + 1}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Attach instances to target group
resource "aws_lb_target_group_attachment" "app" {
  count            = length(aws_instance.app)
  target_group_arn = var.target_group_arn
  target_id        = aws_instance.app[count.index].id
  port             = var.port
}