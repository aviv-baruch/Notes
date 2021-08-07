let isNoteBeingCreated = false
let notesList = []
let addNewSection = document.querySelector("#newNoteScreen")
let editNewSection = document.querySelector("#editNoteScreen")
let refreshed = true

let cancelState = "add"
let generalID = 0 //generalID count
class Note {
    constructor(message, id) {
        this.message = message
        this.date = this.setDateAndTime()
        this.id = id
    }
    generateNewNote() {
        refreshed = true
        this.id = generalID
        hideAllNotes()
        cancelState = "add"
        addNewSection.classList.replace("hideSection", "showSection")
        isNoteBeingCreated = true
        return this.id
    }

    submittedNote() {
        isNoteBeingCreated = false
        addNewSection.classList.replace("showSection", "hideSection")
        generalID++ //INCREMENT general ID counter
        notesList[notesList.length - 1].generateExistingFormsList(this.id) //call GEFL in order to generate a new
        //visual note
        window.localStorage.setItem(this.id, JSON.stringify(this));
        Object.entries(localStorage)
        showAllNotes()
    }

    generateExistingFormsList(noteID) {
        let onDocumentNoteList = document.querySelector("#notesList") //select container
        let div = document.createElement("div") //generate main card div
        div.setAttribute("data-id", noteID)
        div.setAttribute("style", "width: 18rem;")
        div.classList.add("card")

        let innerDiv = document.createElement("div") //generate inner card body div 
        innerDiv.classList.add("card-body")

        let paragraph = document.createElement("p")
        paragraph.innerText = notesList[notesList.length - 1].message
        paragraph.classList.add("card-text")

        let date = document.createElement("h6")
        date.innerText = notesList[notesList.length - 1].date
        date.classList.add("card-subtitle", "mb-2", "text-muted")

        let edit = document.createElement("button")
        edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
</svg>`
        edit.classList.add("btn", "btn-secondary")
        edit.setAttribute("data-id", noteID)
        edit.setAttribute("data-action", "edit")

        let remove = document.createElement("button")
        remove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>`
        remove.classList.add("btn", "btn-secondary")
        remove.setAttribute("data-id", noteID)
        remove.setAttribute("data-action", "remove")
        onDocumentNoteList.append(div)
        div.append(innerDiv)
        innerDiv.append(date, paragraph, edit, remove)
        // console.log(this)
    }

    editNote(note) {
        cancelState = "edit"
        hideAllNotes()
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
                addNote.classList.remove("disabled")
                window.localStorage.setItem(note.id, JSON.stringify(note));
                showAllNotes()
            })
        }

    }

    removeNote(note) {
        let p = document.querySelector(`[data-id ="${note.id}"]`)
        p.remove()
        let findNoteLocation = notesList.indexOf(note)
        window.localStorage.removeItem(note.id);
        notesList.splice(findNoteLocation, 1)
        console.log(Object.entries(localStorage))
    }

    setDateAndTime() { //generates time and date
        let today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const dateTime = date + ' ' + time
        return dateTime
    }
}

let addNote = document.querySelector("#addNew")
addNote.addEventListener("click", function (e) { //creates a new note when required
    if (isNoteBeingCreated === false) { //checks if there isn't new note already being created
        addNote.classList.add("disabled")
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
        addNote.classList.remove("disabled")
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
            addNote.classList.add("disabled")
            findNoteInArray.editNote(findNoteInArray)

        }
    }
})

let cancel = document.querySelectorAll(".cancel")
cancel[0].addEventListener('click', function (e) {
    cancelWindow(cancelState)
})

cancel[1].addEventListener('click', function (e) {
    cancelWindow(cancelState)
})

let cancelWindow = (type) => {
    if (type == "add") {
        isNoteBeingCreated = false
        addNewSection.classList.replace("showSection", "hideSection")
        addNote.classList.remove("disabled")
        showAllNotes()
        notesList.pop()
    }
    if (type == "edit") {
        editNewSection.classList.replace("showSection", "hideSection")
        addNote.classList.remove("disabled")
        showAllNotes()
    }
}

let hideAllNotes = () => {
    let findAll = document.querySelectorAll(".card")
    for (let card of findAll) {
        card.classList.remove("show")
        card.classList.add("hideSection")
    }
}

let showAllNotes = () => {
    let findAll = document.querySelectorAll(".card")
    for (let card of findAll) {
        card.classList.remove("hideSection")
        card.classList.add("show")
    }
}




