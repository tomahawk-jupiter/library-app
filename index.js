const myLibrary = [];

const testBooks = [
  {
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    genre: 'Fantasy',
    year:'1937'
  }, {
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    year: '1949'
  }, {
      title: 'The Hobbit 2',
      author: 'J. R. R. Tolkien',
      genre: 'Fantasy',
      year:'1937'
    }, {
      title: '1984 2',
      author: 'George Orwell',
      genre: 'Science Fiction',
      year: '1949'
    }
];

const bookDisplay = document.querySelector('.book-display');
const bookForm = document.querySelector('.book-form');
const addBookBtn = document.querySelector('.add-book');
const cancelBtn = document.querySelector('.cancel-btn');
const submitForm = document.querySelector('.submit-form');

function Book(title, author, genre, year) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.read = 'Not read';
}

Book.prototype.bookRead = function () {
  console.log('book read!');
  if (this.read == 'Not read') {
    this.read = 'Read';
  } else if (this.read == 'Read') {
    this.read = 'Not read';
  }
  bookDisplay.replaceChildren();
  displayBooks();
}

// make instances of Book using test array
testBooks.forEach(book => {
  let newBook = new Book(book.title, book.author, book.genre, book.year);
  myLibrary.push(newBook);
});

function removeBook(e) {
  let index = e.target.name;
  myLibrary.splice(index, 1);
  bookDisplay.replaceChildren();
  displayBooks();
}

function displayBooks() {
  let index = 0;
  myLibrary.map(book => {
    {
      let card = document.createElement('div');
      card.innerHTML = `<div>${book.title}</div>
                        <div>${book.author}</div>
                        <div>${book.genre}</div>
                        <div>${book.year}</div>
                        <div>${book.read}</div>
                        <button name=${index} class="remove-book">
                            Remove</button>
                        <button name=${index} class="book-read">Toggle</button>`;
      bookDisplay.appendChild(card);
      card.classList.add('card');
      index++;
    }
  });
  const removeBookBtn = document.querySelectorAll('.remove-book');
  removeBookBtn.forEach(element => {
    element.addEventListener('click', removeBook);
  });

  // Not sure about this, bookRead is a class function
  const bookReadBtn = document.querySelectorAll('.book-read');
  bookReadBtn.forEach(element => {
    element.addEventListener('click', (e)=>{
      //console.log(myLibrary.element.name);
      const bookObj = myLibrary[e.target.name];
      console.log(bookObj);
      bookObj.bookRead();
    });
  });
}

displayBooks();

addBookBtn.addEventListener('click', ()=> {
  bookForm.style.visibility = 'visible';
});

cancelBtn.addEventListener('click', ()=> {
  bookForm.style.visibility = 'hidden';
});

bookForm.addEventListener('submit', (e)=> {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let genre = document.getElementById('genre').value;
  let year = document.getElementById('year').value;

  const newBook = new Book(title, author, genre, year);
  myLibrary.push(newBook);

  bookDisplay.replaceChildren();
  displayBooks();

  bookForm.style.visibility = 'hidden';
});
