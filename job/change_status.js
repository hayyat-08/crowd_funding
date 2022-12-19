const con = require("../lib/db");
const schedule = require("node-schedule");

schedule.scheduleJob("*/10 * * * * *", () => {
  con.query("call MarkAsExpired()", (err, result) => {
    if (err) {
      console.log("error", err);
    }

    console.log(`SQL seed completed!`);
  });
});
