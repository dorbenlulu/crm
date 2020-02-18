import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./Helpers/storeProvider";
import {ClientsStore} from "./Store/ClientsStore";

const clients = new ClientsStore();

ReactDOM.render(
  <StoreProvider value={clients}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
