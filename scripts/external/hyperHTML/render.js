// ! (c) Andrea Giammarchi (ISC) */

import tta from './template-tag-arguments.js';
import {OWNER_SVG_ELEMENT} from './constants.js';
import {Tagger} from './Updates.js';
const bewitched = new WeakMap;

function render(...args) {
	var obj = args.shift() || this;
	const wicked = bewitched.get(obj);
	args = tta.apply(null, args);
  	if (wicked && wicked.template === args[0]) {
    	wicked.tagger.apply(null, args);
  	} else {
  		const type = OWNER_SVG_ELEMENT in this ? 'svg' : 'html';
  		const tagger = new Tagger(type);
  		bewitched.set(obj, {tagger, template: args[0]});
  		this.textContent = '';
  		this.appendChild(tagger.apply(null, args));
  	}
 	 return this;
}

export default render;
