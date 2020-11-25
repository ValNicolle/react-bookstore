import React, { useState, useEffect } from 'react'
import loader from './loader.webp'

function Home () {

	const [books, setBooks] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
        fetch("http://henri-potier.xebia.fr/books", {method: 'GET'})
        .then(res => res.json())
        .then(
          (result) => {
            setBooks(result) 
            setIsLoading(false)
            console.log(result);
          },
          (error) => {
            console.log(error)
          }
        )
	}, [])



	if(isLoading){
		// When data is not yet loaded
		return <img className="spin-loader" src={loader} alt="loader" />
	}
	else{
		// When data is charged
	return (
            <div className="books-ctn">
                {books.map((book, index) => (
                    <div key={index} className="single-book">
                        <div className="image-ctn" style={{backgroundImage: "url("+book.cover+")" }}><img src={book.cover} alt={book.title} title={book.title}/></div>
                        <div className="text-ctn">
                            <h2>{book.title}</h2>
                            <p>{book.synopsis[0]}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
		);
	}
			
		  
  		
	
}

export default Home;
