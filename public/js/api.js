// ---------------tat-------------------


function myplace(){
  

    $.ajaxSetup({
        headers: {
            'Authorization': 'bearer GqQmVELC0cHh9qrGNUDrl9KkZKQCWd9s6Yg1u9oUVbTqXKdXHWkl)9bjDd3gDQcFvTHPbQfsZlv3b)pqv)taLpW=====2',
            'Accept-Language': 'th'
        }
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    type  =urlParams.get('type');
    id = urlParams.get('id');

    $.getJSON("https://tatapi.tourismthailand.org/tatapi/v5/" + type + "/" + id, function (json) {
        // console.log(json)
        //name
        document.getElementById("place_name").innerHTML=JSON.stringify(json.result.place_name).slice(1, -1)
        //image
        try {
            $("#img").attr("src", JSON.stringify(json.result.web_picture_urls[0]).slice(1, -1));
        } catch {}
        //detail
        document.getElementById("detail").innerHTML = JSON.stringify(json.result.place_information.detail).slice(1, -1)
        document.getElementById("district").innerHTML = JSON.stringify(json.result.location.district).slice(1, -1)
        document.getElementById("destination").innerHTML = JSON.stringify(json.result.destination).slice(1, -1)
        document.getElementById("attraction_types").innerHTML = JSON.stringify(json.result.place_information.attraction_types[0].description).slice(1, -1)

        // document.getElementById("weekday_text").innerHTML = JSON.stringify(json.result.opening_hours.weekday_text.day1);

        if (weekday_text(json) && weekday_text_time(json) != empty) {
            $("#weekday_text").append(weekday_text(json));
            $("#weekday_text_time").append(weekday_text_time(json));
        } else {
            document.getElementById("weekday_text").innerHTML = ("ไม่มี")
        }

        if (!empty((latitude(json) && longitude(json)))) {
            initMap(latitude(json), longitude(json), "map");
        }

    });

    function latitude(data) {
        return data.result.latitude;
    }

    function longitude(data) {
        return data.result.longitude;
    }

    function weekday_text(data) {
        return (data.result.opening_hours.weekday_text.day1.day + "<br>" + data.result.opening_hours.weekday_text.day2.day + "<br>" + data.result.opening_hours.weekday_text.day3.day + "<br>" + data.result.opening_hours.weekday_text.day4.day + "<br>" + data.result.opening_hours.weekday_text.day5.day + "<br>" + data.result.opening_hours.weekday_text.day6.day + "<br>" + data.result.opening_hours.weekday_text.day7.day);
    }

    function weekday_text_time(data) {
        return (data.result.opening_hours.weekday_text.day1.time + "<br>" + data.result.opening_hours.weekday_text.day2.time + "<br>" + data.result.opening_hours.weekday_text.day3.time + "<br>" + data.result.opening_hours.weekday_text.day4.time + "<br>" + data.result.opening_hours.weekday_text.day5.time + "<br>" + data.result.opening_hours.weekday_text.day6.time + "<br>" + data.result.opening_hours.weekday_text.day7.time);
    }

}

// -----------------------map--------------------
function initMap(a, b, c) {
    const uluru = {
        lat: a,
        lng: b
    };
    const map = new google.maps.Map(document.getElementById(c), {
        zoom: 10,
        center: uluru,
    });
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}


// --------------------covid---------------


const url = "https://covid19.th-stat.com/api/open/today"; // site that doesn’t send Access-Control-*
fetch(url)
    .then(function (response) {
        return response.json() // แปลงข้อมูลที่ได้เป็น json
    })
    .then(function (json) {
        console.log(json)
        document.getElementById("NewConfirmed").innerHTML = JSON.stringify(json.NewConfirmed)
        document.getElementById("NewDeaths").innerHTML = JSON.stringify(json.NewDeaths)
        document.getElementById("NewHospitalized").innerHTML = JSON.stringify(json.NewHospitalized)
        document.getElementById("NewRecovered").innerHTML = JSON.stringify(json.NewRecovered)
        document.getElementById("Hospitalized2").innerHTML = JSON.stringify(json.Hospitalized)
    })


const url2 = "https://covid19.th-stat.com/api/open/timeline"; // site that doesn’t send Access-Control-*
fetch(url2)
    .then(function (response) {
        return response.json() // แปลงข้อมูลที่ได้เป็น json
    })
    .then(function (json) {
        console.log(json.UpdateDate)
        document.getElementById("UpdateDate").innerHTML = JSON.stringify(json.UpdateDate).slice(1, -1)

        var totalCovid = json.Data[(json.Data.length) - 1]
        document.getElementById("Confirmed").innerHTML = JSON.stringify(totalCovid.Confirmed)
        document.getElementById("Deaths").innerHTML = JSON.stringify(totalCovid.Deaths)
        document.getElementById("Recovered").innerHTML = JSON.stringify(totalCovid.Recovered)
        document.getElementById("Hospitalized").innerHTML = JSON.stringify(totalCovid.Hospitalized)

    })


function mysearch(){
    $.ajaxSetup({
        headers: {
            'Authorization': 'bearer GqQmVELC0cHh9qrGNUDrl9KkZKQCWd9s6Yg1u9oUVbTqXKdXHWkl)9bjDd3gDQcFvTHPbQfsZlv3b)pqv)taLpW=====2',
            'Accept-Language': 'th'
        }
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    keyword  =urlParams.get('name');
    categories = urlParams.get('category');
    console.log("--")
    $.getJSON("https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword="+keyword +"&categories="+categories+"", function (json) {

    console.log(json)

    });
    
}


