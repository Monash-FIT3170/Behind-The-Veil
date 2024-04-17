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
---
### React
- Installing meteor already installs React so you don't need to do anything!
