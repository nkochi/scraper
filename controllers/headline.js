// Controller
var db = require("../models");

module.exports = {
  // Finding the headlines
  findAll: function(req, res) {
    db.Headline
      .find(req.query)
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      });
  },
  // Delete headline
  delete: function(req, res) {
    db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  },
  // Update headline
  update: function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  }
};
