# Luna-Backend-interview

## Task
Please build the backend boilerplate project for NFT metadata([use opensea metadata standard](https://docs.opensea.io/docs/metadata-standards)) server using node.js/javascript.

For database, plz use the PostgreSQL and Knex.js(NPM package that can intereact with sql).

Backend should have CRUD functions for metadata.

No authentication needed.

Please fork this repo and send forked repo url once it's done.

## Solution overview
This API has endpoints that allow clients to
1. Add new metadata for a NFT collection item
2. Add metadata for a NFT collection item by the tokenId if it was previously deleted
3. Get all collection items metadata
4. Get metadata for a particular collection item
5. Update metadata for a particular collection item
6. Delete metadata for a particular collection item
7. Delete all collection items metadata

Kindly refer to the attached Postman collection `postman_collection.json`
## Setup

To install dependencies, run:

```npm install```

Create a file named `.env` in the root folder, you can copy the content of file `sample.env` 

```cp sample.env .env```

### Database setup:
You can change the DB_URL environment variable to your choice, set to local PostgreSQL server by deault.

### To run Knex migration up

```npm run migrate```

### To rollback Knex migration

```npm run unmigrate```

### To start dev server that listens to changes
```npm run dev:watch```

### To run test
```npm test```

### To start dev server
```npm run dev```

Refer to `package.json` file for more npm run commands possible.
