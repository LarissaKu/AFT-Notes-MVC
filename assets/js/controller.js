import {getInstance as Model} from "./model.js";
import {getInstance as View} from "./view.js";

let controller;

let init = Symbol();

class Controller{
    constructor(){
        this[init]();
        let model = Model();
        let view = View();
        //model subscribes to view functions
        model.subscribe("addNote", view, view.addNote);
        model.subscribe("printTag", view, view.addTag);
        model.subscribe("printTagEditNote", view, view.printTagEditNote);
        model.subscribe("printTagListEdit", view, view.printTagList);
        model.subscribe("printContact", view, view.addContact);
        model.subscribe("printContactEdit", view, view.printContactEditField);
        //model.subscribe("printContact", view, view.printContact);
        model.subscribe("printContactEditField", view, view.printContactEditField);
        model.subscribe("printContactNewNote", view, view.printContactNewNote);

        model.subscribe("sortByTitle", view, view.sortByTitle);
        model.subscribe("sortByDate", view, view.sortByDate);
        model.subscribe("sortByPrio", view, view.sortByPrio);

        /*
                model.subscribe("showEdit", view, view.showEdit);
                model.subscribe("removeEdit", view, view.removeEdit);
        */
    }
    [init](){
        $(document).on("click", ".createNote", (e)=> {
            e.preventDefault();
            Model().newNote();
        });

        //Loads the editview when clicking on the editIcon. It shows the
        // input in the fields
        $(document).on('click','.editIcon',(e)=> {
            e.preventDefault();
            Model().noteEditCheck($(e.currentTarget));
        });

        //Deletes the note when clicking on the trashIcon
        $(document).on('click','.trashIcon', (e) =>{
            e.preventDefault();
            Model().removeNote($(e.currentTarget));
        });

        //Should update the edited note with the inputs, when clicking
        // on the updateNote button.
        $(".updateNote").on("click", function(e){
            e.preventDefault();
            Model().noteEditCheck();
        });

        //When clicking on the createTag button in the editorial view,
        // adds the inserted tag to tagList
        $(document).on("click", ".createTag", (e) =>{
            Model().settingTag($("#tagName").val());
        });

        //When clicking on the deleteTag button in the editorial view,
        // should delete the selected tag from the updated tagList
        //does not work because it can't access it
        $(document).on("click", ".deleteTag", (e) =>{
            e.preventDefault();
            Model().deleteKey($(e.currentTarget));
        });

        $(document).on("click", ".createContact", (e) =>{
            Model().settingContact($("#contactName").val());
        });


        $(document).on("click", ".deleteContact", (e) =>{
            Model().deleteContact($(e.currentTarget));
        });

        $('#aToZ, #date, #dropdownMenuButton').click((e) => {
            // remove active from all buttons
            //$(e.currentTarget).parent().find('.btn').removeClass('active');

            // add active to the clicked button
            //$(e.currentTarget).addClass('active');

            // get notes, sort in DOM
            let wrapper = $('.note-section');
            let notes = wrapper.children();

            switch($(e.currentTarget).attr('id')) {
                case 'aToZ':
                    Model().sortByTitle(notes);
                    break;
                case 'date':
                    Model().sortByDate(notes);
                    break;
                case 'prio':
                    Model().sortByPrio(notes);
                    break;
                default:
                    break;
            }

            // detach (remove) and append sorted
            notes.detach().appendTo(wrapper);
        });
    }
}

//singleton function - no one has access to create more classes from the outside
export function getInstance() {
    if(!controller){
        controller = new Controller();
    }
    return controller;
}