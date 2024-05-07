const UI = {
    booksDiv : document.querySelector('.books'),
    addButton : document.querySelector('.addButton')
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
        pages.innerText = myLibrary[index].pages + ' pages';

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);

        UI.booksDiv.appendChild(bookCard);
    }
}

function submitNewBookForm(event, titleInput, authorInput, pagesInput, form){

    let title = titleInput.innerText;
    let author = authorInput.innerText;
    let pages = pagesInput.innerText;



    addBookToLibrary(title, author, pages);

    form.remove();
    UI.addButton.style.visibility = 'visible';
    //displayBooks();



    event.preventDefault();
}

UI.addButton.addEventListener('click', (e) => {

    let newBook = document.createElement('form');
    newBook.classList.add('newBook');

    let title = document.createElement('input');
    title.classList.add('titleInput');
    title.setAttribute('type', 'text');
    title.setAttribute('value', 'Title');

    let author = document.createElement('input');
    author.classList.add('authorInput');
    author.setAttribute('type', 'text');
    author.setAttribute('value', 'Author');

    let pages = document.createElement('input');
    pages.classList.add('pagesInput');
    pages.setAttribute('type', 'numbers');
    pages.setAttribute('value', 'Pages');

    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Add Book');

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(submit);

    newBook.addEventListener('submit', (e) => {
        submitNewBookForm(e, title, author, pages);
    });

    UI.booksDiv.appendChild(newBook);

    UI.addButton.style.visibility = 'hidden';

});

addBookToLibrary('Book 1', 'Cool Guy', 399);
addBookToLibrary('Book 2', 'Cool Guy', 399);
addBookToLibrary('Book 3', 'Cool Guy', 399);
displayBooks();