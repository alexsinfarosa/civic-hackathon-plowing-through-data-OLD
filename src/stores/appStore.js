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

  @observable isLoading = false;

  @observable valueSlider = 0;
  @action setValueSlider = d => (this.valueSlider = d);

  @observable dataSet = "a";
  @observable mainData = dataJsonM1316;
  @observable dataSet = "2017/03/13 00:00:00";
  @action
  setDataSet = d => {
    this.dataSet = d;
    if (d === "a") {
      this.mainData = dataJsonM1316;
      this.dataSet = "2017/03/13 00:00:00";
    }
    if (d === "b") {
      this.mainData = dataJsonJ14;
      this.dataSet = "2018/01/01 00:00:00";
    }
    if (d === "c") {
      this.mainData = dataJsonJ69;
      this.dataSet = "2018/01/06 00:00:00";
    }
  };

  @action
  dateRangeArr = date => {
    let results = [];
    const min = getTime(new Date(date));
    for (let index = 0; index < 48; index++) {
      results.push(format(min + index * 7200000, "MM/DD ha"));
    }
    return results;
  };

  @computed
  get marks() {
    let p = {};
    this.dateRangeArr(this.dataSet).forEach((d, i) => {
      if (
        i === 0 ||
        i === 6 ||
        i === 12 ||
        i === 18 ||
        i === 24 ||
        i === 30 ||
        i === 36 ||
        i === 42 ||
        i === 47
      ) {
        p[i] = d;
      }
    });
    return p;
  }

  @action
  formatter = idx => {
    return this.dateRangeArr(this.dataSet)[idx];
  };

  @computed
  get allData() {
    return geojson.features.map((feature, i) => {
      feature.properties["LT"] = this.mainData[i]["LT"][this.valueSlider];
      return feature;
    });
  }
}
