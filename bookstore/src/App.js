import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import './App.scss';

function App() {
  return (
    <Router>
        <div className="App">
          <nav className="App-nav">
            {/* <Link to='/input'>New message</Link> */}
          </nav>
          <div className="content">
            <Route exact path="/" component={Home}/>
            {/* <Route path="/private_messages" component={Messages}/> */}

          </div>

        </div>
        
      </Router>
  );
}

export default App;
