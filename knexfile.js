// const connections = {
//   development: {
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: 'rootroot',
//       database: 'nota_bene',
//     },
//   },
//   production: {
//     client: 'mysql',
//     connection: process.env.JAWSDB_URL,
//   },
// };

// module.exports = 
//   process.env.NODE_ENV === 'production'
//     ? connections.production
//     : connections.development;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'rootroot',
      database: 'nota_bene',
      charset: 'utf8',
    },
  }
};
