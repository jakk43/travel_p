// ---------------tat-------------------
$.ajaxSetup({
    headers: {
        'Authorization': 'bearer GqQmVELC0cHh9qrGNUDrl9KkZKQCWd9s6Yg1u9oUVbTqXKdXHWkl)9bjDd3gDQcFvTHPbQfsZlv3b)pqv)taLpW=====2',
        'Accept-Language': 'th'
    }
});

function myplace() {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    type = urlParams.get('type');
    id = urlParams.get('id');

    $.getJSON("https://tatapi.tourismthailand.org/tatapi/v5/" + type + "/" + id, function (json) {
        // console.log(json)
        //name
        document.getElementById("place_name").innerHTML = JSON.stringify(json.result.place_name).slice(1, -1)
        //image
        try {
            $("#img").attr("src", JSON.stringify(json.result.web_picture_urls[0]).slice(1, -1));
        } catch {}
        //detail
        try {
            if(json.result.place_information.detail != empty()){
                document.getElementById("detail").innerHTML = JSON.stringify(json.result.place_information.detail).slice(1, -1)
            }else{
                document.getElementById("detail").innerHTML = JSON.stringify("ไม่ทราบรายละเอียด").slice(1, -1)

            }
            
        } catch {
            document.getElementById("detail").innerHTML = JSON.stringify("ไม่ทราบรายละเอียด")
        }
        try {
            document.getElementById("district").innerHTML = JSON.stringify(json.result.location.district).slice(1, -1)
            document.getElementById("destination").innerHTML = JSON.stringify(json.result.destination).slice(1, -1)
            document.getElementById("attraction_types").innerHTML = JSON.stringify(json.result.place_information.attraction_types[0].description).slice(1, -1)
        } catch {}

        // document.getElementById("weekday_text").innerHTML = JSON.stringify(json.result.opening_hours.weekday_text.day1);

        try {
            $("#weekday_text").append(weekday_text(json));
            $("#weekday_text_time").append(weekday_text_time(json));
        } catch {
            document.getElementById("weekday_text").innerHTML = ("ไม่ทราบรายละเอียด")

        }

        // if (weekday_text(json) && weekday_text_time(json) != empty()) {
        //     $("#weekday_text").append(weekday_text(json));
        //     $("#weekday_text_time").append(weekday_text_time(json));
        // } else {
        //     document.getElementById("weekday_text").innerHTML = ("ไม่มี")
        // }

        initMap(latitude(json), longitude(json), "map");
        // alert("myplace")

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
        // console.log(json)
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
        // console.log(json.UpdateDate)
        document.getElementById("UpdateDate").innerHTML = JSON.stringify(json.UpdateDate).slice(1, -1)

        var totalCovid = json.Data[(json.Data.length) - 1]
        document.getElementById("Confirmed").innerHTML = JSON.stringify(totalCovid.Confirmed)
        document.getElementById("Deaths").innerHTML = JSON.stringify(totalCovid.Deaths)
        document.getElementById("Recovered").innerHTML = JSON.stringify(totalCovid.Recovered)
        document.getElementById("Hospitalized").innerHTML = JSON.stringify(totalCovid.Hospitalized)

    })


function mysearch() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    keyword = urlParams.get('keyword');
    // categories = urlParams.get('category');
    console.log("-222222222222222222-")
    $.getJSON("https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=" + keyword + "&categories=ATTRACTION&numberOfResult=100", function (json) {
        // +"&categories="+categories
        // alert("mysearch")
        // console.log(json.result[0].place_id)

        // var t_search =Array;
        // for (let i = 0; i < json.result.length; i++) {

        //     if(json.result[i].thumbnail_url != empty()){
        //         // t_search+=("'"+ json.result[i].place_id+"'"+",")
        //         t_search+= json.result[i].place_id

        //     }

        // }
        // console.log(t_search)

        var count = 0;
        console.log(json.result.length)
        for (let k = 0; k < (json.result.length); k++) {

            try {
                if (json.result[k].thumbnail_url != empty()) {

                    // document.getElementById("searchplace_name" + (count + 1)).innerHTML = JSON.stringify( json.result[k].place_name).slice(1, -1)
                    document.getElementById("searchplace_name" + (count + 1)).innerHTML = JSON.stringify('<a href=content?type=' + json.result[k].category_code + '&id=' + json.result[k].place_id + '>' + json.result[k].place_name + '</a>').slice(1, -1)
                    $("#searchimg" + (count + 1)).attr("src", JSON.stringify(json.result[k].thumbnail_url).slice(1, -1));
                    try {
                        document.getElementById("searchdes" + (count + 1)).innerHTML = JSON.stringify(json.result[k].destination).slice(1, -1)

                    } catch {}
                    count++;
                    if (count == 6) {
                        continue;
                    }
                }
            } catch {

            }




        }

        // document.getElementById("searchplace_name1").innerHTML=JSON.stringify(json.result[41].place_name).slice(1, -1)
        // try {
        //     $("#searchimg1").attr("src", JSON.stringify(json.result[41].thumbnail_url).slice(1, -1));
        // } catch {}
        // try{
        //     document.getElementById("searchintro1").innerHTML = JSON.stringify(json.result[41].place_information.detail).slice(1, -1)

        // }catch{}

    });

}