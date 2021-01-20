import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }

  async getHtml() {
    return `
    <h1 class="heading">Enter the cone parameters for triangulation calculation.</h1>
      <form class="form border" action="/" method="POST">
        <label>
          Radius:
          <input
            class="form__input border"
            name="radius"
            type="number"
            min="1"
            placeholder="Only positive"
            required
          />
        </label>
        <label>
        Cone Height:
          <input
            class="form__input border"
            name="height"
            type="number"
            placeholder="10"
            required
          />
        </label>
        <label>
          Number Of Segments:
          <input
            class="form__input border"
            name="segments"
            type="number"
            min="3"
            max="64"
            step="1"
            placeholder="From 3 to 64"
            required
          />
        </label>
        <input class="button submit border" type="submit" value="Submit" data-form/>
      </form>
    `;
  }
}