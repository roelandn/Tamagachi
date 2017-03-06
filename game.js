/*
Title: Tamagachi
Author: Roeland Neugarten
Version: 0.1
*/
var happiness = 0;
var hunger = 0;
var cum = 0;
var passed_time = 0;
var cooldown_timer = 0;
var cooldown_counter = 0;
var loading = 0;

var artist_name = "";
var artist_name_element = "";
var artist_pic_path = "";
var artist_pic = "";

var hunger_bar = "";
var happiness_bar = "";
var cum_bar = "";
var cooldown_bar = "";
var loading_bar = "";

var saved = false;
var cooldown = false;

const statTimeReduction = 5 * Math.pow(10,-6);

window.addEventListener("load", function() {
    artist_pic = document.getElementById("artist_pic");
    artist_name_element = document.getElementById("artist_name")

    hunger_bar = document.getElementById("hunger_bar");
    happiness_bar = document.getElementById("happiness_bar");
    cum_bar = document.getElementById("cum_bar");
    cooldown_bar = document.getElementById("cooldown_bar");
    loading_bar = document.getElementById("loading_bar");

//Check for saved data
    if(localStorage.saved !== undefined) {
        //Load saved data
        saved = true;
        artist_name = localStorage.artist_name;
        artist_pic_path = localStorage.artist_pic_path;

        passed_time = Date.now() - parseInt(localStorage.saveTime);

        happiness = Math.floor(parseInt(localStorage.happiness) - passed_time * statTimeReduction);
        hunger = Math.floor(parseInt(localStorage.hunger) - passed_time * statTimeReduction);
        cum = Math.floor(parseInt(localStorage.cum) - passed_time * statTimeReduction);

    } else {
        //Generate a new Tamagachi
        switch(Math.floor(Math.random()* 3)) {
            case 0:
                artist_name = "Van Darkholme";
                artist_pic_path = "assets/darkholme.jpg";
                break;
            case 1:
                artist_name = "Billy Herrington";
                artist_pic_path = "assets/billy.jpg";
                break;
            case 2:
                artist_name = "Mark Wolff";
                artist_pic_path = "assets/mark.jpg";
                break;
            default:

        }

        happiness = 70;
        hunger = 70;
        cum = 70;

    }

    artist_pic.src = artist_pic_path;
    artist_name_element.innerHTML = artist_name;

    //Doesn't do anything, shouldn't do anything.
    loading = 100;
    loading_bar.style = "width: " + loading + "%;";
    loading_bar.innerHTML = loading + "%"

    loadingBar();
    draw();

});

//Loop to keep stat bar up to date
function draw() {
    if(cooldown == false) {
        hunger_bar.style = "width: " + hunger + "%;";
        happiness_bar.style = "width: " + happiness + "%;";
        cum_bar.style = "width: " + cum + "%;";
    } else {
        //Cooldown timer should be set to 6000 for a 10 minute cooldown
        //Currently only available for debugging through the JavaScript console
        cooldown_timer--;
        cooldown_bar.style = "width: " + cooldown_timer / 60 + "%;";
        if(cooldown_timer == 0) {
            cooldown = false;
        }
    }
    setTimeout(draw, 100);
}

//Improve stats
function groom(stat) {
    if(cooldown == false) {
        if (stat == "feed" && hunger <= 98) {
            hunger += 2;
        } else if (stat == "play" && happiness <= 98) {
            happiness += 2;
        } else if (stat == "sex" && cum <= 98) {
            cum += 2;
        }
        cooldown_counter++;
    } else {
        popup("cooldown");
    }
}

function popup(messageType) {

}

//Currently only available for debugging through the JavaScript console
function save() {
    localStorage.saved = true;

    localStorage.happiness = happiness;
    localStorage.hunger = hunger;
    localStorage.cum = cum;
    localStorage.artist_name = artist_name;
    localStorage.artist_pic_path = artist_pic_path;

    localStorage.saveTime = Date.now();
}

//Currently only available for debugging through the JavaScript console
function deleteSave() {
    localStorage.removeItem("saved");
    localStorage.removeItem("happiness");
    localStorage.removeItem("cum");
    localStorage.removeItem("artist_name");
    localStorage.removeItem("artist_pic_path");
}

