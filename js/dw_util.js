/*
		dw_util.js
		utility functions (and 1 method for dynObj)
		version date: August 2002
		
		functions for getting window dimensions and scroll amount
		from http://13thparallel.com/?issue=2002.06&title=viewport
				
		This code is from Dynamic Web Coding 
    www.dyn-web.com 
    See Terms of Use at http://www.dyn-web.com/bus/terms.html
    Permission granted to use this code 
    as long as this entire notice is included.		
*/

// center in container (window or outer layer)
// NOTE: uses this.width/height properties of dynObj
// so make sure those have been obtained/set appropriately
// for type of content!!!!
dynObj.prototype.centerIn = function(outer) {
	var outWd, outHt, inWd, inHt, x, y;
	if (eval(outer)==window) {
		outWd=getWinWidth();
		outHt=getWinHeight();
	} else {
		outWd=outer.width;
		outHt=outer.height;
	}
	inWd=this.width;
	inHt=this.height;
	x=Math.round((outWd-inWd)/2);
	y=Math.round((outHt-inHt)/2);
	this.shiftTo(x,y);
}

// gets rendered height/width 
// for ns4, pass reference to layer. 
// for others, pass reference to layer or
// id of html element containing content (depends...)
function getWidth(obj,id) {
	var wd=0;
	if (document.getElementById||document.all) {
		var elem;
		if (id)	elem = (document.getElementById)? document.getElementById(id): document.all[id];
		else elem = obj;
		if (elem.offsetWidth) wd = elem.offsetWidth;
  } else if (obj.document) wd = obj.document.width;	// ns4
	return wd;
}

function getHeight(obj,id) {
	var ht=0;
	if (document.getElementById||document.all) {
    var elem;
		if (id)	elem = (document.getElementById)? document.getElementById(id): document.all[id];
		else elem = obj;
		if (elem.offsetHeight) ht = elem.offsetHeight;
  } else if (obj.document) ht = obj.document.height;	// ns4
	return ht;
}

// credit to http://www.13thparallel.com for the following 4 functions
// see http://13thparallel.com/?issue=2002.06&title=viewport
// returns width of window
function getWinWidth() {
	var winWd = 0;
	if (document.documentElement && document.documentElement.clientWidth) 
		winWd = document.documentElement.clientWidth;
	else if (document.body && document.body.clientWidth) 
		winWd = document.body.clientWidth;
	else if (document.body && document.body.offsetWidth) 
		winWd = document.body.offsetWidth; // ns6
	else if (window.innerWidth) winWd = window.innerWidth-18;
	return winWd;
}

// returns height of window
function getWinHeight() {
	var winHt = 0;
	if (window.innerHeight) winHt = window.innerHeight-18;
	else if (document.documentElement && document.documentElement.clientHeight) 
		winHt = document.documentElement.clientHeight;
	else if (document.body && document.body.clientHeight) 
		winHt = document.body.clientHeight;
	return winHt;
}	

// returns amount of vertical scroll
function getScrollY() {
	var scroll_y = 0;
	if (document.documentElement && document.documentElement.scrollTop)
		scroll_y = document.documentElement.scrollTop;
	else if (document.body && document.body.scrollTop) 
		scroll_y = document.body.scrollTop; 
	else if (window.pageYOffset)
		scroll_y = window.pageYOffset;
	else if (window.scrollY)
		scroll_y = window.scrollY;
	return scroll_y;
}

// returns amount of horizontal scroll
function getScrollX() {
	var scroll_x = 0;
	if (document.documentElement && document.documentElement.scrollLeft)
		scroll_x = document.documentElement.scrollLeft;
	else if (document.body && document.body.scrollLeft) 
		scroll_x = document.body.scrollLeft; 
	else if (window.pageXOffset)
		scroll_x = window.pageXOffset;
	else if (window.scrollX)
		scroll_x = window.scrollX;
	return scroll_x;
}