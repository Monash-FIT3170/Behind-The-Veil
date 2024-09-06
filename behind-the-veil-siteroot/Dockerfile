# specify node version 14
FROM node:14

# set main app directory
WORKDIR /usr/src/app 

# copy all files to container
COPY . .

# install meteor (v2.15)
# had to include double backslashes
RUN curl https://install.meteor.com/\\?release\\=2.15 | sh

# install dependencies
RUN npm install

# expose the port that meteor will run on
EXPOSE 3000

# set the start command
CMD ["meteor", "run", "--port", "3000"]
# todo: something wrong with meteor
