export default class Note {

    /* Constructor for a note and creating the date
        the date is for when the note was created
        and not as kind of a deadline
        @input: id, cardTitle, badge, cardBody
     */
    constructor({id, cardTitle, badge, cardBody}) {
        this.id = id;
        this.cardTitle = cardTitle;
        this.badge = badge;
        this.cardBody = cardBody;
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        this.date = yyyy + '/' + mm + '/' + dd;
        this.tag = [];
        this.contact = [];
    }

    /* Constructor for a note and creating the date
        the date is for when the note was created
        and not as kind of a deadline
        @input: id, cardTitle, badge, cardBody, tag, contact
     */
    constructorNewNote({id, cardTitle, badge, cardBody, date, tag, contact}) {
        this.id = id;
        this.cardTitle = cardTitle;
        this.badge = badge;
        this.cardBody = cardBody;
        this.tag = tag;
        this.contact = contact;
        this.date = date;

    }

    //adds Tag into the tag[] from the constructor
    addTag(tag){
        this.tag.push(tag);
    }

    //adds Contact into the contact[] from the constructor
    addContact(contact){
        this.contact.push(contact);
    }

    //resets the tag[]
    deleteTag(){
        this.tag = [];
    }

    //resets the contact[]
    deleteContact(){
        this.contact = [];
    }
}