const express = require("express");
const { Count, Consensus, Profile } = require("../actions/analyze");
const Result = require("../models/Result");
const router = express.Router();

router.post("/api/analyze", async (req, res) => {
  const motifs = req.body.motifs;
  const count = JSON.stringify(Count(motifs));
  const profile = JSON.stringify(Profile(motifs));
  const consensus = Consensus(motifs);

  // Insert the results into the database

  const result = await Result.create({
    count,
    profile,
    consensus,
  });

  return res.send({
    message: "Analysis Completed",
    count: result.count,
    profile: result.profile,
    consensus: result.consensus,
  });
});

module.exports = router;
