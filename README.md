# Behind-The-Veil
# Project 10 - FIT3170 - 2024

## Table of Contents:
- [Dependencies](#dependencies)
- [Running the app](#running-the-app)
- [Testing](#testing)
- [Errors](#errors)
- [Importing Mock Data](#how-to-import-the-mock-data-into-mongodb)
- [Team Composition](#team-composition)

## Dependencies

### Meteor

Reference: https://docs.meteor.com/install.html

> Meteor requires a certain version of node to be installed.
> specifically Node.js version >= 10 and <= 14 is required.

#### Installing V14 with Node Version Manager (NVM)

Meteor recommends to use nvm to install the correct version: https://github.com/nvm-sh/nvm

Install NVM:

- Use curl. This works on macOS or Linux.
  ```console
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  ```
- Use Brew on macOS.
  ```console
  brew install nvm
  ```
- On Windows

  Follow the instructions on this link: https://www.freecodecamp.org/news/nvm-for-windows-how-to-download-and-install-node-version-manager-in-windows-10/

#### Downgrading Node.js

If you already installed Node.js and need to downgrade:

```console
npm install -g n
```

```console
n 14
```

To check if the version installed successfully run:

```console
node -v
```

#### Installing Meteor

For Windows, Mac or Linux run the following:

```console
npm install -g meteor
```

### React

- Installing meteor already installs React so you don't need to do anything!

---

## Running the app

Once all your dependencies have been installed:

- Make sure you are in the behind-the-veil-siteroot directory
  ```console
  cd behind-the-veil-siteroot
  ```
- Install meteor dependencies inside of the file. This will create your node_modules file, do not skip this step.️
  ```console
  meteor npm install
  ```
- To start the app run:
  ```console
  meteor npm start
  ```
  Your app should automatially open on the browser. If it doesn't, the console will show you a link that the app is running on the browser from so click this.

## Testing

```console
meteor test --driver-package meteortesting:mocha
```

## Errors

## How to import the mock data into MongoDB

1. Download the "MongoDB Command Line Database Tools" from: https://www.mongodb.com/try/download/database-tools

2. Unzip and move the folder to anywhere you want (NOT inside the project folder).

3. Get the path of the `/bin` folder inside the unzipped folder. The full path should be something like: `C:\Program Files\MongoDB\mongodb-database-tools\bin`

![1.png](images/1.png)

Then add the above folder path to environment PATH.

### How to add to PATH

#### For windows:

1. Start menu type: "path", and go into: `Edit system environment variables`

- ![2.png](images/2.png)

2. press `Environment Variables`

- ![3.png](images/3.png)

3. Go into the Path variable for **your user** not the **System variable**. Double click to expand the view.

- ![4.png](images/4.png)

  3.5. Recommended/Optional step: backup your Path variable before you alter it to prevent any loss than may occur.

- ![5.png](images/5.png)
- ![6.png](images/6.png)
- copy this string to any text file or anywhere to save it on your computer for future.

4. Press the `New` button or any empty row and paste the previously copied path into it.

- ![7.png](images/7.png)
- ![1.png](images/1.png)

#### Mac

edit the file at `/etc/paths` and add the above address to the end of the file

1. running this command: `sudo vim /etc/paths`
2. press `i` to go into insert mode and writing in the file
3. paste in your path you want to add at the end on a new line
4. press `escape` and then type `:wq` to save the file

- don't have access to a Mac, try to google for more specific instructions.

### Importing the files

1. run meteor project (make sure it is started)

2. Open another terminal and navigate to site-root `\Behind-The-Veil\behind-the-veil-siteroot`

Run command:

```
mongoimport -h localhost:PORT --db meteor --collection COLLECTION_NAME --file FILENAME.json --jsonArray
```

in the above command, replace:

- `PORT` with the port that the mongoDb is running on, if your meteor project is on 3000, then it is most likely 3001
    - (note: if you've run meteor on a different port, then mongoDb is probably running on that port + 1, e.g. meteor running on 4000, mongoDb running on 4001)
- `COLLECTION_NAME` with the database entity name (such as user, service, image, etc.)
- `FILENAME.json` with the file path to the file to import

Example commands to import everything (with port 3001)

```
mongoimport -h localhost:3001 --db meteor --collection services --file mockdata/services15.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection services --file mockdata/services50.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection users --file mockdata/artists50.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection users --file mockdata/brides50.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection bookings --file mockdata/bookings12.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/user_images50.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/service_images100.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/galleryImages50_abc.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection posts --file mockdata/post50_abc.json --jsonArray
```

mongoexport -h localhost:3001 --db meteor --collection images --out=output.txt

```

mongoimport -h localhost:3001 --db meteor --collection bookings --file mockdata/booking_user1000.json --jsonArray
```


> In the event your app is crashing or failing to run, scroll up on the error message and it will tell you if you are missing any dependencies.

The most common missing one is Babel, so run this if you see it say missing babel package

```console
meteor npm install --save @babel/runtime react react-dom
```

> In the event that the app will not start due to "Unexpected mongo exit code 14":

- Try:
  meteor reset
  meteor
  credit: https://stackoverflow.com/questions/38988365/meteor-unexpected-mongo-exit-code-14-restarting-cant-start-mongo-server


## Team Composition:

- Phillip (Kefei) Li
- Glenn Eric
- Lucas Sharp
- Laura Zhakupova
- Vicky Huang
- Anusha Yadav
- Katie (Kathryn) Mitchell
- Joshua Loong
- Trung Nguyen
- Hirun Hettigoda
- Nishan Chakma
- Nikki Li Shao
- Ryan Hicks
- Neth Botheju
- Kyle Bibby
- Nhu Nguyen

## Readme Authors:
Written & tested by Neth, Josh and Nikki  
Mongo error help info added added by Phillip