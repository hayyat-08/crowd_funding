const con = require("../lib/db.js");

module.exports = {
  async create() {
    var sql =
      "CREATE TABLE campaigns (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255), amount FLOAT, exp_date DATE, status ENUM ('active', 'expired', 'fraud', 'successful'), user_id int, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (id))";
    await con.query(sql, function (err, result) {
      if (err) throw err;

      console.log("Campaign table created");
    });
  },
};
