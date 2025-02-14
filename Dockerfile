# Use the Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy your application files into the Docker image
COPY . .

# Ensure the scripts are executable
RUN chmod +x ./scripts/entry-point-e2e.sh

# Run your tests when the Docker container is started
ENTRYPOINT ["./scripts/entry-point-e2e.sh"]
