(() => {
  class CustomInput extends HTMLElement {
    static get observedAttributes() {
      return ['placeholder', 'value', 'type', 'autocomplete', 'name'];
    }
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.template;
    }
    set autocomplete(val) {
      this.input.setAttribute('autocomplete', val);
    }
    set name(val) {
      this.input.setAttribute('name', val);
    }
    set type(val) {
      this.input.setAttribute('type', val);
    }
    set placeholder(val) {
      this.input.setAttribute('placeholder', val);
    }
    set value(val) {
      this.input.setAttribute('value', val);
    }
    get autocomplete() {
      return this.input.autocomplete;
    }
    get input() {
      return this.shadowRoot.querySelector('input');
    }
    get value() {
      return this.input.value;
    }
    get name() {
      return this.input.name;
    }
    addListener(name, cb) {
      if(name === 'input' || name === 'change' || name === 'value') {
        this.input.addEventListener(name, cb);
      } else {
        this.addEventListener(name, cb);
      }
    }
    attributeChangedCallback(name, old, value) {
      if (old !== value) this[name] = value;
    }
    get template() {
      return `
        <style>
          :host {
            display: flex;
            align-items: center;
            height: var(--custom-input-height, 48px);
            background: var(--custom-input-background, transparent);
            width: 100%;
            box-shadow: 0px 1px 3px -1px #333;
            min-width: 240px;
          }
          input {
            --webkit-visibility: none;
            border: none;
            background: transparent;
            height: var(--custom-input-height, 48px);
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
          }
        </style>
        <slot name="before"></slot>
        <input></input>
        <slot name="after"></slot>
      `;
    }
  }  customElements.define('custom-input', CustomInput);
})();

customElements.define('custom-search', class CustomSearch extends HTMLElement {
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
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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

customElements.define('custom-container', class CustomContainer extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML =  `
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 6px;
  }
  :host([row]) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    ::slotted(*) {
      max-width: 640px;
    }
  }
</style>
<slot></slot>
    `;
  }
});

var leofcoinExplorer = customElements.define('leofcoin-explorer', class LeofcoinExplorer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `    
    <style>
      custom-search {
        width: 100%;
      }
    </style>
    <header>
      <custom-container>
        <h1>Leofcoin Explorer</h1>
      </custom-container>
    </header>
    <custom-container>
      <custom-search type="search" name="search-query" placeholder="search block" autocomplete></custom-search>    
    </custom-container>
    `;
  }
})

export default leofcoinExplorer;
