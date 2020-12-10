$.ajaxSetup({
    headers: {
        'Authorization': 'bearer GqQmVELC0cHh9qrGNUDrl9KkZKQCWd9s6Yg1u9oUVbTqXKdXHWkl)9bjDd3gDQcFvTHPbQfsZlv3b)pqv)taLpW=====2',
        'Accept-Language': 'th'
    }
});


$.getJSON("https://tatapi.tourismthailand.org/tatapi/v5/" + type + "/" + id, function(json) {
    console.log(json)
    //name
    document.getElementById("place_name").innerHTML = JSON.stringify(json.result.place_name).slice(1, -1)
    //image
    try{
        document.getElementById("img").style = "background-image: url(" + JSON.stringify(json.result.web_picture_urls[0]).slice(1, -1) + ")"
    }catch{}
    //address

});