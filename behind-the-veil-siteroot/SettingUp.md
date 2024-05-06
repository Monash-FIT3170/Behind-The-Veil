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

Written & tested by Neth, Josh and Nikki