define(['hyper-html', 'custom-select'], function (hyperHTML, CustomSelect) {
    const win = this;
    return {
        customSelect: {
            render: function (config) {
                this.instance = this.instance || new CustomSelect(config);
                return this.instance.render()
            }
        },
        button: {
            render: function (config) {
                return hyperHTML.wire()`
                    <button id=${config.id} onclick=${config.onclick}>
                        <ui-label>${config.caption}</ui-label>
                    </button>`;
            }
        },
        input: {
            render: function (config) {
                return hyperHTML.wire()`
                    <input id=${config.id} type=${config.type}>
                    </input>`;
            }
        },
    }
})
