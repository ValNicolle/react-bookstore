import React, { useState, useEffect } from 'react'
import { useStore } from "react-context-hook"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Cart () {


    const [books, setBooks] = useStore("books", [])
    const [cart, setCart] = useStore("cart", [])
    const itemsInCart = books.map(book => {
        const qty = cart.filter(cartItem => cartItem === book.isbn).length
        return {bookData: book, quantity: qty}
         
    })
    const booksInCart = itemsInCart
    

    useEffect(() => {
        //Get commercial offers
        fetch("http://henri-potier.xebia.fr/books/"+cart.join()+"/commercialOffers")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                
            // setDisplayedBooks(result) 
            // // props.store.set("books", result)
            // setBooks(result)
            // setIsLoading(false)
            },
            (error) => {
            console.log(error)
            }
        )


  }, [])
    


	return (
        <React.Fragment>
        <Link to="/" className="back">⬅</Link>
        {cart.length === 0 ?
            <div className="Cart"><div className="cart-item">Votre panier est vide 🤔</div></div>
            :
            <div className="Cart">
            {booksInCart.filter(item => item.quantity > 0).map((item, index)=>{
                {console.log(item)}
                return(
                <div key={index} className="cart-item">
                    <div className="title-ctn">{item.bookData.title}</div>
                    <div className="qty-ctn">Quantity: <strong>{item.quantity}</strong></div>
                </div>
                )
            })}
        </div>
        }
        
       </React.Fragment>

		);
	
	
	
}

export default Cart;
