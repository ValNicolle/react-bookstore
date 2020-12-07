import React, { useState } from 'react'
import { useStore } from "react-context-hook"
import PropTypes from 'prop-types'


function BookItem (props) {

    const [unfolded, setUnfolded] = useState(false)
    const [cart, setCart] = useStore("cart", [])
    const quantityInCart = cart.filter(item => item === props.book.isbn).length


    function handleRemoveFromCart () {
        let newCart = [...cart]
        const index = cart.indexOf(props.book.isbn)
        // If element exists, remove it from the cart
        if(index > -1){
            newCart.splice(cart.indexOf(props.book.isbn), 1)
            setCart(newCart)
        }
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
                    {quantityInCart < 1 ? 
                        <button onClick={() => {setCart([...cart, props.book.isbn])}}>🛒 Ajouter au panier</button>
                        :
                        <div className="cart-counter">
                            <button onClick={handleRemoveFromCart} className="minus">-</button>
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

BookItem.propTypes = {
    book: PropTypes.exact({
        cover: PropTypes.string.isRequired,
        isbn: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        synopsis: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    })
}

export default BookItem;
