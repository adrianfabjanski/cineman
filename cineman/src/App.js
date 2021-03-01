import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import { DataProvider } from "./DataContext";
import Watchlater from "./components/Watchlater";
import Watched from "./components/Watched";
import Detail from "./components/Detail";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route path="/watchlater" component={Watchlater} />
            <Route path="/watched" component={Watched} />
            <Route path="/details" component={Detail} />
          </Switch>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
