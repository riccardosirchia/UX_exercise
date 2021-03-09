require(['components', 'hyper-html'], function (components, hyperHTML) {
    var win = this;
    var doc = win.document;


    const exampleButton = components.button.render({
        id: 'exampleButton',
        caption: 'Example Button'
    })

    const exampleSelect = components.customSelect.render({
        id: 'exampleSelect',
        caption: 'Example Select',
        options: [{
                text: 'option 1',
                value: 'option1',
            },
            {
                text: 'option 2',
                value: 'option2',
            }]
    })

     // main HTML goes here
    hyperHTML.bind(doc.body)`

        <h1>Your test project</h1>

        <div style="padding: 20px;">${exampleButton}</div>

        <div style="padding: 20px;">${exampleSelect}</div>
    `
 })
