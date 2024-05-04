const UI = {
    booksDiv : document.querySelector('.books')
};

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

function displayBooks(){
    for (const index in myLibrary){

        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        let title = document.createElement('p');
        title.innerText = myLibrary[index].title;
        let author = document.createElement('p');
        author.innerText = myLibrary[index].author;
        let pages = document.createElement('p');
        pages.innerText = myLibrary[index].pages;

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);

        UI.booksDiv.appendChild(bookCard);
    }
}

addBookToLibrary('Book 1', 'Cool Guy', 399);
addBookToLibrary('Book 2', 'Cool Guy', 399);
addBookToLibrary('Book 3', 'Cool Guy', 399);
displayBooks();