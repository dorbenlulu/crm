import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
// import { observer, useObservable, useContext } from "mobx-react-lite";

import { StoreProvider } from "./Helpers/storeProvider";
import {ClientsStore} from "./Store/ClientsStore";

const clients = new ClientsStore();
// clients.addClient({
//   id: "5b9f48a2c9a69194604a2fb7",
//   name: "Lilly Conner",
//   email: "lillyconner@imant.com",
//   firstContact: "2018-12-27T22:00:00.000Z",
//   emailType: "B",
//   sold: true,
//   owner: "Shepherd Stone",
//   country: "Greece"
// });

ReactDOM.render(
  <StoreProvider value={clients}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
