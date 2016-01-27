/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version fusioncharts/3.3.1-sr2.19840

 @attributions (infers respective third-party copyrights)
 Raphael 2.1.0 (modified as "Red Raphael") <http://raphaeljs.com/license.html>
 SWFObject v2.2 (modified) <http://code.google.com/p/swfobject/>
 JSON v2 <http://www.JSON.org/js.html>
 jQuery 1.8.3 <http://jquery.com/>
 Firebug Lite 1.3.0 <http://getfirebug.com/firebuglite>
*/
(function() {
	if (!window.FusionCharts || !window.FusionCharts.version) {
		var a = {},
			f = window,
			g = f.document,
			h = f.navigator,
			j = a.modules = {},
			d = a.interpreters = {},
			o = Object.prototype.toString,
			c = /msie/i.test(h.userAgent) && !f.opera,
			b = /loaded|complete/,
			i = !!g.createElementNS && !!g.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			t = !1,
			e = function() {
				var b = a.ready;
				a.ready = !0;
				if (a.raiseEvent) a.readyNotified = !0, a.raiseEvent("ready", {
					version: a.core.version,
					now: !b
				}, a.core);
				a.readyNow = !b
			},
			m = function(a, b) {
				var e,
					k;
				if (b instanceof Array)
					for (e = 0; e < b.length; e += 1) typeof b[e] !== "object" ? a[e] = b[e] : (typeof a[e] !== "object" && (a[e] = b[e] instanceof Array ? [] : {}), m(a[e], b[e]));
				else
					for (e in b) typeof b[e] === "object" ? (k = o.call(b[e]), k === "[object Object]" ? (typeof a[e] !== "object" && (a[e] = {}), m(a[e], b[e])) : k === "[object Array]" ? (a[e] instanceof Array || (a[e] = []), m(a[e], b[e])) : a[e] = b[e]) : a[e] = b[e];
				return a
			};
		a.extend = function(a, b, e, k) {
			var i;
			if (e && a.prototype) a = a.prototype;
			if (k === !0) m(a, b);
			else
				for (i in b) a[i] = b[i];
			return a
		};
		a.uniqueId =
			function() {
				return "chartobject-" + (a.uniqueId.lastId += 1)
			};
		a.uniqueId.lastId = 0;
		a.policies = {
			options: {
				swfSrcPath: ["swfSrcPath", void 0],
				product: ["product", "v3"],
				insertMode: ["insertMode", "replace"],
				safeMode: ["safeMode", !0],
				overlayButton: ["overlayButton", void 0],
				containerBackgroundColor: ["backgroundColor", "#ffffff"],
				chartType: ["type", void 0]
			},
			attributes: {
				lang: ["lang", "EN"],
				"class": ["className", "FusionCharts"],
				id: ["id", void 0]
			},
			width: ["width", "100%"],
			height: ["height", "100%"],
			src: ["swfUrl", ""]
		};
		d.stat = ["swfUrl",
			"id", "width", "height", "debugMode", "registerWithJS", "backgroundColor", "scaleMode", "lang", "detectFlashVersion", "autoInstallRedirect"
		];
		a.parsePolicies = function(b, e, i) {
			var k, c, d;
			for (c in e)
				if (a.policies[c] instanceof Array) d = i[e[c][0]], b[c] = d === void 0 ? e[c][1] : d;
				else
					for (k in typeof b[c] !== "object" && (b[c] = {}), e[c]) d = i[e[c][k][0]], b[c][k] = d === void 0 ? e[c][k][1] : d
		};
		a.parseCommands = function(a, b, e) {
			var i, c;
			typeof b === "string" && (b = d[b] || []);
			i = 0;
			for (c = b.length; i < c; i++) a[b[i]] = e[i];
			return a
		};
		a.core = function(b) {
			if (!(this instanceof a.core)) {
				if (arguments.length === 1 && b instanceof Array && b[0] === "private") {
					if (j[b[1]]) return;
					j[b[1]] = {};
					b[3] instanceof Array && (a.core.version[b[1]] = b[3]);
					return typeof b[2] === "function" ? b[2].call(a, j[b[1]]) : a
				}
				if (arguments.length === 1 && typeof b === "string") return a.core.items[b];
				a.raiseError && a.raiseError(this, "25081840", "run", "", new SyntaxError('Use the "new" keyword while creating a new FusionCharts object'))
			}
			var e = {};
			this.__state = {};
			if (arguments.length === 1 && typeof arguments[0] === "object") e = arguments[0];
			else if (a.parseCommands(e, d.stat, arguments), a.core.options.sensePreferredRenderer && e.swfUrl && e.swfUrl.match && !e.swfUrl.match(/[^a-z0-9]+/ig)) e.type = e.swfUrl;
			arguments.length > 1 && typeof arguments[arguments.length - 1] === "object" && (delete e[d.stat[arguments.length - 1]], a.extend(e, arguments[arguments.length - 1]));
			this.id = typeof e.id === "undefined" ? this.id = a.uniqueId() : e.id;
			this.args = e;
			if (a.core.items[this.id] instanceof a.core) a.raiseWarning(this, "06091847", "param", "", Error('A FusionChart oject with the specified id "' +
				this.id + '" already exists. Renaming it to ' + (this.id = a.uniqueId())));
			if (e.type && e.type.toString) {
				if (!a.renderer.userSetDefault && (c || i)) e.renderer = e.renderer || "javascript";
				e.swfUrl = (a.core.options.swfSrcPath || e.swfSrcPath || a.core.options.scriptBaseUri).replace(/\/\s*$/g, "") + "/" + e.type.replace(/\.swf\s*?$/ig, "") + ".swf"
			}
			a.parsePolicies(this, a.policies, e);
			this.attributes.id = this.id;
			this.resizeTo(e.width, e.height, !0);
			a.raiseEvent("BeforeInitialize", e, this);
			a.core.items[this.id] = this;
			a.raiseEvent("Initialized",
				e, this);
			return this
		};
		a.core.prototype = {};
		a.core.prototype.constructor = a.core;
		a.extend(a.core, {
			id: "FusionCharts",
			version: [3, 3, 1, "sr2", 19840],
			items: {},
			options: {
				sensePreferredRenderer: !0
			},
			getObjectReference: function(b) {
				return a.core.items[b].ref
			}
		}, !1);
		f.FusionCharts = a.core;
		f.FusionMaps && f.FusionMaps.legacy && (a.core(["private", "modules.core.geo", f.FusionMaps.legacy, f.FusionMaps.version]), t = !0);
		!b.test(g.readyState) && !g.loaded ? function() {
			function i() {
				if (!arguments.callee.done) {
					arguments.callee.done = !0;
					m && clearTimeout(m);
					if (!t) f.FusionMaps && f.FusionMaps.legacy && a.core(["private", "modules.core.geo", f.FusionMaps.legacy, f.FusionMaps.version]), f.FusionMaps = a.core;
					setTimeout(e, 1)
				}
			}

			function d() {
				b.test(g.readyState) ? i() : m = setTimeout(d, 10)
			}
			var m;
			g.addEventListener ? g.addEventListener("DOMContentLoaded", i, !1) : g.attachEvent && f.attachEvent("onLoad", i);
			if (c) try {
				f.location.protocol === "https:" ? g.write('<script id="__ie_onload_fusioncharts" defer="defer" src="//:"><\/script>') : g.write('<script id="__ie_onload_fusioncharts" defer="defer" src="javascript:void(0)"><\/script>'),
					g.getElementById("__ie_onload_fusioncharts").onreadystatechange = function() {
						this.readyState == "complete" && i()
					}
			} catch (k) {}
			/WebKit/i.test(h.userAgent) && (m = setTimeout(d, 10));
			f.onload = function(a) {
				return function() {
					i();
					a && a.call && a.call(f)
				}
			}(f.onload)
		}() : (a.ready = !0, setTimeout(e, 1));
		f.FusionMaps = a.core
	}
})();
(function() {
	var a = FusionCharts(["private", "EventManager"]);
	if (a !== void 0) {
		window.FusionChartsEvents = {
			BeforeInitialize: "beforeinitialize",
			Initialized: "initialized",
			Loaded: "loaded",
			BeforeRender: "beforerender",
			Rendered: "rendered",
			DataLoadRequested: "dataloadrequested",
			DataLoadRequestCancelled: "dataloadrequestcancelled",
			DataLoadRequestCompleted: "dataloadrequestcompleted",
			BeforeDataUpdate: "beforedataupdate",
			DataUpdateCancelled: "dataupdatecancelled",
			DataUpdated: "dataupdated",
			DataLoadCancelled: "dataloadcancelled",
			DataLoaded: "dataloaded",
			DataLoadError: "dataloaderror",
			NoDataToDisplay: "nodatatodisplay",
			DataXMLInvalid: "dataxmlinvalid",
			InvalidDataError: "invaliddataerror",
			DrawComplete: "drawcomplete",
			Resized: "resized",
			BeforeDispose: "beforedispose",
			Disposed: "disposed",
			Exported: "exported"
		};
		var f = function(a, d, h, c) {
				try {
					a[0].call(d, h, c || {})
				} catch (b) {
					setTimeout(function() {
						throw b;
					}, 0)
				}
			},
			g = function(j, d, h) {
				if (j instanceof Array)
					for (var c = 0, b; c < j.length; c += 1) {
						if (j[c][1] === d.sender || j[c][1] === void 0)
							if (b = j[c][1] === d.sender ?
								d.sender : a.core, f(j[c], b, d, h), d.detached === !0) j.splice(c, 1), c -= 1, d.detached = !1;
						if (d.cancelled === !0) break
					}
			},
			h = {
				unpropagator: function() {
					return (this.cancelled = !0) === !1
				},
				detacher: function() {
					return (this.detached = !0) === !1
				},
				undefaulter: function() {
					return (this.prevented = !0) === !1
				},
				listeners: {},
				lastEventId: 0,
				addListener: function(j, d, g) {
					if (j instanceof Array)
						for (var c = 0; c < j.length; c += 1) h.addListener(j[c], d, g);
					else typeof j !== "string" ? a.raiseError(g || a.core, "03091549", "param", "::EventTarget.addListener", Error("Unspecified Event Type")) :
						typeof d !== "function" ? a.raiseError(g || a.core, "03091550", "param", "::EventTarget.addListener", Error("Invalid Event Listener")) : (j = j.toLowerCase(), h.listeners[j] instanceof Array || (h.listeners[j] = []), h.listeners[j].push([d, g]))
				},
				removeListener: function(j, d, g) {
					var c;
					if (typeof d !== "function") a.raiseError(g || a.core, "03091560", "param", "::EventTarget.removeListener", Error("Invalid Event Listener"));
					else if (j instanceof Array)
						for (c = 0; c < j.length; c += 1) h.removeListener(j[c], d, g);
					else if (typeof j !== "string") a.raiseError(g ||
						a.core, "03091559", "param", "::EventTarget.removeListener", Error("Unspecified Event Type"));
					else if (j = j.toLowerCase(), j = h.listeners[j], j instanceof Array)
						for (c = 0; c < j.length; c += 1) j[c][0] === d && j[c][1] === g && (j.splice(c, 1), c -= 1)
				},
				triggerEvent: function(j, d, o, c, b) {
					if (typeof j !== "string") a.raiseError(d, "03091602", "param", "::EventTarget.dispatchEvent", Error("Invalid Event Type"));
					else {
						j = j.toLowerCase();
						d = {
							eventType: j,
							eventId: h.lastEventId += 1,
							sender: d || Error("Orphan Event"),
							cancel: !1,
							stopPropagation: this.unpropagator,
							prevented: !1,
							preventDefault: this.undefaulter,
							detached: !1,
							detachHandler: this.detacher
						};
						if (c) d.originalEvent = c;
						g(h.listeners[j], d, o);
						g(h.listeners["*"], d, o);
						b && d.prevented === !1 && f(b, d.sender, d, o);
						return !0
					}
				}
			};
		a.raiseEvent = function(a, d, g, c, b) {
			return h.triggerEvent(a, g, d, c, b)
		};
		a.addEventListener = function(a, d) {
			return h.addListener(a, d)
		};
		a.removeEventListener = function(a, d) {
			return h.removeListener(a, d)
		};
		a.extend(a.core, {
			addEventListener: a.addEventListener,
			removeEventListener: a.removeEventListener
		}, !1);
		a.extend(a.core, {
			addEventListener: function(a, d) {
				return h.addListener(a, d, this)
			},
			removeEventListener: function(a, d) {
				return h.removeListener(a, d, this)
			}
		}, !0);
		a.addEventListener("BeforeDispose", function(a) {
			var d, g;
			for (d in h.listeners)
				for (g = 0; g < h.listeners[d].length; g += 1) h.listeners[d][g][1] === a.sender && h.listeners[d].splice(g, 1)
		});
		if (a.ready && !a.readyNotified) a.readyNotified = !0, a.raiseEvent("ready", {
			version: a.core.version,
			now: a.readyNow
		}, a.core)
	}
})();
(function() {
	var a = FusionCharts(["private", "ErrorHandler"]);
	if (a !== void 0) {
		var f = {
				type: "TypeException",
				range: "ValueRangeException",
				impl: "NotImplementedException",
				param: "ParameterException",
				run: "RuntimeException",
				comp: "DesignTimeError",
				undefined: "UnspecifiedException"
			},
			g = function(j, d, h, c, b, i) {
				var t = "#" + d + " " + (j ? j.id : "unknown-source") + c + " " + i + " >> ";
				b instanceof Error ? (b.name = f[h], b.module = "FusionCharts" + c, b.level = i, b.message = t + b.message, t = b.message, window.setTimeout(function() {
					throw b;
				}, 0)) : t += b;
				d = {
					id: d,
					nature: f[h],
					source: "FusionCharts" + c,
					message: t
				};
				a.raiseEvent(i, d, j);
				if (typeof window["FC_" + i] === "function") window["FC_" + i](d)
			};
		a.raiseError = function(a, d, h, c, b) {
			g(a, d, h, c, b, "Error")
		};
		a.raiseWarning = function(a, d, h, c, b) {
			g(a, d, h, c, b, "Warning")
		};
		var h = {
			outputHelpers: {
				text: function(a, d) {
					h.outputTo("#" + a.eventId + " [" + (a.sender.id || a.sender).toString() + '] fired "' + a.eventType + '" event. ' + (a.eventType === "error" || a.eventType === "warning" ? d.message : ""))
				},
				event: function(a, d) {
					this.outputTo(a, d)
				},
				verbose: function(a,
					d) {
					h.outputTo(a.eventId, a.sender.id, a.eventType, d)
				}
			},
			outputHandler: function(j, d) {
				typeof h.outputTo !== "function" ? a.core.debugMode.outputFailed = !0 : (a.core.debugMode.outputFailed = !1, h.currentOutputHelper(j, d))
			},
			currentOutputHelper: void 0,
			outputTo: void 0,
			enabled: !1
		};
		h.currentOutputHelper = h.outputHelpers.text;
		a.extend(a.core, {
			debugMode: {
				syncStateWithCharts: !0,
				outputFormat: function(a) {
					if (a && typeof a.toLowerCase === "function" && typeof h.outputHelpers[a = a.toLowerCase()] === "function") return h.currentOutputHelper =
						h.outputHelpers[a], !0;
					return !1
				},
				outputTo: function(g) {
					typeof g === "function" ? h.outputTo = g : g === null && (a.core.debugMode.enabled(!1), delete h.outputTo)
				},
				enabled: function(g, d, f) {
					var c;
					if (typeof g === "object" && arguments.length === 1) c = g, g = c.state, d = c.outputTo, f = c.outputFormat;
					if (typeof g === "function") {
						if (typeof d === "string" && (arguments.length === 2 || c)) f = d;
						d = g;
						g = !0
					}
					if (typeof g === "boolean" && g !== h.enabled) a.core[(h.enabled = g) ? "addEventListener" : "removeEventListener"]("*", h.outputHandler);
					if (typeof d === "function") h.outputTo =
						d;
					a.core.debugMode.outputFormat(f);
					return h.enabled
				},
				_enableFirebugLite: function() {
					window.console && window.console.firebug ? a.core.debugMode.enabled(console.log, "verbose") : a.loadScript("firebug-lite.js", function() {
						a.core.debugMode.enabled(console.log, "verbose")
					}, "{ startOpened: true }")
				}
			}
		}, !1)
	}
})();
FusionCharts(["private", "modules.mantle.ajax", function() {
	var a = this,
		f = window,
		g = parseFloat(navigator.appVersion.split("MSIE")[1]),
		h = g >= 5.5 && g <= 7 ? !0 : !1,
		j = f.location.protocol === "file:",
		d = f.ActiveXObject,
		o = (!d || !j) && f.XMLHttpRequest,
		c = {
			objects: 0,
			xhr: 0,
			requests: 0,
			success: 0,
			failure: 0,
			idle: 0
		},
		b = function() {
			var a;
			if (o) return b = function() {
				c.xhr++;
				return new o
			}, b();
			try {
				a = new d("Msxml2.XMLHTTP"), b = function() {
					c.xhr++;
					return new d("Msxml2.XMLHTTP")
				}
			} catch (t) {
				try {
					a = new d("Microsoft.XMLHTTP"), b = function() {
						c.xhr++;
						return new d("Microsoft.XMLHTTP")
					}
				} catch (e) {
					a = !1
				}
			}
			return a
		},
		f = a.ajax = function(a, b) {
			this.onSuccess = a;
			this.onError = b;
			this.open = !1;
			c.objects++;
			c.idle++
		};
	f.stats = function(b) {
		return b ? c[b] : a.extend({}, c)
	};
	f.prototype.headers = {
		"If-Modified-Since": "Sat, 29 Oct 1994 19:43:31 GMT",
		"X-Requested-With": "XMLHttpRequest",
		"X-Requested-By": "FusionCharts",
		Accept: "text/plain, */*",
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	};
	f.prototype.transact = function(i, d, e, m) {
		var u = this,
			l = u.xmlhttp,
			g = u.headers,
			k = u.onError,
			p = u.onSuccess,
			i = i === "POST",
			f, o;
		if (!l || h) l = b(), u.xmlhttp = l;
		l.onreadystatechange = function() {
			try {
				if (l.readyState === 4) !l.status && j || l.status >= 200 && l.status < 300 || l.status === 304 || l.status === 1223 || l.status === 0 ? (p && p(l.responseText, u, m, d), c.success++) : k && (k(Error("XmlHttprequest Error"), u, m, d), c.failure++), c.idle--, u.open = !1
			} catch (a) {
				k && k(a, u, m, d), window.FC_DEV_ENVIRONMENT && setTimeout(function() {
					throw a;
				}, 0), c.failure++
			}
		};
		try {
			l.overrideMimeType && l.overrideMimeType("text/plain");
			if (i)
				if (l.open("POST",
						d, !0), typeof e === "string") f = e;
				else {
					f = [];
					for (o in e) f.push(o + "=" + (e[o] + "").replace(/\=/g, "%3D").replace(/\&/g, "%26"));
					f = f.join("&")
				} else l.open("GET", d, !0), f = null;
			for (o in g) l.setRequestHeader(o, g[o]);
			l.send(f);
			c.requests++;
			c.idle++;
			u.open = !0
		} catch (B) {
			a.raiseError(a.core, "1110111515A", "run", "XmlHttprequest Error", B.message)
		}
		return l
	};
	f.prototype.get = function(a, b) {
		return this.transact("GET", a, void 0, b)
	};
	f.prototype.post = function(a, b, e) {
		return this.transact("POST", a, b, e)
	};
	f.prototype.abort = function() {
		var a =
			this.xmlhttp;
		this.open = !1;
		return a && typeof a.abort === "function" && a.readyState && a.readyState !== 0 && a.abort()
	};
	f.prototype.dispose = function() {
		this.open && this.abort();
		delete this.onError;
		delete this.onSuccess;
		delete this.xmlhttp;
		delete this.open;
		c.objects--;
		return null
	}
}]);
(function() {
	var a = FusionCharts(["private", "modules.mantle.runtime;1.1"]);
	if (a !== void 0) {
		var f = /(^|[\/\\])(fusioncharts\.js|fusioncharts\.debug\.js|fusioncharts\.core\.js|fusioncharts\.min\.js)([\?#].*)?$/ig;
		a.getScriptBaseUri = function(a) {
			var b = document.getElementsByTagName("script"),
				e = b.length,
				i, c;
			for (c = 0; c < e; c += 1)
				if (i = b[c].getAttribute("src"), !(i === void 0 || i === null || i.match(a) === null)) return i.replace(a, "$1")
		};
		a.core.options.scriptBaseUri = function() {
			var b = a.getScriptBaseUri(f);
			if (b === void 0) return a.raiseError(FusionCharts,
				"1603111624", "run", ">GenericRuntime~scriptBaseUri", "Unable to locate FusionCharts script source location (URL)."), "";
			return b
		}();
		var g = /[\\\"<>;&]/,
			h = /^[^\S]*?(sf|f|ht)(tp|tps):\/\//i,
			j = FusionChartsEvents.ExternalResourceLoad = "externalresourceload",
			d = {},
			o = {},
			c = {},
			b = {};
		a.isXSSSafe = function(a, b) {
			if (b && h.exec(a) !== null) return !1;
			return g.exec(a) === null
		};
		a.loadScript = function(e, i, m, k, g) {
			if (!e) return !1;
			var h = i && i.success || i,
				t = i && i.failure,
				f, x = {
					type: "script",
					success: !1
				},
				w = function() {
					b[f] = clearTimeout(b[f]);
					x.success ? h && h(e, f) : t && t(e, f);
					a.raiseEvent(j, x, a.core)
				},
				g = g ? "" : a.core.options.scriptBaseUri;
			f = g + e;
			a.isXSSSafe(f, !1) || (f = typeof window.encodeURIComponent === "function" ? window.encodeURIComponent(f) : window.escape(f));
			x.path = g;
			x.src = f;
			x.file = e;
			if (c[f] === !0 && k) return x.success = !0, x.notReloaded = !0, typeof i === "function" && (i(), a.raiseEvent(j, x, a.core)), !0;
			if (d[f] && k) return !1;
			d[f] = !0;
			o[f] && o[f].parentNode && o[f].parentNode.removeChild(o[f]);
			i = o[f] = document.createElement("script");
			i.type = "text/javascript";
			i.src =
				f;
			m && (i.innerHTML = m);
			if (typeof h === "function") c[f] = !1, b[f] = clearTimeout(b[f]), i.onload = function() {
				c[f] = !0;
				x.success = !0;
				w()
			}, i.onerror = function() {
				c[f] = !1;
				d[f] = !1;
				w()
			}, i.onreadystatechange = function() {
				if (this.readyState === "complete" || this.readyState === "loaded") c[f] = !0, x.success = !0, w()
			};
			document.getElementsByTagName("head")[0].appendChild(i);
			typeof t === "function" && (b[f] = setTimeout(function() {
				c[f] || w()
			}, a.core.options.html5ResourceLoadTimeout || 15E3));
			return !0
		};
		a.capitalizeString = function(a, b) {
			return a ?
				a.replace(b ? /(^|\s)([a-z])/g : /(^|\s)([a-z])/, function(a, b, e) {
					return b + e.toUpperCase()
				}) : a
		};
		var i = a.purgeDOM = function(a) {
				var b = a.attributes,
					e, k;
				if (b)
					for (e = b.length - 1; e >= 0; e -= 1) k = b[e].name, typeof a[k] === "function" && (a[k] = null);
				if (b = a.childNodes) {
					b = b.length;
					for (e = 0; e < b; e += 1) i(a.childNodes[e])
				}
			},
			t = function(a, b, e) {
				for (var i in a) {
					var c;
					if (a[i] instanceof Array) b[a[i][0]] = e[i];
					else
						for (c in a[i]) b[a[i][c][0]] = e[i][c]
				}
			},
			e = /[^\%\d]*$/ig,
			m = /^(FusionCharts|FusionWidgets|FusionMaps)/;
		a.extend(a.core, {
			dispose: function() {
				a.raiseEvent("BeforeDispose", {}, this);
				a.renderer.dispose(this);
				delete a.core.items[this.id];
				a.raiseEvent("Disposed", {}, this);
				for (var b in this) delete this[b]
			},
			clone: function(b, e) {
				var i = typeof b,
					c = {},
					d = a.extend({}, this.args, !1, !1);
				t(a.policies, d, this);
				t(a.renderer.getRendererPolicy(this.options.renderer), d, this);
				delete d.id;
				delete d.animate;
				delete d.stallLoad;
				c.link = d.link;
				d = a.extend({}, d, !1, !1);
				d.link = c.link;
				switch (i) {
					case "object":
						a.extend(d, b);
						break;
					case "boolean":
						e = b
				}
				return e ? d : new a.core(d)
			},
			isActive: function() {
				if (!this.ref ||
					document.getElementById(this.id) !== this.ref || typeof this.ref.signature !== "function") return !1;
				try {
					return m.test(this.ref.signature())
				} catch (a) {
					return !1
				}
			},
			resizeTo: function(b, i, c) {
				var d = {
					width: b,
					height: i
				};
				if (typeof b === "object") d.width = b.width, d.height = b.height, c = i;
				if (d.width && typeof d.width.toString === "function") this.width = d.width.toString().replace(e, "");
				if (d.height && typeof d.height.toString === "function") this.height = d.height.toString().replace(e, "");
				c !== !0 && a.renderer.resize(this, d)
			},
			chartType: function(a) {
				var b =
					this.src,
					e;
				if (typeof a === "string") this.src = a, this.isActive() && this.render();
				return (e = (e = b.substring(b.indexOf(".swf"), 0)) ? e : b).substring(e.lastIndexOf("/") + 1).toLowerCase().replace(/^fcmap_/i, "")
			}
		}, !0);
		window.getChartFromId = window.getMapFromId = function(b) {
			a.raiseWarning(this, "11133001041", "run", "GenericRuntime~getObjectFromId()", 'Use of deprecated getChartFromId() or getMapFromId(). Replace with "FusionCharts()" or FusionCharts.items[].');
			return a.core.items[b] instanceof a.core ? a.core.items[b].ref :
				window.swfobject.getObjectById(b)
		}
	}
})();
(function() {
	var a = FusionCharts(["private", "RendererManager"]);
	if (a !== void 0) {
		a.policies.options.containerElementId = ["renderAt", void 0];
		a.policies.options.renderer = ["renderer", void 0];
		a.normalizeCSSDimension = function(a, i, c) {
			var a = a === void 0 ? c.offsetWidth : a,
				i = i === void 0 ? c.offsetHeight : i,
				e;
			c.style.width = a = a.toString ? a.toString() : "0";
			c.style.height = i = i.toString ? i.toString() : "0";
			if (a.match(/^\s*\d*\.?\d*\%\s*$/) && !a.match(/^\s*0\%\s*$/) && c.offsetWidth === 0)
				for (e = c; e = e.offsetParent;)
					if (e.offsetWidth > 0) {
						a =
							(e.offsetWidth * parseFloat(a.match(/\d*/)[0]) / 100).toString();
						break
					}
			if (i.match(/^\s*\d*\.?\d*\%\s*$/) && !i.match(/^\s*0\%\s*$/) && c.offsetHeight <= 20)
				for (e = c; e = e.offsetParent;)
					if (e.offsetHeight > 0) {
						i = (e.offsetHeight * parseFloat(i.match(/\d*/)[0]) / 100).toString();
						break
					}
			e = {
				width: a.replace ? a.replace(/^\s*(\d*\.?\d*)\s*$/ig, "$1px") : a,
				height: i.replace ? i.replace(/^\s*(\d*\.?\d*)\s*$/ig, "$1px") : i
			};
			c.style.width = e.width;
			c.style.height = e.height;
			return e
		};
		var f = function() {
				a.raiseError(this, "25081845", "run", "::RendererManager",
					Error("No active renderer"))
			},
			g = {
				undefined: {
					render: f,
					remove: f,
					update: f,
					resize: f,
					config: f,
					policies: {}
				}
			},
			h = {},
			j = a.renderer = {
				register: function(b, i) {
					if (!b || typeof b.toString !== "function") throw "#03091436 ~renderer.register() Invalid value for renderer name.";
					b = b.toString().toLowerCase();
					if (g[b] !== void 0) return a.raiseError(a.core, "03091438", "param", "::RendererManager>register", 'Duplicate renderer name specified in "name"'), !1;
					g[b] = i;
					return !0
				},
				userSetDefault: !1,
				setDefault: function(b) {
					if (!b || typeof b.toString !==
						"function") return a.raiseError(a.core, "25081731", "param", "::RendererManager>setDefault", 'Invalid renderer name specified in "name"'), !1;
					if (g[b = b.toString().toLowerCase()] === void 0) return a.raiseError(a.core, "25081733", "range", "::RendererManager>setDefault", "The specified renderer does not exist."), !1;
					this.userSetDefault = !1;
					a.policies.options.renderer = ["renderer", b];
					return !0
				},
				notifyRender: function(b) {
					var i = a.core.items[b && b.id];
					(!i || b.success === !1 && !b.silent) && a.raiseError(a.core.items[b.id], "25081850",
						"run", "::RendererManager", Error("There was an error rendering the chart. Enable FusionCharts JS debugMode for more information."));
					if (i.ref = b.ref) b.ref.FusionCharts = a.core.items[b.id];
					a.raiseEvent("internal.DOMElementCreated", b, i)
				},
				protectedMethods: {
					options: !0,
					attributes: !0,
					src: !0,
					ref: !0,
					constructor: !0,
					signature: !0,
					link: !0,
					addEventListener: !0,
					removeEventListener: !0
				},
				getRenderer: function(a) {
					return g[a]
				},
				getRendererPolicy: function(a) {
					a = g[a].policies;
					return typeof a === "object" ? a : {}
				},
				currentRendererName: function() {
					return a.policies.options.renderer[1]
				},
				update: function(a) {
					h[a.id].update.apply(a, Array.prototype.slice.call(arguments, 1))
				},
				render: function(a) {
					h[a.id].render.apply(a, Array.prototype.slice.call(arguments, 1))
				},
				remove: function(a) {
					h[a.id].remove.apply(a, Array.prototype.slice.call(arguments, 1))
				},
				resize: function(a) {
					h[a.id].resize.apply(a, Array.prototype.slice.call(arguments, 1))
				},
				config: function(a) {
					h[a.id].config.apply(a, Array.prototype.slice.call(arguments, 1))
				},
				dispose: function(a) {
					h[a.id].dispose.apply(a, Array.prototype.slice.call(arguments,
						1))
				}
			},
			d = function(b) {
				return function() {
					if (this.ref === void 0 || this.ref === null || typeof this.ref[b] !== "function") a.raiseError(this, "25081617", "run", "~" + b + "()", "ExternalInterface call failed. Check whether chart has been rendered.");
					else return this.ref[b].apply(this.ref, arguments)
				}
			};
		a.addEventListener("BeforeInitialize", function(b) {
			var b = b.sender,
				i;
			if (typeof b.options.renderer === "string" && g[b.options.renderer.toLowerCase()] === void 0) b.options.renderer = a.policies.options.renderer[1];
			b.options.renderer =
				b.options.renderer.toLowerCase();
			h[b.id] = g[b.options.renderer];
			if (h[b.id].initialized !== !0 && typeof h[b.id].init === "function") h[b.id].init(), h[b.id].initialized = !0;
			a.parsePolicies(b, h[b.id].policies || {}, b.args);
			for (var c in h[b.id].prototype) b[c] = h[b.id].prototype[c];
			for (i in h[b.id].events) b.addEventListener(i, h[b.id].events[i])
		});
		a.addEventListener("Loaded", function(b) {
			var i = b.sender,
				b = b.sender.ref;
			i instanceof a.core && delete i.__state.rendering;
			if (!(b === void 0 || b === null || typeof b.getExternalInterfaceMethods !==
					"function")) {
				var c;
				try {
					c = b.getExternalInterfaceMethods(), c = typeof c === "string" ? c.split(",") : []
				} catch (e) {
					c = [], a.raiseError(i, "13111126041", "run", "RendererManager^Loaded", Error("Error while retrieving data from the chart-object." + (e.message && e.message.indexOf("NPObject") >= 0 ? " Possible cross-domain security restriction." : "")))
				}
				for (b = 0; b < c.length; b += 1) i[c[b]] === void 0 && (i[c[b]] = d(c[b]))
			}
		});
		var o = function(a, i) {
			if (typeof a[i] === "function") return function() {
				return a[i].apply(a, arguments)
			};
			return a[i]
		};
		a.addEventListener("loaded",
			function(b) {
				var i = b.sender;
				if (i.ref) {
					var c = a.renderer.protectedMethods,
						e = a.renderer.getRenderer(i.options.renderer).protectedMethods,
						d;
					for (d in b.sender)
						if (e && !c[d] && !(e[d] || i.ref[d] !== void 0)) try {
							i.ref[d] = o(b.sender, d)
						} catch (f) {}
				}
			});
		var c = function(a, i) {
			var c = document.getElementById(a),
				e = i.getAttribute("id");
			if (c === null) return !1;
			if (a === e) return !0;
			for (var e = i.getElementsByTagName("*"), d = 0; d < e.length; d += 1)
				if (e[d] === c) return !1;
			return !0
		};
		a.extend(a.core, {
			render: function(b) {
				var i, d;
				((i = window[this.id]) &&
					i.FusionCharts && i.FusionCharts === this || (i = this.ref) && i.FusionCharts && i.FusionCharts === this) && a.renderer.dispose(this);
				window[this.id] !== void 0 && a.raiseError(this, "25081843", "comp", ".render", Error("#25081843:IECompatibility() Chart Id is same as a JavaScript variable name. Variable naming error. Please use unique name for chart JS variable, chart-id and container id."));
				d = this.options.insertMode.toLowerCase() || "replace";
				if (b === void 0) b = this.options.containerElementId;
				typeof b === "string" && (b = document.getElementById(b));
				if (b === void 0 || b === null) return a.raiseError(this, "03091456", "run", ".render()", Error("Unable to find the container DOM element.")), this;
				if (c(this.id, b)) return a.raiseError(this, "05102109", "run", ".render()", Error("A duplicate object already exists with the specific Id: " + this.id)), this;
				i = document.createElement(this.options.containerElementType || "span");
				i.setAttribute("id", this.id);
				if (d !== "append" && d !== "prepend")
					for (; b.hasChildNodes();) b.removeChild(b.firstChild);
				d === "prepend" && b.firstChild ? b.insertBefore(i,
					b.firstChild) : b.appendChild(i);
				this.options.containerElement = b;
				this.options.containerElementId = b.id;
				if (d = i.style) d.position = "relative", d.textAlign = "left", d.lineHeight = "100%", d.display = "inline-block", d.zoom = "1", d["*DISPLAY"] = "inline";
				a.normalizeCSSDimension(this.width, this.height, i);
				this.__state.rendering = !0;
				a.raiseEvent("BeforeRender", {
					container: b,
					width: this.width,
					height: this.height,
					renderer: this.options.renderer
				}, this);
				a.renderer.render(this, i, a.renderer.notifyRender);
				return this
			},
			remove: function() {
				a.renderer.remove(this);
				return this
			},
			configure: function(b, i) {
				var c;
				b && (typeof b === "string" ? (c = {}, c[b] = i) : c = b, a.renderer.config(this, c))
			}
		}, !0);
		a.extend(a.core, {
			setCurrentRenderer: function() {
				var a = j.setDefault.apply(j, arguments);
				j.userSetDefault = !0;
				return a
			},
			getCurrentRenderer: function() {
				return j.currentRendererName.apply(j, arguments)
			},
			render: function() {
				var b = ["swfUrl", "id", "width", "height", "renderAt", "dataSource", "dataFormat"],
					i = {},
					c;
				if (arguments[0] instanceof a.core) return arguments[0].render(), arguments[0];
				for (c = 0; c < arguments.length &&
					c < b.length; c += 1) i[b[c]] = arguments[c];
				typeof arguments[arguments.length - 1] === "object" && (delete i[b[c - 1]], a.extend(i, arguments[arguments.length - 1]));
				if (i.dataFormat === void 0) i.dataFormat = FusionChartsDataFormats.XMLURL;
				return (new a.core(i)).render()
			}
		}, !1)
	}
})();
(function() {
	var a = FusionCharts(["private", "DataHandlerManager"]);
	if (a !== void 0) {
		window.FusionChartsDataFormats = {};
		var f = a.transcoders = {},
			g = {},
			h = {},
			j = /url$/i,
			d = function(b, c, d, e) {
				var m = !1,
					f = d.obj,
					g = d.format,
					d = d.silent;
				a.raiseEvent("DataLoadRequestCompleted", {
					source: "XmlHttpRequest",
					url: e,
					data: b,
					dataFormat: g,
					cancelDataLoad: function() {
						m = !0;
						c.abort();
						this.cancelDataLoad = function() {
							return !1
						};
						return !0
					},
					xmlHttpRequestObject: c.xhr
				}, f);
				m !== !0 ? f.setChartData(b, g, d) : a.raiseEvent("DataLoadCancelled", {
					source: "XmlHttpRequest",
					url: e,
					dataFormat: g,
					xmlHttpRequestObject: c.xhr
				}, f)
			},
			o = function(b, c, d, e) {
				d = d.obj;
				b = {
					source: "XmlHttpRequest",
					url: e,
					xmlHttpRequestObject: c.xhr,
					error: b,
					httpStatus: c.xhr && c.xhr.status ? c.xhr.status : -1
				};
				a.raiseEvent("DataLoadError", b, d);
				typeof window.FC_DataLoadError === "function" && window.FC_DataLoadError(d.id, b)
			};
		a.policies.options.dataSource = ["dataSource", void 0];
		a.policies.options.dataFormat = ["dataFormat", void 0];
		a.policies.options.dataConfiguration = ["dataConfiguration", void 0];
		a.policies.options.showDataLoadingMessage = ["showDataLoadingMessage", !0];
		a.addDataHandler = function(b, c) {
			if (typeof b !== "string" || f[b.toLowerCase()] !== void 0) a.raiseError(a.core, "03091606", "param", "::DataManager.addDataHandler", Error("Invalid Data Handler Name"));
			else {
				var d = {},
					e = b.toLowerCase();
				f[e] = c;
				c.name = b;
				d["set" + b + "Url"] = function(a) {
					return this.setChartDataUrl(a, b)
				};
				d["set" + b + "Data"] = function(a, e) {
					return this.setChartData(a, b, !1, e)
				};
				d["get" + b + "Data"] = function() {
					return this.getChartData(b)
				};
				window.FusionChartsDataFormats[b] = e;
				window.FusionChartsDataFormats[b +
					"URL"] = e + "URL";
				a.extend(a.core, d, !0)
			}
		};
		a.addEventListener("BeforeInitialize", function(a) {
			var a = a.sender,
				c = a.options.dataSource;
			g[a.id] = "";
			h[a.id] = {};
			if (c !== void 0 && c !== null) {
				a.__state.dataSetDuringConstruction = !0;
				if (typeof a.options.dataFormat !== "string") switch (typeof c) {
					case "function":
						c = a.options.dataSource = c(a);
						a.options.dataFormat = "JSON";
						break;
					case "string":
						a.options.dataFormat = /^\s*?\{[\s\S]*\}\s*?$/g.test(a.options.dataFormat) ? "JSON" : "XML";
						break;
					case "object":
						a.options.dataFormat = "JSON"
				}
				a.setChartData(c,
					a.options.dataFormat)
			}
		});
		a.addEventListener("BeforeDispose", function(a) {
			var c = a.sender;
			delete g[a.sender.id];
			delete h[a.sender.id];
			c && c.__state && c.__state.dhmXhrObj && c.__state.dhmXhrObj.abort()
		});
		a.extend(a.core, {
			setChartDataUrl: function(b, c, f) {
				if (c === void 0 || c === null || typeof c.toString !== "function") a.raiseError(a.core, "03091609", "param", ".setChartDataUrl", Error("Invalid Data Format"));
				else {
					var c = c.toString().toLowerCase(),
						e, m = this,
						g = m.options && m.options.renderer === "flash" && m.options.useLegacyXMLTransport ||
						!1;
					j.test(c) ? e = c.slice(0, -3) : (e = c, c += "url");
					a.raiseEvent("DataLoadRequested", {
						source: "XmlHttpRequest",
						url: b,
						dataFormat: e,
						cancelDataLoadRequest: function() {
							g = !0;
							a.raiseEvent("DataLoadRequestCancelled", {
								source: "XmlHttpRequest",
								url: b,
								dataFormat: e
							}, m);
							try {
								this.__state && this.__state.dhmXhrObj && this.__state.dhmXhrObj.abort()
							} catch (c) {}
							this.cancelDataLoadRequest = function() {
								return !1
							};
							return !0
						}
					}, m);
					if (g) {
						if (this.__state && this.__state.dhmXhrObj) try {
							this.__state.dhmXhrObj.abort()
						} catch (h) {}
					} else {
						this.options.dataSource =
							b;
						if (!this.__state.dhmXhrObj) this.__state.dhmXhrObj = new a.ajax(d, o);
						this.__state.dhmXhrObj.get(typeof window.decodeURIComponent === "function" ? window.decodeURIComponent(b) : window.unescape(b), {
							obj: this,
							format: e,
							silent: f
						})
					}
				}
			},
			setChartData: function(b, c, d) {
				if (c === void 0 || c === null || typeof c.toString !== "function") a.raiseError(a.core, "03091610", "param", ".setChartData", Error("Invalid Data Format"));
				else {
					var c = c.toString().toLowerCase(),
						e;
					if (j.test(c)) this.setChartDataUrl(b, c, d);
					else {
						this.options.dataSource =
							b;
						e = c;
						this.options.dataFormat = c;
						var c = f[e],
							m = !1;
						if (typeof c === "undefined") a.raiseError(a.core, "03091611", "param", ".setChartData", Error("Data Format not recognized"));
						else if (c = c.encode(b, this, this.options.dataConfiguration) || {}, c.format = c.dataFormat = e, c.dataSource = b, c.cancelDataUpdate = function() {
								m = !0;
								this.cancelDataUpdate = function() {
									return !1
								};
								return !0
							}, a.raiseEvent("BeforeDataUpdate", c, this), delete c.cancelDataUpdate, m === !0) a.raiseEvent("DataUpdateCancelled", c, this);
						else {
							g[this.id] = c.data || "";
							h[this.id] = {};
							if (d !== !0) this.options.safeMode === !0 && this.__state.rendering === !0 && !this.isActive() ? (this.__state.updatePending = c, a.raiseWarning(this, "23091255", "run", "::DataHandler~update", "Renderer update was postponed due to async loading.")) : (delete this.__state.updatePending, a.renderer.update(this, c));
							this.__state.dataReady = void 0;
							a.raiseEvent("DataUpdated", c, this)
						}
					}
				}
			},
			getChartData: function(b, c) {
				var e;
				var d;
				if (b === void 0 || typeof b.toString !== "function" || (d = f[b = b.toString().toLowerCase()]) === void 0) a.raiseError(this,
					"25081543", "param", "~getChartData()", Error('Unrecognized data-format specified in "format"'));
				else return e = typeof h[this.id][b] === "object" ? h[this.id][b] : h[this.id][b] = d.decode(g[this.id], this, this.options.dataConfiguration), d = e, Boolean(c) === !0 ? d : d.data
			},
			dataReady: function() {
				return this.__state.dataReady
			}
		}, !0);
		a.extend(a.core, {
			transcodeData: function(b, c, d, e, m) {
				if (!c || typeof c.toString !== "function" || !d || typeof d.toString !== "function" || f[d = d.toString().toLowerCase()] === void 0 || f[c = c.toString().toLowerCase()] ===
					void 0) a.raiseError(this, "14090217", "param", "transcodeData()", Error("Unrecognized data-format specified during transcoding."));
				else {
					b = f[c].encode(b, this, m);
					d = f[d].decode(b.data, this, m);
					if (!(d.error instanceof Error)) d.error = b.error;
					return e ? d : d.data
				}
			}
		}, !1);
		a.addEventListener("Disposed", function(a) {
			delete h[a.sender.id]
		});
		a.addEventListener("Loaded", function(b) {
			b = b.sender;
			b instanceof a.core && b.__state.updatePending !== void 0 && (a.renderer.update(b, b.__state.updatePending), delete b.__state.updatePending)
		});
		a.addEventListener("NoDataToDisplay", function(a) {
			a.sender.__state.dataReady = !1
		});
		var c = a._interactiveCharts = {
			selectscatter: [!0, !1],
			dragcolumn2d: [!0, !0],
			dragarea: [!0, !0],
			dragline: [!0, !0],
			dragnode: [!0, !0]
		};
		a.addEventListener("Loaded", function(b) {
			var b = b.sender,
				d = b.__state,
				f, e;
			if (b.chartType && c[b.chartType()] && c[b.chartType()][0]) {
				for (f in a.transcoders) e = a.transcoders[f].name, e = "get" + e + "Data", b[e] = function(e, b) {
					return function(c) {
						return c === !1 ? b.apply(this) : this.ref.getUpdatedXMLData ? a.core.transcodeData(this.ref.getUpdatedXMLData(),
							"xml", e) : this.getData ? this.getData(e) : b.apply(this)
					}
				}(f, b.constructor.prototype[e]), b[e]._dynamicdatarouter = !0;
				d.dynamicDataRoutingEnabled = !0
			} else if (d.dynamicDataRoutingEnabled) {
				for (f in a.transcoders) e = a.transcoders[f].name, e = "get" + e + "Data", b.hasOwnProperty(e) && b[e]._dynamicdatarouter && delete b[e];
				d.dynamicDataRoutingEnabled = !1
			}
		})
	}
})();
var swfobject = window.swfobject = function() {
	function a() {
		if (!D) {
			try {
				var a = n.getElementsByTagName("body")[0].appendChild(n.createElement("span"));
				a.parentNode.removeChild(a)
			} catch (e) {
				return
			}
			D = !0;
			for (var a = E.length, b = 0; b < a; b++) E[b]()
		}
	}

	function f(a) {
		D ? a() : E[E.length] = a
	}

	function g(a) {
		if (typeof w.addEventListener != v) w.addEventListener("load", a, !1);
		else if (typeof n.addEventListener != v) n.addEventListener("load", a, !1);
		else if (typeof w.attachEvent != v) u(w, "onload", a);
		else if (typeof w.onload == "function") {
			var e =
				w.onload;
			w.onload = function() {
				e();
				a()
			}
		} else w.onload = a
	}

	function h() {
		var a = n.getElementsByTagName("body")[0],
			e = n.createElement(y);
		e.setAttribute("type", B);
		var b = a.appendChild(e);
		if (b) {
			var c = 0;
			(function() {
				if (typeof b.GetVariable != v) {
					var d;
					try {
						d = b.GetVariable("$version")
					} catch (k) {}
					if (d) d = d.split(" ")[1].split(","), q.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
				} else if (c < 10) {
					c++;
					setTimeout(arguments.callee, 10);
					return
				}
				a.removeChild(e);
				b = null;
				j()
			})()
		} else j()
	}

	function j() {
		var a = s.length;
		if (a >
			0)
			for (var e = 0; e < a; e++) {
				var i = s[e].id,
					f = s[e].callbackFn,
					g = s[e].userData || {};
				g.success = !1;
				g.id = i;
				if (q.pv[0] > 0) {
					var h = m(i);
					if (h)
						if (l(s[e].swfVersion) && !(q.wk && q.wk < 312)) {
							if (k(i, !0), f) g.success = !0, g.ref = d(i), f(g)
						} else if (s[e].expressInstall && o()) {
						g = {};
						g.data = s[e].expressInstall;
						g.width = h.getAttribute("width") || "0";
						g.height = h.getAttribute("height") || "0";
						if (h.getAttribute("class")) g.styleclass = h.getAttribute("class");
						if (h.getAttribute("align")) g.align = h.getAttribute("align");
						for (var u = {}, h = h.getElementsByTagName("param"),
								j = h.length, p = 0; p < j; p++) h[p].getAttribute("name").toLowerCase() != "movie" && (u[h[p].getAttribute("name")] = h[p].getAttribute("value"));
						c(g, u, i, f)
					} else b(h), f && f(g)
				} else if (k(i, !0), f) {
					if ((i = d(i)) && typeof i.SetVariable != v) g.success = !0, g.ref = i;
					f(g)
				}
			}
	}

	function d(a) {
		var e, b = null;
		if (!document.embeds || !(e = document.embeds[a]))
			if (!((e = m(a)) && e.nodeName == "OBJECT")) e = window[a];
		if (!e) return b;
		typeof e.SetVariable != v ? b = e : (a = e.getElementsByTagName(y)[0]) && (b = a);
		return b
	}

	function o() {
		return !H && l("6.0.65") && (q.win ||
			q.mac) && !(q.wk && q.wk < 312)
	}

	function c(a, e, b, c) {
		H = !0;
		K = c || null;
		M = {
			success: !1,
			id: b
		};
		var d = m(b);
		if (d) {
			d.nodeName == "OBJECT" ? (G = i(d), I = null) : (G = d, I = b);
			a.id = x;
			if (typeof a.width == v || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) a.width = "310";
			if (typeof a.height == v || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) a.height = "137";
			n.title = n.title.slice(0, 47) + " - Flash Player Installation";
			c = q.ie && q.win ? "ActiveX" : "PlugIn";
			c = "MMredirectURL=" + w.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + c + "&MMdoctitle=" +
				n.title;
			typeof e.flashvars != v ? e.flashvars += "&" + c : e.flashvars = c;
			if (q.ie && q.win && d.readyState != 4) c = n.createElement("div"), b += "SWFObjectNew", c.setAttribute("id", b), d.parentNode.insertBefore(c, d), d.style.display = "none",
				function() {
					d.readyState == 4 ? d.parentNode.removeChild(d) : setTimeout(arguments.callee, 10)
				}();
			t(a, e, b)
		}
	}

	function b(a) {
		if (q.ie && q.win && a.readyState != 4) {
			var e = n.createElement("div");
			a.parentNode.insertBefore(e, a);
			e.parentNode.replaceChild(i(a), e);
			a.style.display = "none";
			(function() {
				a.readyState ==
					4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
			})()
		} else a.parentNode.replaceChild(i(a), a)
	}

	function i(a) {
		var e = n.createElement("div");
		if (q.win && q.ie) e.innerHTML = a.innerHTML;
		else if (a = a.getElementsByTagName(y)[0])
			if (a = a.childNodes)
				for (var b = a.length, c = 0; c < b; c++) !(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && a[c].nodeType != 8 && e.appendChild(a[c].cloneNode(!0));
		return e
	}

	function t(a, e, b) {
		var c, b = m(b);
		if (q.wk && q.wk < 312) return c;
		if (b) {
			if (typeof a.id == v) a.id = b.id;
			if (q.ie && q.win) {
				var d = "",
					i;
				for (i in a)
					if (a[i] !=
						Object.prototype[i]) i.toLowerCase() == "data" ? e.movie = a[i] : i.toLowerCase() == "styleclass" ? d += ' class="' + a[i] + '"' : i.toLowerCase() != "classid" && (d += " " + i + '="' + a[i] + '"');
				i = "";
				for (var k in e) e[k] != Object.prototype[k] && (i += '<param name="' + k + '" value="' + e[k] + '" />');
				b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + d + ">" + i + "</object>";
				J[J.length] = a.id;
				c = m(a.id)
			} else {
				k = n.createElement(y);
				k.setAttribute("type", B);
				for (var g in a) a[g] != Object.prototype[g] && (g.toLowerCase() == "styleclass" ?
					k.setAttribute("class", a[g]) : g.toLowerCase() != "classid" && k.setAttribute(g, a[g]));
				for (d in e) e[d] != Object.prototype[d] && d.toLowerCase() != "movie" && (a = k, i = d, g = e[d], c = n.createElement("param"), c.setAttribute("name", i), c.setAttribute("value", g), a.appendChild(c));
				b.parentNode.replaceChild(k, b);
				c = k
			}
		}
		return c
	}

	function e(a) {
		var e = m(a);
		if (e && e.nodeName == "OBJECT") q.ie && q.win ? (e.style.display = "none", function() {
			if (e.readyState == 4) {
				var b = m(a);
				if (b) {
					for (var c in b) typeof b[c] == "function" && (b[c] = null);
					b.parentNode.removeChild(b)
				}
			} else setTimeout(arguments.callee,
				10)
		}()) : e.parentNode.removeChild(e)
	}

	function m(a) {
		var e = null;
		try {
			e = n.getElementById(a)
		} catch (b) {}
		return e
	}

	function u(a, e, b) {
		a.attachEvent(e, b);
		F[F.length] = [a, e, b]
	}

	function l(a) {
		var e = q.pv,
			a = a.split(".");
		a[0] = parseInt(a[0], 10);
		a[1] = parseInt(a[1], 10) || 0;
		a[2] = parseInt(a[2], 10) || 0;
		return e[0] > a[0] || e[0] == a[0] && e[1] > a[1] || e[0] == a[0] && e[1] == a[1] && e[2] >= a[2] ? !0 : !1
	}

	function r(a, e, b, c) {
		if (!q.ie || !q.mac) {
			var d = n.getElementsByTagName("head")[0];
			if (d) {
				b = b && typeof b == "string" ? b : "screen";
				c && (L = C = null);
				if (!C || L !=
					b) c = n.createElement("style"), c.setAttribute("type", "text/css"), c.setAttribute("media", b), C = d.appendChild(c), q.ie && q.win && typeof n.styleSheets != v && n.styleSheets.length > 0 && (C = n.styleSheets[n.styleSheets.length - 1]), L = b;
				q.ie && q.win ? C && typeof C.addRule == y && C.addRule(a, e) : C && typeof n.createTextNode != v && C.appendChild(n.createTextNode(a + " {" + e + "}"))
			}
		}
	}

	function k(a, e) {
		if (N) {
			var b = e ? "visible" : "hidden";
			D && m(a) ? m(a).style.visibility = b : r("#" + a, "visibility:" + b)
		}
	}

	function p(a) {
		return /[\\\"<>\.;]/.exec(a) != null &&
			typeof encodeURIComponent != v ? encodeURIComponent(a) : a
	}
	var v = "undefined",
		y = "object",
		B = "application/x-shockwave-flash",
		x = "SWFObjectExprInst",
		w = window,
		n = document,
		A = navigator,
		z = !1,
		E = [function() {
			z ? h() : j()
		}],
		s = [],
		J = [],
		F = [],
		G, I, K, M, D = !1,
		H = !1,
		C, L, N = !0,
		q = function() {
			var a = typeof n.getElementById != v && typeof n.getElementsByTagName != v && typeof n.createElement != v,
				e = A.userAgent.toLowerCase(),
				b = A.platform.toLowerCase(),
				c = b ? /win/.test(b) : /win/.test(e),
				b = b ? /mac/.test(b) : /mac/.test(e),
				e = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,
					"$1")) : !1,
				d = !+"\u000b1",
				i = [0, 0, 0],
				k = null;
			if (typeof A.plugins != v && typeof A.plugins["Shockwave Flash"] == y) {
				if ((k = A.plugins["Shockwave Flash"].description) && !(typeof A.mimeTypes != v && A.mimeTypes[B] && !A.mimeTypes[B].enabledPlugin)) z = !0, d = !1, k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), i[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10), i[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10), i[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
			} else if (typeof w.ActiveXObject != v) try {
				var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if (g) {
					try {
						k = g.GetVariable("$version")
					} catch (f) {}
					k && (d = !0, k = k.split(" ")[1].split(","), i = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)])
				}
			} catch (h) {}
			return {
				w3: a,
				pv: i,
				wk: e,
				ie: d,
				win: c,
				mac: b
			}
		}();
	(function() {
		q.w3 && ((typeof n.readyState != v && n.readyState == "complete" || typeof n.readyState == v && (n.getElementsByTagName("body")[0] || n.body)) && a(), D || (typeof n.addEventListener != v && n.addEventListener("DOMContentLoaded", a, !1), q.ie && q.win && (n.attachEvent("onreadystatechange", function() {
			n.readyState == "complete" &&
				(n.detachEvent("onreadystatechange", arguments.callee), a())
		}), w == top && function() {
			if (!D) {
				try {
					n.documentElement.doScroll("left")
				} catch (e) {
					setTimeout(arguments.callee, 0);
					return
				}
				a()
			}
		}()), q.wk && function() {
			D || (/loaded|complete/.test(n.readyState) ? a() : setTimeout(arguments.callee, 0))
		}(), g(a)))
	})();
	(function() {
		q.ie && q.win && window.attachEvent("onunload", function() {
			for (var a = F.length, b = 0; b < a; b++) F[b][0].detachEvent(F[b][1], F[b][2]);
			a = J.length;
			for (b = 0; b < a; b++) e(J[b]);
			for (var c in q) q[c] = null;
			q = null;
			for (var d in swfobject) swfobject[d] =
				null;
			swfobject = null
		})
	})();
	return {
		FusionChartsModified: !0,
		registerObject: function(a, e, b, c, d) {
			var i = d || {};
			if (q.w3 && a && e) i.id = a, i.swfVersion = e, i.expressInstall = b, i.callbackFn = c, i.userData = d, s[s.length] = i, k(a, !1);
			else if (c) i.success = !1, i.id = a, c(i)
		},
		getObjectById: function(a) {
			if (q.w3) return d(a)
		},
		embedSWF: function(a, e, b, d, i, g, h, m, u, j, p) {
			var r = p || {};
			r.success = !1;
			r.id = e;
			q.w3 && !(q.wk && q.wk < 312) && a && e && b && d && i ? (k(e, !1), f(function() {
				b += "";
				d += "";
				var f = {};
				if (u && typeof u === y)
					for (var p in u) f[p] = u[p];
				f.data = a;
				f.width =
					b;
				f.height = d;
				p = {};
				if (m && typeof m === y)
					for (var n in m) p[n] = m[n];
				if (h && typeof h === y)
					for (var q in h) typeof p.flashvars != v ? p.flashvars += "&" + q + "=" + h[q] : p.flashvars = q + "=" + h[q];
				if (l(i)) n = t(f, p, e), f.id == e && k(e, !0), r.success = !0, r.ref = n;
				else if (g && o()) {
					f.data = g;
					c(f, p, e, j);
					return
				} else k(e, !0);
				j && j(r)
			})) : j && j(r)
		},
		switchOffAutoHideShow: function() {
			N = !1
		},
		ua: q,
		getFlashPlayerVersion: function() {
			return {
				major: q.pv[0],
				minor: q.pv[1],
				release: q.pv[2]
			}
		},
		hasFlashPlayerVersion: l,
		createSWF: function(a, e, b) {
			if (q.w3) return t(a,
				e, b)
		},
		showExpressInstall: function(a, e, b, d) {
			q.w3 && o() && c(a, e, b, d)
		},
		removeSWF: function(a) {
			q.w3 && e(a)
		},
		createCSS: function(a, e, b, c) {
			q.w3 && r(a, e, b, c)
		},
		addDomLoadEvent: f,
		addLoadEvent: g,
		getQueryParamValue: function(a) {
			var e = n.location.search || n.location.hash;
			if (e) {
				/\?/.test(e) && (e = e.split("?")[1]);
				if (a == null) return p(e);
				for (var e = e.split("&"), b = 0; b < e.length; b++)
					if (e[b].substring(0, e[b].indexOf("=")) == a) return p(e[b].substring(e[b].indexOf("=") + 1))
			}
			return ""
		},
		expressInstallCallback: function() {
			if (H) {
				var a = m(x);
				if (a && G) {
					a.parentNode.replaceChild(G, a);
					if (I && (k(I, !0), q.ie && q.win)) G.style.display = "block";
					K && K(M)
				}
				H = !1
			}
		}
	}
}();
FusionCharts(["private", "modules.renderer.flash", function() {
	var a = this,
		f = window,
		g = document,
		h = function(a) {
			return typeof a === "function"
		},
		j = f.encodeURIComponent ? function(a) {
			return f.encodeURIComponent(a)
		} : function(a) {
			return f.escape(a)
		};
	try {
		a.swfobject = f.swfobject, f.swfobject.createCSS("object.FusionCharts:focus, embed.FusionCharts:focus", "outline: none")
	} catch (d) {}
	a.core.options.requiredFlashPlayerVersion = "8";
	a.core.options.flashInstallerUrl = "http://get.adobe.com/flashplayer/";
	a.core.options.installRedirectMessage =
		"You need Adobe Flash Player 8 (or above) to view the charts on this page. It is a free, lightweight and safe installation from Adobe Systems Incorporated.\n\nWould you like to go to Adobe's website and install Flash Player?";
	a.core.hasRequiredFlashVersion = function(e) {
		if (typeof e === "undefined") e = a.core.options.requiredFlashPlayerVersion;
		return f.swfobject ? f.swfobject.hasFlashPlayerVersion(e) : void 0
	};
	var o = !1,
		c = /.*?\%\s*?$/g,
		b = {
			chartWidth: !0,
			chartHeight: !0,
			mapWidth: !0,
			mapHeight: !0
		},
		i = function(e, b) {
			if (!(b &&
					b.source === "XmlHttpRequest")) {
				var c = e.sender;
				if (c.ref && h(c.ref.dataInvokedOnSWF) && c.ref.dataInvokedOnSWF() && h(c.ref.getXML)) a.raiseWarning(c, "08300116", "run", "::DataHandler~__fusioncharts_vars", "Data was set in UTF unsafe manner"), c.setChartData(f.unescape(e.sender.ref.getXML({
					escaped: !0
				})), FusionChartsDataFormats.XML, !0), c.flashVars.dataXML = c.getChartData(FusionChartsDataFormats.XML), delete c.flashVars.dataURL;
				e.sender.removeEventListener("DataLoaded", i)
			}
		};
	f.__fusioncharts_dimension = function() {
		return function(e) {
			var b,
				d;
			return !((b = a.core(e)) instanceof a.core && b.ref && (d = b.ref.parentNode)) ? {} : {
				width: d.offsetWidth * (c.test(b.width) ? parseInt(b.width, 10) / 100 : 1),
				height: d.offsetHeight * (c.test(b.height) ? parseInt(b.height, 10) / 100 : 1)
			}
		}
	}();
	f.__fusioncharts_vars = function(e, b) {
		var c = a.core.items[e];
		if (!(c instanceof a.core)) return setTimeout(function() {
			var b;
			if (b = e !== void 0) {
				var c = f.swfobject.getObjectById(e),
					d, i, g;
				b = {};
				var m;
				if (!c && typeof c.tagName !== "string") b = void 0;
				else {
					if ((d = c.parentNode) && d.tagName && d.tagName.toLowerCase() ===
						"object" && d.parentNode) d = d.parentNode;
					if (d) {
						b.renderAt = d;
						if (!(c.tagName.toLowerCase() !== "object" && c.getAttribute && (m = c.getAttribute("flashvars") || "")) && c.hasChildNodes && c.hasChildNodes()) {
							g = c.childNodes;
							d = 0;
							for (c = g.length; d < c; d += 1)
								if (g[d].tagName === "PARAM" && (i = g[d].getAttribute("name")) && i.toLowerCase() === "flashvars") m = g[d].getAttribute("value") || ""
						}
						if (m && h(m.toString)) {
							m = m.split(/\=|&/g);
							b.flashVars = {};
							d = 0;
							for (c = m.length; d < c; d += 2) b.flashVars[m[d]] = m[d + 1]
						}
					} else b = void 0
				}
			}
			b || a.raiseError(a.core, "25081621",
				"run", "::FlashRenderer", "FusionCharts Flash object is accessing flashVars of non-existent object.")
		}, 0), !1;
		if (typeof b === "object") {
			if (c.ref && h(c.ref.dataInvokedOnSWF) && c.ref.dataInvokedOnSWF()) {
				if (b.dataURL !== void 0) c.addEventListener("DataLoaded", i);
				else if (b.dataXML !== void 0) b.dataXML = f.unescape(b.dataXML);
				c.__state.flashUpdatedFlashVars = !0
			} else delete b.dataURL, delete b.dataXML;
			a.extend(c.flashVars, b);
			return !0
		}
		if (c.__state.dataSetDuringConstruction && c.flashVars.dataXML === void 0 && c.options.dataSource !==
			void 0 && typeof c.options.dataFormat === "string") c.flashVars.dataXML = c.options.dataSource;
		c.__state.flashInvokedFlashVarsRequest = !0;
		return c.flashVars
	};
	f.__fusioncharts_event = function(e, b) {
		setTimeout(function() {
			a.raiseEvent(e.type, b, a.core.items[e.sender])
		}, 0)
	};
	var t = function(e) {
		e = e.sender;
		if (e.options.renderer === "flash") {
			if (e.width === void 0) e.width = a.renderer.policies.flashVars.chartWidth[1];
			if (e.height === void 0) e.height = a.renderer.policies.flashVars.chartHeight[1];
			if (e.flashVars.DOMId === void 0) e.flashVars.DOMId =
				e.id;
			a.extend(e.flashVars, {
				registerWithJS: "1",
				chartWidth: e.width,
				chartHeight: e.height,
				InvalidXMLText: "Invalid data."
			});
			if (Boolean(e.options.autoInstallRedirect) === !0 && !f.swfobject.hasFlashPlayerVersion(a.core.options.requiredFlashPlayerVersion.toString()) && o === !1 && (o = !0, a.core.options.installRedirectMessage && f.confirm(a.core.options.installRedirectMessage))) f.location.href = a.core.options.flashInstallerUrl;
			if (e.options.dataFormat === void 0 && e.options.dataSource === void 0) e.options.dataFormat = FusionChartsDataFormats.XMLURL,
				e.options.dataSource = "Data.xml"
		}
	};
	a.renderer.register("flash", {
		dataFormat: "xml",
		init: function() {
			a.addEventListener("BeforeInitialize", t)
		},
		policies: {
			params: {
				scaleMode: ["scaleMode", "noScale"],
				scale: ["scaleMode", "noScale"],
				wMode: ["wMode", "opaque"],
				menu: ["menu", void 0],
				bgColor: ["backgroundColor", "#ffffff"],
				allowScriptAccess: ["allowScriptAccess", "always"],
				quality: ["quality", "best"],
				swLiveConnect: ["swLiveConnect", void 0],
				base: ["base", void 0],
				align: ["align", void 0],
				salign: ["sAlign", void 0]
			},
			flashVars: {
				lang: ["lang",
					"EN"
				],
				debugMode: ["debugMode", void 0],
				scaleMode: ["scaleMode", "noScale"],
				animation: ["animate", void 0]
			},
			options: {
				autoInstallRedirect: ["autoInstallRedirect", !1],
				useLegacyXMLTransport: ["_useLegacyXMLTransport", !1]
			}
		},
		render: function(e, c) {
			Boolean(this.flashVars.animation) === !0 && delete this.flashVars.animation;
			this.src || a.raiseError(this, "03102348", "run", "::FlashRenderer.render", 'Could not find a valid "src" attribute. swfUrl or chart type missing.');
			var d = {},
				i = this.flashVars.dataXML,
				g = this.flashVars.dataURL,
				k, h;
			a.extend(d, this.flashVars);
			if (this.flashVars.stallLoad === !0) {
				if (this.options.dataFormat === FusionChartsDataFormats.XML) i = this.options.dataSource;
				if (this.options.dataFormat === FusionChartsDataFormats.XMLURL) g = this.options.dataSource
			}
			if (a.core.debugMode.enabled() && a.core.debugMode.syncStateWithCharts && d.debugMode === void 0 && this.options.safeMode) d.debugMode = "1";
			this.__state.lastRenderedSrc = this.src;
			d.dataXML = j(i) || "";
			d.dataURL = a.isXSSSafe(g) ? g || "" : j(g) || "";
			for (k in b) d.hasOwnProperty(k) && (d[k] = j(d[k]));
			if (!f.swfobject || !f.swfobject.embedSWF || !f.swfobject.FusionChartsModified) f.swfobject = a.swfobject;
			o && !a.core.options.installRedirectMessage && (h = {
				silent: !0
			});
			f.swfobject && f.swfobject.embedSWF ? f.swfobject.embedSWF(this.src, e.id, this.width, this.height, a.core.options.requiredFlashPlayerVersion, void 0, d, this.params, this.attributes, c, h) : a.raiseError(this, "1113061611", "run", "FlashRenderer~render", Error("Could not find swfobject library or embedSWF API"))
		},
		update: function(a) {
			var b = this.ref,
				c = a.data;
			this.flashVars.dataXML =
				c;
			a.error === void 0 ? this.isActive() && h(b.setDataXML) ? this.src !== this.__state.lastRenderedSrc ? this.render() : b.setDataXML(c, !1) : (delete this.flashVars.dataURL, delete this.flashVars.animation) : this.isActive() && h(b.showChartMessage) ? b.showChartMessage("InvalidXMLText") : (this.flashVars.dataXML = "<Invalid" + a.format.toUpperCase() + ">", delete this.flashVars.dataURL, delete this.flashVars.animation)
		},
		resize: function() {
			this.flashVars.chartWidth = this.width;
			this.flashVars.chartHeight = this.height;
			if (this.ref !== void 0) this.ref.width =
				this.width, this.ref.height = this.height, h(this.ref.resize) && this.ref.resize(this.ref.offsetWidth, this.ref.offsetHeight)
		},
		config: function(e) {
			a.extend(this.flashVars, e)
		},
		dispose: function() {
			var a;
			f.swfobject.removeSWF(this.id);
			(a = this.ref) && a.parentNode && a.parentNode.removeChild(a)
		},
		protectedMethods: {
			flashVars: !0,
			params: !0,
			setDataXML: !0,
			setDataURL: !0,
			hasRendered: !0,
			getXML: !0,
			getDataAsCSV: !0,
			print: !0,
			exportChart: !0
		},
		events: {
			Loaded: function(a) {
				a.sender.flashVars.animation = "0"
			},
			DataLoadRequested: function(e,
				b) {
				var c = e.sender,
					d = b.url,
					g = !1;
				if (b.dataFormat === FusionChartsDataFormats.XML && (f.location.protocol === "file:" && Boolean(c.options.safeMode) || Boolean(c.options.useLegacyXMLTransport))) c.ref ? c.ref.setDataURL ? c.ref.setDataURL(d, !1) : a.raiseError(this, "0109112330", "run", ">FlashRenderer^DataLoadRequested", Error("Unable to fetch URL due to security restriction on Flash Player. Update global security settings.")) : c.flashVars.dataURL = d, e.stopPropagation(), g = !0, b.cancelDataLoadRequest(), c.addEventListener("DataLoaded",
					i);
				if (c.ref && c.showChartMessage) delete c.flashVars.stallLoad, c.options.showDataLoadingMessage && c.ref.showChartMessage("XMLLoadingText");
				else if (!g) c.flashVars.stallLoad = !0
			},
			DataLoadRequestCancelled: function(a) {
				a = a.sender;
				a.ref && h(a.showChartMessage) && a.ref.showChartMessage();
				delete a.flashVars.stallLoad
			},
			DataLoadError: function(a, b) {
				var c = a.sender;
				c.ref && h(c.ref.showChartMessage) && b.source === "XmlHttpRequest" ? c.ref.showChartMessage("LoadDataErrorText") : (delete c.flashVars.dataURL, c.flashVars.dataXML =
					"<JSON parsing error>", delete c.flashVars.stallLoad)
			},
			DataLoadRequestCompleted: function(a, b) {
				b.source === "XmlHttpRequest" && delete a.sender.flashVars.stallLoad
			}
		},
		prototype: {
			getSWFHTML: function() {
				var a = g.createElement("span"),
					b = g.createElement("span"),
					c = "RnVzaW9uQ2hhcnRz" + (new Date).getTime();
				a.appendChild(b);
				b.setAttribute("id", c);
				a.style.display = "none";
				g.getElementsByTagName("body")[0].appendChild(a);
				f.swfobject.embedSWF(this.src, c, this.width, this.height, "8.0.0", void 0, this.flashVars, this.params, this.attrs);
				b = a.innerHTML.replace(c, this.id);
				f.swfobject.removeSWF(c);
				a.parentNode.removeChild(a);
				return b
			},
			setTransparent: function(a) {
				typeof a !== "boolean" && a !== null && (a = !0);
				this.params.wMode = a === null ? "window" : a === !0 ? "transparent" : "opaque"
			},
			registerObject: function() {},
			addVariable: function() {
				a.raiseWarning(this, "1012141919", "run", "FlashRenderer~addVariable()", 'Use of deprecated "addVariable()". Replace with "configure()".');
				a.core.prototype.configure.apply(this, arguments)
			},
			setDataXML: function(b) {
				a.raiseWarning(this,
					"11033001081", "run", "GenericRuntime~setDataXML()", 'Use of deprecated "setDataXML()". Replace with "setXMLData()".');
				b === void 0 || b === null || !h(b.toString) ? a.raiseError(this, "25081627", "param", "~setDataXML", 'Invalid data type for parameter "xml"') : this.ref === void 0 || this.ref === null || !h(this.ref.setDataXML) ? this.setChartData(b.toString(), FusionChartsDataFormats.XML) : this.ref.setDataXML(b.toString())
			},
			setDataURL: function(b) {
				a.raiseWarning(this, "11033001082", "run", "GenericRuntime~setDataURL()", 'Use of deprecated "setDataURL()". Replace with "setXMLUrl()".');
				b === void 0 || b === null || !h(b.toString) ? a.raiseError(this, "25081724", "param", "~setDataURL", 'Invalid data type for parameter "url"') : this.ref === void 0 || this.ref === null || !h(this.ref.setDataURL) ? this.setChartData(b.toString(), FusionChartsDataFormats.XMLURL) : this.ref.setDataURL(b.toString())
			}
		}
	});
	a.renderer.setDefault("flash")
}]);
FusionCharts(["private", "modules.renderer.js", function() {
	var a = this,
		f = window,
		g = document,
		h = a.core.options;
	/msie/i.test(navigator.userAgent);
	g.createElementNS && g.createElementNS("http://www.w3.org/2000/svg", "svg");
	var j = function() {},
		d = a.hcLib = {
			cmdQueue: []
		},
		o = d.moduleCmdQueue = {
			jquery: [],
			base: [],
			charts: [],
			powercharts: [],
			widgets: [],
			maps: []
		},
		c = d.moduleDependencies = {},
		b = d.moduleMeta = {
			jquery: "jquery.min.js",
			base: "FusionCharts.HC.js",
			charts: "FusionCharts.HC.Charts.js",
			powercharts: "FusionCharts.HC.PowerCharts.js",
			widgets: "FusionCharts.HC.Widgets.js",
			maps: "FusionCharts.HC.Maps.js"
		},
		i = {},
		t = d.getDependentModuleName = function(a) {
			var b = [],
				e, d;
			for (e in c)
				if ((d = c[e][a]) !== void 0) b[d] = e;
			return b
		};
	d.injectModuleDependency = function(a, b, e) {
		var i = !1;
		b === void 0 && (b = a);
		c[a] || (c[a] = {}, o[a] || (o[a] = [], d.moduleMeta[a] = h.html5ScriptNamePrefix + b + h.html5ScriptNameSuffix), i = !0);
		c[a][b] = e || 0;
		return i
	};
	var e = d.hasModule = function(b) {
		var c, e;
		if (b instanceof Array) {
			c = 0;
			for (e = b.length; c < e; c += 1)
				if (!Boolean(a.modules["modules.renderer.js-" +
						b]) || b === "jquery" && !Boolean(f.jQuery)) return !1;
			return !0
		}
		if (b === "jquery") return Boolean(f.jQuery);
		return Boolean(a.modules["modules.renderer.js-" + b])
	};
	d.needsModule = function(a, b) {
		return (d.moduleDependencies[a] && d.moduleDependencies[a][b]) !== void 0
	};
	var m = d.loadModule = function(c, d, g, f) {
			c instanceof Array || (c = [c]);
			var h = c.length,
				m = 0,
				j = function() {
					if (m >= h) d && d();
					else {
						var l = c[m],
							o = b[l],
							u;
						m += 1;
						if (l)
							if (e(l)) {
								j();
								return
							} else {
								if (i[l]) {
									a.raiseError(f || a.core, "1112201445A", "run", "JavaScriptRenderer~loadModule() ",
										"required resources are absent or blocked from loading.");
									g && g(l);
									return
								}
							} else g && g(l);
						u = l === "jquery" ? a.core.options.jQuerySourceFileName : a.core.options["html5" + a.capitalizeString(l) + "Src"];
						a.loadScript(u == void 0 ? o : u, {
							success: function() {
								e(l) ? j() : g && g(l)
							},
							failure: g && function() {
								g(l)
							}
						}, void 0, !0)
					}
				};
			j()
		},
		u = d.executeWaitingCommands = function(a) {
			for (var b; b = a.shift();) typeof b === "object" && j[b.cmd].apply(b.obj, b.args)
		};
	d.cleanupWaitingCommands = function(a) {
		for (var b = a.chartType(), b = t(b), c, e = [], d; c = b.shift();) {
			for (c =
				o[c] || []; d = c.shift();) typeof d === "object" && d.obj !== a && e.push(d);
			c.concat(e);
			e = []
		}
	};
	var l = function(a) {
			delete a.sender.jsVars._reflowData;
			a.sender.jsVars._reflowData = {};
			delete a.sender.jsVars._reflowClean
		},
		r = function() {
			var a = function() {};
			a.prototype = {
				LoadDataErrorText: "Error in loading data.",
				XMLLoadingText: "Retrieving data. Please wait",
				InvalidXMLText: "Invalid data.",
				ChartNoDataText: "No data to display.",
				ReadingDataText: "Reading data. Please wait",
				ChartNotSupported: "Chart type not supported.",
				PBarLoadingText: "",
				LoadingText: "Loading chart. Please wait",
				RenderChartErrorText: "Unable to render chart."
			};
			return a.prototype.constructor = a
		}();
	a.extend(a.core.options, {
		html5ScriptNameSuffix: ".js",
		html5ScriptNamePrefix: "FusionCharts.HC.",
		jQuerySourceFileName: "jquery.min.js"
	});
	a.extend(j, {
		dataFormat: "json",
		ready: !1,
		policies: {
			jsVars: {},
			options: {
				showLoadingMessage: ["showLoadingMessage", !0]
			}
		},
		init: function() {
			f.jQuery ? e("base") ? j.ready = !0 : m("base", function() {
				j.ready = !0;
				u(d.cmdQueue)
			}, void 0, a.core) : m("jquery", function() {
				jQuery.noConflict();
				if (f.$ === void 0) f.$ = jQuery;
				j.init()
			}, void 0, a.core)
		},
		render: function(a) {
			var b = a,
				c = this.jsVars,
				e = c.msgStore;
			if (b && this.options.showLoadingMessage) b.innerHTML = '<small style="display: inline-block; *zoom:1; *display:inline; width: 100%; font-family: Verdana; font-size: 10px; color: #666666; text-align: center; padding-top: ' + (parseInt(b.style.height, 10) / 2 - 5) + 'px">' + (e.PBarLoadingText || e.LoadingText) + "</small>", b.style.backgroundColor = c.transparent ? "transparent" : this.options.containerBackgroundColor ||
				"#ffffff";
			d.cmdQueue.push({
				cmd: "render",
				obj: this,
				args: arguments
			})
		},
		update: function() {
			d.cmdQueue.push({
				cmd: "update",
				obj: this,
				args: arguments
			})
		},
		resize: function() {
			d.cmdQueue.push({
				cmd: "resize",
				obj: this,
				args: arguments
			})
		},
		dispose: function() {
			var a = d.cmdQueue,
				b, c;
			b = 0;
			for (c = a.length; b < c; b += 1) a[b].obj === this && (a.splice(b, 1), c -= 1, b -= 1)
		},
		load: function() {
			d.cmdQueue.push({
				cmd: "load",
				obj: this,
				args: arguments
			})
		},
		config: function(a, b) {
			var c, e = this.jsVars,
				d = e.msgStore,
				e = e.cfgStore;
			typeof a === "string" && arguments.length >
				1 && (c = a, a = {}, a[c] = b);
			for (c in a) d[c] !== void 0 ? d[c] = a[c] : e[c.toLowerCase()] = a[c]
		},
		protectedMethods: {},
		events: {
			BeforeInitialize: function(a) {
				var b = a.sender,
					a = b.jsVars,
					c = this.chartType();
				a.fcObj = b;
				a.msgStore = a.msgStore || new r;
				a.cfgStore = a.cfgStore || {};
				a.previousDrawCount = -1;
				a.drawCount = 0;
				a._reflowData = {};
				if (!(a.userModules instanceof Array) && (b = a.userModules, a.userModules = [], typeof b === "string")) a.userModules = a.userModules.concat(b.split(","));
				if (!d.chartAPI || !d.chartAPI[c]) a.needsLoaderCall = !0
			},
			Initialized: function(a) {
				var a =
					a.sender,
					b = a.jsVars;
				b.needsLoaderCall && (delete b.needsLoaderCall, j.load.call(a))
			},
			BeforeDataUpdate: l,
			BeforeDispose: l,
			BeforeRender: function(a) {
				var b = a.sender.jsVars;
				delete b.drLoadAttempted;
				delete b.waitingModule;
				delete b.waitingModuleError;
				l.apply(this, arguments)
			},
			DataLoadRequested: function(a) {
				var a = a.sender,
					b = a.jsVars;
				delete b.loadError;
				a.ref && a.options.showDataLoadingMessage ? b.hcObj && !b.hasNativeMessage && b.hcObj.showLoading ? b.hcObj.showMessage(b.msgStore.XMLLoadingText) : a.ref.showChartMessage ? a.ref.showChartMessage("XMLLoadingText") :
					b.stallLoad = !0 : b.stallLoad = !0
			},
			DataLoadRequestCompleted: function(a) {
				delete a.sender.id.stallLoad
			},
			DataLoadError: function(a) {
				var b = a.sender,
					c = b.jsVars;
				delete c.stallLoad;
				c.loadError = !0;
				b.ref && typeof b.ref.showChartMessage === "function" && b.ref.showChartMessage("LoadDataErrorText");
				l.apply(this, arguments)
			}
		},
		_call: function(a, b, c) {
			a.apply(c || f, b || [])
		}
	});
	a.extend(j.prototype, {
		getSWFHTML: function() {
			a.raiseWarning(this, "11090611381", "run", "JavaScriptRenderer~getSWFHTML()", "getSWFHTML() is not supported for JavaScript charts.")
		},
		addVariable: function() {
			a.raiseWarning(this, "11090611381", "run", "JavaScriptRenderer~addVariable()", 'Use of deprecated "addVariable()". Replace with "configure()".');
			a.core.prototype.configure.apply(this, arguments)
		},
		getXML: function() {
			a.raiseWarning(this, "11171116291", "run", "JavaScriptRenderer~getXML()", 'Use of deprecated "getXML()". Replace with "getXMLData()".');
			return this.getXMLData.apply(this, arguments)
		},
		setDataXML: function() {
			a.raiseWarning(this, "11171116292", "run", "JavaScriptRenderer~setDataXML()",
				'Use of deprecated "setDataXML()". Replace with "setXMLData()".');
			return this.setXMLData.apply(this, arguments)
		},
		setDataURL: function() {
			a.raiseWarning(this, "11171116293", "run", "JavaScriptRenderer~setDataURL()", 'Use of deprecated "SetDataURL()". Replace with "setXMLUrl()".');
			return this.setXMLUrl.apply(this, arguments)
		},
		hasRendered: function() {
			return this.jsVars.hcObj && this.jsVars.hcObj.hasRendered
		},
		setTransparent: function(a) {
			var b;
			if (b = this.jsVars) typeof a !== "boolean" && a !== null && (a = !0), b.transparent =
				a === null ? !1 : a === !0 ? !0 : !1
		}
	});
	a.extend(a.core, {
		_fallbackJSChartWhenNoFlash: function() {
			f.swfobject.hasFlashPlayerVersion(a.core.options.requiredFlashPlayerVersion) || a.renderer.setDefault("javascript")
		},
		_enableJSChartsForSelectedBrowsers: function(b) {
			b === void 0 || b === null || a.renderer.setDefault(RegExp(b).test(navigator.userAgent) ? "javascript" : "flash")
		},
		_doNotLoadExternalScript: function(a) {
			var c, e;
			for (c in a) e = c.toLowerCase(), b[e] && (i[e] = Boolean(a[c]))
		},
		_preloadJSChartModule: function() {
			throw "NotImplemented()";
		}
	});
	a.renderer.register("javascript", j);
	f.swfobject && f.swfobject.hasFlashPlayerVersion && !f.swfobject.hasFlashPlayerVersion(a.core.options.requiredFlashPlayerVersion) && (a.raiseWarning(a.core, "1204111846", "run", "JSRenderer", "Switched to JavaScript as default rendering due to absence of required Flash Player."), a.renderer.setDefault("javascript"))
}]);
(function() {
	var a = FusionCharts(["private", "XMLDataHandler"]);
	if (a !== void 0) {
		var f = function(a) {
			return {
				data: a,
				error: void 0
			}
		};
		a.addDataHandler("XML", {
			encode: f,
			decode: f
		})
	}
})();
var JSON;
JSON || (JSON = {});
(function() {
	function a(a) {
		return a < 10 ? "0" + a : a
	}

	function f(a) {
		j.lastIndex = 0;
		return j.test(a) ? '"' + a.replace(j, function(a) {
			var b = c[a];
			return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}

	function g(a, c) {
		var e, h, j, l, r = d,
			k, p = c[a];
		p && typeof p === "object" && typeof p.toJSON === "function" && (p = p.toJSON(a));
		typeof b === "function" && (p = b.call(c, a, p));
		switch (typeof p) {
			case "string":
				return f(p);
			case "number":
				return isFinite(p) ? String(p) : "null";
			case "boolean":
			case "null":
				return String(p);
			case "object":
				if (!p) return "null";
				d += o;
				k = [];
				if (Object.prototype.toString.apply(p) === "[object Array]") {
					l = p.length;
					for (e = 0; e < l; e += 1) k[e] = g(e, p) || "null";
					j = k.length === 0 ? "[]" : d ? "[\n" + d + k.join(",\n" + d) + "\n" + r + "]" : "[" + k.join(",") + "]";
					d = r;
					return j
				}
				if (b && typeof b === "object") {
					l = b.length;
					for (e = 0; e < l; e += 1) typeof b[e] === "string" && (h = b[e], (j = g(h, p)) && k.push(f(h) + (d ? ": " : ":") + j))
				} else
					for (h in p) Object.prototype.hasOwnProperty.call(p, h) && (j = g(h, p)) && k.push(f(h) + (d ? ": " : ":") + j);
				j = k.length === 0 ? "{}" : d ? "{\n" + d + k.join(",\n" +
					d) + "\n" + r + "}" : "{" + k.join(",") + "}";
				d = r;
				return j
		}
	}
	if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	};
	var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		d, o, c = {
			"\u0008": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\u000c": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		b;
	if (typeof JSON.stringify !== "function") JSON.stringify = function(a, c, e) {
		var f;
		o = d = "";
		if (typeof e === "number")
			for (f = 0; f < e; f += 1) o += " ";
		else typeof e === "string" && (o = e);
		if ((b = c) && typeof c !== "function" && (typeof c !== "object" || typeof c.length !== "number")) throw Error("JSON.stringify");
		return g("", {
			"": a
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse = function(a, b) {
		function c(a, d) {
			var i, g, f = a[d];
			if (f && typeof f === "object")
				for (i in f) Object.prototype.hasOwnProperty.call(f, i) && (g = c(f, i), g !== void 0 ? f[i] = g : delete f[i]);
			return b.call(a, d, f)
		}
		var d, a = String(a);
		h.lastIndex = 0;
		h.test(a) && (a = a.replace(h, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), typeof b === "function" ? c({
			"": d
		}, "") : d;
		throw new SyntaxError("JSON.parse");
	}
})();
(function() {
	var a = FusionCharts(["private", "JSON_DataHandler"]);
	if (a !== void 0) {
		window.JSON === void 0 && a.raiseError(this, "1113062012", "run", "JSONDataHandler", Error("Could not find library support for JSON parsing."));
		a.core.options.allowIESafeXMLParsing = ["_allowIESafeXMLParsing", !0];
		var f = function(a) {
				if (a === null || a === void 0 || typeof a.toString !== "function") return "";
				return a = a.toString().replace(/&/g, "&amp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
			},
			g = function() {
				var g = {
						arr: {
							set: !0,
							trendlines: !0,
							vtrendlines: !0,
							line: {
								trendlines: !0,
								vtrendlines: !0
							},
							data: !0,
							dataset: !0,
							lineset: !0,
							categories: !0,
							category: !0,
							linkeddata: !0,
							application: !0,
							definition: !0,
							axis: !0,
							connectors: !0,
							connector: {
								connectors: !0
							},
							trendset: !0,
							row: {
								rows: !0
							},
							column: {
								columns: !0
							},
							label: {
								labels: !0
							},
							color: {
								colorrange: !0
							},
							dial: {
								dials: !0
							},
							pointer: {
								pointers: !0
							},
							point: {
								trendpoints: !0
							},
							process: {
								processes: !0
							},
							task: {
								tasks: !0
							},
							milestone: {
								milestones: !0
							},
							datacolumn: {
								datatable: !0
							},
							text: {
								datacolumn: !0
							},
							item: {
								legend: !0
							},
							alert: {
								alerts: !0
							},
							groups: {
								annotations: !0
							},
							items: {
								groups: !0
							},
							shapes: !0,
							shape: {
								shapes: !0
							},
							entitydef: !0,
							entity: {
								entitydef: !0
							}
						},
						tag: {
							chart: "linkedchart",
							map: "linkedmap",
							set: "data",
							vline: {
								chart: "data",
								graph: "data",
								dataset: "data",
								categories: "category",
								linkedchart: "data"
							},
							apply: {
								application: "application"
							},
							style: {
								definition: "definition"
							},
							marker: {
								application: "application",
								definition: "definition"
							},
							entity: {
								entitydef: "entitydef",
								data: "data"
							},
							shape: {
								shapes: "shapes"
							},
							connector: {
								connectors: {
									chart: "connector",
									linkedchart: "connector",
									map: "connectors",
									linkedmap: "connectors"
								}
							},
							annotationgroup: {
								annotations: "groups"
							},
							annotation: {
								groups: "items"
							}
						},
						attr: {
							vline: {
								vline: "true"
							}
						},
						ins: {
							chart: !0,
							map: !0,
							graph: !0
						},
						dsv: {
							dataset: "data",
							categories: "category"
						},
						text: {
							target: "target",
							value: "value"
						},
						group: {
							styles: {
								definition: !0,
								application: !0
							},
							chart: {
								value: !0,
								target: !0
							},
							graph: {
								value: !0,
								target: !0
							},
							linkedchart: {
								value: !0,
								target: !0
							},
							markers: {
								definition: !0,
								application: !0,
								shapes: !0,
								connectors: !0
							},
							map: {
								entitydef: !0,
								data: !0
							},
							linkedmap: {
								entitydef: !0,
								data: !0
							}
						}
					},
					d = {
						append: function(a, b, d, f) {
							g.arr[d] && (g.arr[d] === !0 || g.arr[d][f] === !0) ? (b[d] instanceof Array || (b[d] = []), b[d].push(a)) : b[d] = a
						},
						child: function(c, b, i, f) {
							var e, h, o, l, r, k;
							for (e = 0; e < b.length; e += 1) switch (o = b[e], h = o.nodeName.toLowerCase(), o.nodeType) {
								case 1:
									l = d.attr(o.attributes);
									k = g.ins[h];
									k === !0 && (r = l, l = {}, l[h] = r);
									k = g.attr[h];
									typeof k === "object" && a.extend(l, k);
									if (k = g.tag[h])
										if (typeof k === "object" && typeof k[i] === "object")
											for (r in r = void 0, k[i]) {
												if (f[r]) {
													h = k[i][r];
													break
												}
											} else typeof k === "object" && typeof k[i] ===
												"string" ? h = k[i] : typeof k === "string" && (h = k);
									o.childNodes.length && ((k = g.group[i]) && k[h] ? d.child(c, o.childNodes, h, f) : d.child(l, o.childNodes, h, f));
									k = g.group[i];
									(!k || !k[h]) && d.append(l, c, h, i);
									break;
								case 3:
									if (k = g.text[i]) h = k, l = o.data, d.append(l, c, h, i);
									k = g.dsv[i];
									if (typeof k === "string" && f.chart && parseInt(f.chart.compactdatamode, 10)) h = k, l = o.data, c[h] = c[h] ? c[h] + l : l
							}
						},
						attr: function(a) {
							var b, d = {};
							if (!a || !a.length) return d;
							for (b = 0; b < a.length; b += 1) d[a[b].nodeName.toLowerCase()] = a[b].value || a[b].nodeValue;
							return d
						}
					},
					f = function(c) {
						var b = {},
							g, h, e, j, u, l, r, k;
						if (typeof c !== "object" && typeof c.toString !== "function") return f.errorObject = new TypeError("xml2json.parse()"), b;
						for (var c = c.toString().replace(/<\!--[\s\S]*?--\>/g, "").replace(/<\?xml[\s\S]*?\?>/ig, "").replace(/&(?!([^;\n\r]+?;))/g, "&amp;$1"), c = c.replace(/^\s\s*/, ""), p = /\s/, v = c.length; p.test(c.charAt(v -= 1)););
						c = c.slice(0, v + 1);
						if (!c) return b;
						try {
							if (window.DOMParser) g = (new window.DOMParser).parseFromString(c, "text/xml");
							else if (document.body && a.core.options.allowIESafeXMLParsing) {
								var y =
									document.createElement("xml");
								y.innerHTML = c;
								document.body.appendChild(y);
								g = y.XMLDocument;
								document.body.removeChild(y)
							} else g = new ActiveXObject("Microsoft.XMLDOM"), g.async = "false", g.loadXML(c);
							if (!g || !g.childNodes || !(g.childNodes.length === 1 && (h = g.childNodes[0]) && h.nodeName && (e = h.nodeName.toLowerCase()) && (e === "chart" || e === "map" || e === "graph"))) return f.errorObject = new TypeError("xml2json.parse()"), b;
							else if (e === "graph") {
								j = g.createElement("chart");
								for (k = (l = h.attributes) && l.length || 0; k--;) j.setAttribute(l[k].name,
									l[k].value), l.removeNamedItem(l[k].name);
								if (k = (r = h.childNodes) && r.length || 0) k -= 1, u = h.removeChild(r[k]), j.appendChild(u);
								for (; k--;) u = h.removeChild(r[k]), j.insertBefore(u, j.firstChild);
								g.replaceChild(j, h);
								h = j
							}
						} catch (B) {
							f.errorObject = B
						}
						h ? (h.attributes && (b[e] = d.attr(h.attributes)), h.childNodes && d.child(b, h.childNodes, e, b), delete f.errorObject) : f.errorObject = new TypeError("xml2json.parse()");
						return b
					};
				return function(a) {
					delete f.errorObject;
					return {
						data: f(a),
						error: f.errorObject
					}
				}
			}(),
			h = function() {
				var a = {
						items: {
							explode: {
								data: "set",
								groups: {
									annotations: "annotationgroup"
								},
								items: {
									groups: "annotation"
								}
							},
							text: {
								chart: {
									target: "target",
									value: "value"
								},
								graph: {
									target: "target",
									value: "value"
								}
							},
							dsv: {
								dataset: {
									data: "dataset"
								},
								categories: {
									category: "categories"
								}
							},
							attr: {
								chart: {
									chart: "chart"
								},
								graph: {
									graph: "graph"
								},
								map: {
									map: "map"
								},
								linkedmap: {
									map: "map"
								},
								linkedchart: {
									chart: "chart"
								}
							},
							group: {
								styles: {
									definition: "style",
									application: "apply"
								},
								map: {
									data: "entity",
									entitydef: "entity"
								},
								markers: {
									definition: "marker",
									application: "marker",
									shapes: "shape",
									connectors: "connector"
								}
							}
						},
						qualify: function(a, c, b) {
							return typeof this.items[a][b] === "object" ? this.items[a][b][c] : this.items[a][b]
						}
					},
					d = function(g, c, b, h) {
						var t = "",
							e = "",
							m = "",
							u = "",
							l, r, k;
						c && typeof c.toLowerCase === "function" && (c = c.toLowerCase());
						if (b === void 0 && g[c])
							for (l in g[c])
								if (r = l.toLowerCase(), r === "compactdatamode") h.applyDSV = g[c][l] == 1;
						if (g instanceof Array)
							for (l = 0; l < g.length; l += 1) u += typeof g[l] === "string" ? f(g[l]) : d(g[l], c, b, h);
						else {
							for (l in g) r = l.toLowerCase(), g[l] instanceof Array &&
								(k = a.qualify("group", r, c)) ? e += "<" + r + ">" + d(g[l], k, c, h) + "</" + r + ">" : typeof g[l] === "object" ? (k = a.qualify("attr", r, c)) ? (m = d(g[l], k, c, h).replace(/\/\>/ig, ""), c = r) : e += d(g[l], r, c, h) : h.applyDSV && (k = a.qualify("dsv", r, c)) ? e += g[l] : (k = a.qualify("text", r, c)) ? e += "<" + k + ">" + g[l] + "</" + k + ">" : r === "vline" && Boolean(g[l]) ? c = "vline" : t += " " + r + '="' + f(g[l]).toString().replace(/\"/ig, "&quot;") + '"';
							if (k = a.qualify("explode", b, c)) c = k;
							u = (m !== "" ? m : "<" + c) + t + (e !== "" ? ">" + e + "</" + c + ">" : " />")
						}
						return u
					};
				return function(a) {
					delete d.errorObject;
					if (a && typeof a === "string") try {
						a = JSON.parse(a)
					} catch (c) {
						d.errorObject = c
					}
					return {
						data: d(a, a && a.graph ? "graph" : a && a.map ? "map" : "chart", void 0, {}),
						error: d.errorObject
					}
				}
			}();
		a.addDataHandler("JSON", {
			encode: h,
			decode: g
		})
	}
})();
FusionCharts(["private", "CSVDataHandler", function() {
	var a = this,
		f;
	f = function(a) {
		this.data = [];
		this.columnCount = this.rowCount = 0;
		this.configure(a)
	};
	f.decodeLiterals = function(a, h) {
		if (a === void 0 || a === null || !a.toString) return h;
		return a.replace("{tab}", "\t").replace("{quot}", '"').replace("{apos}", "'")
	};
	f.prototype.set = function(a, h, f) {
		var d;
		if (this.rowCount <= a) {
			for (d = this.rowCount; d <= a; d += 1) this.data[d] = [];
			this.rowCount = a + 1
		}
		if (this.columnCount <= h) this.columnCount = h + 1;
		this.data[a][h] = f
	};
	f.prototype.setRow =
		function(a, h) {
			var f;
			if (this.rowCount <= a) {
				for (f = this.rowCount; f <= a; f += 1) this.data[f] = [];
				this.rowCount = a + 1
			}
			if (this.columnCount < h.length) this.columnCount = h.length;
			this.data[a] = h
		};
	f.prototype.get = function(a, h) {
		var f = this.data;
		return f[a] && f[a][h]
	};
	f.prototype.configure = function(a) {
		var h = f.decodeLiterals;
		this.delimiter = h(a.delimiter, ",");
		this.qualifier = h(a.qualifier, '"');
		this.eolCharacter = h(a.eolCharacter, "\r\n")
	};
	f.prototype.clear = function() {
		this.data = [];
		this.columnCount = this.rowCount = 0
	};
	f.prototype.toString =
		function() {
			var a, f, j = "";
			for (a = 0; a < this.rowCount; a += 1) f = this.qualifier + this.data[a].join(this.qualifier + this.delimiter + this.qualifier) + this.qualifier, j += f === '""' ? this.eolCharacter : f + this.eolCharacter;
			this.rowCount > 0 && (j = j.slice(0, j.length - 2));
			return j
		};
	a.addDataHandler("CSV", {
		encode: function(g, f) {
			a.raiseError(f, "0604111215A", "run", "::CSVDataHandler.encode()", "FusionCharts CSV data-handler only supports encoding of data.");
			throw "FeatureNotSupportedException()";
		},
		decode: function(g) {
			var g = a.core.transcodeData(g,
					"xml", "json") || {},
				h, j, d, o, c, b, i, t, e = g.chart || g.map || g.graph || {},
				m = Boolean(e.exporterrorcolumns || 0),
				u = g.categories && g.categories[0] && g.categories[0].category || [];
			j = g.map && !g.chart;
			var l = !1,
				r = !1,
				k = !1,
				p, v, y, B, x, w, n, A, z, E, s;
			h = new f({
				separator: e.exportdataseparator,
				qualifier: e.exportdataqualifier
			});
			if (j) h.setRow(0, ["Id", " Short Name", "Long Name", "Value", "Formatted Value"]);
			else if ((p = g.dials && g.dials.dial || g.pointers && g.pointers.pointer || g.value) !== void 0)
				if (typeof p === "string") h.set(0, 0, p), typeof g.target ===
					"string" && h.set(0, 1, g.target);
				else {
					h.setRow(0, ["Id", "Value"]);
					c = 0;
					i = 1;
					for (b = p.length; c < b; c += 1, i += 1) h.setRow(i, [i, p[c].value])
				} else if (p = g.dataset || !(g.data instanceof Array) && []) {
				d = 1;
				(v = g.lineset) && (p = p.concat(v));
				(y = g.axis) && (p = p.concat(y));
				x = u.length;
				if (!(w = p.length))
					for (c = 0; c < x; c += 1) n = u[c], h.set(c + 1, 0, n.label || n.name);
				for (c = 0; c < w; c += 1) {
					A = p;
					A[c].dataset ? (A = A[c].dataset, o = 0, B = A.length) : (A = p, o = c, B = o + 1);
					for (; o < B && !l && !k; o += 1, d += 1) {
						z = A[o];
						h.set(0, d, z.seriesname);
						if (typeof z.data === "string") z.data = z.data.split(e.dataseparator ||
							"|");
						i = b = 0;
						for (E = z.data && z.data.length || 0; b < E || b < x; b += 1) {
							n = u[b];
							j = i + 1;
							s = z.data && z.data[i] || {};
							if (s.x !== void 0 && s.y !== void 0) {
								l = !0;
								break
							}
							if (s.rowid !== void 0 && s.columnid !== void 0) {
								k = !0;
								break
							}
							if (b < x && !n.vline) {
								h.set(j, 0, n.label || n.name);
								n = parseFloat(s ? s.value : "");
								n = isNaN(n) ? "" : n;
								h.set(j, d, n);
								if (r || m || s.errorvalue) r || (r = !0, h.set(0, d + 1, "Error")), t = 1, h.set(j, d + 1, s.errorvalue);
								i += 1
							}
						}
						t && (d += t, t = 0)
					}
				}
				v && (p = p.slice(0, -v.length));
				y && p.slice(0, -y.length)
			} else if (p = g.data) {
				h.set(0, 1, e.yaxisname || "Value");
				c = 0;
				for (x =
					p.length; c < x; c += 1) s = p[c], s.vline || (n = parseFloat(s.value ? s.value : ""), n = isNaN(n) ? "" : n, h.setRow(c + 1, [s.label || s.name, n]))
			}
			if (l) {
				h.clear();
				r = !1;
				t = 0;
				h.setRow(0, ["Series", "x", "y"]);
				c = 0;
				j = 1;
				p = g.dataset;
				for (B = p.length; c < B; c += 1) {
					b = 0;
					z = p[c] && p[c].data || [];
					for (w = z.length; b < w; b += 1, j += 1) {
						s = z[b] || {};
						n = [p[c].seriesname, s.x, s.y];
						s.z !== void 0 && (n.push(s.z), t || (h.set(0, 3, "z"), t = 1));
						if (r || m || s.errorvalue !== void 0 || s.horizontalerrorvalue !== void 0 || s.verticalerrorvalue !== void 0) n.push(s.errorvalue, s.horizontalerrorvalue ===
							void 0 ? s.errorvalue : s.horizontalerrorvalue, s.verticalerrorvalue === void 0 ? s.errorvalue : s.verticalerrorvalue), r || (h.set(0, t + 3, "Error"), h.set(0, t + 4, "Horizontal Error"), h.set(0, t + 5, "Vertical Error")), r = !0;
						h.setRow(j, n)
					}
				}
			} else if (k) {
				h.clear();
				m = {};
				l = {};
				c = 0;
				b = 1;
				u = g.rows && g.rows.row || [];
				for (t = u.length; c < t; c += 1, b += 1) n = u[c], n.id && (m[n.id.toLowerCase()] = b, h.set(b, 0, n.label || n.id));
				c = 0;
				b = 1;
				u = g.columns && g.columns.column || [];
				for (t = u.length; c < t; c += 1, b += 1) n = u[c], n.id && (l[n.id.toLowerCase()] = b, h.set(0, b, n.label ||
					n.id));
				z = g.dataset && g.dataset[0] && g.dataset[0].data || [];
				c = 0;
				for (t = z.length; c < t; c += 1) {
					s = z[c];
					j = s.rowid.toLowerCase();
					d = s.columnid.toLowerCase();
					if (!m[j]) m[j] = h.rowCount, h.set(h.rowCount, 0, s.rowid);
					if (!l[d]) l[d] = h.columnCount, h.set(0, h.columnCount, s.columnid);
					h.set(m[j], l[d], s.value)
				}
			}
			h.rowCount > 0 && h.get(0, 0) === void 0 && h.set(0, 0, e.xaxisname || "Label");
			return {
				data: h.toString(),
				error: void 0
			}
		}
	});
	a.core.addEventListener("Loaded", function(a) {
		a = a.sender;
		if (a.options.renderer === "javascript" && !a.getDataAsCSV) a.getDataAsCSV =
			a.ref.getDataAsCSV = a.getCSVData
	})
}]);
(function() {
	var a = FusionCharts(["private", "DynamicChartAttributes"]);
	a !== void 0 && a.extend(a.core, {
		setChartAttribute: function(a, g) {
			if (typeof a === "string") {
				var h = a,
					a = {};
				a[h] = g
			} else if (a === null || typeof a !== "object") return;
			var h = 0,
				j = this.getChartData(FusionChartsDataFormats.JSON),
				d, o = j.chart || j.graph || j.map || {};
			for (d in a) h += 1, a[d] === null ? delete o[d.toLowerCase()] : o[d.toLowerCase()] = a[d];
			if (h > 0) {
				if (typeof o.animation === "undefined") o.animation = "0";
				this.setChartData(j, FusionChartsDataFormats.JSON)
			}
		},
		getChartAttribute: function(f) {
			var g =
				(g = this.getChartData(FusionChartsDataFormats.JSON)).chart || g.graph || g.map;
			if (arguments.length === 0 || f === void 0 || g === void 0) return g;
			var h, j;
			if (typeof f === "string") h = g[f.toString().toLowerCase()];
			else if (f instanceof Array) {
				h = {};
				for (j = 0; j < f.length; j += 1) h[f[j]] = g[f[j].toString().toLowerCase()]
			} else a.raiseError(this, "25081429", "param", "~getChartAttribute()", 'Unexpected value of "attribute"');
			return h
		}
	}, !0)
})();
(function() {
	var a = FusionCharts(["private", "api.LinkManager"]);
	if (a !== void 0) {
		a.policies.link = ["link", void 0];
		var f = window.FusionChartsDOMInsertModes = {
				REPLACE: "replace",
				APPEND: "append",
				PREPEND: "prepend"
			},
			g = {},
			h = function(d, f) {
				this.items = {};
				this.root = d;
				this.parent = f;
				f instanceof a.core ? this.level = this.parent.link.level + 1 : (g[d.id] = [{}], this.level = 0)
			},
			j = function(a, g) {
				return (a.options.containerElement === g.options.containerElement || a.options.containerElementId === g.options.containerElementId) && a.options.insertMode ===
					f.REPLACE
			};
		h.prototype.configuration = function() {
			return g[this.root.id][this.level] || (g[this.root.id][this.level] = {})
		};
		a.extend(a.core, {
			configureLink: function(d, f) {
				var c;
				if (d instanceof Array) {
					for (c = 0; c < d.length; c += 1) typeof g[this.link.root.id][c] !== "object" && (g[this.link.root.id][c] = {}), a.extend(g[this.link.root.id][c], d[c]);
					g[this.link.root.id].splice(d.length)
				} else if (typeof d === "object") {
					if (typeof f !== "number") f = this.link.level;
					g[this.link.root.id][f] === void 0 && (g[this.link.root.id][f] = {});
					a.extend(g[this.link.root.id][f],
						d)
				} else a.raiseError(this, "25081731", "param", "~configureLink()", "Unable to update link configuration from set parameters")
			}
		}, !0);
		a.addEventListener("BeforeInitialize", function(d) {
			if (d.sender.link instanceof h) {
				if (d.sender.link.parent instanceof a.core) d.sender.link.parent.link.items[d.sender.id] = d.sender
			} else d.sender.link = new h(d.sender)
		});
		a.addEventListener("LinkedChartInvoked", function(d, f) {
			var c = d.sender,
				b = c.clone({
					dataSource: f.data,
					dataFormat: f.linkType,
					link: new h(c.link.root, c)
				}, !0),
				g = f.alias;
			if (g) {
				if (!b.swfSrcPath && b.swfUrl) b.swfSrcPath = b.swfUrl.replace(/(.*?)?[^\/]*\.swf.*?/ig, "$1");
				b.type = g
			}
			c.args && parseInt(c.args.animate, 10) !== 0 && delete b.animate;
			a.extend(b, c.link.configuration());
			a.raiseEvent("BeforeLinkedItemOpen", {
				level: c.link.level
			}, c.link.root);
			a.core.items[b.id] instanceof a.core && a.core.items[b.id].dispose();
			b = new a.core(b);
			if (!j(b, c) && (!c.options.overlayButton || !c.options.overlayButton.message)) {
				if (typeof c.options.overlayButton !== "object") c.options.overlayButton = {};
				c.options.overlayButton.message =
					"Close"
			}
			b.render();
			a.raiseEvent("LinkedItemOpened", {
				level: c.link.level,
				item: b
			}, c.link.root)
		});
		a.addEventListener("OverlayButtonClick", function(d, f) {
			if (f.id === "LinkManager") {
				var c = d.sender,
					b = c.link.level - 1,
					g = c.link.parent,
					h = c.link.root;
				a.raiseEvent("BeforeLinkedItemClose", {
					level: b,
					item: c
				}, h);
				setTimeout(function() {
					a.core.items[c.id] && c.dispose();
					a.raiseEvent("LinkedItemClosed", {
						level: b
					}, h)
				}, 0);
				!g.isActive() && j(c, g) && g.render()
			}
		});
		a.addEventListener("Loaded", function(d) {
			if ((d = d.sender) && d.link !== void 0 &&
				d.link.root !== d && d.link.parent instanceof a.core)
				if (d.ref && typeof d.ref.drawOverlayButton === "function") {
					var f = a.extend({
						show: !0,
						id: "LinkManager"
					}, d.link.parent.options.overlayButton);
					a.extend(f, d.link.parent.link.configuration().overlayButton || {});
					d.ref.drawOverlayButton(f)
				} else a.raiseWarning(d, "04091602", "run", "::LinkManager^Loaded", "Unable to draw overlay button on object. -" + d.id)
		});
		a.addEventListener("BeforeDispose", function(d) {
			var f = d.sender;
			f && f.link instanceof h && (f.link.parent instanceof a.core && delete f.link.parent.link.items[d.sender.id], delete g[f.id])
		});
		FusionChartsEvents.LinkedItemOpened = "linkeditemopened";
		FusionChartsEvents.BeforeLinkedItemOpen = "beforelinkeditemopen";
		FusionChartsEvents.LinkedItemClosed = "linkeditemclosed";
		FusionChartsEvents.BeforeLinkedItemClose = "beforelinkeditemclose"
	}
})();
(function() {
	var a = FusionCharts(["private", "PrintManager"]);
	if (a !== void 0) {
		var f = {
				enabled: !1,
				invokeCSS: !0,
				processPollInterval: 2E3,
				message: "Chart is being prepared for print.",
				useExCanvas: !1,
				bypass: !1
			},
			g = {
				getCanvasElementOf: function(b, c, d) {
					if (b.__fusioncharts__canvascreated !== !0) {
						var g = document.createElement("canvas"),
							h = a.core.items[b.id].attributes["class"];
						f.useExCanvas && G_vmlCanvasManager && G_vmlCanvasManager.initElement(g);
						g.setAttribute("class", h);
						g.__fusioncharts__reference = b.id;
						b.parentNode.insertBefore(g,
							b.nextSibling);
						b.__fusioncharts__canvascreated = !0
					}
					b.nextSibling.setAttribute("width", c || b.offsetWidth || 2);
					b.nextSibling.setAttribute("height", d || b.offsetHeight || 2);
					return b.nextSibling
				},
				removeCanvasElementOf: function(a) {
					var b = a.ref && a.ref.parentNode ? a.ref.parentNode : a.options.containerElement || window.getElementById(a.options.containerElementId);
					if (b) {
						var c = b.getElementsByTagName("canvas"),
							d, f;
						f = 0;
						for (d = c.length; f < d; f += 1)
							if (c[f].__fusioncharts__reference === a.id && (b.removeChild(c[f]), a.ref)) a.ref.__fusioncharts__canvascreated = !1
					}
				},
				rle2rgba: function(a, b, c) {
					typeof c !== "string" && (c = "FFFFFF");
					var a = a.split(/[;,_]/),
						d, f, g, h, i, j = 0;
					for (f = 0; f < a.length; f += 2) {
						a[f] === "" && (a[f] = c);
						a[f] = ("000000" + a[f]).substr(-6);
						g = parseInt("0x" + a[f].substring(0, 2), 16);
						h = parseInt("0x" + a[f].substring(2, 4), 16);
						i = parseInt("0x" + a[f].substring(4, 6), 16);
						for (d = 0; d < a[f + 1]; d += 1) b[j] = g, b[j + 1] = h, b[j + 2] = i, b[j + 3] = 255, j += 4
					}
					return b
				},
				rle2array: function(a, b) {
					typeof b !== "string" && (b = "FFFFFF");
					var c = a.split(";"),
						d, f;
					for (d in c) {
						c[d] = c[d].split(/[_,]/);
						for (f = 0; f < c[d].length; f +=
							2) c[d][f] = c[d][f] === "" ? b : ("000000" + c[d][f]).substr(-6)
					}
					return c
				},
				drawText: function(b, c, d, f) {
					b = b.getContext("2d");
					d = d || 2;
					f = f || 2;
					b.clearRect(0, 0, d, f);
					b.textBaseline = "middle";
					b.textAlign = "center";
					b.font = "8pt verdana";
					b.fillStyle = "#776666";
					typeof b.fillText === "function" ? b.fillText(c, d / 2, f / 2) : typeof b.mozDrawText === "function" ? (b.translate(d / 2, f / 2), b.mozDrawText(c)) : a.raiseWarning(a.core, "25081803", "run", "::PrintManager>lib.drawText", "Canvas text drawing is not supported in browser");
					return !0
				},
				appendCSS: function(a) {
					var b =
						document.createElement("style");
					b.setAttribute("type", "text/css");
					typeof b.styleSheet === "undefined" ? b.appendChild(document.createTextNode(a)) : b.styleSheet.cssText = a;
					return document.getElementsByTagName("head")[0].appendChild(b)
				}
			};
		g.drawRLE = function(a, b, c, d, f) {
			c = c || 2;
			d = d || 2;
			a.setAttribute("width", c);
			a.setAttribute("height", d);
			a = a.getContext("2d");
			if (typeof a.putImageData === "function" && typeof a.createImageData === "function") c = a.createImageData(c, d), g.rle2rgba(b, c.data, f), a.putImageData(c, 0, 0);
			else
				for (f in c =
					g.rle2array(b, f), d = f = b = 0, c)
					for (d = b = 0; d < c[f].length; d += 2) a.fillStyle = "#" + c[f][d], a.fillRect(b, f, c[f][d + 1], 1), b += parseInt(c[f][d + 1], 10);
			return !0
		};
		var h = {
				styles: {
					print: "canvas.FusionCharts{display:none;}@media print{object.FusionCharts{display:none;}canvas.FusionCharts{display:block;}}",
					error: "canvas.FusionCharts{display:none;}",
					normal: ""
				},
				cssNode: void 0
			},
			j = {},
			d = {},
			o = 0,
			c;
		h.invoke = function(a) {
			typeof this.styles[a] !== "undefined" && (a = this.styles[a]);
			if (typeof a !== "undefined") this.cssNode !== void 0 && this.cssNode.parentNode !==
				void 0 && this.cssNode.parentNode.removeChild(this.cssNode), h.cssNode = g.appendCSS(a)
		};
		var b = function(b) {
				var d = b.sender.ref,
					i, l;
				if (d === void 0 || typeof d.prepareImageDataStream !== "function" || d.prepareImageDataStream() === !1) c(b.sender);
				else {
					j[b.sender.id] || (j[b.sender.id] = d, o += 1, o === 1 && a.raiseEvent("PrintReadyStateChange", {
						ready: !1,
						bypass: f.bypass
					}, b.sender));
					try {
						i = d.offsetWidth, l = d.offsetHeight, g.drawText(g.getCanvasElementOf(d, i, l), f.message, i, l)
					} catch (r) {
						h.invoke("error"), a.raiseError(b.sender, "25081807",
							"run", "::PrintManager>onDrawComplete", "There was an error while showing message to user via canvas.")
					}
				}
			},
			i = function(b, c) {
				try {
					g.drawRLE(g.getCanvasElementOf(b.sender.ref, c.width, c.height), c.stream, c.width, c.height, c.bgColor) === !0 && j[b.sender.id] && (delete j[b.sender.id], o -= 1, o === 0 && a.raiseEvent("PrintReadyStateChange", {
						ready: !0,
						bypass: f.bypass
					}, b.sender))
				} catch (d) {
					h.invoke("error"), a.raiseError(b.sender, "25081810", "run", "::PrintManager>onImageStreamReady", "There was an error while drawing canvas.")
				}
			},
			t = function(a) {
				g.removeCanvasElementOf(a.sender)
			};
		c = function(c) {
			var f;
			if (c instanceof a.core) d[c.id] = c;
			else
				for (f in d) b({
					sender: d[f]
				}, {}), delete d[f]
		};
		a.extend(a.core, {
			printManager: {
				configure: function(b) {
					a.extend(f, b || {})
				},
				isReady: function() {
					if (f.bypass) return !0;
					if (o > 0 || !f.enabled) return !1;
					var b, c;
					for (b in a.core.items)
						if ((c = a.core.items[b].ref) !== void 0 && c.hasRendered && c.hasRendered() === !1) return !1;
					return !0
				},
				enabled: function(d) {
					if (d === void 0) return f.enabled;
					if (a.renderer.currentRendererName() !==
						"flash" || typeof document.createElement("canvas").getContext !== "function") return f.bypass = !0, a.raiseEvent("PrintReadyStateChange", {
						ready: !0,
						bypass: f.bypass
					}), a.raiseWarning(a.core, "25081816", "run", ".printManager.enabled", "printManager is not compatible with your browser"), f.enabled;
					f.bypass = !1;
					var j = d ? "addEventListener" : "removeEventListener";
					a.core[j]("ImageStreamReady", i);
					a.core[j]("DrawComplete", b);
					a.core[j]("BeforeDispose", t);
					if (d === !0) {
						var o;
						f.invokeCSS === !0 && h.invoke("print");
						for (o in a.core.items) c(a.core.items[o]),
							c()
					} else {
						var l;
						h.invoke("error");
						for (l in a.core.items) g.removeCanvasElementOf(a.core.items[l]);
						f.bypass || a.raiseEvent("PrintReadyStateChange", {
							ready: !1,
							bypass: f.bypass
						});
						h.invoke("normal")
					}
					return f.enabled = d
				},
				managedPrint: function(b) {
					f.bypass ? window.print() : a.core.printManager.isReady() ? typeof b === "object" && b.ready !== !0 || (a.removeEventListener("PrintReadyStateChange", a.core.printManager.managedPrint), window.print()) : a.core.printManager.enabled(!0) !== !0 ? window.print() : a.addEventListener("PrintReadyStateChange",
						a.core.printManager.managedPrint)
				}
			}
		}, !1);
		FusionChartsEvents.PrintReadyStateChange = "printreadystatechange"
	}
})();