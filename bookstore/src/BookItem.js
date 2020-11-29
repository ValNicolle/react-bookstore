import React, { useState, useEffect } from 'react'

function BookItem (props) {

    const [unfolded, setUnfolded] = useState(false)
    const [isInCart, setIsInCart] = useState(false)


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
                        <button onClick={() => {props.handleAddToCart(props.book); setIsInCart(!isInCart)}}>🛒 Ajouter au panier</button>
                        :
                        <div className="cart-counter">
                            <button className="plus">+</button>
                            <div className="number">3</div>
                            <button className="minus">-</button>
                        </div>
                    }
                    
                    <button onClick={() => setUnfolded(!unfolded)}>{!unfolded ? "Voir plus" : "Voir moins"}</button>
                </div>
            </div>
        </div>

		);
	
	
	
}

export default BookItem;
