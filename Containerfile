# Use a slim Node 20 base for efficiency
FROM node:20-slim

# Install basic build tools (needed for some web3/crypto npm packages)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Install Truffle globally so it's available in the shell
# We do this in the image so you don't have to wait for it every time
RUN npm install -g truffle

# Expose ports for React (3000) and Ganache (if needed, though usually external)
EXPOSE 3000

# Default command to keep the container alive for development
CMD ["bash"]