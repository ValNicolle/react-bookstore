import React, { useState, useEffect } from 'react'
import { withStore } from "./Store"

function BookItem (props) {

    const [unfolded, setUnfolded] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    function getQuantityInCart(){
        return props.store.get('cart', []).filter(bk => bk.isbn == props.book.isbn).length
    }

	return (

        <div className="single-book">
            <div className="image-ctn" style={{backgroundImage: "url("+props.book.cover+")" }}><img src={props.book.cover} alt={props.book.title} title={props.book.title}/></div>
            <div className="text-ctn">
                <h2>{props.book.title}</h2>
                <p>{props.book.synopsis[0]}</p>
                {unfolded &&
                    <div>
                        <p>{props.book.synopsis[1]}</p>
                        <p>{props.book.synopsis[2]}</p>
                    </div>
                }
                <div className="price">{props.book.price} €</div>
                <div className="btn-ctn">
                    {!isInCart ? 
                        <button onClick={() => {props.handleAddToCart(props.book.isbn); setIsInCart(!isInCart)}}>🛒 Ajouter au panier</button>
                        :
                        <div className="cart-counter">
                            <button onClick={() => {props.handleAddToCart(props.book.isbn)}} className="plus">+</button>
                            {/* <div className="number">{getQuantityInCart()}</div> */}
                            <div className="number">caca</div>
                            <button onClick={() => {props.handleRemoveFromCart(props.book.isbn)}} className="minus">-</button>
                        </div>
                    }
                    
                    <button onClick={() => setUnfolded(!unfolded)}>{!unfolded ? "Voir plus" : "Voir moins"}</button>
                </div>
            </div>
        </div>

		);
	
	
	
}

export default withStore(BookItem);
