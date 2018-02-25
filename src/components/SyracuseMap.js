import React, { Component } from "react";
import geojson from "../assets/geojson.json";
import {
  Map,
  TileLayer,
  //   Marker,
  Popup,
  GeoJSON
} from "react-leaflet";

import { Body, Left, Right } from "../styles";
import { Slider } from "antd";

function formatter(value) {
  return `${marks[value]}`;
}

const marks = {
  0: "March 12th",
  25: "March 13th",
  50: "March 14th",
  75: "March 15th",
  100: "March 16th"
};

export default class SyracuseMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 43.035,
      lng: -76.14,
      zoom: 13
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on("zoomend", () => {
      window.console.log("Current zoom level -> ", leafletMap.getZoom());
    });
  }

  lineColor = d => {
    // console.log(d);
    let style = { color: "red" };
    d.properties.CFCC === "A40"
      ? (style = { color: "red" })
      : (style = { color: "green" });
    return style;
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const labelList = geojson.features.map((o, i) => {
      if (i < 20) {
        return <li>{o.properties.FULLNAME}</li>;
      }
    });

    const RenderGeojson = d => {
      return geojson.features.map(obj => {
        const { properties } = obj;
        let style = { color: "" };

        console.log(obj);
        if (properties.CFCC === "A21") {
          style = { color: "red", opacity: 0.5 };
        }

        return (
          <GeoJSON key={properties.OBJECTID} data={obj} style={style}>
            <Popup>
              <span>{properties.FULLNAME}</span>
            </Popup>
          </GeoJSON>
        );
      });
    };

    return (
      <Body>
        <div style={{ margin: "20px 40px" }}>
          <Slider marks={marks} defaultValue={25} tipFormatter={formatter} />
        </div>
        <Map
          style={{ width: "100%", height: "100%" }}
          center={position}
          zoom={this.state.zoom}
          ref={m => (this.leafletMap = m)}
        >
          <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
          {<RenderGeojson />}
        </Map>
      </Body>
    );
  }
}
