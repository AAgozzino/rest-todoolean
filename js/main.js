$(document).ready(function(){
  // READ - "GET" to-do List
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
  );

  // CREATE - "POST" new element in to-do List
  $("#add").click(
    function(){
      // Get input value
      var itemText = $("#new-item").val();
      // console.log(itemText);
      if (itemText != "") {
        $.ajax(
          {
            "url": "http://157.230.17.132:3001/todos",
            "method": "POST",
            "data": {
              "text": itemText
            },
            "success": function(data){
              var itemArray = [];
              itemArray.push(data)
              //console.log(data);
              renderList(itemArray);
            },
            "error": function(error){
              alert("Errore");
            }
          }
        )
      }
    }
  );

  // DELETE - "DELETE" element from to-do list
  $("#to-do-list").on("click", ".far.fa-trash-alt",
    function(){
      var listElement = $(this).parent();
      //console.log(listElement);
      var id = listElement.attr("id");
      //console.log(id);

      $.ajax(
        {
          "url": "http://157.230.17.132:3001/todos/" + id,
          "method": "DELETE",
          "success": function(data){
            //console.log(data);
            listElement.remove();
          },
          "error": function(error){
            alert("Errore");
          }
        }
      );
    }
  );

  // Show modal
  $("#to-do-list").on("click", ".far.fa-edit",
    function(){
      $(".modal").show();
      // Get list item id
      var id = $(this).parent().attr("id");
      console.log(id);
      var textToEdit = $(this).siblings(".item-text")
      console.log(textToEdit);

      //UPDATE - "PATCH" edit element list
      $("#edit").click(
        function(){
          var itemText = $("edit-item").val();
          if (itemText != "") {
            $.ajax(
              {
                "url": "http://157.230.17.132:3001/todos/" + id,
                "method": "PATCH",
                "data": {
                  "text": itemText,
                },
                "success": function(data){
                  console.log(data);
                  textToEdit.text(itemText);
                },
                "error": function(error){
                  alert("Errore");
                }
              }
            );
            // Close modal
            $(".modal").hide();
          }
        }
      )
    }
  );

  // Close modal
  $(".modal .far.fa-times-circle").click(
    function(){
      $(".modal").hide();
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
};
