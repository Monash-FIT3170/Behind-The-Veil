# Behind-The-Veil - Project 10 - FIT3170 - 2024

## Table of Contents
- [Dependencies](#dependencies)
- [Running the app](#running-the-app)
- [Testing](#testing)
- [Errors](#errors)
- [Importing Mock Data](#how-to-import-the-mock-data-into-mongodb)
- [Git Help](#git-help)
- [Deployment](#deployment)
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

## How to import the mock data into MongoDB

1. Download the "MongoDB Command Line Database Tools" from: https://www.mongodb.com/try/download/database-tools

2. Unzip and move the folder to anywhere you want (NOT inside the project folder).

3. Get the path of the `/bin` folder inside the unzipped folder. The full path should be something like: `C:\Program Files\MongoDB\mongodb-database-tools\bin`

![1.png](images/1.png)

Then add the above folder path to environment PATH.

### How to add to PATH

#### For windows

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
mongoimport -h localhost:3001 --db meteor --collection reviews --file mockdata/reviews12.json --jsonArray
```

mongoexport -h localhost:3001 --db meteor --collection images --out=output.txt

```

mongoimport -h localhost:3001 --db meteor --collection bookings --file mockdata/booking_user1000.json --jsonArray
```

## Git Help
  
 This file is for all the git issues and their resolution that I've come across before, more than welcome to add to it if you find a solution online to an issue you've had.

### Rebasing 
Reference: https://git-scm.com/book/en/v2/Git-Branching-Rebasing

✅ Step by Step video: https://youtu.be/RGtwxYqkkas?si=nvmMetHWNMegc0v_&t=129 (This guy does it all in his main terminal but i recommend using the IDE terminal so you can see your conflict files)

> **When to use rebasing:** When a new ticket has been merged to develop and your branch is not up to date with the develop branch
> 
> **Why do we rebase?** We want to limit the amount of merge conflicts happening in develop so we put all new changes from develop into our own branchs so we can resolve merge conflicts remotely instead of on develop.
> 
> **_! IMPORTANT !_** We will be prioritising develop branch over yours, so if a merge conflict occurs in develop, it will be rolled back and your changes will be lost, so please make sure you rebase!

#### Steps to rebase

##### Step 1: Stage and Commit your current changes in your local branch. Remember 
```console
git add <filename>
```
or
```console
git add .
```
then
```console
git commit -m "your message"
```

##### Step 2: Push local changes to your remote branch
```console
git push
```

##### Step 3: checkout the develop branch
```console
git checkout develop
```

##### Step 4: pull all recent changes from remote develop to your local develop branch
```console
git pull
```

##### Step 5: Go back to your working remote branch and rebase
```console
git checkout <your working branch>
```

```console
git rebase develop
```
#### Rebasing Merge conflicts
When rebasing you may run into merge conflicts. In this scenario, your terminal will say something like this:
```console
error: could not apply fa39187... something to add to patch A

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
Could not apply fa39187f3c3dfd2ab5faa38ac01cf3de7ce2e841... Change fake file
```
This occurs because one or more of your files is going to be overwritten from the rebase. 
Your terminal will tell you which files are having a conflict. However you can also do cmd/ctrl + shift + f and search '<<<<<<< HEAD'.

A merge conflict typically looked like this:
```javascript
    /**
    * This comment is from your working branch
    */
```
The way to resolve this is to select from the middle '=====' and either delete everything above it or below it. Make sure you delete the remaining >>> or <<< as well.

Once your resolve the conflict in the file remember to stage your changes
```console
git add <changed filename>
```

then continue rebasing to see if any other files need to be resolved:
```console
git rebase --continue
```

⚠️ **! IMPORTANT !** ⚠️Sometimes your rebase will ask you to write a commit message. If this occurs. Simply press cmd/ctrl + X to get out of message writing mode and continue rebasing.

✅ **You will know your rebase was successful if your terminal says rebased successfully.**

If everything in your branch is working to your expectations and you are happy with you current branch then do
```console
git push -f
```

Keep in mind git force push will rewrite your remote branch with everything in local regardless of merge conflicts. This is not a bad thing if you are happy with everything on your local and need your remote to match!
----

### Changing Branch name remotely and locally
Reference: https://stackoverflow.com/questions/30590083/git-how-to-rename-a-branch-both-local-and-remote

Rename the local branch to the new name
```console
git branch -m <old_name> <new_name>
```

Delete the old branch on remote - where <remote> is, for example, origin
```console
git push <remote> --delete <old_name>
```

Or shorter way to delete remote branch [:]
```console
git push <remote> :<old_name>
```

Prevent git from using the old name when pushing in the next step. Otherwise, git will use the old upstream name instead of <new_name>.
```console
git branch --unset-upstream <new_name>
```

Push the new branch to remote
```console
git push <remote> <new_name>
```

Reset the upstream branch for the new_name local branch
```console
git push <remote> -u <new_name>
```

### Git push errors
> error: src refspec feature/86cv1cexu-git-repo-setup does not match any \
> error: failed to push some refs to 'https://github.com/Monash-FIT3170/Behind-The-Veil.git'

This error means the branch doesn't exist in remote but does locally. To resolve this you can do a git status to see what uncommitted files you have and commit them. Do a git push and the branch should push to remote and create it for you.

---

### Merge Request Issues
#### Git doesn't give me the option to merge into developer branch?
This means the branch you are trying to push has a detached head i.e it was never branched off the developer branch.

To resolve this go into your current working branch and run
```console
git rebase develop
```

Resolve any conflicts that may occur and do add all changed files using 
```console
git add <filename> # recommended
```
or 
```console
git add . # not recommended unless you are confident you want ALL files staged
```

Finally to attach your branch back to head with all changes do

```console
git push -f
```

**Note** if you are unsure about any of this please reach out to team members via General.

## Deployment

This section outlines how to manually deploy the app using Docker and Google Cloud Platform (GCP). The steps outlined are more specific to our app and workflow, but for general advice and more specific details on how to deploy using GCP, refer to https://cloud.google.com/run/docs/deploying

GCP requires containers to follow this contract https://cloud.google.com/run/docs/container-contract (“Executables in the container image must be compiled for Linux 64-bit. Cloud Run specifically supports the Linux x86_64 ABI format.”)

Note that these steps could probably be optimised, i.e. pushing Docker image straight to Artifact Registry instead of Dockerhub first.

Prerequisites:

Docker:
1. Install Docker and create a Docker account, then have the Docker engine running when attempting to build the Docker image
2. Create a Dockerhub repo

GCP:
1. Create Google Cloud project and enable billing
2. Set up Artifact Registry
    - Enable Artifact Registry API
    - Go to Artifact Registry > Repositories
    - Create a docker repository
      - In the form, select docker format and Australia region
3. Configure secrets using Secret Manager
  - Enable Secret Manager API
  - Create secrets for each of our sensitive environment variables, e.g.
    - MONGO_URL
    - MAIL_URL
    - FROM_USER
  - Grant the ’Secret Manager Secret Accessor’ role to the service account being used to deploy
    - Go to Secret Manager page
    - ‘Show info panel’
    - ‘Add principal’
    - Select the service account used to deploy as new principal
    - Select ’Secret Manager Secret Accessor’ as role

Assuming you have completed the prerequisites, here is the process when you’re ready to do a release and deploy:

Create a branch off of ‘develop’ called ‘release/<version_number>’ (replace with your desired version number)
Merge ‘release/<version_number>’ into ‘main’
Checkout ‘main’ branch
Open terminal. Go to behind-the-veil-siteroot, where the Dockerfile is
cd behind-the-veil-siteroot
Log in
docker login
Enter login credentials
Build the Docker image
docker buildx build -t behind-the-veil --platform linux/amd64 .
Test that the image runs locally
docker run -e MONGO_URL=<mongo_url> -e ROOT_URL=<root_url> -e MAIL_URL=<mail_url> -e FROM_USER=<from_user_email> -p 8080:8080 behind-the-veil
Replace the environment variables above with our potentially sensitive values, or omit them if you know you don’t need them for testing
If it fails, then debug, rebuild, and test again, else proceed

Note, the following example code snippets assume the following:
Docker username = joshualoongwy
Dockerhub repo name = behind-the-veil
Version number = 2.0.1
GCP project location = australia-southeast2
GCP project id = behind-the-veil
GCP Artifact Registry repo name = behind-the-veil-docker

Adjust each command according to your needs

Tag Docker image to target Dockerhub repo
docker tag behind-the-veil joshualoongwy/behind-the-veil:2.0.1
Go to GCP and open Cloud Shell. The following steps are performed in a Cloud Shell terminal. Configure authentication if necessary
gcloud auth configure-docker australia-southeast2-docker.pkg.dev
Pull Docker image from Dockerhub
docker pull joshualoongwy/behind-the-veil:2.0.1
Tag Docker image to target Google Artifact Registry repo
docker tag joshualoongwy/behind-the-veil:2.0.1 australia-southeast2-docker.pkg.dev/behind-the-veil/behind-the-veil-docker/behind-the-veil:2.0.1
Push Docker image to Google Artifact Registry
docker push australia-southeast2-docker.pkg.dev/behind-the-veil/behind-the-veil-docker/behind-the-veil:2.0.1
Go to Google Cloud Run and fill out service form
If first time deploying, go to ‘Create service’ and fill out Google Cloud Run form fields:
Container Image URL: Select the image you just pushed to Artifact Registry
Region: Select ‘australia-southeast2’
Authentication: Select ‘Allow unauthenticated invocations’
Environment variables: Use the necessary environment variables (some should be configured as secrets in Secret Manager), e.g.
ROOT_URL
MONGO_URL
MAIL_URL
FROM_USER
Increase/adjust resources (e.g. memory) as necessary
If redeploying, select your existing service and go to ‘Edit & deploy new revision’, then make necessary changes in the form
Press ‘Deploy’, wait for GCP to deploy, then go the supplied URL to check for successful deployment


## Team Composition

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

## Readme Authors
Written & tested by Neth, Josh and Nikki  
Mongo error help info added added by Phillip
