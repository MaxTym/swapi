function get_characters() {
    play()
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 10; j++){
        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
        var people = stuff.results
        for (var i = 0; i < people.length; i++){
            $table.html($table.html() + "<tr><td>" + people[i]['name'] + "<br>")
            $('#info').append($table)
            }
        })
    }
}


function get_films() {
    play()
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 2; j++){
        $.ajax('http://swapi.co/api/films?page=' +j).done(function (stuff){
        var films = stuff.results
        console.log(films)
        for (var i = 0; i < films.length; i++){
            $table.html($table.html() + films[i]['title'] + "<br>")
            $('#info').append($table)
            }
        })
    }
}


function get_vehicles() {
    play()
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 5; j++){
        $.ajax('http://swapi.co/api/vehicles?page=' +j).done(function (stuff){
        var vehicle = stuff.results
        console.log(vehicle)
        for (var i = 0; i < vehicle.length; i++){
            $table.html($table.html() + vehicle[i]['name'] + "<br>")
            $('#info').append($table)
            }
        })
    }
}


function search_by_name(search_name){
    var name = document.getElementById('search_name').value
    $("#info").html("")
    var $table = $("<table>")
    for (var j = 1; j < 10; j++){
        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
        var people = stuff.results
        for (var i = 0; i < people.length; i++){
            if (people[i]["name"] === name) {
                homeworldbyId(people[i]['homeworld'])
                list_of_films(people[i]['films'])
                console.log(people)
                get_species(people[i]['species'])
                get_vehicles_for_character(people[i]['vehicles'])
                get_starships_for_character(people[i]['starships'])
                $table.html($table.html() + people[i]['name'] + "<br>"
                                          + "Eye color: " + people[i]['eye_color'] + "<br>"
                                          + "Gender: " + people[i]['gender'] + "<br>"
                                          + "Skin Color: " + people[i]['skin_color'] + "<br>"
                                          +  "Homeworld: <span id='homeworld'></span> <br>"
                                          +  "Films: <span id='films'></span> <br>"
                                          +  "Species: <span id='species'></span> <br>"
                                          +  "Vehicles: <span id='vehicles'></span> <br>"
                                          +  "Starships: <span id='starships'></span> <br>")
                $('#info').append($table)
            }
            }
        })
    }
}


function list_of_films(url) {
    var array = url
    for (var j = 1; j < 7; j++){
        jQuery.ajax(array[j]).done(function(results){
        $('#films').html($('#films').html() + results['title'] + "<br>")
    })
    }
}

function homeworldbyId(url){
   var address = url
   jQuery.ajax(address).done(function(results){
       $('#homeworld').html(results['name'])
   })

}


function get_species(url){
    var array = url
    for (var j = 0; j < 7; j++){
        jQuery.ajax(array[j]).done(function(results){
        $('#species').html($('#species').html() + results['name'] + "<br>")
    })
    }
}


function get_vehicles_for_character(url){
    var array = url
    for (var j = 0; j < 7; j++){
        jQuery.ajax(array[j]).done(function(results){
        $('#vehicles').html($('#vehicles').html() + results['name'] + "<br>")
    })
    }
}

function get_starships_for_character(url){
    console.log("here")
    var array = url
    for (var j = 0; j < 7; j++){
        jQuery.ajax(array[j]).done(function(results){
        $('#starships').html($('#starships').html() + results['name'] + "<br>")
    })
    }
}


function play(){
       var audio = document.getElementById("audio");
       audio.play();
}

function mute(){
    var audio = document.getElementById('audio');
    document.getElementById('mute').addEventListener('click', function (e)
    {
        e = e || window.event;
        audio.muted = !audio.muted;
        e.preventDefault();
    }, false);
}

$("#mute").click(mute)
$("#play").click(play)
$("#allCharactersButton").click(get_characters)
$("#allFilmsButton").click(get_films)
$("#allVehiclesButton").click(get_vehicles)
$("#search_by_name").click(search_by_name)
