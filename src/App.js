import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main } from "./styles";

// component
import SyracuseMap from "./components/SyracuseMap";

@inject("app")
@observer
class App extends Component {
  render() {
    return (
      <Main>
        <SyracuseMap />
      </Main>
    );
  }
}

export default App;
