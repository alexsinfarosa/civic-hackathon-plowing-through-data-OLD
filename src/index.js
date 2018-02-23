import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Mobx
import { Provider } from "mobx-react";
import AppStore from "stores/appStore";

// hot reload
import { AppContainer } from "react-hot-loader";

const fetcher = url => window.fetch(url).then(response => response.json());
const app = new AppStore(fetcher);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider app={app}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

registerServiceWorker();

// Render once
render(App);

if (module.hot) {
  module.hot.accept("stores/appStore", () => {
    render(App);
  });
}
