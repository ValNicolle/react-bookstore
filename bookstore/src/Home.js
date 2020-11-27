import React, { useState, useEffect } from 'react'
import loader from './loader.webp'
import BookItem from './BookItem'

function Home () {

	const [initialBooks, setInitialBooks] = useState([])
	const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
        fetch("http://henri-potier.xebia.fr/books", {method: 'GET'})
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
    
    
    const handleSearch = (evt) =>{
        //console.log(initialBooks[0].title.includes(evt.target.value));
        let entry = evt.target.value.toLowerCase()
        //let newData = initialBooks.filter(bk => bk.map(b => b.includes(entry)))
        // let newData = initialBooks.map(bk => {
        //     bk.reduce((acc, text) => acc + )
        // })
        // const newData = initialBooks.filter(livre => livre.reduce((acc, bookin)=> acc + bookin.title + bookin.synopsis[0]).includes(entry))
        console.log(newData)
    //     if(entry == ""){
    //         newData = initialBooks
    //     }
    //    setBooks(newData)
        
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
                    <input onChange={handleSearch} type="text" />
                </div>
                <div className="books-ctn">
                    {books.map((book, index) => (
                        <BookItem key={index} book={book} />
                    ))}
                </div>
            </div>
		);
	}
			
		  
  		
	
}

export default Home;
