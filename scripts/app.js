require(['components', 'hyper-html'], function (components, hyperHTML) {
    var win = this;
    let showSelect = true;
    let domains = new Set(['dashboard.sleeknote.com', 'sleeknote.com', 'app.sleeknote.com']);

    render = () => {
        const customSelect = components.customSelect.render({
            id: 'exampleSelect',
            caption: 'Example Select',
            options: [
                ...Array.from(domains).map(domain => ({text: domain, value: domain})),
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
            type: 'text',
            pattern: '^((?:https?:\\/\\/)?[^./]+(?:\\.[^./]+)+(?:\\/.*)?)$',
            title: 'Please enter a valid domain',
        })
        const addButton = components.button.render({
            id: 'addButton',
            caption: 'Add',
            type: 'submit',
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
        const onsubmit = (event) => {
            event.preventDefault();
            domains.add(event.target.elements.inputDomain.value);
            showSelect = true;
            render()
        }
        // main HTML goes here
        hyperHTML.bind(win.document.body)`
            <div id="assignment">
                <h5 class="header">ASSIGNMENT</h5>
                <h1 class="title">Create the component</h1>
                <text class="description">We would like you to create the component below with its associated states - immediate and nested.</text>
                <div>${element}</div>
                <form onsubmit=${onsubmit} id=form hidden />
            </div>

    `
    }
    render();
 })
