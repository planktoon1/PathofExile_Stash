import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Frontpage from "./Pages/Frontpage";
import About from "./Pages/About";
import NavBar from "./Components/NavBar";
import ItemContextProvider from "./contexts/ItemContext";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/frontpage" exact />
            <Route path="/frontpage">
              <ItemContextProvider>
                <Frontpage />
              </ItemContextProvider>
            </Route>
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
