const con = require("../lib/db.js");
const fs = require("fs");

require("dotenv").config();

const runSeed = fs.readFileSync("db/seed.sql", {
  encoding: "utf-8",
});

runSeed.split(/\r?\n/).forEach((line) => {
  con.query(line, (err, result) => {
    if (err) {
      console.log("err", err);
    }

    console.log(`SQL seed completed!`);
  });
});
