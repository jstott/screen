const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = { 
  env,
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 9000,
  root: path.normalize(path.join(__dirname, '/../../..')),
  secrets: {
    session: process.env.APP_SECRET || 'secret',
  },
  sessionLength: process.env.SESSION_LENGTH || 18000,
  knex: {
    options: {
      client: 'postgresql',
      migrations: {
        tableName: 'knex_migrations'
      },
    },
  },
  dbConnection: process.env.DB_CONNECTION || 'postgres://screen:supasecretpassword@localhost:5434/screen',
  tvDb: {
    apikey: process.env.TVDB_API_KEY,
    username: process.env.TVDB_USERNAME,
    userkey: process.env.TVDB_USERKEY,
  },
  tmDbApikey: process.env.TMDB_API_KEY,
};
