// import { observable } from "mobx";

export default class AppStore {
  fetch;
  constructor(fetcher) {
    this.fetch = fetcher;
  }
}
