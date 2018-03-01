import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import {
  Main,
  Left,
  Right,
  Top,
  Body,
  DataSetButtons,
  Legend,
  Grey,
  Green,
  Orange,
  Red,
  Row,
  Title
} from "./styles";

// component
import SyracuseMap from "./components/SyracuseMap";
import logo from "./assets/Logo.png";
import { Slider, Radio, Modal, Button } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject("app")
@observer
class App extends Component {
  info = () => {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {}
    });
  };

  render() {
    const {
      min,
      max,
      marks,
      setValueSlider,
      formatter,
      setDataSet,
      dataSet
    } = this.props.app;
    console.log(dataSet);

    return (
      <Main>
        <Top>
          <div style={{ width: "100%", padding: "0 54px" }}>
            <Slider
              min={min}
              max={max}
              step={7200000}
              marks={marks}
              tipFormatter={formatter}
              onAfterChange={setValueSlider}
            />
          </div>
        </Top>

        <Body>
          <Left>
            <Title>
              <img src={logo} alt="logo" />
              <br />
              <h2 style={{ color: "#261C15", lineHeight: 1.3 }}>
                Snow Plow Coverage Time Lapse
              </h2>
            </Title>

            <DataSetButtons>
              <h5>Available Data Sets</h5>
              <RadioGroup
                style={{ display: "flex", flexDirection: "column" }}
                defaultValue="a"
                size="small"
                onChange={e => setDataSet(e.target.value)}
              >
                <RadioButton
                  style={{
                    width: 170,
                    marginBottom: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignitems: "center"
                  }}
                  value="a"
                >
                  03/13/17 - 03/17/17
                </RadioButton>
                <RadioButton
                  style={{
                    width: 170,
                    marginBottom: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignitems: "center"
                  }}
                  value="b"
                >
                  01/01/18 - 01/04/18
                </RadioButton>
                <RadioButton
                  style={{
                    width: 170,
                    display: "flex",
                    justifyContent: "center",
                    alignitems: "center"
                  }}
                  value="c"
                >
                  01/06/18 - 01/09/18
                </RadioButton>
              </RadioGroup>
            </DataSetButtons>

            <Legend>
              <h5>Hours Since Plowed</h5>
              <div>
                <Row>
                  <Grey />
                  not plowed
                </Row>
                <Row>
                  <Green />
                  0 - 6
                </Row>
                <Row>
                  <Orange />
                  6 - 12
                </Row>
                <Row>
                  <Red />
                  greater than 12
                </Row>
              </div>
            </Legend>
            <div style={{ margin: "0 auto" }}>
              <Button
                // type="primary"
                shape="circle"
                icon="info"
                onClick={this.info}
              />
            </div>
          </Left>

          <Right>
            <SyracuseMap />
          </Right>
        </Body>
      </Main>
    );
  }
}

export default App;
