```
mongoimport -h localhost:3001 --db meteor --collection services --file mockdata/abcd1234A/abcd1234A_services30.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection bookings --file mockdata/abcd1234A/abcd1234A_bookings10.json --jsonArray

mongoexport -h localhost:3001 --db meteor --collection bookings --out=output.txt
```
