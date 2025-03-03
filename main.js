const openBtn = document.querySelector(".open-modal");
const dialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submitBtn");

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatus = document.querySelector("#status");

const tbody = document.querySelector(".table-body");

const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function() {
        return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`
    }
};

Book.prototype.changeStatus = function(){
    // direct approach using if-else statement for updating the status 

    // if (this.status === "not-started"){
    //     this.status = "in-progress";
    // }else if (this.status === "in-progress"){
    //     this.status = "completed";
    // }else {
    //     this.status = "not-started";
    // }

    // more efficient & maintainable approach 
    const statusOptions = ["Not-Started", "In-Progress", "Completed"];

    const currentStatus = this.status;
    const currentIndex = statusOptions.indexOf(currentStatus);

    const nextIndex = (currentIndex + 1) % statusOptions.length;  // toggle to next option in the array to change status & if at final element, rolls back to start of the array with module operator [currentIndex(2) + 1] % array.length(3) = 3 % 3 = 0 == returns to first element
    
    this.status = statusOptions[nextIndex]; //changes status to next one in the array
};

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
};

function showBooks(array) {
    array.forEach((book, index) => {
        let row = tbody.insertRow();  // insert row on tbody tag to get the data entries

        let title = row.insertCell(0);   // add first cell in the row & similar below
        title.textContent = book.title;  

        let author = row.insertCell(1);
        author.textContent = book.author;

        let pages = row.insertCell(2);
        pages.textContent = book.pages;

        let status = row.insertCell(3);
        status.textContent = book.status;
        status.dataset.index = index;  // setting the data attribute to its index in the array to specifically update the status of that particular book

        // for changing the book status 
        status.addEventListener("click", () => {
            const bookIndex = parseInt(status.dataset.index);
            const bookToUpdate = myLibrary[bookIndex];

            // updating the book object 
            bookToUpdate.changeStatus();

            // updating the entire table after each status change
            // tbody.innerHTML = "";
            // showBooks(myLibrary); 

            // updating only the row whose status was changed 
            status.textContent = bookToUpdate.status;
        });

        let actions = row.insertCell(4);
        // actions.textContent = "DELETE";
        
        // creating the img using DOM methods
        const deleteImg = document.createElement("img");
        deleteImg.src = "./assets/delete.svg";
        deleteImg.alt = "";
        deleteImg.height = 25;
        deleteImg.width = 25;
        deleteImg.dataset.index = index;  // setting the data attribute of the delete image to its corresponding index in the array

        // to delete the row
        deleteImg.addEventListener("click", () => {
            myLibrary.splice(index, 1);  

            // update the table 
            tbody.innerHTML = "";
            showBooks(myLibrary);
        });

        actions.appendChild(deleteImg);
    });
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
    bookStatus.value = "Not-Started";
});