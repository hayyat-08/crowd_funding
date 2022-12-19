const express = require("express");
const myDBConnection = require("../lib/db");
const axios = require("axios");
const exchangeCurrency = require("../lib/exchange_currency.js");
require("dotenv").config();

const Router = express.Router();

Router.get("/", (req, res) => {
  const query = "CALL getAllCampaigns()";
  myDBConnection.query(query, (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json(result[0]);
  });
});

Router.get("/currencies", (req, res) => {
  const query = "Select * from currencies";
  myDBConnection.query(query, (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json(result);
  });
});

Router.post(
  "/donate",
  async (req, res, next) => {
    const { campaignId } = req.body;
    const query = `CALL getStatusOfCampaign(?)`;
    myDBConnection.query(query, campaignId, (err, result) => {
      if (err) return res.json(err);

      if (result[0][0].status === "active") {
        next();
      } else {
        return res.json(`Campaign is ${result[0].status}`);
      }
    });
  },
  async (req, res) => {
    const { currency, name, amount, campaignId } = req.body;

    const result = await exchangeCurrency(amount, currency);

    const crypto_amount = result.info.rate;
    const converted_amount = result.result;

    const query = `CALL insertIntoDonation('${currency}', '${name}', ${converted_amount}, ${campaignId}, ${crypto_amount})`;
    myDBConnection.query(query, (err, result) => {
      if (err) {
        return res.json(err);
      }

      return res.status(200).json(result);
    });
  }
);

Router.post("/MarkCampaignAsFraud", (req, res) => {
  let query = `CALL MarkCampaignAsFraud(?)`;

  myDBConnection.query(query, req.body.id, (err, result) => {
    if (err) return res.json(err);

    return res.status(200).json(result);
  });
});

module.exports = Router;
