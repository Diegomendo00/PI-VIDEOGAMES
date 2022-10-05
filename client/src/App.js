import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import CreateVideogame from "./Components/createVideogame";
import CardDetail from "./Components/cardDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreateVideogame} />
          <Route path="/detail/:idVideogame" component={CardDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
