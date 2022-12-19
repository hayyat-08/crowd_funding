const con = require("../lib/db.js");

module.exports = {
  async create() {
    var sql =
      "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, user_name VARCHAR(255), crypto_wallet_address VARCHAR(255), PRIMARY KEY (id))";
    await con.query(sql, function (err, result) {
      if (err) throw err;

      console.log("User table created");
    });
  },
};
