import {getInstance as Model} from "./model.js";

let view;

let printNote = Symbol();
let printTag = Symbol();
let printTagEditNote = Symbol();
let printContact = Symbol();
//let printContactNewNote = Symbol();
let printContactEditField = Symbol();
let sortByTitle = Symbol();
let sortByDate = Symbol();
let sortByPrio = Symbol();
let contactList = Model().contactList;
let noteList = Model().noteList;
let tagList = Model().tagList;


console.log(contactList);
console.log("contacts done");
console.log(tagList);
console.log("tags done");
console.log(noteList);

class View {

    constructor(){
    }

    //-----------------------------notes--------------------------------------
    //links to private method
    addNote(note){
        this[printNote](note, note.parent);
        console.log(note + "Das ist meine Note");
    }

    //-----------------------------tags--------------------------------------
    //links to private method
    addTag(tag){
        this[printTag](tag);
    }

    //links to private method
    printTagNewNote(tag){
        this[printTag](tag);
    }

    //links to private method
    printTagEditNote(param){
        this[printTagEditNote](param, param.parent);
    }

    //-----------------------------contacts--------------------------------------
    //links to private method
    addContact(contact){
        this[printContact](contact);
    }

    //links to private method
    printContact(contact){
        this[printContact](contact);
    }

    /*
    printContactNewNote(param) {
        this[printContactNewNote](param.contact,param.parent);
    }
*/
    //links to private method
    printContactEditField(param){
        this[printContactEditField](param.contact, param.parent);
    }

    //-----------------------------private methods--------------------------------------
    //prints out the notes on the homescreen
    [printNote](note, parent) {
        let notei = $(`
            <!---Card--->
            <div class="row-1 card col-sm-3">
                <div class="card-body card${note.id}" id="card${note.id}">
                    <h5 class="card-title">${note.cardTitle}</h5>
                    <div>
                        <div class="edit d-inline-block editIcon"></div>
                        <div class="badge" id="badge${note.id}">${note.badge}</div>
                    </div>
                    <!--max 70char-->
                    <p class="card-text">${note.cardBody}</p>
                    <!--Date-->
                    <div class="card-text">
                        <p><small class="text-muted">${note.date}</small></p>
                    <!--Tags-->
                        <div class="mt-1" id="TagNote${note.id}"></div>
                    </div>    
                    <!--icons-->
                    <div class="footer mt-auto text-right">
                                            <!--Contacts-->
                        <i class="fas fa-users contactIcon"></i>
                        <div class="mt-1" id="ContactNote${note.id}"></div>
                        <i class="fas fa-archive"></i>
                        <i class="fas fa-trash trashIcon" id="deleteTag${note.id}"></i>
                    </div>
                </div>
            </div>
        `);
        $(".cardsRow1").append(notei);

        //checking what was entered as priority (badge) and adding the
        //right class onto the item, to have the right design
        if (note.badge === "Niedrig") {
            $(`#badge${note.id}`).addClass("badge-info");
            $(`.card${note.id}`).addClass("low");
        } else if (note.badge === "Normal") {
            $(`#badge${note.id}`).addClass("badge-warning");
            $(`.card${note.id}`).addClass("normal");
        } else if (note.badge === "Hoch") {
            $(`#badge${note.id}`).addClass("badge-danger");
            $(`.card${note.id}`).addClass("high");
        }

        //iterating through the tags and appending them onto the card
        for (let tagi of note.tag) {
            let tag = $(`<small class="text-muted allTags">
                            <a href="#" class="card-link col-4 tagi" id="${tagi.id}">${tagi.tagName}</a></small>`);
            $(`#TagNote${note.id}`).append(tag);
        }

        //iterate trough the contacts and appending them onto the card
        for(let contacti of note.contact){
            let contact = $(`<small class="text-muted allContacts">
                            <a href="#" class="card-link col-4" id="${contacti.id}">
                                ${contacti.contactAddress}</a></small>`);
            $(`#ContactNote${note.id}`).append(contact);
        }
    }


