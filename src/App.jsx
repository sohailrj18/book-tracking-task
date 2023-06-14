import { useState, useEffect } from "react";
import "./App.css";
import booksData from "./books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
    setBooks(booksData);
    setFilteredBooks(booksData);
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  const toggleViewType = () => {
    setViewType((prevViewType) => (prevViewType === "grid" ? "list" : "grid"));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const BookModal = ({ book, closeModal }) => {
    return (
      <div className="modal">
        <div
          className={`${isDarkMode ? "modal-content-dark" : "modal-content"}`}
        >
          <span className="close" onClick={closeModal}>
            ⨉
          </span>
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.genre}</p>
          <p>{book.description}</p>
        </div>
      </div>
    );
  };

  return (
    
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <header className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="toggle-container">
          <button className="view-toggle" onClick={toggleViewType}>
            {viewType === "grid" ? "List View" : "Grid View"}
          </button>
          <div
            className={`toggle ${isDarkMode ? "night" : "day"}`}
            onClick={toggleDarkMode}
          ></div>
        </div>
      </header>
      <div className="content">
       
        <div className={`book-container ${viewType}`}>
          {filteredBooks.map((book) => (
            <div
              className={`book-card ${
                isDarkMode ? "dark-mode" : "book-card-bg"
              }`}
              key={book.id}
              onClick={() => handleOpenModal(book)}
            >
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.genre}</p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <BookModal book={selectedBook} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
