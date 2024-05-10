const UI = {
    booksDiv : document.querySelector('.books'),
    addButton : document.querySelector('.addButton')
};

const myLibrary = {};

function Book(title, author, pages){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read.' : 'not read yet.'}`;
    }
}

Book.prototype.readToggle = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages){
    var newBook = new Book(title, author, pages);
    var id = newBook.id;
    myLibrary[id] = newBook;
    return id;
}

function displayBook(id){

    let bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.setAttribute('data-id', id);

    let remove = document.createElement('img');
    remove.src = './icons/minus.png';
    remove.classList.add('removeButton');
    remove.addEventListener('click', (e) =>{
        delete myLibrary[id];
        bookCard.remove();
    });

    let title = document.createElement('p');
    title.innerText = myLibrary[id].title;

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    titleDiv.appendChild(title);
    titleDiv.appendChild(remove);

    let author = document.createElement('p');
    author.innerText = myLibrary[id].author;

    let pages = document.createElement('p');
    pages.innerText = myLibrary[id].pages + ' pages';

    let readButton = document.createElement('button');
    readButton.classList.add('readButton');
    readButton.innerText = 'Read?';

    let readIcon = document.createElement('img');
    readIcon.setAttribute('src', './icons/checkmark.png')
    readIcon.classList.add('readIcon')

    readIcon.style.visibility = myLibrary[id].read ? 'visible' : 'hidden';

    readButton.addEventListener('click', (e)=>{
        myLibrary[id].readToggle();
        readIcon.style.visibility = myLibrary[id].read ? 'visible' : 'hidden';
    })

    readButton.appendChild(readIcon);

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readButton);

    UI.booksDiv.appendChild(bookCard);
}

function displayBooks(){
    for (const id in myLibrary){
        displayBook(id)
    }
}

function submitNewBookForm(event, titleInput, authorInput, pagesInput, form){

    event.preventDefault();

    let title = titleInput.innerText;
    let author = authorInput.innerText;
    let pages = pagesInput.innerText;

    let id = addBookToLibrary(title, author, pages);

    displayBook(id);

    form.remove();
    UI.addButton.style.visibility = 'visible';

}

UI.addButton.addEventListener('click', (e) => {

    let newBook = document.createElement('form');
    newBook.classList.add('newBook');

    let title = document.createElement('input');
    title.classList.add('titleInput');
    title.setAttribute('type', 'text');
    title.setAttribute('value', 'Title');
    title.required = true;

    let author = document.createElement('input');
    author.classList.add('authorInput');
    author.setAttribute('type', 'text');
    author.setAttribute('value', 'Author');
    author.required = true;

    let pages = document.createElement('input');
    pages.classList.add('pagesInput');
    pages.setAttribute('type', 'numbers');
    pages.setAttribute('value', 'Pages');
    pages.required = true;

    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Add Book');

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(submit);

    newBook.addEventListener('submit', (e) => {
        submitNewBookForm(e, title, author, pages, newBook);
    });

    UI.booksDiv.appendChild(newBook);

    UI.addButton.style.visibility = 'hidden';

});

addBookToLibrary('Book 1', 'Cool Guy', 399);
addBookToLibrary('Book 2', 'Cool Guy', 399);
addBookToLibrary('Book 3', 'Cool Guy', 399);
displayBooks();