module.exports = {
  user: process.env.NODE_ORACLEDB_USER || 'TOUGOU',

  password: process.env.NODE_ORACLEDB_PASSWORD || 'TEST',

  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING ||
    '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=alexadr.geo.net)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=devanakin)))',

  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
};
