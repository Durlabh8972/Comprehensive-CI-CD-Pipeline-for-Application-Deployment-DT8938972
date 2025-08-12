#!/bin/bash

# user-data.sh - EC2 initialization script
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Git (to clone your repository)
apt-get install -y git

# Install AWS CLI (useful for deployment)
apt-get install -y awscli

# Create application directory
mkdir -p /opt/todo-app
chown ubuntu:ubuntu /opt/todo-app

# Create a basic .env file (you'll need to customize this)
cat > /opt/todo-app/.env << EOF
# Database Configuration
POSTGRESDB_USER=todouser
POSTGRESDB_ROOT_PASSWORD=your_secure_password_here
POSTGRESDB_DATABASE=todoapp
POSTGRESDB_LOCAL_PORT=5432
POSTGRESDB_DOCKER_PORT=5432

# Application Configuration
NODE_ENV=production
PORT=3000
EOF

chown ubuntu:ubuntu /opt/todo-app/.env

# Create a systemd service to manage Docker Compose
cat > /etc/systemd/system/todo-app.service << EOF
[Unit]
Description=Todo App Docker Compose
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/todo-app
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
EOF

# Enable the service (but don't start it yet - user needs to add their code first)
systemctl enable todo-app.service

# Create a deployment script for easy updates
cat > /opt/todo-app/deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "Starting deployment..."

# Stop existing containers
docker-compose down

# Pull latest code (if using git)
# git pull origin main

# Rebuild and start containers
docker-compose up --build -d

echo "Deployment complete!"
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Backend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
EOF

chmod +x /opt/todo-app/deploy.sh
chown ubuntu:ubuntu /opt/todo-app/deploy.sh

# Create a simple status check script
cat > /opt/todo-app/status.sh << 'EOF'
#!/bin/bash
echo "=== Todo App Status ==="
echo "Docker containers:"
docker-compose ps
echo ""
echo "Application URLs:"
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Backend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
EOF

chmod +x /opt/todo-app/status.sh
chown ubuntu:ubuntu /opt/todo-app/status.sh

# Log completion
echo "EC2 setup complete!" > /var/log/user-data.log
echo "Todo app directory created at /opt/todo-app" >> /var/log/user-data.log
echo "Next steps:" >> /var/log/user-data.log
echo "1. Copy your docker-compose.yml file to /opt/todo-app/" >> /var/log/user-data.log
echo "2. Copy your application code to /opt/todo-app/" >> /var/log/user-data.log
echo "3. Update the .env file with your actual values" >> /var/log/user-data.log
echo "4. Run: sudo systemctl start todo-app.service" >> /var/log/user-data.log