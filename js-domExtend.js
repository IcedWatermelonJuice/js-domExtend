// ==UserScript==
// @name         js-domExtend
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  轻量级原生js增强插件，将部分原生dom对象方法模仿jQuery进行二次封装，便于使用
// @author       tutu辣么可爱
// @dayr         2022.4.29 GMT+0800 (中国标准时间)
// @license      MIT License
// @note         相关参考信息请前往greasyfork仓库或github仓库
// @note         greasyfork仓库:
// @note         github仓库:https://github.com/IcedWatermelonJuice/js-domExtend
// ==/UserScript==
 
function $ele(dom, dom2 = document) {
	switch (dom.slice(0, 1)) {
		case "<":
			dom2 = document.createElement("div");
			dom2.innerHTML = dom;
			dom2 = dom2.childNodes;
			break;
		default:
			dom2 = dom2.querySelectorAll(dom);
			break;
	}
	return dom2.length > 1 ? dom2 : dom2[0]
}
 
function $eleFn(dom, dom2 = document) {
	return {
		data: [dom, dom2],
		listen: function(callback, interval = 500) {
			var that = this;
			return setInterval(() => {
				if ($ele(that.data[0], that.data[1])) {
					callback();
				}
			}, interval)
		},
		ready: function(callback, timeout = 3000) {
			var timer = this.listen(() => {
				clearInterval(timer);
				callback();
			})
			setTimeout(() => {
				clearInterval(timer);
			}, timeout)
			return timer
		}
	}
}
 
function $domExtendJS() {
	HTMLElement.prototype.attr = function(key, val) {
		if (typeof key === "string") {
			if (/string|boolean/.test(typeof val)) {
				if (!val && val !== false) {
					this.removeAttribute(key);
				} else {
					this.setAttribute(key, val);
				}
				return this;
			} else {
				return this.getAttribute(key);
			}
		}
	}
	HTMLElement.prototype.css = function(key, val) {
		if (typeof key === "string") {
			if (/string|boolean/.test(typeof val)) {
				this.style.setProperty(key, val);
			} else if (!val) {
				return getComputedStyle(this)[key];
			}
		} else {
			for (let i in key) {
				this.style.setProperty(i, key[i]);
			}
		}
		if (this.style === "") {
			this.attr("style", "")
		}
		return this;
	}
	HTMLElement.prototype.hide = function() {
		this.setAttribute("display_backup", this.css("display"));
		this.css("display", "none")
		return this;
	}
	HTMLElement.prototype.show = function() {
		var backup = this.attr("display_backup") ? this.attr("display_backup") : "";
		this.css("display", backup !== "none" ? backup : "");
		return this;
	}
	HTMLElement.prototype.insert = function(dom, position = "end", reNew = false) {
		dom = typeof dom === "string" ? $ele(dom) : dom;
		dom = (Array.isArray(dom) || dom instanceof NodeList) ? dom : [dom];
		switch (position) {
			case "start":
				Array.from(dom).reverse().forEach((e, i) => {
					this.insertBefore(e, this.firstChild);
				})
				break;
			case "end":
				dom.forEach((e, i) => {
					this.append(e);
				})
				break;
			case "before":
				Array.from(dom).reverse().forEach((e, i) => {
					this.parentElement.insertBefore(e, this);
				})
				break;
			case "after":
				if (this.parentElement.lastChild === this) {
					dom.forEach((e, i) => {
						this.append(e);
					})
				} else {
					let next = this.nextSilbing;
					Array.from(dom).reverse().forEach((e, i) => {
						this.parentElement.insertBefore(e, next);
					})
				}
				break;
		}
		if (reNew) {
			return dom.length > 1 ? dom : dom[0]
		} else {
			return this
		}
	}
	HTMLElement.prototype.replace = function(dom) {
		dom = this.insert(dom, "before", true);
		this.remove();
		return dom;
	}
	HTMLElement.prototype.findNode = function(nodeName) {
		var nodeArray = [];
		if (!this.firstChild) {
			return null
		}
		this.childNodes.forEach((e, i) => {
			if (new RegExp(`^${nodeName}$`, "i").test(e.nodeName)) {
				nodeArray.push(e);
			} else {
				let temp = e.findNode(nodeName);
				nodeArray = nodeArray.concat(Array.isArray(temp) ? temp : []);
			}
		})
		return nodeArray[0] ? nodeArray : null
	}
	HTMLElement.prototype.eleText = function(val, remainDom = false) {
		if (typeof val !== "string") {
			return this.innerText
		} else {
			if (remainDom) {
				var textNode = this.findNode("#text");
				if (Array.isArray(textNode)) {
					textNode.forEach((e, i) => {
						if (val === "") {
							e.nodeValue = "";
						} else {
							let textLength = i >= (textNode.length - 1) ? val.length : e.length;
							e.nodeValue = val.slice(0, textLength);
							val = val.slice(textLength);
						}
					})
				}
			} else {
				this.innerText = val;
			}
			return this
		}
	}
 
	NodeList.prototype.attr = function(key, val) {
		this.forEach((e, i) => {
			e.attr(key, val)
		})
		return this
	}
	NodeList.prototype.css = function(key, val) {
		this.forEach((e, i) => {
			e.css(key, val)
		})
		return this
	}
	NodeList.prototype.hide = function() {
		this.forEach((e, i) => {
			e.hide();
		})
		return this
	}
	NodeList.prototype.show = function() {
		this.forEach((e, i) => {
			e.show();
		})
		return this
	}
	NodeList.prototype.findNode = function(nodeName) {
		var nodeArray = []
		this.forEach((e, i) => {
			let temp = e.findNode(nodeName);
			nodeArray = nodeArray.concat(Array.isArray(temp) ? temp : []);
		})
		return nodeArray[0] ? nodeArray : null
	}
	NodeList.prototype.eleText = function(val, remainDom = false) {
		var res = "";
		this.forEach((e, i) => {
			let temp = e.eleText(val, remainDom)
			res += typeof temp === "string" ? temp : "";
		})
		return typeof val === "string" ? this : res
	}
}
