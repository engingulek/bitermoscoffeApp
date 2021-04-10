import "./App.css";
import Card from "./component/Card";
import Header from "./component/Header";
import Menu from "./component/Menu";
import { BrowserRouter , Switch, Route, Link } from "react-router-dom";
import SingUp from "./component/SingUp";
import SingIn from "./component/SingIn";
import Cart from "./component/Cart";
import CartConfirm from "./component/CartConfirm";

function App() {
  return (
    <div className="app">
    <BrowserRouter>
    <Switch>
    <Route exact path="/">
    <div className="mainPage">
        <div className="header">
          <Header />
        </div>
        <div className="menu">
          <Menu />
        </div>
        <div className="cardAndCart">
        <div className="cardDesign">
          <Card />
          
        </div>
        <div className="cart">
        <Cart/>
        
        </div>
        
        </div>
        
      </div>
    </Route>
    <Route path="/singUp">
    <SingUp/>
    </Route>
    <Route path="/singIn">
    <SingIn/>
    
    </Route>
    <Route path="/cartConfirm">
    <CartConfirm/>
    
    </Route>
    
    </Switch>
    
    </BrowserRouter>
    
      

      
    </div>
  );
}

export default App;
