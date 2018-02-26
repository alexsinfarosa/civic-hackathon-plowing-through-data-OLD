import { observable, action, computed } from "mobx";
import dataJson from "../assets/data.json";

import format from "date-fns/format";
import getTime from "date-fns/get_time";
import geojson from "../assets/geojson.json";

export default class AppStore {
  fetch;
  constructor(fetcher) {
    this.fetch = fetcher;
  }

  @observable date = new Date("2017/03/13 00:00:00");
  @action setDate = d => (this.date = d);

  @computed
  get dateRadio() {
    if (this.dataSet === "b") {
      return new Date("2018/01/01 00:00:00");
    }
    if (this.dataSet === "c") {
      return new Date("2018/01/06 00:00:00");
    }

    return new Date("2017/03/13 00:00:00");
  }

  @computed
  get min() {
    return getTime(new Date(this.dateRadio));
  }

  @computed
  get max() {
    return this.min + 96 * 3600000;
  }

  @computed
  get marks() {
    let dates = {};
    for (let index = 0; index < 97; index += 12) {
      const date = format(new Date(this.min + index * 3600000), "MM/DD HH:00");
      dates[this.min + index * 3600000] = date;
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
  get sliderIdx() {
    return this.marks[this.valueSlider];
  }

  @computed
  get allData() {
    return geojson.features.map((feature, i) => {
      feature.properties["LT"] = dataJson[i]["LT"][this.sliderIdx];
      return feature;
    });
  }

  @observable dataSet = "a";
  @action setDataSet = d => (this.dataSet = d);
}
