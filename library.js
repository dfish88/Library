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

function submitNewBookForm(event){
    event.preventDefault();

    let form = document.querySelector('.newBook');

    let title = document.querySelector('#titleInput').value;
    let author = document.querySelector('#authorInput').value;
    let pages = document.querySelector('#pagesInput').value; 

    let id = addBookToLibrary(title, author, pages);

    displayBook(id);

    form.remove();
    UI.addButton.style.visibility = 'visible';

}

function createNewBookForm(){
    let newBook = document.createElement('form');
    newBook.classList.add('newBook');
    newBook.setAttribute('onsubmit', 'submitNewBookForm(event)');

    let title = document.createElement('input');
    title.id = 'titleInput';
    title.setAttribute('type', 'text');
    title.required = true;

    let titleLabel = document.createElement('label');
    titleLabel.innerText = 'Title';
    titleLabel.setAttribute('for', 'titleInput');

    let author = document.createElement('input');
    author.id ='authorInput';
    author.setAttribute('type', 'text');
    author.required = true;

    let authorLabel = document.createElement('label');
    authorLabel.innerText = 'Author';
    authorLabel.setAttribute('for', 'authorInput');

    let pages = document.createElement('input');
    pages.id = 'pagesInput';
    pages.setAttribute('type', 'number');
    pages.required = true;

    let pagesLabel = document.createElement('label');
    pagesLabel.innerText = 'Pages';
    pagesLabel.setAttribute('for', 'pagesInput');

    let submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.innerText = 'Add Book';

    let cancel = document.createElement('button');
    cancel.innerText = 'Cancel';

    cancel.addEventListener('click', (e) =>{
        newBook.remove();
        UI.addButton.style.visibility = 'visible';
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.appendChild(submit);
    buttonDiv.appendChild(cancel);

    newBook.appendChild(titleLabel);
    newBook.appendChild(title);
    newBook.appendChild(authorLabel);
    newBook.appendChild(author);
    newBook.appendChild(pagesLabel);
    newBook.appendChild(pages);
    newBook.appendChild(buttonDiv);

    return newBook;
}

UI.addButton.addEventListener('click', (e) => {

    let newBook = createNewBookForm();
    UI.booksDiv.appendChild(newBook);
    UI.addButton.style.visibility = 'hidden';

});

addBookToLibrary('Book 1', 'Cool Guy', 399);
addBookToLibrary('Book 2', 'Cool Guy', 399);
addBookToLibrary('Book 3', 'Cool Guy', 399);
displayBooks();