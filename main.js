const tbody = document.querySelector(".table-body");

const myLibrary = [
    {
        title: "newBook",
        author: "newAuthor",
        pages: 100,
        status: "not read",

        info: function(){
            return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
        }
    },
    {
        title: "newBook2",
        author: "newAuthor2",
        pages: 200,
        status: "completed",

        info: function(){
            return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
        }
    },
    {
        title: "newBook3",
        author: "newAuthor3",
        pages: 300,
        status: "in progess",

        info: function(){
            return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
        }
    },
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
    const book1 = new Book(title, author, pages, status);

    myLibrary.push(book1);
};

function showBooks(array) {
    array.map(book => {
        let row = tbody.insertRow();
        let title = row.insertCell(0);
        title.textContent = book.title;
        let author = row.insertCell(1);
        author.textContent = book.author;
        let pages = row.insertCell(2);
        pages.textContent = book.pages;
        let status = row.insertCell(3);
        status.textContent = book.status;
        let actions = row.insertCell(4);
        actions.textContent = "DELETE";
    })
};

showBooks(myLibrary);
