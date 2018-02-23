import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main } from "./styles";

@inject("app")
@observer
class App extends Component {
  render() {
    return <Main>It works!!</Main>;
  }
}

export default App;
