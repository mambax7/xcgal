/* 
		dw_wipes.js		wipe methods for dynObj 
		(requires dw_core.js, dw_clip.js, and dw_util.js)
		version date: October 2002 (this.wiping prop added)
		
		This code is from Dynamic Web Coding  
		at http://www.dyn-web.com/
    Copyright 2002 by Sharon Paine 
    See Terms of Use at http://www.dyn-web.com/bus/terms.html
    Permission granted to use this code 
    as long as this entire notice is included.
		
		Idea and math for time-based animation from:
		Aaron Boodman at www.youngpup.net 
		and Mike Foster at www.cross-browser.com
*/

// wipe called can be prevented
var wipe_halt = false;	

// args: which wipe, delay, wipeTime, what next (fn)
dynObj.prototype.wipe=function(which,delay,wipeTime,fn) {
	if (wipe_halt||this.wiping) return;
	this.wipeTime=wipeTime||1000; this.delay=delay||100; this.fn=fn;
	switch (which) {
		// wipe into view by expanding to the right
		case "in right" :
			this.clipTo(0,0,this.height,0);
			this.show();
      setTimeout(this.obj+".wipe_in_rt()",this.delay);
  	break;
		
		// wipe into view by expanding from the center out
		case "in center" :
			this.vCenter = Math.ceil(this.height/2);
			this.hCenter = Math.ceil(this.width/2);
			this.clipTo(this.vCenter,this.hCenter,this.vCenter,this.hCenter);
			this.show();
			setTimeout(this.obj+".wipe_in_center()",this.delay);
		break;
		
		// wipe into view from upper left corner to lower right
		case "in corner" :
			this.clipTo(0,0,0,0);
			this.show();
			setTimeout(this.obj+".wipe_in_corner()",this.delay);
		break;
		
		// wipe into view from top to bottom
		case "in top" :
			this.clipTo(0,0,0,0);
			this.show();
			setTimeout(this.obj+".wipe_in_top()",this.delay);
		break;
		
		// wipe out of view by contracting to the center
		case "out center" :
			this.vCenter = Math.ceil(this.height/2);
			this.hCenter = Math.ceil(this.width/2);
			setTimeout(this.obj+".wipe_out_center()",this.delay);
		break;
		
		// wipe out of view by contracting to the left
		case "out left" :
			setTimeout(this.obj+".wipe_out_left()",this.delay);
		break;
		
		// wipe out of view by contracting to the right
		case "out right" :
			setTimeout(this.obj+".wipe_out_right()",this.delay);
  	break;
		
		// wipe out of view by contracting from left and right
  	case "out middle" :
			this.dest=Math.ceil(this.width/2);
      setTimeout(this.obj+".wipe_out_mid()",this.delay);
		break;
		
		// wipe out of view from the upper left to lower right
		case "out corner" :
			setTimeout(this.obj+".wipe_out_corner()",this.delay);
		break;
		
		// wipe out of view from bottom to top
		case "out top" :
			setTimeout(this.obj+".wipe_out_top()",this.delay);
		break;
		
		// wipe out of view from top to bottom
		case "out bottom" :
			setTimeout(this.obj+".wipe_out_bottom()",this.delay);
		break;
		
		// wipe out of view from lower right to upper left
		case "out top left" :
			setTimeout(this.obj+".wipe_out_top_left()",this.delay);
		break;
		
  	default:
			alert("Oops! Check choices again.");
	}
	this.wipeStart = new Date().getTime()+this.delay;
	this.per = Math.PI/(2*this.wipeTime);
}

