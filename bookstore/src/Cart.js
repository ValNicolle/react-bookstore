import React, { useState, useEffect } from 'react'
import { useStore } from "react-context-hook"
import { Link } from "react-router-dom";

function Cart () {

    const [books, setBooks] = useStore("books", [])
    const [cart, setCart] = useStore("cart", [])
    const booksInCart = books.map(book => {
        const qty = cart.filter(cartItem => cartItem === book.isbn).length //Get quantity of each book in the cart
        return {bookData: book, quantity: qty}
    })

    //Get price without offers
    let firstTotalPrice = 0
    booksInCart.map((item => firstTotalPrice += item.bookData.price * item.quantity))

    // Commercial Offers calculation
    const [reduction, setReduction] = useState(0)
    const [finalTotal, setFinalTotal] = useState(0)
    

    useEffect(() => {
        //Get commercial offers
        fetch("http://henri-potier.xebia.fr/books/"+cart.join()+"/commercialOffers")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                calculateOffer(result);
            },
            (error) => {
                console.log(error)
            }
        )


    }, [])

    function calculateOffer(offer) {

        let total = firstTotalPrice
        let total1 = 1000 //dummy values
        let total2 = 1000
        let total3 = 1000
        offer['offers'].map(off => {
            if(off.type === 'percentage') {
                total1 = total - (total/100)*off.value
            }else if(off.type === 'minus'){
                total2 = total - off.value
            }else if(off.type === 'slice'){
                total3 = total - Math.trunc(total/off.sliceValue)*off.value
            }
        })
        total = Math.min(total1, total2, total3).toFixed(2)
        let newReduction = (firstTotalPrice - total).toFixed(2)
    
        setFinalTotal(total)
        setReduction(newReduction)

    }
    


	return (
        <React.Fragment>
            <Link to="/" className="back">⬅</Link>
            {cart.length === 0 ?
                <div className="Cart"><div className="cart-item">Votre panier est vide 🤔</div></div>
                :
                <div className="Cart">
                {booksInCart.filter(item => item.quantity > 0).map((item, index)=>{
                    return(
                        <div key={index} className="cart-item">
                            <div className="title-ctn">{item.bookData.title}</div>
                            <div className="qty-ctn">Quantity: <strong>{item.quantity}</strong></div>
                        </div>
                    )
                })}
                <div className="price-ctn">
                    Prix avant réduction: {firstTotalPrice} €<br />
                    Réduction obtenue: -{reduction} €<br />
                    Prix après réduction: {finalTotal}€
                </div> 
            </div>
            }
            
       </React.Fragment>

		);
	
	
	
}

export default Cart;
