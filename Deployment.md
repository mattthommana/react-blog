# Deploying to AWS CloudFront

This guide explains how to deploy the Matter St. Blog to AWS CloudFront as a static site.

## Prerequisites

1. An AWS account
2. AWS CLI installed and configured
3. Node.js and npm

## Step 1: Build the Project

First, build your project to generate the static assets:

```bash
npm run build
```

This will create a `dist` directory with all the static files.

## Step 2: Create an S3 Bucket

Create an S3 bucket to host your static files:

```bash
aws s3 mb s3://your-bucket-name --region your-region
```

## Step 3: Configure S3 for Static Website Hosting

```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

## Step 4: Set Bucket Policy for Public Access

Create a file named `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

## Step 5: Upload Files to S3

```bash
aws s3 sync dist/ s3://your-bucket-name/ --delete
```

## Step 6: Create a CloudFront Distribution

1. Go to the AWS CloudFront console
2. Click "Create Distribution"
3. In "Origin Domain Name", select your S3 bucket
4. In "Default Root Object", enter `index.html`
5. Configure other settings as needed:
   - Redirect HTTP to HTTPS
   - Set price class
   - Configure caching behavior
6. Click "Create Distribution"

## Step 7: Configure CloudFront for SPA Routing

For a single-page application, you need to handle routes properly:

1. Create a CloudFront function named `url-rewrite`:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  
  // Check whether the URI is missing a file extension
  if (!uri.includes('.')) {
    request.uri = '/index.html';
  }
  
  return request;
}
```

2. Attach this function to the CloudFront distribution as a "Viewer Request" function

## Step 8: HTTPS Configuration (Optional)

For custom domains:

1. Request a certificate in AWS Certificate Manager
2. Configure your CloudFront distribution to use this certificate
3. Set up your DNS to point to the CloudFront distribution

## Step 9: CI/CD Setup (Optional)

Create a GitHub Actions workflow or similar to automate deployment:

```yaml
name: Deploy to CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: your-region
      
      - name: Deploy to S3
        run: aws s3 sync dist/ s3://your-bucket-name/ --delete
      
      - name: Invalidate CloudFront cache
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Deployment Script

For quick deployment, you can use the `deploy.sh` script included in the project:

1. Update the script with your bucket name and CloudFront distribution ID
2. Make it executable: `chmod +x deploy.sh`
3. Run it: `./deploy.sh`

## Important Notes

1. **Route Handling**: Remember that CloudFront serves static files, so all routes must be handled client-side. The CloudFront function above redirects all requests without file extensions to `index.html`.

2. **API Endpoints**: If your site makes API calls, you'll need to configure CORS on your API to allow requests from your CloudFront domain.

3. **Auth0 Configuration**: Update your Auth0 application settings to include your CloudFront domain in the allowed callbacks, logout URLs, and web origins.

4. **Environment Variables**: Make sure to set up your environment variables for production in the `.env.production` file before building.