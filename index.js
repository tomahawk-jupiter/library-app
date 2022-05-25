const myLibrary = [];

// some books to display by default
const testBooks = [
  {
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    genre: "Fantasy",
    year: "1937",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    year: "1949",
  },
  {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    genre: "Fantasy",
    year: "1996",
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "Fantasy",
    year: "2007",
  },
];

const bookDisplay = document.querySelector(".book-display");
const bookForm = document.querySelector(".book-form");
const addBookBtn = document.querySelector(".add-book");
const cancelBtn = document.querySelector(".cancel-btn");
const submitForm = document.querySelector(".submit-form");

// Create an Object Constructor
function Book(title, author, genre, year) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.read = "Not read";
}

// Add a function to the Created Book Object Constructor
Book.prototype.bookRead = function () {
  if (this.read == "Not read") {
    this.read = "Read";
  } else if (this.read == "Read") {
    this.read = "Not read";
  }
  bookDisplay.replaceChildren();
  displayBooks();
};

// Make instances of Book using the Object Constructor
// for each item in the testBooks array
// push to the myLibrary array
testBooks.forEach((book) => {
  let newBook = new Book(book.title, book.author, book.genre, book.year);
  myLibrary.push(newBook);
});

// Function for event listener
function removeBook(e) {
  let index = e.target.name;
  myLibrary.splice(index, 1);
  bookDisplay.replaceChildren();
  displayBooks();
}

// Makes up the book cards and add to the page
function displayBooks() {
  let index = 0;
  myLibrary.map((book) => {
    {
      const card = document.createElement("div");

      // Create elements for the card div
      const titleDiv = document.createElement("div");
      titleDiv.innerText = book.title;
      const authorDiv = document.createElement("div");
      authorDiv.innerText = book.author;
      const genreDiv = document.createElement("div");
      genreDiv.innerText = book.genre;
      const yearDiv = document.createElement("div");
      yearDiv.innerText = book.year;
      const readDiv = document.createElement("div");
      readDiv.innerText = book.read;

      // Create Button div and nested buttons
      const btnRowDiv = document.createElement("div");
      btnRowDiv.setAttribute("class", "btn-row");

      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("name", index);
      removeBtn.setAttribute("class", "remove-book");
      removeBtn.innerText = "REMOVE";

      const toggleBtn = document.createElement("button");
      toggleBtn.setAttribute("name", index);
      toggleBtn.setAttribute("class", "book-read");
      toggleBtn.innerText = "TOGGLE";

      btnRowDiv.appendChild(removeBtn);
      btnRowDiv.appendChild(toggleBtn);

      // Append all the created elements to the Card
      card.appendChild(titleDiv);
      card.appendChild(authorDiv);
      card.appendChild(genreDiv);
      card.appendChild(yearDiv);
      card.appendChild(readDiv);
      card.appendChild(btnRowDiv);

      bookDisplay.appendChild(card);
      card.classList.add("card");
      index++;
    }
  });

  // Get node list for all the remove and toggle buttons
  const removeBookBtn = document.querySelectorAll(".remove-book");
  const bookReadBtn = document.querySelectorAll(".book-read");

  // Use a forEach array method to add event listeners to each button
  // in the node list
  removeBookBtn.forEach((element) => {
    element.addEventListener("click", removeBook);
  });

  bookReadBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const bookObj = myLibrary[e.target.name];
      console.log(bookObj);
      bookObj.bookRead();
    });
  });
}

// Initial display of the books
displayBooks();

const firstInput = document.getElementById("title");

addBookBtn.addEventListener("click", (e) => {
  bookForm.style.visibility = "visible";
  firstInput.focus();
});

cancelBtn.addEventListener("click", () => {
  bookForm.style.visibility = "hidden";
});

// Add a new book using the book form
// and display the books again with the new book included
// NOTE - it would be better to just add the new book
// instead of re-rendering all of them.
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let genre = document.getElementById("genre").value;
  let year = document.getElementById("year").value;

  const newBook = new Book(title, author, genre, year);
  myLibrary.push(newBook);

  bookDisplay.replaceChildren();
  displayBooks();

  bookForm.style.visibility = "hidden";
  bookForm.reset();
});
