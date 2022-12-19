const con = require("../lib/db.js");

module.exports = {
  async create() {
    var sql =
      "CREATE TABLE donations (id int NOT NULL AUTO_INCREMENT, nickname VARCHAR(255), amount FLOAT, state ENUM ('valid', 'invalid'), campaign_id int, PRIMARY KEY (id), FOREIGN KEY (campaign_id) REFERENCES campaigns (id))";
    await con.query(sql, function (err, result) {
      if (err) throw err;

      console.log("Donation table created");
    });
  },
};
