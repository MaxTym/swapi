function get_characters() {
    play()
    $("#info").html("")
    $("#info").append("<tr><td> Characters: <br><br>")
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
    $("#info").append("<tr><td> Films: <br><br>")
    var $table = $("<p>")
    $.ajax('http://swapi.co/api/films/').done(function (stuff){
    var films = stuff.results
        for (var i = 0; i < films.length; i++){
            $table.html($table.html() + films[i]['title'] + "<br>")
            $('#info').append($table)
        }
    })
}


function get_vehicles() {
    play()
    $("#info").html("")
    $("#info").append("<tr><td> Vehicles: <br><br>")
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


function search_by_name(){
    var name = $('#search_name').val()
    $("#info").html("")
    var $table = $("<table>")
    for (var j = 1; j < 10; j++){
        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
        var people = stuff.results
        for (var i = 0; i < people.length; i++){
            if (people[i]["name"] == name) {
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


function search_by_episode(){
    var episode = $("#episode").val()
    $("#info").html("")
    var $table = $("<table>")
    $.ajax('http://swapi.co/api/films/').done(function (stuff){
        var films = stuff.results
        for (var i = 0; i < films.length; i++){
            if (films[i]["episode_id"] == episode){
                topActorsForFilm(films[i]['characters'])
                $table.html($table.html() + films[i]['title'] + "<br>"
                                          + "Release Date: " + films[i]['release_date'] + "<br>"
                                          + "Director: " + films[i]['director'] + "<br>"
                                          + "Producer(s): " + films[i]['producer'] + "<br>"
                                          +  "Actors: <span id='actors'></span><br>"
                                          + "and others...<br>")
                $('#info').append($table)
            }
        }
    })
}


function search_by_vehicle(){
    var vehicle = $("#dropDownVehicles").val()
    $("#info").html("")
    var $table = $("<table>")
    for (var j = 1; j < 5; j++){
        $.ajax('http://swapi.co/api/vehicles?page=' +j).done(function (stuff){
            var veh = stuff.results
            for (var i = 0; i < veh.length; i++){
                if (veh[i]["name"] == vehicle){
                    $table.html($table.html() + veh[i]['name'] + "<br>"
                                              + "Model: " + veh[i]['model'] + "<br>"
                                              + "Manufacturer: " + veh[i]['manufacturer'] + "<br>"
                                              + "Cost: " + veh[i]['cost_in_credits'] + "<br>"
                                              + "Length: " + veh[i]['length'] + "<br>"
                                              + "max atmosphering speed: " + veh[i]['max_atmosphering_speed'] + "<br>"
                                              + "Crew: " + veh[i]['crew'] + "<br>"
                                              + "Passengers: " + veh[i]['passengers'] + "<br>"
                                              + "Cargo capacity: " + veh[i]['cargo_capacity'] + "<br>"
                                              + "Consumables: " + veh[i]['consumables'] + "<br>"
                                              + "Vehicle class: " + veh[i]['vehicle_class'] + "<br>")
                    $('#info').append($table)
                }
            }
        })
    }
}


function topActorsForFilm(actors){
    console.log("here")
    for (var j = 0; j < 3; j++){
        jQuery.ajax(actors[j]).done(function(results){
            console.log(results['name'])
            $('#actors').html($('#actors').html()+ '<br>' + results['name'])
        })
    }
}


function list_of_films(url) {
    for (var j = 0; j < url.length; j++){
        jQuery.ajax(url[j]).done(function(results){
            $('#films').html($('#films').html()+ '<br>' + results['title'])
        })
    }
}


function homeworldbyId(url){
   jQuery.ajax(url).done(function(results){
       $('#homeworld').html(results['name'])
   })
}


function get_species(url){
    jQuery.ajax(url[0]).done(function(results){
        $('#species').html($('#species').html() + results['name'] + "<br>")
    })
}


function get_vehicles_for_character(url){
    if (url.length > 0){
        for (var j = 0; j < url.length; j++){
            jQuery.ajax(array[j]).done(function(results){
            $('#vehicles').html($('#vehicles').html() + results['name'] + "<br>")
            })
        }
    }
    else {
        $('#vehicles').html($('#vehicles').html() + "None" + "<br>")
    }
}


function get_starships_for_character(url){
    if (url.length > 0){
        for (var j = 0; j < url.length; j++){
            jQuery.ajax(url[j]).done(function(results){
                $('#starships').html($('#starships').html() + results['name'] + "<br>")
            })
        }
    }
    else {
        console.log("no starships")
        $('#starships').append("None")
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


function dropDownVehicles(){
    for (var j = 1; j < 5; j++){
        $.ajax('http://swapi.co/api/vehicles?page=' +j).done(function (stuff){
        var vehicle = stuff.results
        for (var i = 0; i < vehicle.length; i++){
            console.log(vehicle.length)
            $("#dropDownVehicles").append("<option>" + vehicle[i]['name'] + "</option>");
            }
        })
    }
}


$("#dropDownVehicles").click(dropDownVehicles)
$("#search_by_vehicle").click(search_by_vehicle)
$("#mute").click(mute)
$("#play").click(play)
$("#allCharactersButton").click(get_characters)
$("#allFilmsButton").click(get_films)
$("#allVehiclesButton").click(get_vehicles)
$("#search_by_name").click(search_by_name)
$("#search_by_episode").click(search_by_episode)
