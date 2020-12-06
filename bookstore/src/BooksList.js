import React, { useState, useEffect } from 'react'
import { useStore } from "react-context-hook"
import loader from './loader.webp'
import BookItem from './BookItem'

function BooksList () {

  const [books, setBooks] = useStore("books", []);
  const [displayedBooks, setDisplayedBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //API call
  useEffect(() => {
    //Get data and send it to the store
    fetch("http://henri-potier.xebia.fr/books")
    .then(res => res.json())
    .then(
        (result) => {
          setDisplayedBooks(result) 
          setBooks(result)
          setIsLoading(false)
        },
        (error) => {
          console.log(error)
        }
    )
  }, [])
    
  // Search function
  const handleSearch = (evt) => { 
    const entry = evt.target.value.toLowerCase() // Input
    const initialBooks = books
    let filteredData = initialBooks.filter((book) => { // Search term inside Title an Synopsis
      return book.title.toLowerCase().includes(entry) || book.synopsis.join(' ').toLowerCase().includes(entry)
    })
    setDisplayedBooks(filteredData) //set filtered data
  }




	if(isLoading){
		// When data is not yet loaded
		return <img className="spin-loader" src={loader} alt="loader" />
	}
	else{
		// When data is charged
	return (
        <div className="main">
            <div className="search-ctn">
                <input onChange={handleSearch} type="text" placeholder="Recherchez un terme"/>
            </div>
            <div className="books-ctn">
                {displayedBooks.map((book, index) => (
                    <BookItem key={index} book={book} />
                ))}
            </div>
        </div>
		);
	}
			
		  
}


export default BooksList;
