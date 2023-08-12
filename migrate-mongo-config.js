/* eslint-disable @typescript-eslint/no-var-requires */
const { config: dotenvConfig } = require('dotenv');
dotenvConfig();

const config = {
  mongodb: {
    url: process.env.MONGODB_CONNECTION_URI,
    databaseName: 'flashcards',
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },
  migrationsDir: './src/migrations',
  changelogCollectionName: 'migrations',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
