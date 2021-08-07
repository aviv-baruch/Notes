let localStorageData = Object.entries(localStorage)
localStorageData.sort()
if (refreshed == true && localStorage.length > 0) {
    for (let objects of localStorageData) {
        let singleNote = JSON.parse(objects[1])
        console.log(singleNote)
        const note = new Note()
        note.id = singleNote.id
        note.message = singleNote.message
        note.date = singleNote.date
        notesList.push(note)
        note.generateExistingFormsList(note.id)
        if (note.id >= generalID) {
            generalID = (note.id + 1)
        }
        console.log(generalID)
    }
    console.log(localStorageData)
}
