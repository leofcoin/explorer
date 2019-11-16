import './../node_modules/custom-input/custom-input.js'

export default customElements.define('custom-search', class CustomSearch extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder']
  }
  set placeholder(value) {
    this.input.placeholder = value;
  }
  get placeholder() {
    return this.input.placeholder;
  }
  get input() {
    return this.shadowRoot.querySelector('custom-input');
  }
  get form() {
    return this.shadowRoot.querySelector('form');
  }
  
  connectedCallback() {
    this.input.addEventListener('keyup', e => {
      console.log(e);
      this.form.querySelector('[name="q"]').value = this.input.value;
      if (e.keyCode === 13) this.form.querySelector('button').click()
    })
    this.form.addEventListener('submit', e => {
      this.dispatchEvent(new CustomEvent('search', { detail: this.input.value }))
    })
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <style>
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 120px;
        max-width: 580px;
        height: 46px;
        border-radius: 24px;
        box-shadow: 0px 1px 3px -1px #333;
      }
      
      .flex {
        flex: 1;
      }
      
      .hidden {
        opacity: 0;
        pointer-events: none;
        height: 0px;
        width: 0px;
      }
      
      custom-input {
        width: calc(100% - 48px);
        box-shadow: none;
      }
      custom-input > input {
        outline: none;
      }
      .search-icon {
        padding: 12px;
        image: url('./../assets/search.svg')
      }
    </style>
    <img class="search-icon" src="assets/search.svg"></img>
    <custom-input placeholder="search" autocomplete="on" name="q"></custom-input>
    <img class="search-icon" src="assets/clear.svg"></img>
    <iframe id="remember" name="remember" class="hidden" src="about:blank"></iframe>

  <form target="remember" method="post" action="about:blank" class="hidden">
    <fieldset>
      <input type="search" name="q" value=""></input>
    </fieldset>
    <button type="submit" class="hidden"></button>
  </form>
    `;
  }
  
  attributeChangedCallback(name, old, value) {
     if (old !== value) this[name] = value;
   }
})