# Deployment Guide

This guide explains how to deploy the CannaButter Potency Calculator on your Ubuntu server using Portainer and Cloudflared.

## Prerequisites

- Ubuntu server with Docker installed
- Portainer running and accessible
- Cloudflared installed and configured

## Deployment Options

### Option 1: Deploy via Portainer UI (Recommended)

1. **Prepare your files on the server:**
   ```bash
   # Clone or upload your project to the server
   git clone <your-repo-url> /opt/cannabutter-calculator
   cd /opt/cannabutter-calculator
   ```

2. **Deploy via Portainer:**
   - Open Portainer UI
   - Navigate to **Stacks** (or **Compose** in older versions)
   - Click **Add stack**
   - Name it `cannabutter-calculator`
   - Copy the contents of `docker-compose.yml` into the web editor
   - Click **Deploy the stack**

3. **Verify the container is running:**
   - Go to **Containers** in Portainer
   - Check that `cannabutter-calculator` is running
   - The app should be accessible at `http://your-server-ip:8080`

### Option 2: Deploy via Command Line

```bash
# Navigate to project directory
cd /path/to/CannaButter-Potency-Calculator

# Build and start the container
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Option 3: Build and Run Manually

```bash
# Build the image
docker build -t cannabutter-calculator:latest .

# Run the container
docker run -d \
  --name cannabutter-calculator \
  --restart unless-stopped \
  -p 8080:80 \
  cannabutter-calculator:latest
```

## Configure Cloudflared Tunnel

Since you have Cloudflared installed, you can expose the application through a Cloudflare tunnel:

1. **Create or edit your Cloudflared config** (`~/.cloudflared/config.yml`):
   ```yaml
   tunnel: <your-tunnel-id>
   credentials-file: /home/your-user/.cloudflared/<tunnel-id>.json

   ingress:
     # Your CannaButter Calculator
     - hostname: calculator.yourdomain.com
       service: http://localhost:8080
    
     # Catch-all rule (must be last)
     - service: http_status:404
   ```

2. **Restart Cloudflared:**
   ```bash
   sudo systemctl restart cloudflared
   # Or if running manually:
   cloudflared tunnel run
   ```

3. **Update DNS:**
   - In Cloudflare dashboard, add a CNAME record:
     - Name: `calculator` (or your preferred subdomain)
     - Target: `<your-tunnel-id>.cfargotunnel.com`
     - Proxy status: Proxied (orange cloud)

## Port Configuration

The default port in `docker-compose.yml` is `8080`. You can change it:

1. Edit `docker-compose.yml` and change `8080:80` to your preferred port
2. Update the Cloudflared config to point to the new port
3. Redeploy the stack in Portainer

## Updating the Application

To update the application:

1. **Pull latest changes:**
   ```bash
   cd /opt/cannabutter-calculator
   git pull
   ```

2. **Rebuild in Portainer:**
   - Go to **Stacks** → `cannabutter-calculator`
   - Click **Editor**
   - Click **Update the stack**
   - Portainer will rebuild the image automatically

   Or via command line:
   ```bash
   docker-compose up -d --build
   ```

## Troubleshooting

### Container won't start
- Check logs: `docker logs cannabutter-calculator`
- Verify port isn't already in use: `sudo netstat -tulpn | grep 8080`

### Can't access via Cloudflared
- Verify Cloudflared is running: `sudo systemctl status cloudflared`
- Check Cloudflared logs: `sudo journalctl -u cloudflared -f`
- Ensure the service URL in config matches your container port

### Build fails
- Ensure Docker has enough resources allocated
- Check disk space: `df -h`
- Review build logs in Portainer

## Security Considerations

- The application is served over HTTP inside the container
- Cloudflared provides HTTPS termination
- Consider adding rate limiting in Cloudflare dashboard
- Keep Docker and Portainer updated

## Monitoring

Monitor your deployment:
- **Portainer**: View container stats, logs, and resource usage
- **Cloudflare Analytics**: Monitor traffic and performance
- **Docker logs**: `docker logs -f cannabutter-calculator`
