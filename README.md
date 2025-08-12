# Comprehensive CI/CD Pipeline for Application Deployment

This project implements a complete CI/CD pipeline for a Todo application using modern DevOps practices and cloud infrastructure. The application consists of a frontend, backend, and infrastructure components deployed on AWS.

## Project Structure

```
.
├── backend/                 # Node.js Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── tests/            # Unit tests
├── frontend/              # Simple web frontend
│   ├── index.html
│   ├── index.js
│   └── styles.css
├── docker/               # Docker configuration
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── infrastructure/       # Terraform AWS infrastructure
│   ├── modules/
│   │   ├── alb/         # Application Load Balancer
│   │   ├── ec2/         # EC2 instances
│   │   ├── rds/         # RDS database
│   │   └── vpc/         # VPC networking
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── docker-compose.yml    # Local development setup
```

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- AWS CLI configured with appropriate credentials
- Terraform CLI (v1.0 or higher)

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Durlabh8972/Comprehensive-CI-CD-Pipeline-for-Application-Deployment-DT8938972.git
   cd Comprehensive-CI-CD-Pipeline-for-Application-Deployment-DT8938972
   ```

2. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000

## Infrastructure Deployment

Before deploying, make sure to:

1. Copy and configure variables:

   ```bash
   cp infrastructure/terraform.tfvars.example infrastructure/terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

2. Initialize Terraform:

   ```bash
   cd infrastructure
   terraform init
   ```

3. For existing resources, import them into Terraform state:

   ```bash
   # Import existing CloudWatch Log Group
   terraform import aws_cloudwatch_log_group.app_logs /aws/ec2/production-todo-app

   # Import existing IAM Role
   terraform import aws_iam_role.ec2_role production-ec2-role

   # Import existing ALB
   terraform import module.alb.aws_lb.main production-alb

   # Import existing Target Group
   terraform import module.alb.aws_lb_target_group.app production-app-tg

   # Import existing RDS Subnet Group
   terraform import module.rds.aws_db_subnet_group.main production-db-subnet-group

   # Import existing RDS Parameter Group
   terraform import module.rds.aws_db_parameter_group.main production-db-params
   ```

4. Apply the infrastructure:
   ```bash
   terraform plan
   terraform apply
   ```

## Testing

Run backend tests:

```bash
cd backend
npm install
npm test
```

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The pipeline:

1. Runs tests
2. Builds Docker images
3. Deploys to AWS infrastructure


## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

See the [LICENSE](LICENSE) file for details
