let isNoteBeingCreated = false
let notesList = []
let section = document.querySelector("#newNoteScreen")
class Note {

    constructor(message, id) {
        this.message = message
        this.date = this.setDateAndTime()
        this.id = id
    }
    generateNewNote() {
        section.classList.replace("hideSection", "showSection")
        // section.classList.add("showSection")
        return isNoteBeingCreated = true
    }
    submittedNote() {
        isNoteBeingCreated = false
        section.classList.replace("showSection", "hideSection")
        notesList[notesList.length - 1].id = notesList.length
    }
    setDateAndTime() { //generates time and date
        let today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const dateTime = date + ' ' + time
        return dateTime
    }
}

let addNote = document.querySelector("#addNew").addEventListener("click", function (e) { //creates a new note when required
    if (isNoteBeingCreated === false) { //checks if there isn't new note already being created
        const note = new Note() //creates a new Note element
        isNoteBeingCreated = note.generateNewNote()
        notesList.push(note)
    }
})

let createNewNote = document.querySelector("#addNote").addEventListener('click', function (e) { //get the data of the new note
    console.log(`i've clicked the submit button, message is: ${document.querySelector("#noteData").value}`)
    if (e.target && e.target.id == 'addNote') { //searchs for the newButton id
        notesList[notesList.length - 1].message = document.querySelector("#noteData").value
        document.querySelector("#noteData").value = ""
        notesList[notesList.length - 1].submittedNote()
        console.log(`is being created status is: ${isNoteBeingCreated}`)
        console.log(`current notes are: ${notesList}`)
    }
});






