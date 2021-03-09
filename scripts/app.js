require(['components', 'hyper-html'], function (components, hyperHTML) {
    var win = this;
    let showSelect = true;
    let domains = ['dashboard.sleeknote.com', 'sleeknote.com', 'app.sleeknote.com'];

    render = () => {
        const customSelect = components.customSelect.render({
            id: 'exampleSelect',
            caption: 'Example Select',
            options: [
                ...domains.map(domain => ({text: domain, value: domain})),
                {
                    value: 'add-domain',
                    text: 'Add Domain',
                    action: () => {
                        showSelect = false
                        render()
                    },
                }],
        })
        const inputText = components.input.render({
            id: 'inputDomain',
            type: 'text'
        })
        const addButton = components.button.render({
            id: 'addButton',
            caption: 'Add',
        })
        const cancelButton = components.button.render({
            id: 'cancelButton',
            caption: 'Cancel',
            onclick: () => {
                showSelect = true;
                render();
            }
        })
        const input = hyperHTML.wire()`
            ${inputText}
            ${addButton}
            ${cancelButton}
        `
        const element = showSelect ? customSelect : input;

        // main HTML goes here
        hyperHTML.bind(win.document.body)`

            <h1>Your test project</h1>

            <div>${element}</div>

    `
    }
    render();
 })
