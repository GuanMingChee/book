function Book(title, author, page, read = false, id = null) {
    // the constructor...

    this.title = String(title);
    this.author = String(author);
    this.page = Number(page);
    this.read = Boolean(read);
    this.id = id || crypto.randomUUID();

    this.info = function () {
        console.log("title: ", this.title)
        console.log("author: ", this.author)
        console.log("page: ", this.page)
        console.log("read: ", this.read)
        console.log("id: ", this.id)
    }

    //addBookToLibrary(this.id,this.title, this.author, this.page, this.read);
}

function displayRecord() {
    const displayBookRecord = document.getElementById("display-book-record");
    if (displayBookRecord) {
        displayBookRecord.innerHTML = "";
        for (lib of myLibrary) {
            let row = document.createElement("tr");
            row.innerHTML = `
    <td>${lib.id}</td>
    <td>${lib.title}</td>
    <td>${lib.author}</td>
    <td>${lib.page}</td>
    <td>${lib.read ? "Finished":"Pending"}</td>
    <td><button onclick="editReadStatus('${lib.id}')">Edit Read Status</button><button onclick="deleteBookFromLibrary('${lib.id}')">Delete</button></td>
    `;
            displayBookRecord.append(row);
        }
    }
}

let myLibrary = [];
let initialLength = 0;
let afterLength = 0;

const loadmyLibrary = localStorage.getItem("myLibrary");

if (loadmyLibrary) {
    let rawData = JSON.parse(loadmyLibrary);

    myLibrary = rawData.map(book => new Book(book.title, book.author, book.page, book.read, book.id));

    displayRecord();
}

function displayMsg(msg, sf) {
    let displayMsg = document.getElementById("displayMsg");
    /*
        if (deleteformtable) {
            if (sf) {
                displayMsg.textContent = `${msg} is deleted successfully!`;
                console.log(msg, " is deleted successfully!")
            }
            else {
                displayMsg.textContent = `Error deleting ${msg}`;
                console.log("Error deleting ", msg)
            }
        }
        else */
    if (addformtable) {
        if (sf) {
            displayMsg.textContent = `${msg} added successfully!`;
            console.log(msg, " added successfully!")
        }
        else {
            displayMsg.textContent = `Error adding ${msg}`;
            console.log("Error adding ", msg)
        }
    }
    setTimeout(() => {
        displayMsg.textContent = ""
    }, 5000)

}

function editReadStatus(book_id){
    let book=myLibrary.find(b=>b.id==book_id);
    book.read=!book.read;
    storeToLocal();
    displayRecord();
}

function addBookToLibrary(title, author, page, read = false, id = null) {
    // take params, create a book then store it in the array
    initialLength = myLibrary.length;
    let x = new Book(title, author, page, read, id)
    myLibrary.push(x);
    afterLength = myLibrary.length;
    if (initialLength < afterLength) {

        displayMsg(title, true)
    }
    else {
        displayMsg(title, false)
    }
    return x;
    //console.log(myLibrary);
}

function deleteBookFromLibrary(book_id) {
    //console.log("in delete function...");
    initialLength = myLibrary.length;
    myLibrary = myLibrary.filter(book => book.id !== book_id);
    afterLength = myLibrary.length;
    if (initialLength > afterLength) {

        //displayMsg(titleToDelete, true)
        console.log("Successfully deleted!")
    }
    else {
        //displayMsg(titleToDelete, false)
        console.log("Error when deleting!")
    }
    storeToLocal();
    displayRecord();
    console.table(myLibrary);

}

//let book1=addBookToLibrary("xxx","yyy",10);
//book1.info();

function storeToLocal() {
    // Save to LocalStorage (so data will persist even if reload)
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const addformtable = document.getElementById("formtable");
if (addformtable) {
    addformtable.addEventListener("submit", function (e) {

        e.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const page = document.getElementById("page").value;

        if (title && author && page) {
            addBookToLibrary(title, author, page);
            storeToLocal();
            displayRecord();
        }
        addformtable.reset();

        console.table(myLibrary);
    })
}
/*
const deleteformtable = document.getElementById("formtable-d");
if (deleteformtable) {
    deleteformtable.addEventListener("submit", function (e) {

        e.preventDefault();

        const title = document.getElementById("title-d").value;

        deleteBookFromLibrary(title);

        console.log("after deletion...")
        storeToLocal();

        deleteformtable.reset();

        console.table(myLibrary);
    })
}*/

const singlePageAdd = document.getElementById("single-page-add");
const popUpAddDiv = document.getElementById("pop-up-add-div");
const closePopUp = document.getElementById("close-pop-up");
if (singlePageAdd) {
    singlePageAdd.addEventListener("click", () => {
        popUpAddDiv.classList.remove("hidden")
    })
}
if (closePopUp) {
    closePopUp.addEventListener("click", (e) => {
        e.preventDefault();
        popUpAddDiv.classList.add("hidden")
    })
}
