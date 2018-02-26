import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import {
  Map,
  TileLayer,
  //   Marker,
  Popup,
  GeoJSON
} from "react-leaflet";

@inject("app")
@observer
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
      console.log("Current zoom level -> ", leafletMap.getZoom());
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const { allData } = this.props.app;

    const RenderGeojson = d => {
      return allData.map((obj, i) => {
        const { properties } = obj;
        const lapsedTime = properties.LT;
        let style = { color: "" };

        // console.log(lineColor[i]);
        if (lapsedTime >= 0 && lapsedTime <= 6) {
          style = { color: "green", opacity: 0.7 };
        }

        if (lapsedTime > 6 && lapsedTime <= 12) {
          style = { color: "orange", opacity: 0.7 };
        }

        if (lapsedTime > 12) {
          style = { color: "red", opacity: 0.7 };
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
      <Map
        style={{ width: "100%", height: "100%" }}
        center={position}
        zoom={this.state.zoom}
        ref={m => (this.leafletMap = m)}
      >
        <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
        <RenderGeojson />
      </Map>
    );
  }
}
