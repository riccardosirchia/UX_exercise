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
            <div id="assignment">

                <h5 class="header">ASSIGNMENT</h5>
                <h1 class="title">Create the component</h1>
                <text class="description">We would like you to create the component below with its associated states - immediate and nested.</text>
                <div>${element}</div>

            </div>

    `
    }
    render();
 })
