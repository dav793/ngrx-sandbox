# Contact Book App

## Run entire app
```bash
    docker-compose -f docker-compose.yml up --build
```

## Run DB container only
```bash
    docker-compose -f docker-compose.db-only.yml up --build
```

## Run first-time DB setup scripts
```bash
    mongo -u root -p example --authenticationDatabase admin < scripts/clearDatabase.js
    mongo -u root -p example --authenticationDatabase admin < scripts/createDatabase.js
    mongo -u root -p example --authenticationDatabase admin < scripts/populateDatabase.js
```
