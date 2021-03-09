/*! (c) Andrea Giammarchi (ISC) */
import unique from './template-literal.js';

export default function (template) {
  var length = arguments.length;
  var args = [unique(template)];
  var i = 1;
  while (i < length)
    args.push(arguments[i++]);
  return args;
};
