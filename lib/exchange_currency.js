const axios = require("axios");
require("dotenv").config();

exchangeCurrency = async (amount, from, to = "USD") => {
  const response = await axios.get(
    `https://api.apilayer.com/exchangerates_data/convert?amount=${amount}&from=${from}&to=${to}`,
    {
      headers: {
        apikey: process.env.APILAYERKEY,
        "Accept-Encoding": "gzip,deflate,compress",
      },
    }
  );

  return response.data;
};

module.exports = exchangeCurrency;
