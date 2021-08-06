let isNoteBeingCreated = false
let notesList = []
let section = document.querySelector("#newNoteScreen")
let generalID = 0 //generalID count
class Note {
    constructor(message, id) {
        this.message = message
        this.date = this.setDateAndTime()
        this.id = id
    }
    generateNewNote() {
        section.classList.replace("hideSection", "showSection")
        return isNoteBeingCreated = true
    }

    submittedNote(noteID) {
        isNoteBeingCreated = false
        section.classList.replace("showSection", "hideSection")
        this.id = noteID //set the object ID similer to recieved one
        generalID++ //INCREMENT general ID counter
        notesList[this.id].generateExistingFormsList(this.id) //call GEFL in order to generate a new
        //visual note
    }

    generateExistingFormsList(noteID) {
        let onDocumentNoteList = document.querySelector("#notesList")
        let span = document.createElement("span")
        span.setAttribute("id", noteID)
        let paragraph = document.createElement("p").innerText = notesList[noteID].message
        let date = document.createElement("p").innerText = notesList[noteID].date
        let edit = document.createElement("button")
        edit.setAttribute("data-id", noteID)
        edit.setAttribute("data-action", "edit")
        edit.innerText = "edit"
        let remove = document.createElement("button")
        remove.setAttribute("data-id", noteID)
        remove.setAttribute("data-action", "remove")
        remove.innerText = "remove"
        onDocumentNoteList.append(span)
        span.append(paragraph, date, edit, remove)
    }
    editNote() {
        console.log(`i'm in!!editttttttt!, ID IS: ${this.id}`)
        let input = document.querySelector("#noteData")
        input.value = this.message
        section.classList.replace("hideSection", "showSection")



    }
    removeNote() {
        console.log(`i'm in!!removeeeeeee!!!!! , ID IS: ${this.id}`)
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
        console.log(isNoteBeingCreated)
        console.log(notesList)
    }
})

let createNewNote = document.querySelector("#newNoteCreator").addEventListener('click', function (e) { //get the data of the new note
    if (e.target && e.target.id === 'addNote') { //searchs for the newButton id
        notesList[generalID].message = document.querySelector("#noteData").value
        document.querySelector("#noteData").value = ""
        notesList[generalID].submittedNote(generalID)
    }
})

let findNote = document.querySelector("#notesList").addEventListener('click', function (e) {
    if (e.target.dataset.id != undefined) {
        if (e.target.dataset.action === "remove") {
            console.log("remove!")
            let findNoteInArray = notesList.find(x => x.id == (e.target.dataset.id).toString())
            findNoteInArray.removeNote()
        }
        if (e.target.dataset.action === "edit") {
            console.log("edit!")
            let findNoteInArray = notesList.find(x => x.id == (e.target.dataset.id).toString())
            findNoteInArray.editNote()
        }

    }

})






