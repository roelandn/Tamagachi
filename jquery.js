$(document).ready(function() {
    $("#continue-button").click(function() {
        $("#game-screen").show();
        $("#loading-screen").hide();
    });
});

function loadingBar() {
    $("#loading-bar-container").hide();
    $("#continue-button").show();
    $("#game-screen").show();
    $("#loading-screen").hide();
}