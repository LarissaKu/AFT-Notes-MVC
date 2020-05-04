export default class Contact {

    /* Constructor for a contact
    @input: id, contactAddress*/
    constructor({id, contactAddress}){
        this.id = id;
        this.contactAddress = contactAddress;
        this.notes = [];
        console.log("Contact constructor");
    }

    //adds contact to the notes[]
    addContactToNote(contact){
        this.notes.push(contact);
    }
}