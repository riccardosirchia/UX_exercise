(function () {
	var win = this;
	var doc = win.document;
	var config = {};

	if ('require' in win) {
		config = require;
		//2
	}

	var promises = {};
	var resolvers = {};
	var rejectors = {};
	var modules = {};
	var deps = {};
	var srcs = {};

	function insertScript(name, onload, onerror) {
		var script = doc.createElement('script');
		var current = doc.currentScript;
		var base = current ? current.src.substr(0, current.src.lastIndexOf('/') + 1) : '';
		script.onload = onload;
		script.onerror = onerror;
		script.name = name;
		script.async = true;
		script.setAttribute('charset', 'utf-8');
		doc.head.appendChild(script);
		script.src = base + (~name.indexOf('.js') ? name : name + '.js');
	}

	function loadScript(name) {
		return (
			promises[name] ||
			(promises[name] = new win.Promise(function (resolve, reject) {
				resolvers[name] = resolve;
				rejectors[name] = reject;
				insertScript(
					name,
					function () {
						srcs[name] = this.src;
						if (!(name in deps)) resolvers[name](name);
					},
					function (event) {
						rejectors[name](name);
						throw new Error('Error loading: ' + event.currentTarget.src);
					}
				);
			}))
		);
	}

	// var sleekNoteCache = win.caches.open('sleeknote');

	// function addToCache() {
	// 	sleekNoteCache.then(cache => {
	// 		var urls = Object.keys(srcs).map(name => srcs[name]);
	// 		var matches = urls.map(url => cache.match(url));
	// 		win.Promise.all(matches).then(responses => {
	// 			var toCache = responses
	// 				.map((r, i) => {
	// 					if (r) return; // resolved, exists in cache
	// 					return urls[i];
	// 				})
	// 				.filter(e => e);
	// 			if (toCache.length) {
	// 				console.log('put', toCache);
	// 				cache.addAll(toCache);
	// 			}
	// 		});
	// 	});
	// }
	function require(moduleNames, callback) {
		if (moduleNames === String(moduleNames)) {
			// allow just string attributes for Promise - require('foo', 'bar').then(...
			moduleNames = [...arguments];
			callback = 0;
		}
		if ('config' in require) {
			require.cfg = config = Object.assign(config, require.config);
			delete require.config;
		}
		return win.Promise.all(moduleNames.map(loadScript)).then(async function (names) {
			//addToCache();
			var mods = names.map((name) => modules[name]);
			if (callback) {
				await callback.apply(win, mods);
			} else {
				return win.Promise.resolve(mods);
			}
		});
		/*.catch(function(...args) {
				console.warn(`Require error:`, ...args);
			})*/
	}

	function define(...args) {
		var currentName = doc.currentScript.name;
		var name = typeof args[0] == 'string' ? args.shift() : currentName;
		var moduleNames = Array.isArray(args[0]) ? args.shift() : [];
		var callback = args[0];

		//console.log(name, moduleNames, callback);

		deps[name] = moduleNames;
		win.Promise.all(moduleNames.map(loadScript))
			.then(async function (names) {
				/*this allows import of ES6 modules - 
					define([..], async function(...
						let module = await import('./foo.js');
						let bar = module.default;
									
				*/
				modules[name] = await callback.apply(
					win,
					names.map((name) => modules[name])
				);
				if (currentName != name) modules[currentName] = modules[name];
				resolvers[name] && resolvers[name](name);
			})
			.catch(function (...args) {
				console.warn('Define error', name, ...args);
				rejectors[name] && rejectors[name](name);
			});
	}

	define.amd = {
		jQuery: true,
	};
	win.define = define;

	require.cfg = config;
	require.modules = modules;
	require.srcs = srcs;
	require.insertScript = insertScript;
	win.require = require;

	var main = doc.currentScript.getAttribute('data-main');
	main && insertScript(main);
}.call(this));
