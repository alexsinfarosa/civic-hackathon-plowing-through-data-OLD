import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main, Top, Body } from "./styles";
// import { Slider } from "antd";

// component
import SyracuseMap from "./components/SyracuseMap";

@inject("app")
@observer
class App extends Component {
  formatter(value) {
    return `${value}%`;
  }

  render() {
    return (
      <Main>
        <Top>
          <h1>Civic Hackathon: Plowing Through The Data</h1>
        </Top>
        <SyracuseMap />
      </Main>
    );
  }
}

export default App;