// wipe into view by expanding to the right
dynObj.prototype.wipe_in_rt=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
//	wipes could potentially be steady, accelerate, or decelerate
//	idea and math from Mike Foster at www.cross-browser.com
//	var inc = this.width*Math.sin(this.per*elapsed);	// decelerate
//	var inc = -this.width*Math.cos(this.per*elapsed)+this.width;	// accel
	var inc = this.width*((1/this.wipeTime)*elapsed);	// steady
	this.clipTo(0,inc,this.height,0);
	setTimeout(this.obj+".wipe_in_rt()",35);
	} else {
		this.clipTo(0,this.width,this.height,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe into view by expanding from the center out
dynObj.prototype.wipe_in_center=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	var vinc = this.vCenter*((1/this.wipeTime)*elapsed);
	var hinc = this.hCenter*((1/this.wipeTime)*elapsed);
	this.clipTo(this.vCenter-vinc,this.hCenter+hinc,this.vCenter+vinc,this.hCenter-hinc);
	setTimeout(this.obj+".wipe_in_center()",35);
	} else {
		this.clipTo(0,this.width,this.height,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe into view from upper left corner to lower right
dynObj.prototype.wipe_in_corner=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	var vinc = this.height*((1/this.wipeTime)*elapsed);
	var hinc = this.width*((1/this.wipeTime)*elapsed);
	this.clipTo(0,hinc,vinc,0);
	setTimeout(this.obj+".wipe_in_corner()",35);
	} else {
		this.clipTo(0,this.width,this.height,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe into view from top to bottom
dynObj.prototype.wipe_in_top=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	var inc = this.height*((1/this.wipeTime)*elapsed);
	this.clipTo(0,this.width,inc,0);
	setTimeout(this.obj+".wipe_in_top()",35);
	} else {
		this.clipTo(0,this.width,this.height,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view by contracting to the center
dynObj.prototype.wipe_out_center=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	var vinc = this.vCenter*((1/this.wipeTime)*elapsed);
	var hinc = this.hCenter*((1/this.wipeTime)*elapsed);
	this.clipTo(vinc,this.width-hinc,this.height-vinc,hinc);
		setTimeout(this.obj+".wipe_out_center()",35);
	} else {
		this.clipTo(this.vCenter,this.hCenter,this.vCenter,this.hCenter);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view by contracting to the left
dynObj.prototype.wipe_out_left=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
		var inc = this.width*((1/this.wipeTime)*elapsed);
		this.clipTo(0,this.width-inc,this.height,0);
		setTimeout(this.obj+".wipe_out_left()",35);
	} else {
		this.clipTo(0,0,this.height,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view by contracting to the right
dynObj.prototype.wipe_out_right=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
		var inc = this.width*((1/this.wipeTime)*elapsed);
		this.clipTo(0,this.width,this.height,inc);
		setTimeout(this.obj+".wipe_out_right()",35);
	} else {
	this.clipTo(0,this.width,this.height,this.width);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view by contracting from left and right
dynObj.prototype.wipe_out_mid=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
//	var inc = this.dest*Math.sin(this.per*elapsed);
	// this one accelerates
	var inc = -this.dest*Math.cos(this.per*elapsed)+this.dest;
//	var inc = this.dest*((1/this.wipeTime)*elapsed);
		this.clipTo(0,this.width-inc,this.height,inc);
		setTimeout(this.obj+".wipe_out_mid()",35);
	} else {
		this.clipTo(0,this.dest,this.height,this.dest);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view from upper left to lower right
dynObj.prototype.wipe_out_corner=function () {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	// accelerates
	var vinc = -this.height*Math.cos(this.per*elapsed)+this.height;
	var hinc = -this.width*Math.cos(this.per*elapsed)+this.width;
		this.clipTo(vinc,this.width,this.height,hinc);
		setTimeout(this.obj+".wipe_out_corner()",35);
	} else {
		this.clipTo(this.height,this.width,this.height,this.width);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view from bottom to top
dynObj.prototype.wipe_out_top=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
		var inc = this.height*((1/this.wipeTime)*elapsed);
		this.clipTo(0,this.width,this.height-inc,0);
		setTimeout(this.obj+".wipe_out_top()",35);
	} else {
	this.clipTo(0,this.width,this.height,this.width);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view from top to bottom
dynObj.prototype.wipe_out_bottom=function() {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
		var inc = this.height*((1/this.wipeTime)*elapsed);
		this.clipTo(inc,this.width,this.height,0);
		setTimeout(this.obj+".wipe_out_bottom()",35);
	} else {
	this.clipTo(0,this.width,this.height,this.width);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}

// wipe out of view from lower right to upper left
dynObj.prototype.wipe_out_top_left=function () {
	this.wiping = true;
	var clipVal = this.getClipValues();
	var elapsed = (new Date().getTime())-this.wipeStart;
	if (elapsed<this.wipeTime) {
	var vinc = -this.height*Math.cos(this.per*elapsed)+this.height;
	var hinc = -this.width*Math.cos(this.per*elapsed)+this.width;
		this.clipTo(0,this.width-hinc,this.height-vinc,0);
		setTimeout(this.obj+".wipe_out_top_left()",35);
	} else {
		this.clipTo(0,0,0,0);
		this.wiping = false;
		if (this.fn) eval(this.fn);
	}
}
