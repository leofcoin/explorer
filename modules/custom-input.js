export default (() => {
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
  };
  customElements.define('custom-input', CustomInput)
})();
