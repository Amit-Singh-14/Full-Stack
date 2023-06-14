// document.querySelector("h1").style.color = "blue"

// short form in jqyery
// $ -> document.querySelector

/*
to prevent from error
if pura page load ho jaye tab hi jquery execute krna 
if cdm script ko hum head mai dale tab hi 
*/

$(document).ready(function () {
  $("h1").css("color", " red");
});


/*
hasClass -> $("h1").hasClass("classname") -> true/ false
addClass -> $("h1").addClass("classname secondclassname")
removeClass
text -> js textcontent -> $("h1").text("ddsfs")
html -> js innerHTML
*/


/* getting and setting attrributes

$("img").attr("src")
$("a").attr("href","www.google.com")
*/

// eventlistner

$("h1").click(() =>
$("h1").css("color","purple")
)

$(document /* or yah "body" bhi likh sakte the */).keypress((e) =>
    console.log(e.key)
)

// for loop nhi lagana direclty add ho jate saare button par
$("button").click(() => 
    $("h1").css("color","pink")
)

// second method to add eventlistrner
$("h1").on("mouseover",() => 
    $("h1").css("color","purple")
)

/* 
adding element using 
.before()
.after()
.prepend()
.append()
*/
