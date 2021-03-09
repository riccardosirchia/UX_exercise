 define([], async function () {

     const hh = await import('./external/hyperHTML/hyperHTML.js');
     return hh.default;

 });
