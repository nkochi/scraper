
// Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("http://www.nlf.com").then(function(res) {
    var $ = cheerio.load(res.data);
 
    var articles = [];

    $(".theme-summary").each(function(i, element) {
    
      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

        var sum = $(this)
        .children(".summary")
        .text()
        .trim();

      if (head && sum && url) {
        
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};


module.exports = scrape;
