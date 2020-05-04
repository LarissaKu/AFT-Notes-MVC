//import getInstance from the controller.js
import {getInstance as Controller} from "./controller.js";
console.log("main.js");
window.controller = Controller();

$(document).ready(function () {
    //create a new note, after enabling the editoral view,
    //with clicking on the addNote Button
    $(".addNote").on("click", function (e) {
        $(".edit-field").removeClass("d-none");
        $(".edit-field").addClass("d-block");
        $(".card").addClass("d-none");
    });

    //close editorial view and load overview
    //with clicking on the createNote Button
    $(".createNote").on("click", function(e) {
        $(".edit-field").removeClass("d-block");
        $(".edit-field").addClass("d-none");
        $(".card").removeClass("d-none");
    });

    //edit a note, after enabling the editoral view,
    //with clicking on the edit Icon
    $(".editIcon").on("click", function (e) {
        $(".update-field").removeClass("d-none");
        $(".update-field").addClass("d-block");
        $(".card").addClass("d-none");
    });

    //close editorial view and load overview
    //with clicking on the updateNote Button
    $(".updateNote").on("click", function(e){
        $(".update-field").removeClass("d-block");
        $(".update-field").addClass("d-none");
        $(".card").removeClass("d-none");
    });

    //close editorial view and load overview
    //with clicking on the nav-home Button
    $("#nav-home").on("click", function (e) {
        $(".edit-field").removeClass("d-block");
        $(".edit-field").addClass("d-none");
        $(".update-field").removeClass("d-block");
        $(".update-field").addClass("d-none");
        $(".card").removeClass("d-none");
    });
});
