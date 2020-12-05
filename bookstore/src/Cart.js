import React, { useState, useEffect } from 'react'
import { useStore } from "react-context-hook"
import { Link } from "react-router-dom";

function Cart () {

    const [books] = useStore("books", [])
    const [cart] = useStore("cart", [])
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
        if(cart.length > 0){
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
        }
        


    }, [])

    function calculateOffer(offer) {

        let total = firstTotalPrice
        let total1 = 1000 //temporary values
        let total2 = 1000
        let total3 = 1000

        offer['offers'].forEach(off => {
            if(off.type === 'percentage') {
                total1 = total - (total/100)*off.value
            }else if(off.type === 'minus'){
                total2 = total - off.value
            }else if(off.type === 'slice'){
                total3 = total - Math.trunc(total/off.sliceValue)*off.value
            }
        })
        total = Math.min(total1, total2, total3).toFixed(2) //Select the best offer
        let newReduction = (firstTotalPrice - total).toFixed(2) // Calculate reduction
    
        setFinalTotal(total)
        setReduction(newReduction)

    }
    


	return (
        <React.Fragment>
            <Link to="/" className="back">⬅</Link>
            <h1 className="title">PANIER</h1>
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
                    <strong>Prix Final: {finalTotal} €</strong> 
                </div> 
            </div>
            }
            
       </React.Fragment>

		);
	
	
	
}

export default Cart;
