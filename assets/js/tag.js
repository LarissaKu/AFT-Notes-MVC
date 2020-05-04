export default class Tag {

    /* Constructor for a tag
    @input: id, tag
 */
    constructor({id, tagName}) {
        this.id = id;
        this.tagName = tagName;
        this.notes = [];
        console.log("Tag constructor");
    }

    addToNote(note) {
        this.notes.push(note);
    }

    /* This method deletes a selected note from the note array
    @input: note (which should be deleted)
 */
    deleteNote(note) {
        this.notes = this.notes.filter(item => item !== note);
    }

    tagIsChecked(tagId){
        return tagId ? 'input:checkbox:checked':"";
    }
}