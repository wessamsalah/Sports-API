FROM mongo

COPY auto-racing.json /auto-racing.json

CMD mongoimport --host database  --db gns-api --username=user --password=pass --authenticationMechanism=SCRAM-SHA-1 --authenticationDatabase=admin  --collection sports-event auto-racing.json --jsonArray --mode=upsert
