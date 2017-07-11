console.log('Im over here!');
function tplawesome(event,t){res=event;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(event,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(event) {
       event.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    // key youtube api v3 
    gapi.client.setApiKey("AIzaSyDJ-LA-W8hgfu956ha0t-6nLAOikYEWL5k");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}