#!/bin/bash

# Exit on any error
set -e

# Configuration
S3_BUCKET="typesafe-blog-bucket" # Update with your bucket name
CLOUDFRONT_DISTRIBUTION_ID="YOUR_DISTRIBUTION_ID" # Update with your distribution ID
REGION="us-east-1" # Change to your AWS region

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# This step is now handled by the build script in package.json
# echo "🏗️  Building the application..."
# npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ --delete --region $REGION

echo "🧹 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*" \
    --region $REGION

echo "✅ Deployment complete!"
echo "Your site is available at: https://$(aws cloudfront get-distribution --id $CLOUDFRONT_DISTRIBUTION_ID --query 'Distribution.DomainName' --output text --region $REGION)"