import React, { useState, useEffect } from 'react'
import { useStore, useSetStoreValue } from "react-context-hook"

function BookItem (props) {

    const [unfolded, setUnfolded] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    const [cart, setCart, deleteCart] = useStore("cart", [])
    const quantityInCart = cart.filter(item => item === props.book.isbn).length
    console.log(cart);

    function handleRemoveFromCart (item) {
        console.log(item);
        const tempData = cart
        const index = tempData.indexOf(item);
        if (index > -1) {
            tempData.splice(index, 1);
        }
        console.log(tempData);
        setCart(cart.splice(cart.indexOf(item),1))

      }


	return (

        <div className="single-book">
            <div className="image-ctn" style={{backgroundImage: "url("+props.book.cover+")" }}><img src={props.book.cover} alt={props.book.title} title={props.book.title}/></div>
            <div className="text-ctn">
                <h2>{props.book.title}</h2>
                <p>{props.book.synopsis[0]}</p>
                {unfolded && // Show all text when "voir plus" is clicked
                    <div>
                        <p>{props.book.synopsis[1]}</p>
                        <p>{props.book.synopsis[2]}</p>
                    </div>
                }
                <div className="price">{props.book.price} €</div>
                <div className="btn-ctn">
                    {!isInCart ? 
                        <button onClick={() => {setCart([...cart, props.book.isbn]); setIsInCart(!isInCart)}}>🛒 Ajouter au panier</button>
                        :
                        <div className="cart-counter">
                            <button onClick={() => {handleRemoveFromCart(props.book.isbn)}} className="minus">-</button>
                            <div className="number">{quantityInCart}</div>
                            <button onClick={() => {setCart([...cart, props.book.isbn])}} className="plus">+</button>
                        </div>
                    }
                    
                    <button onClick={() => setUnfolded(!unfolded)}>{!unfolded ? "Voir plus" : "Voir moins"}</button>
                </div>
            </div>
        </div>

		);
	
	
	
}

export default BookItem;
