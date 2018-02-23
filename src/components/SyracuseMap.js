import React, { Component } from "react";
import L from "leaflet";

// store the map configuration properties in an object,
// we could also move this to a separate file & import it if desired.
let config = {};
config.params = {
  center: [43.0481, -76.1474],
  zoomControl: false,
  zoom: 13,
  maxZoom: 18,
  minZoom: 9,
  scrollwheel: false,
  legends: false,
  infoControl: false,
  attributionControl: false
};
config.tileLayer = {
  // uri: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  uri: "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
  params: {
    minZoom: 9,
    id: "",
    accessToken: ""
  }
};

// array to store unique names of Brooklyn subway lines,
// this eventually gets passed down to the Filter component
let subwayLineNames = [];

export default class SyracuseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      subwayLinesFilter: "*",
      numEntrances: null
    };
    this._mapNode = null;
    this.updateMap = this.updateMap.bind(this);
    // this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    // this.filterFeatures = this.filterFeatures.bind(this);
    // this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);
  }

  componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    // this.getData();
    // create the Leaflet map object
    if (!this.state.map) this.init(this._mapNode);
  }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {
      // add the geojson overlay
      this.addGeoJSONLayer(this.state.geojson);
    }

    // check to see if the subway lines filter has changed
    if (this.state.subwayLinesFilter !== prevState.subwayLinesFilter) {
      // filter / re-render the geojson overlay
      this.filterGeoJSONLayer();
    }
  }

  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  //   getData() {
  //     // could also be an AJAX request that results in setting state with the geojson data
  //     // for simplicity sake we are just importing the geojson data using webpack's json loader
  //     this.setState({
  //       numEntrances: geojson.features.length,
  //       geojson
  //     });
  //   }

  updateMap(e) {
    let subwayLine = e.target.value;
    // change the subway line filter
    if (subwayLine === "All lines") {
      subwayLine = "*";
    }
    // update our state with the new filter value
    this.setState({
      subwayLinesFilter: subwayLine
    });
  }

  pointToLayer(feature, latlng) {
    // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers
    // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 4,
      fillColor: "orange",
      color: "#fff",
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, markerParams);
  }

  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft" }).addTo(map);
    // L.control.scale({ position: "bottomleft" }).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(
      config.tileLayer.uri,
      config.tileLayer.params
    ).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }

  render() {
    const { subwayLinesFilter } = this.state;
    return (
      <div id="mapUI">
        <div ref={node => (this._mapNode = node)} id="map" />
      </div>
    );
  }
}
