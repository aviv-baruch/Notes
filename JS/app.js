let isNoteBeingCreated = false
let notesList = []
let addNewSection = document.querySelector("#newNoteScreen")
let editNewSection = document.querySelector("#editNoteScreen")
let generalID = 0 //generalID count
class Note {
    constructor(message, id) {
        this.message = message
        this.date = this.setDateAndTime()
        this.id = id
    }
    generateNewNote() {
        this.id = generalID
        addNewSection.classList.replace("hideSection", "showSection")
        isNoteBeingCreated = true
        console.log(`this is the set ID ${this.id}`)
        console.log(`this is the generalID Counter ${generalID}`)
        return this.id
    }

    submittedNote() {
        isNoteBeingCreated = false
        addNewSection.classList.replace("showSection", "hideSection")
        generalID++ //INCREMENT general ID counter
        notesList[notesList.length - 1].generateExistingFormsList(this.id) //call GEFL in order to generate a new
        //visual note
    }

    generateExistingFormsList(noteID) {
        let onDocumentNoteList = document.querySelector("#notesList")
        let span = document.createElement("div")
        span.setAttribute("data-id", noteID)
        let paragraph = document.createElement("p")
        paragraph.innerText = notesList[notesList.length - 1].message
        let date = document.createElement("p")
        date.innerText = notesList[notesList.length - 1].date
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
        console.log(this)
    }

    editNote(note) {
        let input = document.querySelector("#editedNoteData")
        input.value = this.message
        popUpScreen()
        function popUpScreen() {
            let changeNote = document.querySelector("#editNoteButton")
            editNewSection.classList.replace("hideSection", "showSection")
            changeNote.addEventListener('click', function (e) {
                note.message = document.querySelector("#editedNoteData").value
                let p = document.querySelector(`[data-id ="${note.id}"]`).querySelector("p")
                p.innerText = note.message
                editNewSection.classList.replace("showSection", "hideSection")
            })
        }
    }

    removeNote(note) {
        let p = document.querySelector(`[data-id ="${note.id}"]`)
        p.remove()
        let findNoteLocation = notesList.indexOf(note)
        notesList.splice(findNoteLocation, 1)
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
        note.generateNewNote()
        notesList.push(note)
    }
})

let createNewNote = document.querySelector("#newNoteCreator").addEventListener('click', function (e) { //get the data of the new note
    if (e.target && e.target.id === 'addNote') { //searchs for the newButton id
        notesList[notesList.length - 1].message = document.querySelector("#noteData").value
        document.querySelector("#noteData").value = ""
        notesList[notesList.length - 1].submittedNote()
    }
})

let findNote = document.querySelector("#notesList")
findNote.addEventListener('click', function (e) { //allows editing and removing of a note
    if (e.target.dataset.id != undefined) {
        if (e.target.dataset.action === "remove") {
            let findNoteInArray = notesList.find(x => x.id == (e.target.dataset.id).toString())
            findNoteInArray.removeNote(findNoteInArray)
        }
        if (e.target.dataset.action === "edit") {
            let findNoteInArray = notesList.find(x => x.id == (e.target.dataset.id).toString())
            findNoteInArray.editNote(findNoteInArray)
        }
    }
})





