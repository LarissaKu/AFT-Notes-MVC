import Subject from "./subject.js";
import Note from "./note.js";
import Contact from "./contact.js";
import Tag from "./tag.js";

let noteModel;

let loadFromJSON = Symbol();

class NoteModel extends Subject {
    constructor() {
        super();
        this.noteList = new Map();
        this.contactList = new Map();
        this.tagList = new Map();
        this[loadFromJSON]();
        console.log("Model constructor");
    }

    //---------------notes---------------------------
    //adds note to notelist and ++notesIdCounter
    addNote(note){
        this.noteList.set(Number(note.id), note);
        NoteModel.notesIdCounter++;
        console.log(this.noteList);
    }

    //prints out the note onto the homescreen
    printNote(note, parent){
        super.notifyObservers("addNote", note);
    }

    //prints complete NoteList on the addNote panel
    printNoteList(parent){
        for(let note of this.noteList.values()) {
            super.notifyObservers("addNote", note);
        }
    }

    //get note from notelist using the id
    getNoteById(noteId){
        return this.noteList.get(Number(noteId));
    }

    //delete note from noteList using the id
    deleteNote(id){
        this.noteList.delete(Number(id));
    }

    //---------------tags---------------------------
    //adding tag to the tagList and ++the tagsIdCounter
    addTag(tag){
        this.tagList.set(Number(tag.id), tag);
        NoteModel.tagsIdCounter++;
        console.log(tag);
        console.log(this.tagList);
        console.log("tagadd");
    }

    //setting the tag with creating a Tag and adding it
    settingTag(tagName){
        let tagNew = new Tag({
            id: NoteModel.tagsIdCounter,
            tagName: tagName
        });
        this.addTag(tagNew);
    }

    //prints the complete Tag List on the addNote panel
    printTagList(){
        for(let tag of this.tagList.values()){
            super.notifyObservers("printTag", tag);
        }
    }

    //should reprint the tags when, something was added or deleted
    printTagListCorr(){
        for(let tag of this.tagList.values()){
            tag.printTags();
        }
    }

    //print the tags on the editform
    printTagEditNote(parent){
        for(let tag of this.tagList.values()){
            super.notifyObservers("printTagEditNote", tag, parent);
        }
    }

    //get a tag using its id
    getTagById(tagId){
        return this.tagList.get(Number(tagId));
    }

    //delete a tag using its id
    deleteKey(tagId){
        this.tagList.delete(Number(tagId));
    }

    //---------------contacts---------------------------
    //adding a contact to the contactList
    addContact(contact){
        this.contactList.set(contact.id, contact);
        NoteModel.contactIdCounter++;

        console.log(contact);
        console.log(this.contactList);
        console.log("contactadd");

    }

    //setting the contact with creating a Contact and adding it
    settingContact(contactAddress){
        let cNew = new Contact({
            id: NoteModel.contactIdCounter,
            contactAddress: contactAddress
        });
        this.addContact(cNew);
    }

    //print the contact
    printContact(contact){
        super.notifyObservers("printContact", contact);
    }

    //print the complete contactList
    printContactList(){
        for(let contact of this.contactList.values()){
            super.notifyObservers("printContact", contact);

        }
    }

    printContactNewNote(contact, parent){
     //   super.notifyObservers("printContactNewNote", {contact:contact, parent:parent});
    }

    //print out the contacts on the edit field
    printContactEditField(contact, parent){
        super.notifyObservers("printContactEdit", {contact:contact, parent:parent});
    }

    //get Contact using the input id and checking against the contactList
    getContactById(contactId){
        return this.contactList.get(Number(contactId));
    }

    //-------------------sort-----------------------
    //sorts by either Title, Date or Prio
    //does yet not work
    sortByTitle(notes){
        super.notifyObservers("sortByTitle", notes);
    }

    sortByDate(notes){
        super.notifyObservers("sortByDate", notes);
    }

    sortByPrio(notes){
        super.notifyObservers("sortByPrio", notes);
    }

