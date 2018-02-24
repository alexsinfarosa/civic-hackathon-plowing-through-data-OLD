import React, { Component } from "react";
import geojson from "../assets/geojson.json";
import {
  Map,
  TileLayer,
  //   Marker,
  //   Popup,
  GeoJSON
} from "react-leaflet";

export default class SyracuseMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 43.0481,
      lng: -76.1474,
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
    let style = { color: "red" };
    d.properties.OBJECTID > 2000
      ? (style = { color: "red" })
      : (style = { color: "green" });
    return style;
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        style={{ width: "100%", height: "100vh" }}
        center={position}
        zoom={this.state.zoom}
        ref={m => (this.leafletMap = m)}
      >
        <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
        <GeoJSON data={geojson} style={this.lineColor} />
        {/*<Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
    </Marker>*/}
      </Map>
    );
  }
}
