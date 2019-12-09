// first we need to collect the user's search term as a dynamic variable

// then we need to input that search variable 

// then we need to get the info from the ajax response as variables

// then manipulate the DOM to display the recipe and the corresponding gif

console.log(searchbox)

$("#search-button").on("click touch", function (event) {
    $("#recipe-info").remove();
    $("#stored").remove();
    $("#joke").remove();

    var searchbox = $("#searchbox");


    searchbox.animate({ height: "100px", margin: "0 0 20px 0", position: "absolute", top: "20px", padding: "0px" })
    $("#shrink").animate({ fontSize: "22pt" });
    $("#shrink").addClass("afterShrink")
    $(".row").removeClass("extra-padding");
    $("#search-term").animate({ height: "20px" });
    $("#search-button").animate({ fontSize: "12pt" });
    $("#search-button").removeClass("searchCenter")
    var newContainer = $("<div class='container'>");

    newContainer.attr("id", "results");
    newContainer.attr("class", "container center");
    newContainer.insertAfter(searchbox);
    var newRow = $("<div class='row'>");
    newContainer.append(newRow);

    divIds = ["recipe-info", "stored", "joke"]
    for (var i = 0; i < divIds.length; i++) {
        // var textArr = ["<span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span><span><h4>Recipe Title</h4></span><span>[img goes here]</span>", "<span><h4>Local Storage</h4></span><span></span>", "<span><h5>Don't Forget to Laugh!</h5></span>"]
        var textArr =[];
        var newCol = $("<div class='six columns trans-bg'>");
        newCol.attr("id", divIds[i])
        newRow.append(newCol);
        newCol.html(textArr[i]);
    }

    getJoke();
})

// This allows the user to press enter instead of clicking search
$("#searchbox").keyup(function(event){
    if(event.keyCode == 13){
        $("#search-button").click();
    }
});

function getJoke (){
// $("#joke").removeClass("six columns")
// $("#joke").addClass("four columns offset-by-four top-margin20")


var url = "https://api.spoonacular.com/food/jokes/random?&apiKey=349d5f926732476ab8ac52e9787cedc9"
$.ajax({
    url: url,
    method: "GET"
}).then(function (response) {
    console.log(response.text)
    var jokeBox = $("<div>")
    jokeBox.addClass("jokes")
    jokeBox.text(response.text)
    $("#joke").append(jokeBox)
    
    getGiphys();
})
}

var searchTerm = $("#search-term").val(); 


function getGiphys(){

    var apiKey = "2OFRYxUYBmo81pSfHQf7sRWZrHLq6NPe"
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=1&rating=G"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(searchTerm)
    console.log(response)
    var giph = response.data[0].images.fixed_height.url
    var giphBox = $("<div>")
    // console.log("div creation ",giphBox);
    var image = $("<img>").attr("src", giph) 
    console.log("image and source ",image);
    giphBox.append(image)
    // console.log("giph box line " + giphBox)
    $("#joke").append(giphbox)
});
}