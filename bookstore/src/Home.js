import React, { useState, useEffect } from 'react'
import { withStore } from "./Store"
import loader from './loader.webp'
import BookItem from './BookItem'

function Home (props) {

	const [initialBooks, setInitialBooks] = useState([])
	const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //API call
	useEffect(() => {
    fetch("http://henri-potier.xebia.fr/books")
      .then(res => res.json())
      .then(
        (result) => {
          setBooks(result) 
          setInitialBooks(result) 
          setIsLoading(false)
          console.log(result);
        },
        (error) => {
          console.log(error)
        }
      )

  }, [])
    
  // Search function
  const handleSearch = (evt) => {
      let entry = evt.target.value.toLowerCase() // Input
      let filteredData = initialBooks.filter((book) => { // Filter data inside Title an Synopsis
        return book.title.toLowerCase().includes(entry) || book.synopsis.join(' ').toLowerCase().includes(entry)
        })
      setBooks(filteredData) //set filtered data
      
  }

  const handleAddToCart = (item) => {
    console.log(item);
  }

  const handleRemoveFromCart = (item) => {

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
                {books.map((book, index) => (
                    <BookItem key={index} book={book} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
                ))}
            </div>
        </div>
		);
	}
			
		  
  		
	
}

export default withStore(Home);
