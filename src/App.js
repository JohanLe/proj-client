import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import io from "socket.io-client";
import MainHeader from "./components/general/header";
import allProducts from "./components/subpages/allProducts";
import registerUser from "./components/subpages/registerUser";
import login from "./components/subpages/login";
import myInventory from "./components/subpages/myInventory";
import deposit from "./components/subpages/deposit";
import graph from "./components/subpages/graph";

const socket = io.connect('http://localhost:8888');
var currentPrices = [];
socket.on('connect', function (prices) {
  console.info("Connected");
});
socket.on("newPrices", (newPrices) => {
  console.log(newPrices);
  if (currentPrices.length > 10) {
    currentPrices.shift();
  }
  currentPrices.push(newPrices);
  localStorage.setItem("prices", JSON.stringify(currentPrices));
  console.log("stored prices");
  console.log(localStorage.getItem("prices"));
})

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <div className="main-container">


          <Route exact path="/" component={allProducts} />
          <Route path="/register" component={registerUser} />
          <Route path="/login" component={login} />
          <Route path="/myinventory" component={myInventory} />
          <Route path="/deposit" component={deposit} />
          <Route path="/graph" component={graph} />
        </div>
      </div>
    </Router>
  );
}

export default App;
