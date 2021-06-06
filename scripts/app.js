require(['components', 'hyper-html'], function (components, hyperHTML) {
    var win = this;
    let showSelect = true;
    let domains = new Set(['dashboard.sleeknote.com', 'sleeknote.com', 'app.sleeknote.com']);
    let selectedOption;

    function addClass() {
        floatContainer.classList.add('active');
    }

    render = () => {
        let options = Array.from(domains).map(domain => ({text: domain, value: domain}))

        const customSelect = components.customSelect.render({
            id: 'exampleSelect',
            caption: 'Example Select',
            options: [
                ...options,
                {
                    value: 'add-button',
                    text: 'Add Domain',
                    action: () => {
                        showSelect = false
                        render()
                    },
                }],
            selectedOption,
        })
        const inputText = components.input.render({
            id: 'inputDomain',
            placeholder: 'https://www.domain.com',
            type: 'text',
            pattern: '^((?:https?:\\/\\/)?[^./]+(?:\\.[^./]+)+(?:\\/.*)?)$',
            title: 'Please enter a valid domain',
            onclick: () => {
                addClass()
            }
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
            <div class="input-action-container">
                ${addButton}
                ${cancelButton}
            </div>
        `
        const element = showSelect ? customSelect : input;

        const onsubmit = (event) => {
            event.preventDefault();
            domains.add(event.target.elements.inputDomain.value);
            showSelect = true;
            selectedOption = {
                text: event.target.elements.inputDomain.value,
                value: event.target.elements.inputDomain.value
            }
            render()
        }
        // main HTML goes here
        hyperHTML.bind(win.document.body)`
            <div id="assignment">
                <div class="form-layout">
                    <h5 class="header upper">Assignment</h5>
                    <h1 class="title">Create the component</h1>
                    <text class="description">We would like you to create the component below with its associated states - immediate and nested.</text>
                    <div>${element}</div>
                    <form onsubmit=${onsubmit} id=form hidden />
                </div>
            </div>
    `
    }
    render();
 })
