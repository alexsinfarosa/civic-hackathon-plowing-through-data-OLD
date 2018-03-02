import { observable, action, computed } from "mobx";

// datasets
import dataJsonJ14 from "../assets/LT_J1_4.json";
import dataJsonJ69 from "../assets/LT_J6_9.json";
import dataJsonM1316 from "../assets/LT_M13_16.json";

import format from "date-fns/format";
import getTime from "date-fns/get_time";
import geojson from "../assets/geojson.json";

export default class AppStore {
  fetch;
  constructor(fetcher) {
    this.fetch = fetcher;
  }

  // @observable date = new Date("2017/03/13 00:00:00");
  // @action setDate = d => (this.date = d);

  @observable isLoading = false;
  @observable dataSet = "a";
  @observable mainData = dataJsonM1316;
  @action
  setDataSet = d => {
    console.log(d);
    this.dataSet = d;
    if (d === "a") {
      this.mainData = dataJsonM1316;
      this.valueSlider = getTime(new Date("2017/03/13 00:00:00"));
    }
    if (d === "b") {
      this.mainData = dataJsonJ14;
      this.valueSlider = getTime(new Date("2018/01/01 00:00:00"));
    }
    if (d === "c") {
      this.mainData = dataJsonJ69;
      this.valueSlider = getTime(new Date("2018/01/06 00:00:00"));
    }
  };

  @computed
  get dateRadio() {
    if (this.dataSet === "a") {
      return new Date("2017/03/13 00:00:00");
    }

    if (this.dataSet === "b") {
      return new Date("2018/01/01 00:00:00");
    }

    if (this.dataSet === "c") {
      return new Date("2018/01/06 00:00:00");
    }
  }

  @computed
  get min() {
    return getTime(new Date(this.dateRadio));
  }

  @computed
  get max() {
    return this.min + 94 * 3600000;
  }

  @computed
  get marks() {
    let dates = {};
    for (let index = 0; index < 95; index++) {
      const date = format(new Date(this.min + index * 3600000), "MM/DD HH:00");
      if (
        index === 0 ||
        index === 12 ||
        index === 24 ||
        index === 36 ||
        index === 48 ||
        index === 60 ||
        index === 72 ||
        index === 84
      ) {
        dates[this.min + index * 3600000] = date;
      }
      if (index === 94) {
        dates[this.min + index * 3600000] = date;
      }
    }
    return dates;
  }

  @observable valueSlider = this.min;
  @action setValueSlider = d => (this.valueSlider = d);

  @action
  formatter = value => {
    return format(new Date(value), "MM/DD/YY HH:mm");
  };

  @computed
  get sliderIndeces() {
    let dates = [];
    for (let index = 0; index < 95; index += 2) {
      dates.push(this.min + index * 3600000);
    }
    return dates;
  }

  @computed
  get sliderIdx() {
    const idx = this.sliderIndeces.indexOf(this.valueSlider);
    if (idx === -1) {
      return 0;
    }
    return idx;
  }

  @computed
  get allData() {
    return geojson.features.map((feature, i) => {
      feature.properties["LT"] = this.mainData[i]["LT"][this.sliderIdx];
      return feature;
    });
  }
}
