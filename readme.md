## The test
Fork this repo.

Running the project you will se a dropdown.

Implement the styling and functionality shown here: 

https://www.figma.com/file/dwg4a7Irf2sctF3XP8u41a/UX-developer---Assignment?node-id=0%3A1

It's a dropdown where you can choose from a selection of domains.

It also have the option for the user to add a new domain that is not already on the list.

Pressing the "+ Add new domain" transforms the dropdown to a input field.

Remember to consider validation and invalid state.


## Run it

This is a basic example project so you have the structure to start coding, it is a simplification of our real environment.
To get it running just execute the following command in the root of the project.

`python -m SimpleHTTPServer 8000`

now you can navigate to http://localhost:8000/ to test your code.

Feel free to add/remove/modify the files in your fork

This is your playground!

## How it works

- We use `requirejs` to create modules, more info on how it works here: https://requirejs.org/
- We use `hyperHTML` to render our layout, more info on how it works here: https://viperhtml.js.org/hyperhtml/documentation/#essentials-01

But don't worry, you dont need to be an expert.
For now, the only important thing is that you can find the main html of the app in `scripts/app.js` file, the code for the custom select component is in `scripts/custom-select.js` and the elements to be used across the app are in `scripts/components.js`
