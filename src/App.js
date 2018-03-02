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
import logo from "./assets/logo.png";
import { Slider, Radio, Modal, Button, Icon } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject("app")
@observer
class App extends Component {
  info = () => {
    Modal.info({
      title: "The Snow Plow Coverage Time Lapse",
      content: (
        <div>
          <p>
            The map is meant to provide a graphical display of where snow plows
            have been during 3 different time periods.
          </p>

          <p>
            The slider bar at the top of the screen moves the time forward or
            backwards in 2-hour increments.
          </p>

          <p>
            The color of the streets is an indicator of how long it has been
            since a plow was present on that street.
          </p>

          <p>
            Please note that the map does not indicate what sort of activity, if
            any, the plow performed while on a particular street, only that it
            was present on that street.
          </p>
        </div>
      ),
      okText: "Close",
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
      isLoading
      // valueSlider
    } = this.props.app;
    // console.log(min, valueSlider, max);
    return (
      <Main>
        <Top>
          <div style={{ width: "100%", padding: "0 48px" }}>
            <Slider
              min={min}
              max={max}
              // range={false}
              // value={valueSlider}
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
              <img src={logo} alt="logo" width={80} height={80} />
              <br />
              <h2 style={{ color: "#261C15", lineHeight: 1.3 }}>
                Snow Plow Coverage Time Lapse
              </h2>

              <Button
                size="small"
                onClick={this.info}
                style={{ marginRight: 10 }}
              >
                How to use the map
              </Button>
            </Title>

            <DataSetButtons>
              <h4>Available Data Sets</h4>
              <RadioGroup
                style={{ display: "flex", flexDirection: "column" }}
                defaultValue="a"
                size="small"
                onChange={e => setDataSet(e.target.value)}
              >
                <RadioButton
                  style={{
                    width: 170,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignitems: "center"
                  }}
                  value="a"
                >
                  03/13/17 - 03/16/17
                </RadioButton>
                <RadioButton
                  style={{
                    width: 170,
                    marginBottom: 10,
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
              <h4>Hours Since Plow was on Road</h4>
              <div>
                <Row>
                  <Grey />
                  not plowed
                </Row>
                <Row>
                  <Green />
                  0 - 12
                </Row>
                <Row>
                  <Orange />
                  12 - 24
                </Row>
                <Row>
                  <Red />
                  greater than 24
                </Row>
              </div>
            </Legend>
            <div style={{ margin: "0 auto" }}>
              <a
                style={{ marginRight: 15 }}
                href="https://github.com/alexsinfarosa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button icon="github" size="small">
                  Alex
                </Button>
              </a>
              <a
                href="https://github.com/d-w-olin/snowplows"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button icon="github" size="small">
                  Dean
                </Button>
              </a>
            </div>
          </Left>
          {!isLoading ? (
            <Right>
              <SyracuseMap />
            </Right>
          ) : (
            <Right>
              <Icon type="loading" style={{ fontSize: 20, color: "#08c" }} />
            </Right>
          )}
        </Body>
      </Main>
    );
  }
}

export default App;
