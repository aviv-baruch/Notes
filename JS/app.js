let isNoteBeingCreated = false
let notesList = []
class Note {
    constructor(message, id) {
        this.message = message
        this.date = this.setDateAndTime()
        this.id = id
    }
    generateNewNote() {
        const form = document.querySelector("#newNoteCreator");
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "noteMessage");
        const submit = document.createElement("button")
        submit.setAttribute("type", "button");
        submit.setAttribute("id", "newButton")
        submit.innerHTML = "Submit"
        form.append(input)
        submit.classList.add("button")
        form.append(submit)
        return isNoteBeingCreated = true
    }
    submittedNote() {
        document.querySelector("#newButton").remove()
        document.querySelector("#noteMessage").remove()
        isNoteBeingCreated = false
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

let findNewNote = document.addEventListener('click', function (e) { //get the data of the new note
    if (e.target && e.target.id == 'newButton') { //searchs for the newButton id
        console.log(e.target)
        console.log(e.target.id)
        notesList[notesList.length - 1].message = document.querySelector("#noteMessage").value
        document.querySelector("#noteMessage").value = ""
        notesList[notesList.length - 1].submittedNote()
    }
});






