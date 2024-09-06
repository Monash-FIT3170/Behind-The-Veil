FROM --platform=linux/amd64 node:14

WORKDIR /usr/src/app

COPY . .

# Set environment variable to allow Meteor to run as root
ENV METEOR_ALLOW_SUPERUSER=true

# Install Meteor globally with
RUN npm install -g meteor@2.15 --unsafe-perm

# Add Meteor's installation directory to PATH
ENV PATH="/root/.meteor:$PATH"

# Install app dependencies
RUN meteor npm install

# Expose the port that Meteor will run on
EXPOSE 3000

# Set the start command
CMD ["meteor", "run", "--port", "3000"]