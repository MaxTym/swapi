function get_characters() {
    var $table = $("<p>")
    for (var j = 1; j < 10; j++){
        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
        var people = stuff.results
        for (var i = 0; i < people.length; i++){
            $table.html($table.html() + people[i]['name'] + "<br>")
            $('#info').append($table)
            }
        })
    }
}


function get_films() {
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
    var $table = $("<p>")
    for (var j = 1; j < 10; j++){
        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
        var people = stuff.results
        for (var i = 0; i < people.length; i++){
            if (people[i]["name"] === name) {
                homeworldbyId(people[i]['homeworld'])
                list_of_films(people[i]['films'])
                console.log(people)
                get_species(people[i]['species'])
                get_vehicles(people[i]['vehicles'])
                $table.html($table.html() + people[i]['name'] + "<br>"
                                          + "Eye color: " + people[i]['eye_color'] + "<br>"
                                          + "Gender: " + people[i]['gender'] + "<br>"
                                          + "Skin Color: " + people[i]['skin_color'] + "<br>"
                                          +  "Homeworld: <span id='homeworld'></span> <br>"
                                          +  "Films: <span id='films'></span> <br>"
                                          +  "Species: <span id='species'></span> <br>"
                                          +  "Vehicles: <span id='vehicles'></span> <br>")
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
        $('#films').html($('#films').html() + results['title'] + ", ")
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
        $('#species').html($('#species').html() + results['name'])
    })
    }
}


function get_vehicles(url){
    var array = url
    for (var j = 0; j < 7; j++){
        jQuery.ajax(array[j]).done(function(results){
        console.log(results['name'])
        $('#vehicles').html($('#vehicles').html() + results['name'])
    })
    }
}


$("#allCharactersButton").click(get_characters)
$("#allFilmsButton").click(get_films)
$("#allVehiclesButton").click(get_vehicles)
$("#search_by_name").click(search_by_name)
