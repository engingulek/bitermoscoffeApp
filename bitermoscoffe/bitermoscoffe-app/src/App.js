import "./App.css";
import Card from "./component/Card";
import Header from "./component/Header";
import Menu from "./component/Menu";
import { BrowserRouter , Switch, Route, Link } from "react-router-dom";
import SingUp from "./component/SingUp";

function App() {
  return (
    <div className="app">
    <BrowserRouter>
    <Switch>
    <Route exact path="/">
    <div className="mainPage">
        <div>
          <Header />
        </div>
        <div>
          <Menu />
        </div>
        <div className="cardDesign">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Route>
    <Route path="/singUp">
    <SingUp/>
    </Route>
    
    </Switch>
    
    </BrowserRouter>
    
      

      
    </div>
  );
}

export default App;
