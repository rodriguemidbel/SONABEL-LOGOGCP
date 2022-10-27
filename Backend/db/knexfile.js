// Update with your config settings.
//require("dotenv").config();

module.exports = {
  development: {
    client: 'oracledb',
    connection: {
      user: 'sonabel',
      password: 'sonabel',
      connectString: 'xe',
      database : 'sonabel'
    },
    pool: {
      min: 5,
      max: 50,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
};
