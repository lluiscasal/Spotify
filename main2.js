$(function () {
    var artistsAdded = [];
    $("#name").keyup(searchArtist);

    function searchArtist() {
        var name = $("#name").val();
        var spotifyApi = "https://api.spotify.com/v1/search?query=" + name + "&type=artist";
        $.getJSON(spotifyApi, function (data) {
            crearTabla(data);
        });
    }

    function crearTabla(data) {
        $("#body").empty();
        var artists = data.artists.items;
        $.each(artists, function (key, value) {
            var row = document.createElement("tr");
            if (value.images[0] != undefined) {
                var url = value.images[0].url;
            }
            else {
                var url = "https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/forbidden-128.png"
            }
            row.insertCell().innerHTML = "<img src='" + url + "'>";
            row.insertCell().innerHTML = value.name;
            row.insertCell().innerHTML = value.popularity;
            row.insertCell().innerHTML = "<button data-key='" + key + "' class= ' addButton btn btn-info'>Add to my list</button>"
            $("#body").append(row);
        });
        $(".addButton").click(function () {
            var dataKeyValue = $(this).attr("data-key");
            var artist = artists[dataKeyValue];
            addArtist(artist);
        });
    }

    function addArtist(artist) {
        var row = document.createElement("tr");
        if (artist.images[0] != undefined) {
            var url = artist.images[0].url;
        }
        else {
            var url = "https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/forbidden-128.png"
        }
        row.insertCell().innerHTML = "<img src='" + url + "'>";
        row.insertCell().innerHTML = artist.name;
        $("#body2").append(row);
    }
});