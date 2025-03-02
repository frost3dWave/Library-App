const openBtn = document.querySelector(".open-modal");
const dialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submitBtn");

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatus = document.querySelector("#status");

const tbody = document.querySelector(".table-body");

const myLibrary = [
    // {
    //     title: "newBook",
    //     author: "newAuthor",
    //     pages: 100,
    //     status: "not read",

    //     info: function(){
    //         return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
    //     }
    // },
    // {
    //     title: "newBook2",
    //     author: "newAuthor2",
    //     pages: 200,
    //     status: "completed",

    //     info: function(){
    //         return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
    //     }
    // },
    // {
    //     title: "newBook3",
    //     author: "newAuthor3",
    //     pages: 300,
    //     status: "in progess",

    //     info: function(){
    //         return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
    //     }
    // },
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function() {
        return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
    }
};

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
};

function showBooks(array) {
    array.forEach(book => {
        let row = tbody.insertRow();  // insert row on tbody tag to get the data entries

        let title = row.insertCell(0);   // add first cell in the row & similar below
        title.innerHTML = book.title;  

        let author = row.insertCell(1);
        author.innerHTML = book.author;

        let pages = row.insertCell(2);
        pages.innerHTML = book.pages;

        let status = row.insertCell(3);
        status.innerHTML = book.status;

        let actions = row.insertCell(4);
        actions.innerHTML = "DELETE";
    })
};

openBtn.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener("click", () => dialog.close());

submitBtn.addEventListener("click", event => {
    event.preventDefault();  // prevent default submit behavior of sending data to the server

    tbody.innerHTML = "";    // remove all the current html child elements from tbody element to not get repeating data entries of earlier rows each time a new data is added.

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value);
    showBooks(myLibrary);

    // reset the form to start with fresh form fields for new entries
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookStatus.value = "not-started";
});