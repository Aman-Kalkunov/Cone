import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Cone");
  }
  
  async getHtml() {
    return `
    <div id="cone" class="box"></div>
    `
  }
}