    //-----------------------------contacts--------------------------------------
    //prints the contacts onto the addNote page
    [printContact](contact){
        let contacti = $(`<div class="mt-1 form-check d-inline-block">
                            <!--Contacts-->
                            <span id="Contact_${contact.id}">
                            <small class="text-muted allContacts">
                                <input class="form-check-input form-control-sm" 
                                id="ContactAll_${contact.id}" type="checkbox" value="">
                                    ${contact.contactAddress}
                                </input>
                            </small></span></div>`);
        $(`.contact-list`).append(contacti);
    }

    /*
    [printContactNewNote](contact, parent){
        // $("#Contact_" + contact.id).remove();
        let contacti = $(`<div class="mt-1 form-check d-inline-block">
                                <!--Contacts-->
                                <input class="form-check-input form-control-sm" 
                                id="ContactAll_${contact.id}" type="checkbox" value="">
                                <span id="Contact_${contact.id}_new">
                                <small class="text-muted allContacts">${contact.contactAddress}
                                 </small></span></input></div>`);
        $(parent).append(contacti);
    }*/

    //prints out the tags on the edit note field
    //does not work
    [printContactEditField](contact, parent){
        //$("#Contact_" + contact.id).remove();
        let contacti = $(`<div class="mt-1 form-check d-inline-block">
                            <!--Contacts-->
                            <input class="form-check-input form-control-sm" id="ContactAllEdit_${contact.id}"
                            type="checkbox" value="">
                            <span id="Contact_${contact.id}">
                            <small class="text-muted allContacts">${contact.contactAddress}
                             </small></span></input></div>`);
        $(parent).append(contacti);
    }
    //-----------------------------tags--------------------------------------
    //prints out the tags on the addNote field
    [printTag](tag){
        let tagi = $(`<div class=" mt-1 form-check d-inline-block">
                        <!--Tags-->
                        <span id="Tag_${tag.id}">
                        <small class="text-muted allTags">
                            <input class="card-link col-4" id="TagAll_${tag.id}" 
                            type="checkbox" value="">${tag.tagName}</input>
                        </small></span></div>`);
        $(`.tags-list`).append(tagi);
    }

    //prints out the tags on the edit note field
    //does not work
    [printTagEditNote](tag,parent){
        let tagi = $(`<div class=" mt-1 form-check d-inline-block">
                        <!--Tags-->
                        <span id="Tag_${tag.id}">
                        <small class="text-muted allTags">
                            <input class="card-link col-4" id="TagAllEdit_${tag.id}" 
                            type="checkbox" value="">${tag.tagName}</input>
                        </small></span></div>`);
        $(parent).append(tagi);
    }

    /* Sorts the notes list by title and prints it out
    * does yet not work completely*/
    [sortByTitle](notes) {
        console.log("ich sortiere nach Titel");
        notes.sort((a,b)=>{
            let an = a.cardTitle.toLowerCase();
            let bn = b.cardTitle.toLowerCase();
            return  (an > bn) ? 1 : -1;
        });
    }

    /* Sorts the notes list by date and prints it out
    * does yet not work */
    [sortByDate](notes) {
        notes.sort((a,b)=>{
            let an = new Date(a.getAttribute('date'));
            let bn = new Date(b.getAttribute('data'));

            return (an < bn) ? 1 : -1;
        });
    }

    /* Sorts the notes list by priority and prints it out
    * does yet not work */
    [sortByPrio](notes) {
        notes.sort((a,b)=>{
            let an = a.getAttribute('prio');
            let bn = b.getAttribute('prio');

            return (an > bn) ? 1 : -1;
        });
    }
}

//singleton function - no one has access to create more classes from the outside
export function getInstance() {
    if(!view){
        view = new View();
    }
    return view;
}