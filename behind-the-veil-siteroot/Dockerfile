# FROM --platform=linux/amd64 node:14
FROM ubuntu:22.04

# install nvm and use node 14
RUN apt-get update && \
    apt-get -y install curl && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \ 
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install 14 && \
    nvm use 14 && \
    npm install -g meteor@2.15 --unsafe-perm

WORKDIR /usr/src/app

COPY . .

# Set environment variable to allow Meteor to run as root
ENV METEOR_ALLOW_SUPERUSER=true

# Add Meteor's installation directory to PATH
ENV PATH="/root/.meteor:$PATH"

# Install app dependencies
RUN meteor npm install

# Expose the port that Meteor will run on
EXPOSE 3000

# Check Meteor version (optional step for debugging)
RUN meteor --version

# Set the start command
CMD ["meteor", "run", "--port", "3000", "--settings", "settings.json"]