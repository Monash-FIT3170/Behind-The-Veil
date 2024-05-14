Download the "MongoDB Command Line Database Tools" from: https://www.mongodb.com/try/download/database-tools

Unzip and move the folder to where ever you desired. Then add the downloaded folder to environment PATH.

Open terminal in siteroot `\Behind-The-Veil\behind-the-veil-siteroot` 

Run command:
```
mongoimport -h localhost:3001 --db meteor --collection COLLECTION_NAME --file FILENAME.json --jsonArray
```
in the above command, replace:
- `COLLECTION_NAME` with the database entity name (such as user, service, image, etc.)
- `FILENAME.json` with the file path to the file to import