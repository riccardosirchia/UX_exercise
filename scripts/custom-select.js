define(['hyper-html'], function (hyperHTML) {
   const win = this
   return class CustomSelect {
        constructor(config) {
            this.isOpen = false;
            this.selectedOption = config.selectedOption || { };
            this.config = config;

        }
        toggleDropdown() {
            this.isOpen = !this.isOpen;
            win.render()
        }
        selectOption(event) {
            this.selectedOption = this.config.options.find(option => event.target.value == option.value)
        }
        render() {
            const selectOptions = this.config.options.map((option) => {
                let selected = option.value == this.selectedOption.value;
                return hyperHTML.wire()`
                    <button id=${option.value} selected=${selected} value=${option.value} onclick=${option.action || this.selectOption.bind(this)}>
                        ${option.text}
                    </button>`
            })
            return hyperHTML.wire()`
                <custom-select onclick=${this.toggleDropdown.bind(this)} id = ${this.config.id}>
                    <custom-select-input>
                        <ui-label id="custom-select-label">${this.selectedOption.value || 'Select a value...'}</ui-label>
                        <svg width=20 height=15>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 7.47a.75.75 0 00-1.06 0L10 10.94 6.53 7.47a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l4-4a.75.75 0 000-1.06z" fill="#09112B" />
                        </svg>
                    </custom-select-input>
                    <select-options class=${this.isOpen && 'open'}>
                        ${selectOptions}
                    </select-options>
                </custom-select>`;
        }
    }
});
