/*! (c) Andrea Giammarchi (ISC) */

//"version": "2.31.6",
// Simplified, only what we need in Sleeknote

import Intent from './Intent.js';
import {observe} from './Updates.js';
import wire from './wire.js';
import render from './render.js';

// obj work the same way as in wire()
const bind = (context, obj) => {
  	//SLEEKNOTE
	observe(context.ownerDocument.documentElement);
	//
    return render.bind(context, obj);
}

const define = Intent.define;

export {bind, define, wire};

export default {bind, define, wire};
