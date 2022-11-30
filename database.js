const mysql = require("mysql");
const keys = require("./config/keys");

module.exports = mysql.createPool({
  host: keys.rdsHost,
  user: keys.rdsUser,
  password: keys.rdsPassword,
  port: keys.rdsPort,
  database: keys.rdsDatabase,
});
