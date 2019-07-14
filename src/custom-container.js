export default customElements.define('custom-container', class CustomContainer extends HTMLElement {
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
