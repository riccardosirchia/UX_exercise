define(['hyper-html', 'custom-select'], function (hyperHTML, CustomSelect) {
    const win = this;
    return {
        customSelect: {
            render: function (config) {
                if (!this.instance || (this.instance && JSON.stringify(this.instance.config) != JSON.stringify(config))) {
                    this.instance = new CustomSelect(config);
                }
                return this.instance.render()
            }
        },
        button: {
            render: function (config) {
                return hyperHTML.wire()`
                    <button form="form" type=${config.type || 'button'} id=${config.id} onclick=${config.onclick}>
                        <ui-label>${config.caption}</ui-label>
                    </button>`;
            }
        },
        input: {
            render: function (config) {
                return hyperHTML.wire()`
                    <input required=${config.required} form="form" id=${config.id} type=${config.type} oninput=${config.oninput} pattern=${config.pattern} title=${config.title}/>`;
            }
        },
    }
})
