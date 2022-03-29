export default {
  client: 'better-sqlite3',
  connection: {
    filename: `${ __dirname }/db.sqlite`,
  },
  useNullAsDefault: true,
  migrations: {
    directory: `${ __dirname }/migrations`,
  },
  seeds: {
    directory: `${ __dirname }/seeds`,
  },
}