    //create a new Note with all its input from the labels
    newNote(){
        console.log("ich gehe hier rein");
        let noteSection = $(".note-section");
        let updateField = $(".update-field");

        let idNew = Number(NoteModel.notesIdCounter);
        //NoteModel.notesIdCounter++;
        let titleNew = $(`#title`).val();
        let contentNew = $(`#content`).val();
        let badgeNew = $("#prio input[type='radio']:checked").val();
        let dateNew = new Date();
        let ddNew = String(dateNew.getDate()).padStart(2, '0');
        let mmNew = String(dateNew.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyyNew = dateNew.getFullYear();
        dateNew = yyyyNew + '/' + mmNew + '/' + ddNew;

        //check for empty input fields
        if (titleNew ==="")
            alert("Gib bitte einen Titel ein");
        if (contentNew ==="")
            alert("Gib bitte einen Text ein");

        let tagListNew =[];
        let contactListNew =[];
        let noteNew =
            {
                id:idNew,
                cardTitle: titleNew,
                badge: badgeNew,
                cardBody: contentNew,
                date: dateNew,
                tag: [],
                contact: []
            }
            console.log(noteNew);

        //Should add selected tags to tagList
        $(".tags-list").find('input:checkbox:checked').each(function()
        {
            let checkedTag = $(this).attr("id").slice(7,9);
            tagListNew.push(checkedTag);
        });

        for(let id of tagListNew){
            let t = this.getTagById(Number(id));
            noteNew.tag.push(t);
        }

        //Adds selected tags to contactList
        $(".contact-list").find('input:checkbox:checked').each(function()
        {
            let checkedContact = $(this).attr("id").slice(11,13);
            contactListNew.push(checkedContact);
        });

        //Adds selected contacts to note
        for(let id of contactListNew){
            let c = this.getContactById(Number(id));
            noteNew.contact.push(c);
        }

        this.addNote(noteNew, $("#note-list"));
        this.printNote(noteNew, noteNew.parent);
    }


    //prints all the values yet created in the original note into the
    //input field for further correction
    //does yet not show the tags, contacts and the chosen badge/difficulty
    noteEditCheck(currentTarget){
        //NoteModel.noteEdit = (currentTarget).parent().parent().parent().attr("id");
        let parentElement = (currentTarget).parent().parent();
        let titleOld = $(parentElement).find("h5").text();
        let badgeOld = $(parentElement).find("badge:first");
        let contentOld = $(parentElement).find("p:first").text();
        $(".update-field").removeClass("d-none");
        $(".note-section").addClass("d-none");

       // #prio input[type='radio']:checked"
        console.log(parentElement);

        $("#titleUpdate").attr("value",`${titleOld}`);
        $("#prioUpdate").val(badgeOld);
        $("#contentUpdate").val(`${contentOld}`);

        //Tags print
        $(".tags-Edit").empty();
        this.printTagEditNote($(".tags-Edit"));

/*
        //Contact print
        $("#contactNameUpdate").empty();
        this.printContactNewNote($("#contactNameUpdate"));
        });*/
    }

    //create a new Tag and should append it and print it,
    // but that does not work
    newTag(){
        let tagNameNew = $("#tagname").val();
        let tagNew = {
            id: NoteModel.tagsIdCounter,
                tagName: tagNameNew,
            notes: []
        }

        tagNew.notes.push(tagNameNew);
        super.notifyObservers("printTag",tagNew);

        $(".tags-Edit").empty();
        this.printTagListCorr();
    }
    removeNote(currentTarget){
        if(confirm("Willst du die Notiz wirklich löschen?"))
        {
            let tagList = [];
            let id = (currentTarget).attr("id").slice(9,10);
            console.log(id);

            //checks for note to be deleted, using id of the note
            let noteId = this.getNoteById(Number(id));
            (currentTarget).parent().parent().find(".addNote").each(function()
            {
                let tag = (currentTarget).attr("id");
                tagList.push(tag);
                console.log("tags : " + tag);
            });

            //checks for tag to be deleted, using id of the note
            for(let tag of tagList)
            {
                let tagi = this.getTagById(Number(tag));
                tagi.deleteNote(noteId);
            }
            this.deleteNote(Number(id));
            (currentTarget).parent().parent().parent().remove();
        }
    }


    //reads all the JSON input and prints it out the correct way
    [loadFromJSON]() {
        $.getJSON("./noteInput.json").then((data) => {
            console.log("JSON wird eingelesen.");
            // loading existing tags via JSON
            for (let tag of data.tags) {
                let tagNew = new Tag(tag);
                this.addTag(tagNew);
            }

            // loading existing contacts via JSON
            for (let contact of data.contact) {
                let contactNew = new Contact(contact);
                this.addContact(contactNew);
            }

            // loading existing notes via JSON
            for (let note of data.notes) {
                let noteNew = new Note(note);
                this.addNote(noteNew);

                for (let id of note.tag)  {
                    let i = this.getTagById(Number(id));
                    noteNew.addTag(i);
                    i.addToNote(noteNew);
                }
                console.log(noteNew);

                for (let id of note.contact)  {
                    let i = this.getContactById(Number(id));
                    noteNew.addContact(i);
                    console.log(i);
                    i.addContactToNote(noteNew);
                }
                console.log(noteNew);

                this.printContact(noteNew.contact);
                this.printContactEditField(noteNew.contact);
                this.printContactNewNote(noteNew.contact, noteNew.parent);

           //     super.notifyObservers("printContactNewNote", noteNew);
            }

            //print elements to specified section
            this.printNoteList($(".note-section"));
            this.printTagList($("#tagName"));
            this.printContactList($("#contactName"));
        });

    }

}

//static variables
NoteModel.notesIdCounter = 1;
NoteModel.tagsIdCounter = 1;
NoteModel.contactIdCounter = 1;
NoteModel.noteEdit = 0;



//singleton function - no one has access to create more classes from the outside
export function getInstance() {
    if (!noteModel) {
        noteModel = new NoteModel();
    }
    return noteModel;
}