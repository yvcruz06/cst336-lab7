$("#search_input").submit(function(event){
    $.ajax({
            method: "GET",
            url: "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=sun&orientation=vertical&image_type=vector",
            dataType: "json",
            data: { "q": $("#q").val(), 
                    "orientation": $("#orientation").val()
            },
            success: function(result,status) {
                $("#img1").html("hello"); 
                //result.forEach(function(i) {
                //$("#img1").append("<img " + "src="+i.hits.previewURL+">");
                //})
            }    
    });
    //$("#img1").append(`<img src="https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg">`);
});