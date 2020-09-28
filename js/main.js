$(document).ready(function(){
  // GET to-do List
  $.ajax(
    {
      "url": "http://157.230.17.132:3001/todos",
      "method": "GET",
      "success": function(data){
        console.log(data);
        renderList(data);
      },
      "error": function(error){
        alert("Errore");
      }
    }
  )
});

// FUNCTION - render to-do List
function renderList(results){
  // Set Handlebars template
  var source = $("#item-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < results.length; i++) {
    var html = template(results[i]);
    $("#to-do-list").append(html);
  }

}
