import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Cart from './Cart';
import { withStore} from 'react-context-hook'
import './App.scss';
import MiniCart from "./MiniCart";

function App() {
  return (
    <Router>
        <div className="App">
          <Link to='/cart'><MiniCart /></Link>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route exact path="/cart" component={Cart}/>
          </div>
        </div>
    </Router>
  );
}

 


export default withStore(App);
