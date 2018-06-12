
$(document).ready(function() {

  var articleContainer = $(".article-con");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".new-articles", handleArticleScrape);

 
  initPage();

  function initPage() {
   
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
    
      if (data && data.length) {
        renderArticles(data);
      }
      else {
         renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
 
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
       var panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
   
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>No new articles.</h4>",
        "</div>",
        ].join("")
    );
   
    articleContainer.append(emptyAlert);
  }

  function articleSave() {
      var articleToSave = $(this)
      .parents(".panel")
      .data();
    articleToSave.saved = true;
  
    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      
      if (data.saved) {
        initPage();
      }
    });
  }

  function articleScrape() {
  
    $.get("/api/fetch").then(function(data) {
      initPage();
      bootbox.alert("<h3 class='text-center'>" + data.message + "<h3>");
    });
  }
});
