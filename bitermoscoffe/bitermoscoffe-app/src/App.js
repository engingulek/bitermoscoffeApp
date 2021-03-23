import "./App.css";
import Card from "./component/Card";
import Header from "./component/Header";
import Menu from "./component/Menu";

function App() {
  return (
    <div className="app">
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
  );
}

export default App;
