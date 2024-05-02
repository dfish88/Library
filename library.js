const myLibrary = [];

function Book(title, author, pages){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read.' : 'not read yet.'}`;
    }
}

function addBookToLibrary(title, author, pages){
    var newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}
