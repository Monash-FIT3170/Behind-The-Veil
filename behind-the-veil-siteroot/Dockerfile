FROM geoffreybooth/meteor-base:2.15

# Set environment variable to allow Meteor to run as root
ENV METEOR_ALLOW_SUPERUSER=true

WORKDIR /usr/src/app

COPY . .

# Install app dependencies
RUN meteor npm install

# Expose the port that Meteor will run on
EXPOSE 3000

# Check Meteor version (optional step for debugging)
RUN meteor --version

# Set the start command
CMD ["meteor", "run", "--port", "3000", "--settings", "settings.json"]