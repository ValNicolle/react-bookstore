import React from 'react'
import { useStore } from "react-context-hook"

function MiniCart () {


    const [cart] = useStore("cart", [])
    const quantityInCart = cart.length


	return (

       <div data-testid="MiniCart" className="MiniCart">🛒<div className="qty">{quantityInCart}</div></div>

		);
	
	
	
}

export default MiniCart;
