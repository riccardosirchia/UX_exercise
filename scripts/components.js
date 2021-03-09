define(['hyper-html'], function (hyperHTML) {
    const win = this;
    const customSelect = {
        render: function (config) {
            let selectedOption = {};

            const selectOptions = config.options.map((option) => {

                let selected = option.value == selectedOption.value;

                const selectOption = (event) => {

                    event.target.setAttribute('selected', true);

                    const currentSelectedElement = win.document.getElementById(selectedOption.value)
                    currentSelectedElement && currentSelectedElement.setAttribute('selected', false)

                    selectedOption = config.options.find(option => event.target.id == option.value);

                    const label = win.document.getElementById('custom-select-label');
                    label.innerHTML = selectedOption.text;
                }

                return hyperHTML.wire()`<button id=${option.value} selected=${selected} onclick=${selectOption}>${option.text}</button>`
            })

            const dropdownId = config.id + '-dropdown';

            const toggleDropdown = () => {
                const dropdown = win.document.getElementById(dropdownId)
                if (dropdown.classList.contains('open')) {
                    dropdown.classList.remove('open');
                } else{
                    dropdown.classList.add('open');
                }

            }
            return hyperHTML.wire()`
                <custom-select onclick=${toggleDropdown}>
                    <custom-select-input>
                        <ui-label id="custom-select-label">${selectedOption.text || 'Select a value...'}</ui-label>
                        <svg width=20 height=15>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 7.47a.75.75 0 00-1.06 0L10 10.94 6.53 7.47a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l4-4a.75.75 0 000-1.06z" fill="#09112B" />
                        </svg>
                    </custom-select-input>
                    <select-options id=${dropdownId}>
                        ${selectOptions}
                    </select-options>
                </custom-select>`;
        }
    }
    const button = {
        render: function(config) {
            return hyperHTML.wire()`
                <button id=${config.id}>
                    <ui-label>${config.caption}</ui-label>
                </button>`;
        }
    }
    return {customSelect, button};
})
