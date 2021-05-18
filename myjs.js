$(function()
{
    loaditem();   
    $("#recipes").on("click","button#del", handledel);
    $("#recipes").on("click","button#edit", handleupdate);
    $("#addbtn").click(additem);
    $("#updatesave").click(function(){
        var id= $("#updateid").val();
        var title= $("#updatetitle").val();
        var body= $("#updatebody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
            data: {title, body},
            method: "PUT",
            success: function(response)
            {
                console.log(response)
                loaditem();
                $("#updatemodal").modal("hide")
            }

        })
    })

});

//ADD
function additem() {
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes",
      method: "POST",
      data: { title, body },
      success: function(response) {
        console.log(response);
        $("#title").val("");
        $("#body").val("");
        loadRecipies();
        $("#addmodal").modal("show");
      }
    });
  }


//DELETE
function handledel(){
    
    var btn=$(this);
    var parentdiv=btn.closest(".recipe");
    let id=parentdiv.attr("data-id");
    console.log(id)
    console.log("handle delete")
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        success: function(){
            loaditem();
            $("#updatemodal").modal("hide")
        }
    });
}

//UPDATE
function handleupdate(){
var btn=$(this);
    var parentdiv=btn.closest(".recipe");
    let id=parentdiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id,function(response){
        $("#updateid").val(response._id);
        $("#updatetitle").val(response.title);
        $("#updatebody").val(response.body);
        $("#updatemodal").modal("show")
    })
}

//LOAD ITEM
function loaditem(){
    $.ajax({      
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response){
            var recipes= $("#recipes");
            recipes.html("Sorry! Error has occured")
        },
        success: function(response){
            console.log(response)
            var recipes= $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length;i++)
            {
               var rec=response[i];
            
                  recipes.append(`<div class ="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p>${rec.body}<br>
                  <button id="edit"class="btn btn-info">Edit</button><button id="del"class="btn btn-danger">Delete</button>
                   <hr>${rec.title.length}</p></div>`)
                 
            }
            
        }
    });
}