# album-dojo.api

## Starting The Project

```bash
yarn
yarn start
```

## Seeding The Project

Seed files are executed in alphabetical order from the `/seeders` directory. To run the seed files run:

```bash
npx sequelize-cli db:seed:all --debug
npx sequelize-cli db:seed --seed ./path/to/seedfile.js --debug
```

To generate a new seed file:

```bash
npx sequelize-cli seed:generate --name users
```

To undo seed files:

```bash
npx sequelize-cli db:seed:undo:all --debug
npx sequelize-cli db:seed:undo --seed ./path/to/seedfile.js --debug
```

### Note

**Before seeding all the files** it is necessary to delete a unique constraint on the userActions table generated by Sequelize when N:M relations are specified. Log onto PGAdmin dig down to the userAction constraints folder and look for the userId/actionCode unique constraint and delete it.

## LICENSE

MIT © Matthew Albrecht
