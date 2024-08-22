```
mongoimport -h localhost:3001 --db meteor --collection bookings --file mockdata/presentation/bookings12.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection users --file mockdata/presentation/artist50.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/presentation/artist_images50.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection posts --file mockdata/presentation/posts15.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/presentation/gallery_images15.json --jsonArray

mongoimport -h localhost:3001 --db meteor --collection services --file mockdata/presentation/services15.json --jsonArray
mongoimport -h localhost:3001 --db meteor --collection images --file mockdata/presentation/service_images30.json --jsonArray
```