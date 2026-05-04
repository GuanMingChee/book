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

let myLibrary = [];

const loadmyLibrary = localStorage.getItem("myLibrary");

if (loadmyLibrary) {
    let rawData = JSON.parse(loadmyLibrary);

    myLibrary = rawData.map(book => new Book(book.title, book.author, book.page, book.read, book.id));
}

function addBookToLibrary(title, author, page, read = false, id = null) {
    // take params, create a book then store it in the array
    let x = new Book(title, author, page, read, id)
    myLibrary.push(x);
    return x;
    //console.log(myLibrary);
}

function deleteBookFromLibrary(titleToDelete) {
    console.log("in delete function...");
    myLibrary = myLibrary.filter(book => book.title.toLowerCase() !== titleToDelete.toLowerCase());
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

        addBookToLibrary(title, author, page);

        storeToLocal();

        addformtable.reset();

        console.table(myLibrary);
    })
}

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
}