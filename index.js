const myLibrary = [
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
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      genre: 'Fantasy',
      year:'1937'
    }, {
      title: '1984',
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
}

function removeBook(e) {
  const bookCard = e.target.parentElement;
  console.log('clicked!')
  console.log(e);
  bookCard.replaceChildren();
}

function displayBooks() {
  myLibrary.map(book => {
    {
      let card = document.createElement('div');
      card.innerHTML = `<div>${book.title}</div>
                        <div>${book.author}</div>
                        <div>${book.genre}</div>
                        <div>${book.year}</div>
                        <button class="remove-book">Remove</button>`;
      bookDisplay.appendChild(card);
      card.classList.add('card');
    }
  });
  const removeBookBtn = document.querySelectorAll('.remove-book');
  removeBookBtn.forEach(element => {
    element.addEventListener('click', removeBook);
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

  myLibrary.push({
    title,
    author,
    genre,
    year
  });

  bookDisplay.replaceChildren();
  displayBooks();

  bookForm.style.visibility = 'hidden';
});
