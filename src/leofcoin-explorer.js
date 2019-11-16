import './custom-search.js';
import './custom-container.js';

export default customElements.define('leofcoin-explorer', class LeofcoinExplorer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    
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
    `
    
    this._onSearch = this._onSearch.bind(this)
  }
  
  get search() {
    return this.shadowRoot.querySelector('custom-search')
  } 
  
  connectedCallback() {
    this.search.addEventListener('search', this._onSearch)
  }
  
  async _onSearch({detail}) {
    try {
      const result = await api.get(detail)
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
})