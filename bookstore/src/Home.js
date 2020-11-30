import React, { useState, useEffect } from 'react'
import { withStore } from "./Store"
import loader from './loader.webp'
import BookItem from './BookItem'

function Home (props) {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  //API call
    useEffect(() => {
        //Get data and send it to the store
        fetch("http://henri-potier.xebia.fr/books")
        .then(res => res.json())
        .then(
            (result) => {
            setBooks(result) 
            props.store.set("books", result)
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
      const entry = evt.target.value.toLowerCase() // Input
      const initialBooks = props.store.get('books')
      let filteredData = initialBooks.filter((book) => { // Filter data inside Title an Synopsis
        return book.title.toLowerCase().includes(entry) || book.synopsis.join(' ').toLowerCase().includes(entry)
        })
      setBooks(filteredData) //set filtered data
  }

  const handleAddToCart = (item) => {
    const storeData = props.store.get('cart',[])
    props.store.set('cart', [...storeData, item])
  }

  const handleRemoveFromCart = (item) => {
    const storeData = props.store.get('cart', [])
    const index = storeData.indexOf(item);
    if (index > -1) {
        storeData.splice(index, 1);
    }
    props.store.set('cart', storeData)
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
