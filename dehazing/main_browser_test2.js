<link rel="stylesheet" type="text&#x2F;css" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * hermite-resize - Canvas image resize/resample using Hermite filter with JavaScript.
 * @version v2.2.4
 * @link https://github.com/viliusle/miniPaint
 * @license MIT
 */
function Hermite_class(){var t,a,e=[];this.init=void(t=navigator.hardwareConcurrency||4),this.getCores=function(){return t},this.resample_auto=function(t,a,e,r,i){var h=this.getCores();window.Worker&&h>1?this.resample(t,a,e,r,i):(this.resample_single(t,a,e,!0),void 0!=i&&i())},this.resize_image=function(t,a,e,r,i){var h=document.getElementById(t),o=document.createElement("canvas");if(o.width=h.width,o.height=h.height,o.getContext("2d").drawImage(h,0,0),void 0==a&&void 0==e&&void 0!=r&&(a=h.width/100*r,e=h.height/100*r),void 0==e){var n=h.width/a;e=h.height/n}a=Math.round(a),e=Math.round(e);var s=function(){var t=o.toDataURL();h.width=a,h.height=e,h.src=t,t=null,o=null};void 0==i||1==i?this.resample(o,a,e,!0,s):(this.resample_single(o,a,e,!0),s())},this.resample=function(r,i,h,o,n){var s=r.width,d=r.height;i=Math.round(i);var c=d/(h=Math.round(h));if(e.length>0)for(u=0;u<t;u++)void 0!=e[u]&&(e[u].terminate(),delete e[u]);e=new Array(t);for(var g=r.getContext("2d"),v=[],l=2*Math.ceil(d/t/2),f=-1,u=0;u<t;u++){var M=f+1;if(!(M>=d)){f=M+l-1,f=Math.min(f,d-1);var m=l;m=Math.min(l,d-M),v[u]={},v[u].source=g.getImageData(0,M,s,l),v[u].target=!0,v[u].start_y=Math.ceil(M/c),v[u].height=m}}!0===o?(r.width=i,r.height=h):g.clearRect(0,0,s,d);for(var w=0,u=0;u<t;u++)if(void 0!=v[u].target){w++;var p=new Worker(a);e[u]=p,p.onmessage=function(t){w--;var a=t.data.core;e[a].terminate(),delete e[a];var r=Math.ceil(v[a].height/c);v[a].target=g.createImageData(i,r),v[a].target.data.set(t.data.target),g.putImageData(v[a].target,0,v[a].start_y),w<=0&&void 0!=n&&n()};var _={width_source:s,height_source:v[u].height,width:i,height:Math.ceil(v[u].height/c),core:u,source:v[u].source.data.buffer};p.postMessage(_,[_.source])}},a=window.URL.createObjectURL(new Blob(["(",function(){onmessage=function(t){for(var a=t.data.core,e=t.data.width_source,r=t.data.height_source,i=t.data.width,h=t.data.height,o=e/i,n=r/h,s=Math.ceil(o/2),d=Math.ceil(n/2),c=new Uint8ClampedArray(t.data.source),g=(c.length,i*h*4),v=new ArrayBuffer(g),l=new Uint8ClampedArray(v,0,g),f=0;f<h;f++)for(var u=0;u<i;u++){var M=4*(u+f*i),m=0,w=0,p=0,_=0,y=0,b=0,C=0,I=f*n,D=Math.floor(u*o),R=Math.ceil((u+1)*o),U=Math.floor(f*n),A=Math.ceil((f+1)*n);R=Math.min(R,e),A=Math.min(A,r);for(var x=U;x<A;x++)for(var B=Math.abs(I-x)/d,L=u*o,j=B*B,k=D;k<R;k++){var q=Math.abs(L-k)/s,E=Math.sqrt(j+q*q);if(!(E>=1)){var W=4*(k+x*e);C+=(m=2*E*E*E-3*E*E+1)*c[W+3],p+=m,c[W+3]<255&&(m=m*c[W+3]/250),_+=m*c[W],y+=m*c[W+1],b+=m*c[W+2],w+=m}}l[M]=_/w,l[M+1]=y/w,l[M+2]=b/w,l[M+3]=C/p}var z={core:a,target:l};postMessage(z,[l.buffer])}}.toString(),")()"],{type:"application/javascript"})),this.resample_single=function(t,a,e,r){for(var i=t.width,h=t.height,o=i/(a=Math.round(a)),n=h/(e=Math.round(e)),s=Math.ceil(o/2),d=Math.ceil(n/2),c=t.getContext("2d"),g=c.getImageData(0,0,i,h),v=c.createImageData(a,e),l=g.data,f=v.data,u=0;u<e;u++)for(var M=0;M<a;M++){var m=4*(M+u*a),w=0,p=0,_=0,y=0,b=0,C=0,I=0,D=u*n,R=Math.floor(M*o),U=Math.ceil((M+1)*o),A=Math.floor(u*n),x=Math.ceil((u+1)*n);U=Math.min(U,i),x=Math.min(x,h);for(var B=A;B<x;B++)for(var L=Math.abs(D-B)/d,j=M*o,k=L*L,q=R;q<U;q++){var E=Math.abs(j-q)/s,W=Math.sqrt(k+E*E);if(!(W>=1)){var z=4*(q+B*i);I+=(w=2*W*W*W-3*W*W+1)*l[z+3],_+=w,l[z+3]<255&&(w=w*l[z+3]/250),y+=w*l[z],b+=w*l[z+1],C+=w*l[z+2],p+=w}}f[m]=y/p,f[m+1]=b/p,f[m+2]=C/p,f[m+3]=I/_}!0===r?(t.width=a,t.height=e):c.clearRect(0,0,i,h),c.putImageData(v,0,0)}}
module.exports = Hermite_class;

},{}],2:[function(require,module,exports){
var utils = require('./utils.js');
var arange = utils.arange,
		linRange = utils.linRange,
		cartesian = utils.cartesian,
		range = utils.range;

function estimateAirLight(colorArray, quantStruct, minEst, maxEst) {
	var diff = maxEst - minEst;
	var step = 0;
	if(diff > 0.6) {step = 0.05;}
	else if (diff > 0.2) {step = 0.03;}
	else {step = 0.02;}
	var quantWithIds = quantStruct.quantizeID(colorArray);
	var weights = new Float32Array(quantStruct.n_clusters).fill(0);
	for(var i = 0; i < quantWithIds.length; ++i) {
		weights[quantWithIds[i]]++;
	}
	var weightsum = weights.reduce((a, b) => a+b);
	weights = weights.map(d => d/weightsum);

	//var colors = quantStruct.centroids.map(d => d.map(e => e / 255));
	var colors = new Float32Array(quantStruct.centroids.slice(0));
	for(var i = 0; i < colors.length; ++i) {
		colors[i] /= 255;
	}

	var AvalsR = arange(minEst, step, maxEst);
	var AvalsG = arange(minEst, step, maxEst);
	var AvalsB = arange(minEst, step, maxEst);

	var directions = linRange(0, 25, Math.PI/2);
	var dirTrig = new Float32Array(25*2);
	for(var i = 0; i < 25; i++) {
		dirTrig[2*i] = Math.sin(directions[i]);
		dirTrig[2*i + 1] = Math.cos(directions[i]);
	}

	/* Vote for each two channels */
	var VotesRG = vote2D(colors, 0, 1, AvalsR, AvalsG, dirTrig, weights);
	var VotesGB = vote2D(colors, 1, 2, AvalsG, AvalsB, dirTrig, weights);
	var VotesRB = vote2D(colors, 0, 2, AvalsR, AvalsB, dirTrig, weights);

	var vote3D = new Float32Array(AvalsR.length*AvalsG.length*AvalsB.length);
	for(var i = 0; i < AvalsR.length; ++i) {
		for(var j = 0; j < AvalsG.length; ++j) {
			for(var k = 0; k < AvalsB.length; ++k) {
				var id = i*(AvalsG.length*AvalsB.length) + j*(AvalsB.length) + k;
				var RGi = i*AvalsG.length + j;
				var GBi = j*AvalsB.length + k;
				var RBi = i*AvalsB.length + k;
				vote3D[id] = VotesRG[RGi]*VotesGB[GBi]*VotesRB[RBi];
			}
		}
	}
	var idx = (vote3D.indexOf(Math.max(...vote3D)));
	var Ri = Math.floor(idx / (AvalsG.length*AvalsB.length));
	var Gi = Math.floor(idx / AvalsB.length) % AvalsG.length;
	var Bi = idx % AvalsB.length;

	var retColor = Array(3).fill(0);
	var normWeight = 0;
	for(var i = Math.max(Ri-1, 0); i < Math.min(Ri+2, AvalsR.length); ++i) {
		for(var j = Math.max(Gi-1, 0); j < Math.min(Gi+2, AvalsG.length); ++j) {
			for(var k = Math.max(Bi-1, 0); k < Math.min(Bi+2, AvalsB.length); ++k) {
				var idx = i*AvalsG.length*AvalsB.length + j*AvalsB.length + k;
				var w = vote3D[idx];
				normWeight += w;
				retColor[0] += AvalsR[i]*w;
				retColor[1] += AvalsG[j]*w;
				retColor[2] += AvalsB[k]*w;
			}
		}
	}
	retColor = retColor.map(d => d/normWeight);
	return retColor;
}

function vote2D(colors, ch1, ch2, A1, A2, dirTrig, weights) {
	var nBins = dirTrig.length;
	var thresh = 0.05;
	var varCount = new Uint32Array(A1.length*A2.length*nBins).fill(0);
	var votes = new Uint8ClampedArray(A1.length*A2.length*nBins).fill(0);

	for(var c = 0; c < colors.length; c += 3) {
		var A1start = A1.findIndex(p => p > colors[c + ch1]);
		var A2start = A2.findIndex(p => p > colors[c + ch2]);
		if (A1start < 0 || A2start < 0) continue;

		votes.fill(0);
		for(var i = A1start; i < A1.length; ++i) {
			for(var j = A2start; j < A2.length; ++j) {
				//Get Angle
				var Ac1 = A1[i], Ac2 = A2[j];
				var xcomp = Ac1 - colors[c + ch1],
					ycomp = Ac2 - colors[c + ch2],
					dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
					xn = xcomp / dist,
					angle = Math.acos(xn),
					bin = Math.round(angle/Math.PI*2 * nBins);
				if(bin == nBins) {bin--;}

				var voteIdx = (i*A2.length + j)*nBins + bin;
				votes[voteIdx] = 1;

				for(var k = 0; k < nBins; ++k) {
					var lineDist = Math.abs(
						(Ac1 - colors[c + ch1])*dirTrig[2*k]
						- (Ac2 - colors[c + ch2])*dirTrig[2*k + 1]
					);
					var tempVote = (lineDist < 2*thresh*(dist*Math.SQRT1_2 + 1))?1:0;
					var voteIdx = (i*A2.length + j)*nBins + k;
					votes[voteIdx] = tempVote;
				}
			}
		}
		for(i = 0; i < varCount.length; ++i) {
			varCount[i] += votes[i];
		}
	}

	var finalVote = new Float32Array(A1.length*A2.length*nBins).fill(0);
	for(var i = 0; i < varCount.length; ++i) {
		if(varCount[i] <= 1) continue;

		var Aidx = Math.floor(i / nBins),
			Ac1 = A1[Math.floor(Aidx / A2.length)],
			Ac2 = A2[Aidx % A2.length];
		for(var j = 0; j < colors.length; j += 3) {
			var xcomp = Ac1 - colors[j + ch1],
				ycomp = Ac2 - colors[j + ch2],
				dist = Math.sqrt(xcomp*xcomp + ycomp*ycomp),
				distweight = weights[j/3]*Math.exp(5*-dist + 1);
			finalVote[i] += distweight;
		}
	}

	var returnMat = new Float32Array(A1.length*A2.length).fill(0);
	for(var i = 0; i < returnMat.length; ++i) {
		for(var j = 0; j < nBins; ++j) {
			returnMat[i] += finalVote[i*nBins + j];
		}
	}
	return returnMat;
}

module.exports = estimateAirLight;
},{"./utils.js":9}],3:[function(require,module,exports){
var Hermite_class = require('./Hermite-resize/dist/hermite.npm.js');

var utils = require('./utils.js');
var cloneCanvas = utils.cloneCanvas;
var work = require('webworkify');

function processImage(img) {
	var gamma = new Number(document.getElementById('gammaSlide').value);
	var canvas = document.getElementById('originalPic');
	var context = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);

	window.origNonResize = cloneCanvas(canvas);

	var ratio = 1, maxsize = 600;
	if(img.width > maxsize) {
		ratio = maxsize / img.width;
	}
	if(img.height*ratio > maxsize) {
		ratio = maxsize / img.height;
	}
	var resizer = new Hermite_class();
	resizer.resample(canvas,
					Math.round(img.width*ratio),
					Math.round(img.height*ratio),
					true,
					function() { 
						window.origCanvas = cloneCanvas(canvas);
						changeGamma(window.origCanvas, canvas, gamma);
						canvas.style.visibility = "visible";
					}
	);
}

function dehazePreview() {
	var startTime = new Date();
	var canvas = document.getElementById('originalPic');
	var minEst = new Number(document.getElementById('minAirSlide').value);
	var maxEst = new Number(document.getElementById('maxAirSlide').value);
	var context = canvas.getContext('2d');
	var colorArrayFlat = context.getImageData(
			0, 0, canvas.width, canvas.height).data.slice(0);
	var picWidth = canvas.width;
	var picHeight = canvas.height;

	//Set loading screen
	var statusText = document.getElementById("statusUpdate");
	var loadingElems = Array.from(document.getElementsByClassName('loading'));
	loadingElems.forEach(e => e.style.visibility = 'visible');
	
	var worker = work(require('../workers/dehazer_worker.js'));
	worker.onmessage = function(e) {
		if(e.data.signal === "finish") {
			window.airLight = e.data.airLight;
			var airLightPreview = document.getElementById('airLightPreview');
			var airLightRGB = window.airLight.map(d => Math.round(d*255));
			var airLightString = 'rgb(' + airLightRGB[0] + ',' + airLightRGB[1] + ',' + airLightRGB[2] + ')';
			airLightPreview.style.backgroundColor = airLightString;

			window.transmittance = e.data.transmittance;
			var endTime = new Date();
			console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");
			statusText.innerHTML = "Post processing…";
			var transCanvas = document.getElementById('transmittanceResultsPic');
			drawTransmittance(transCanvas, window.transmittance, canvas.width, canvas.height);
			var dehazePreview = document.getElementById('dehazeResult');
			drawDehazed(canvas, dehazePreview, window.transmittance, window.airLight);

			loadingElems.forEach(e => e.style.visibility = 'hidden');
			document.getElementById("transmittanceDiv").style.visibility = "visible";
		} else {
			statusText.innerHTML = e.data.signal;
		}
	}
	worker.postMessage({
		image: colorArrayFlat,
		clusters: 500,
		minEst: minEst,
		maxEst: maxEst,
		picWidth: picWidth,
		picHeight: picHeight
	}, [colorArrayFlat.buffer]);
}

function findAirLight() {
	var canvas = document.getElementById('originalPic');
	var minEst = new Number(document.getElementById('minAirSlide').value);
	var maxEst = new Number(document.getElementById('maxAirSlide').value);
	var context = canvas.getContext('2d');
	var colorArrayFlat = context.getImageData(
			0, 0, canvas.width, canvas.height).data.slice(0);
	
	var worker = work(require('../workers/kdtree_worker.js'));
	worker.onmessage = function(e) {
		window.airLight = e.data;
		var airLightPreview = document.getElementById('airLightPreview');
		var airLightRGB = e.data.map(d => Math.round(d*255));
		var airLightString = 'rgb(' + airLightRGB[0] + ',' + airLightRGB[1] + ',' + airLightRGB[2] + ')';
		airLightPreview.style.backgroundColor = airLightString;
	}
	worker.postMessage({image: colorArrayFlat, clusters: 500, minEst: minEst, maxEst: maxEst}, [colorArrayFlat.buffer]);
}

function findAndDrawResults() {
	var canvas = document.getElementById('originalPic');
	var context = canvas.getContext('2d');
	var picWidth = canvas.width,
		  picHeight = canvas.height;
	var colorArray = context.getImageData(0, 0, picWidth, picHeight).data;
	var startTime = new Date();
	var worker = work(require('../workers/transmittance_worker.js'));
	worker.onmessage = function(e) {
		window.transmittance = e.data;
		var endTime = new Date();
		console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");
		var transCanvas = document.getElementById('transmittanceResultsPic');
		drawTransmittance(transCanvas, window.transmittance, canvas.width, canvas.height);
		var dehazePreview = document.getElementById('dehazeResult');
		drawDehazed(canvas, dehazePreview, window.transmittance, window.airLight);
	}
	worker.postMessage({
		colorArray: colorArray,
		picWidth: picWidth,
		picHeight: picHeight,
		airLight: window.airLight
	}, [colorArray.buffer]);
}

function drawDehazed(canvas, destCanvas, transmittance, airLight) {
	var dehazeAmount = new Number(
		document.getElementById("hazeAmountSlide").value
	);
	var distance = new Number(
		document.getElementById("distSlide").value
	);
	var gamma = new Number(
		document.getElementById("gammaOutSlide").value
	);
	var fac = Math.pow(2, distance);

	window.dehazeFlat = hazeArray(canvas, transmittance, airLight, fac);
	mixHaze(window.dehazeFlat, canvas.width, canvas.height,
					destCanvas, transmittance, airLight, dehazeAmount);
	window.dehazedCanvas = cloneCanvas(destCanvas);
	changeGamma(window.dehazedCanvas, destCanvas, 1/gamma);
}

function hazeArray(canvas, transmittance, airLight, fac) {
	var colorFlat = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
	var dehazeFlat = new Uint8ClampedArray(4*transmittance.length).fill(255);
	for(var i = 0; i < transmittance.length; ++i) {
		var tp = transmittance[i]*fac;
		dehazeFlat[4*i] = (colorFlat[4*i] - (1-tp)*airLight[0]*255) / (tp+1e-4);
		dehazeFlat[4*i + 1] = (colorFlat[4*i + 1] - (1-tp)*airLight[1]*255) / (tp+1e-4);
		dehazeFlat[4*i + 2] = (colorFlat[4*i + 2] - (1-tp)*airLight[2]*255) / (tp+1e-4);
	}
	/*transmittance.forEach((t,i) => {
		var tp = t*fac;
		dehazeFlat[4*i] = (colorFlat[4*i] - (1-tp)*airLight[0]*255) / (tp+1e-4);
		dehazeFlat[4*i + 1] = (colorFlat[4*i + 1] - (1-tp)*airLight[1]*255) / (tp+1e-4);
		dehazeFlat[4*i + 2] = (colorFlat[4*i + 2] - (1-tp)*airLight[2]*255) / (tp+1e-4);
	});*/
	return dehazeFlat;
}

function mixHaze(origData, width, height, destCanvas,
									transmittance, airLight, mixVal) {
	var destData = new Uint8ClampedArray(origData.length).fill(255);
	for(var i = 0; i < transmittance.length; i++) {
		var tp = Math.pow(transmittance[i], mixVal);
		destData[4*i] = tp*origData[4*i] + (1-tp)*airLight[0]*255;
		destData[4*i+1] = tp*origData[4*i+1] + (1-tp)*airLight[1]*255;
		destData[4*i+2] = tp*origData[4*i+2] + (1-tp)*airLight[2]*255;
	}
	destCanvas.width = width;
	destCanvas.height = height;
	var destContext = destCanvas.getContext('2d');
	var imageData = destContext.createImageData(width, height);
	imageData.data.set(destData);
	destContext.putImageData(imageData, 0, 0);
}


function drawTransmittance(canvas, transmittance, width, height) {
	var context = canvas.getContext('2d');

	var transFlat = new Uint8ClampedArray(transmittance.length*4);
	for(var i = 0; i < transmittance.length; ++i) {
		var d = transmittance[i];
		transFlat[i*4] = d*255;
		transFlat[i*4 + 1] = d*255;
		transFlat[i*4 + 2] = d*255;
		transFlat[i*4 + 3] = 255;
	}
	canvas.width = width;
	canvas.height = height;
	var imageData = context.createImageData(canvas.width, canvas.height);
	imageData.data.set(transFlat);
	context.putImageData(imageData, 0, 0);
}

function sliderChange(slider, target) {
	target.innerHTML = slider.value;
}

function changeGamma(origCanvas, canvas, gamma) {
	gamma = 1/gamma;
	var context = canvas.getContext('2d');
	var origData = origCanvas.getContext('2d')
	.getImageData(0, 0, canvas.width, canvas.height).data;
	var destData = new Uint8ClampedArray(origData.length).fill(255);
	for(var i = 0; i < origData.length; i += 4) {
		destData[i] = Math.pow(origData[i]/255, gamma)*255;
		destData[i+1] = Math.pow(origData[i+1]/255, gamma)*255;
		destData[i+2] = Math.pow(origData[i+2]/255, gamma)*255;
	}
	var imageData = context.createImageData(canvas.width, canvas.height);
	imageData.data.set(destData);
	context.putImageData(imageData, 0, 0);
}

function calculateOriginal() {
	var gamma = document.getElementById('gammaSlide').value;
	changeGamma(window.origNonResize, window.origNonResize, gamma);
	var startTime = new Date();
	var context = window.origNonResize.getContext('2d');
	var picWidth = window.origNonResize.width,
		  picHeight = window.origNonResize.height;
	var colorArray = context.getImageData(0, 0, picWidth, picHeight).data;

	var statusText = document.getElementById("statusUpdate");
	var loadingElems = Array.from(document.getElementsByClassName('loading'));
	loadingElems.forEach(e => e.style.visibility = 'visible');

	var worker = work(require('../workers/transmittance_worker.js'));
	worker.onmessage = function(e) {
		if(e.data.signal === "finish") {
			var transmittance = e.data.transmittance;
			var endTime = new Date();
			console.log("Finished transmittance map in " + (endTime - startTime)/1000 + " secs.");

			var finalCanvas = document.createElement('canvas');
			drawDehazed(window.origNonResize, finalCanvas, transmittance, window.airLight);

			console.log(finalCanvas.width);
			var db = document.getElementById('downloadLink');
			finalCanvas.toBlob(function(blob) {
				db.href = URL.createObjectURL(blob);
			});
			var revokeURL = function() {
				requestAnimationFrame(function() {
					URL.revokeObjectURL(this.href);
					this.href = null;
				});
				this.removeEventListener('click', revokeURL);
			};
			db.addEventListener('click', revokeURL);
			db.download = "dehazed.png";
			loadingElems.forEach(e => e.style.visibility = 'hidden');
			document.getElementById("transmittanceDiv").style.visibility = "visible";
		} else {
			statusText.innerHTML = e.data.signal;
		}
	}
	worker.postMessage({
		colorArray: colorArray,
		picWidth: picWidth,
		picHeight: picHeight,
		airLight: window.airLight
	}, [colorArray.buffer]);
}

module.exports.processImage = processImage;
module.exports.sliderChange = sliderChange;
module.exports.changeGamma = changeGamma;
module.exports.dehazePreview = dehazePreview;
module.exports.findAirLight = findAirLight;
module.exports.findAndDrawResults = findAndDrawResults;
module.exports.drawDehazed = drawDehazed;
module.exports.mixHaze = mixHaze;
module.exports.calculateOriginal = calculateOriginal;
},{"../workers/dehazer_worker.js":12,"../workers/kdtree_worker.js":13,"../workers/transmittance_worker.js":14,"./Hermite-resize/dist/hermite.npm.js":1,"./utils.js":9,"webworkify":11}],4:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PriorityQueue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AbstractPriorityQueue, ArrayStrategy, BHeapStrategy, BinaryHeapStrategy, PriorityQueue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractPriorityQueue = _dereq_('./PriorityQueue/AbstractPriorityQueue');

ArrayStrategy = _dereq_('./PriorityQueue/ArrayStrategy');

BinaryHeapStrategy = _dereq_('./PriorityQueue/BinaryHeapStrategy');

BHeapStrategy = _dereq_('./PriorityQueue/BHeapStrategy');

PriorityQueue = (function(superClass) {
  extend(PriorityQueue, superClass);

  function PriorityQueue(options) {
    options || (options = {});
    options.strategy || (options.strategy = BinaryHeapStrategy);
    options.comparator || (options.comparator = function(a, b) {
      return (a || 0) - (b || 0);
    });
    PriorityQueue.__super__.constructor.call(this, options);
  }

  return PriorityQueue;

})(AbstractPriorityQueue);

PriorityQueue.ArrayStrategy = ArrayStrategy;

PriorityQueue.BinaryHeapStrategy = BinaryHeapStrategy;

PriorityQueue.BHeapStrategy = BHeapStrategy;

module.exports = PriorityQueue;


},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(_dereq_,module,exports){
var AbstractPriorityQueue;

module.exports = AbstractPriorityQueue = (function() {
  function AbstractPriorityQueue(options) {
    var ref;
    if ((options != null ? options.strategy : void 0) == null) {
      throw 'Must pass options.strategy, a strategy';
    }
    if ((options != null ? options.comparator : void 0) == null) {
      throw 'Must pass options.comparator, a comparator';
    }
    this.priv = new options.strategy(options);
    this.length = (options != null ? (ref = options.initialValues) != null ? ref.length : void 0 : void 0) || 0;
  }

  AbstractPriorityQueue.prototype.queue = function(value) {
    this.length++;
    this.priv.queue(value);
    return void 0;
  };

  AbstractPriorityQueue.prototype.dequeue = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    this.length--;
    return this.priv.dequeue();
  };

  AbstractPriorityQueue.prototype.peek = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    return this.priv.peek();
  };

  AbstractPriorityQueue.prototype.clear = function() {
    this.length = 0;
    return this.priv.clear();
  };

  return AbstractPriorityQueue;

})();


},{}],3:[function(_dereq_,module,exports){
var ArrayStrategy, binarySearchForIndexReversed;

binarySearchForIndexReversed = function(array, value, comparator) {
  var high, low, mid;
  low = 0;
  high = array.length;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (comparator(array[mid], value) >= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

module.exports = ArrayStrategy = (function() {
  function ArrayStrategy(options) {
    var ref;
    this.options = options;
    this.comparator = this.options.comparator;
    this.data = ((ref = this.options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this.data.sort(this.comparator).reverse();
  }

  ArrayStrategy.prototype.queue = function(value) {
    var pos;
    pos = binarySearchForIndexReversed(this.data, value, this.comparator);
    this.data.splice(pos, 0, value);
    return void 0;
  };

  ArrayStrategy.prototype.dequeue = function() {
    return this.data.pop();
  };

  ArrayStrategy.prototype.peek = function() {
    return this.data[this.data.length - 1];
  };

  ArrayStrategy.prototype.clear = function() {
    this.data.length = 0;
    return void 0;
  };

  return ArrayStrategy;

})();


},{}],4:[function(_dereq_,module,exports){
var BHeapStrategy;

module.exports = BHeapStrategy = (function() {
  function BHeapStrategy(options) {
    var arr, i, j, k, len, ref, ref1, shift, value;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.pageSize = (options != null ? options.pageSize : void 0) || 512;
    this.length = 0;
    shift = 0;
    while ((1 << shift) < this.pageSize) {
      shift += 1;
    }
    if (1 << shift !== this.pageSize) {
      throw 'pageSize must be a power of two';
    }
    this._shift = shift;
    this._emptyMemoryPageTemplate = arr = [];
    for (i = j = 0, ref = this.pageSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      arr.push(null);
    }
    this._memory = [];
    this._mask = this.pageSize - 1;
    if (options.initialValues) {
      ref1 = options.initialValues;
      for (k = 0, len = ref1.length; k < len; k++) {
        value = ref1[k];
        this.queue(value);
      }
    }
  }

  BHeapStrategy.prototype.queue = function(value) {
    this.length += 1;
    this._write(this.length, value);
    this._bubbleUp(this.length, value);
    return void 0;
  };

  BHeapStrategy.prototype.dequeue = function() {
    var ret, val;
    ret = this._read(1);
    val = this._read(this.length);
    this.length -= 1;
    if (this.length > 0) {
      this._write(1, val);
      this._bubbleDown(1, val);
    }
    return ret;
  };

  BHeapStrategy.prototype.peek = function() {
    return this._read(1);
  };

  BHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this._memory.length = 0;
    return void 0;
  };

  BHeapStrategy.prototype._write = function(index, value) {
    var page;
    page = index >> this._shift;
    while (page >= this._memory.length) {
      this._memory.push(this._emptyMemoryPageTemplate.slice(0));
    }
    return this._memory[page][index & this._mask] = value;
  };

  BHeapStrategy.prototype._read = function(index) {
    return this._memory[index >> this._shift][index & this._mask];
  };

  BHeapStrategy.prototype._bubbleUp = function(index, value) {
    var compare, indexInPage, parentIndex, parentValue;
    compare = this.comparator;
    while (index > 1) {
      indexInPage = index & this._mask;
      if (index < this.pageSize || indexInPage > 3) {
        parentIndex = (index & ~this._mask) | (indexInPage >> 1);
      } else if (indexInPage < 2) {
        parentIndex = (index - this.pageSize) >> this._shift;
        parentIndex += parentIndex & ~(this._mask >> 1);
        parentIndex |= this.pageSize >> 1;
      } else {
        parentIndex = index - 2;
      }
      parentValue = this._read(parentIndex);
      if (compare(parentValue, value) < 0) {
        break;
      }
      this._write(parentIndex, value);
      this._write(index, parentValue);
      index = parentIndex;
    }
    return void 0;
  };

  BHeapStrategy.prototype._bubbleDown = function(index, value) {
    var childIndex1, childIndex2, childValue1, childValue2, compare;
    compare = this.comparator;
    while (index < this.length) {
      if (index > this._mask && !(index & (this._mask - 1))) {
        childIndex1 = childIndex2 = index + 2;
      } else if (index & (this.pageSize >> 1)) {
        childIndex1 = (index & ~this._mask) >> 1;
        childIndex1 |= index & (this._mask >> 1);
        childIndex1 = (childIndex1 + 1) << this._shift;
        childIndex2 = childIndex1 + 1;
      } else {
        childIndex1 = index + (index & this._mask);
        childIndex2 = childIndex1 + 1;
      }
      if (childIndex1 !== childIndex2 && childIndex2 <= this.length) {
        childValue1 = this._read(childIndex1);
        childValue2 = this._read(childIndex2);
        if (compare(childValue1, value) < 0 && compare(childValue1, childValue2) <= 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else if (compare(childValue2, value) < 0) {
          this._write(childIndex2, value);
          this._write(index, childValue2);
          index = childIndex2;
        } else {
          break;
        }
      } else if (childIndex1 <= this.length) {
        childValue1 = this._read(childIndex1);
        if (compare(childValue1, value) < 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return void 0;
  };

  return BHeapStrategy;

})();


},{}],5:[function(_dereq_,module,exports){
var BinaryHeapStrategy;

module.exports = BinaryHeapStrategy = (function() {
  function BinaryHeapStrategy(options) {
    var ref;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.length = 0;
    this.data = ((ref = options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this._heapify();
  }

  BinaryHeapStrategy.prototype._heapify = function() {
    var i, j, ref;
    if (this.data.length > 0) {
      for (i = j = 1, ref = this.data.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        this._bubbleUp(i);
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype.queue = function(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
    return void 0;
  };

  BinaryHeapStrategy.prototype.dequeue = function() {
    var last, ret;
    ret = this.data[0];
    last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return ret;
  };

  BinaryHeapStrategy.prototype.peek = function() {
    return this.data[0];
  };

  BinaryHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this.data.length = 0;
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleUp = function(pos) {
    var parent, x;
    while (pos > 0) {
      parent = (pos - 1) >>> 1;
      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        x = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = x;
        pos = parent;
      } else {
        break;
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleDown = function(pos) {
    var last, left, minIndex, right, x;
    last = this.data.length - 1;
    while (true) {
      left = (pos << 1) + 1;
      right = left + 1;
      minIndex = pos;
      if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
        minIndex = left;
      }
      if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
        minIndex = right;
      }
      if (minIndex !== pos) {
        x = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = x;
        pos = minIndex;
      } else {
        break;
      }
    }
    return void 0;
  };

  return BinaryHeapStrategy;

})();


},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
/**
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

 (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory(root);
    }
}(this, function (exports) {
  function Node(obj, dimension, parent) {
    this.obj = obj;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.dimension = dimension;
  }

  function kdTree(points, metric, dimensions) {

    var self = this;

    function buildTree(points, depth, parent) {
      var dim = depth % dimensions.length,
        median,
        node;

      if (points.length === 0) {
        return null;
      }
      if (points.length === 1) {
        return new Node(points[0], dim, parent);
      }

      points.sort(function (a, b) {
        return a[dimensions[dim]] - b[dimensions[dim]];
      });

      median = Math.floor(points.length / 2);
      node = new Node(points[median], dim, parent);
      node.left = buildTree(points.slice(0, median), depth + 1, node);
      node.right = buildTree(points.slice(median + 1), depth + 1, node);

      return node;
    }

    // Reloads a serialied tree
    function loadTree (data) {
      // Just need to restore the `parent` parameter
      self.root = data;

      function restoreParent (root) {
        if (root.left) {
          root.left.parent = root;
          restoreParent(root.left);
        }

        if (root.right) {
          root.right.parent = root;
          restoreParent(root.right);
        }
      }

      restoreParent(self.root);
    }

    // If points is not an array, assume we're loading a pre-built tree
    if (!Array.isArray(points)) loadTree(points, metric, dimensions);
    else this.root = buildTree(points, 0, null);

    // Convert to a JSON serializable structure; this just requires removing
    // the `parent` property
    this.toJSON = function (src) {
      if (!src) src = this.root;
      var dest = new Node(src.obj, src.dimension, null);
      if (src.left) dest.left = self.toJSON(src.left);
      if (src.right) dest.right = self.toJSON(src.right);
      return dest;
    };

    this.insert = function (point) {
      function innerSearch(node, parent) {

        if (node === null) {
          return parent;
        }

        var dimension = dimensions[node.dimension];
        if (point[dimension] < node.obj[dimension]) {
          return innerSearch(node.left, node);
        } else {
          return innerSearch(node.right, node);
        }
      }

      var insertPosition = innerSearch(this.root, null),
        newNode,
        dimension;

      if (insertPosition === null) {
        this.root = new Node(point, 0, null);
        return;
      }

      newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
      dimension = dimensions[insertPosition.dimension];

      if (point[dimension] < insertPosition.obj[dimension]) {
        insertPosition.left = newNode;
      } else {
        insertPosition.right = newNode;
      }
    };

    this.remove = function (point) {
      var node;

      function nodeSearch(node) {
        if (node === null) {
          return null;
        }

        if (node.obj === point) {
          return node;
        }

        var dimension = dimensions[node.dimension];

        if (point[dimension] < node.obj[dimension]) {
          return nodeSearch(node.left, node);
        } else {
          return nodeSearch(node.right, node);
        }
      }

      function removeNode(node) {
        var nextNode,
          nextObj,
          pDimension;

        function findMin(node, dim) {
          var dimension,
            own,
            left,
            right,
            min;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];

          if (node.dimension === dim) {
            if (node.left !== null) {
              return findMin(node.left, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMin(node.left, dim);
          right = findMin(node.right, dim);
          min = node;

          if (left !== null && left.obj[dimension] < own) {
            min = left;
          }
          if (right !== null && right.obj[dimension] < min.obj[dimension]) {
            min = right;
          }
          return min;
        }

        if (node.left === null && node.right === null) {
          if (node.parent === null) {
            self.root = null;
            return;
          }

          pDimension = dimensions[node.parent.dimension];

          if (node.obj[pDimension] < node.parent.obj[pDimension]) {
            node.parent.left = null;
          } else {
            node.parent.right = null;
          }
          return;
        }

        // If the right subtree is not empty, swap with the minimum element on the
        // node's dimension. If it is empty, we swap the left and right subtrees and
        // do the same.
        if (node.right !== null) {
          nextNode = findMin(node.right, node.dimension);
          nextObj = nextNode.obj;
          removeNode(nextNode);
          node.obj = nextObj;
        } else {
          nextNode = findMin(node.left, node.dimension);
          nextObj = nextNode.obj;
          removeNode(nextNode);
          node.right = node.left;
          node.left = null;
          node.obj = nextObj;
        }

      }

      node = nodeSearch(self.root);

      if (node === null) { return; }

      removeNode(node);
    };

    this.nearest = function (point, maxNodes, maxDistance) {
      var i,
        result,
        bestNodes;

      bestNodes = new BinaryHeap(
        function (e) { return -e[1]; }
      );

      function nearestSearch(node) {
        var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;

        function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }

        for (i = 0; i < dimensions.length; i += 1) {
          if (i === node.dimension) {
            linearPoint[dimensions[i]] = point[dimensions[i]];
          } else {
            linearPoint[dimensions[i]] = node.obj[dimensions[i]];
          }
        }

        linearDistance = metric(linearPoint, node.obj);

        if (node.right === null && node.left === null) {
          if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
            saveNode(node, ownDistance);
          }
          return;
        }

        if (node.right === null) {
          bestChild = node.left;
        } else if (node.left === null) {
          bestChild = node.right;
        } else {
          if (point[dimension] < node.obj[dimension]) {
            bestChild = node.left;
          } else {
            bestChild = node.right;
          }
        }

        nearestSearch(bestChild);

        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
          if (bestChild === node.left) {
            otherChild = node.right;
          } else {
            otherChild = node.left;
          }
          if (otherChild !== null) {
            nearestSearch(otherChild);
          }
        }
      }

      if (maxDistance) {
        for (i = 0; i < maxNodes; i += 1) {
          bestNodes.push([null, maxDistance]);
        }
      }

      if(self.root)
        nearestSearch(self.root);

      result = [];

      for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
        if (bestNodes.content[i][0]) {
          result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
        }
      }
      return result;
    };

    this.balanceFactor = function () {
      function height(node) {
        if (node === null) {
          return 0;
        }
        return Math.max(height(node.left), height(node.right)) + 1;
      }

      function count(node) {
        if (node === null) {
          return 0;
        }
        return count(node.left) + count(node.right) + 1;
      }

      return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
    };
  }

  // Binary heap implementation from:
  // http://eloquentjavascript.net/appendix2.html

  function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },

    peek: function() {
      return this.content[0];
    },

    remove: function(node) {
      var len = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < len; i++) {
        if (this.content[i] == node) {
          // When it is found, the process seen in 'pop' is repeated
          // to fill up the hole.
          var end = this.content.pop();
          if (i != len - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node))
              this.bubbleUp(i);
            else
              this.sinkDown(i);
          }
          return;
        }
      }
      throw new Error("Node not found.");
    },

    size: function() {
      return this.content.length;
    },

    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n];
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // Swap the elements if the parent is greater.
        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent;
          // Update 'n' to continue at the new position.
          n = parentN;
        }
        // Found a parent that is less, no need to move it further.
        else {
          break;
        }
      }
    },

    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);

      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
              child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score)){
            swap = child2N;
          }
        }

        // If the element needs to be moved, swap it, and continue.
        if (swap != null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        }
        // Otherwise, we are done.
        else {
          break;
        }
      }
    }
  };

  exports.kdTree = kdTree;
  exports.BinaryHeap = BinaryHeap;
}));

},{}],6:[function(require,module,exports){
var PriorityQueue = require('./js-priority-queue/priority-queue.js');

// Now use the nd_array

function QuantKDTreeNode(colorArray, startIdx, endIdx, minVal, maxVal, parent) {
	this.minVal = minVal.slice(0);
	this.maxVal = maxVal.slice(0);
	
	this.startIdx = startIdx;
	this.endIdx = endIdx;
	this.splitChannel = -1; // must be integer;
	this.splitThreshold = -1;
	this.splitVariance = -1;
	this.left = -1;
	this.right = -1;
	this.parent = parent;
	this.isLeaf = true;
	this.index = -1;

	/* TODO: Find optimal split */
	for(var i = 0; i < 3; i++) {
		var histo = new Uint32Array(256).fill(0);
		for(var j = this.startIdx; j < this.endIdx; ++j) {
			histo[colorArray[4*j + i]]++;
		}
		/*colorArray.slice(this.startIdx, this.endIdx).forEach(element => {
			histo[element[i]]++;
		});8?

		/* Find split with Otsu's Algorithm */
		var sumB = 0, wB = 0;
		var sum1 = histo.map((data, idx) => data*idx)
		                .reduce((a, b) => a+b, 0);
		var total = histo.reduce((a, b) => a+b, 0);
		for(var j = 0; j < 256; ++j) {
			wB += histo[j];
			var wF = total - wB;
			if(wB == 0 || wF == 0) {
				continue;
			}
			sumB += j*histo[j];
			var mF = (sum1 - sumB) / wF;
			var tempRat = sumB / wB - mF;
			var between = wB*wF*tempRat*tempRat;

			if(between >= this.splitVariance) {
				this.splitChannel = i;
				this.splitThreshold = j;
				this.splitVariance = between;
			}
		}
	}
} 

function QuantKDTree(colorArray, clusters) {
	//var colorArray = makeColorArray(canvas);
	var pq = new PriorityQueue({
		comparator: function(a, b) {
			return b.splitVariance - a.splitVariance;
		}
	});

	pq.queue(new QuantKDTreeNode(
		colorArray, 0, colorArray.length/4,//colorArray.size[0],
		[0, 0, 0], [255, 255, 252],
		-1)
	);
	console.log("ha");

	this.kdtree = Array(2*clusters - 1);
	var idx = 0, currLeaves = 0;

	while(pq.length > 0 && currLeaves + pq.length < clusters) {
		var front = pq.dequeue();
		if(front.parent >= 0) {
			var parent = this.kdtree[front.parent];
			if (parent.minVal.every(
				(v, i) => v === front.minVal[i])) {
				parent.left = idx;
			} else {
				parent.right = idx;
			}
		}

		this.kdtree[idx] = front;

		if(front.splitChannel == -1) {
			idx++;
			currLeaves++;
			continue;
		}

		var sc = front.splitChannel, st = front.splitThreshold;

		var left_idx = front.startIdx-1, right_idx = front.startIdx;
		for (var right_idx = front.startIdx; right_idx < front.endIdx; ++right_idx) {
			if(colorArray[4*right_idx + sc] < st) {
				left_idx++;
				var left_real = left_idx*4;
				var right_real = right_idx*4;
				for(var j = 0; j < 4; ++j) {
					var t = colorArray[right_real + j];
					colorArray[right_real + j] = colorArray[left_real + j]
					colorArray[left_real + j] = t;
				}
			}
		}
		var pivot = left_idx + 1;
		if(pivot == front.startIdx || pivot == front.endIdx) {
			idx++;
			currLeaves++;
			continue;
		}
		
		// Split colorArray
		/*var colorslice = colorArray.slice(front.startIdx, front.endIdx);
		var left = colorslice.filter(color => color[sc] < st);
		var right = colorslice.filter(color => color[sc] >= st);
		var pivot = front.startIdx + left.length;
		if(pivot == front.startIdx || pivot == front.endIdx) {
			idx++;
			currLeaves++;
			continue;
		}
		var partition = left.concat(right);
		partition.forEach((data, idx) => {
			colorArray[front.startIdx + idx] = data;
		});*/

		var thresh = front.maxVal.slice(0);
		thresh[sc] = st;
		pq.queue(new QuantKDTreeNode(
			colorArray, front.startIdx, pivot,
			front.minVal, thresh, idx
		));
		thresh = front.minVal.slice(0);
		thresh[sc] = st+1;
		pq.queue(new QuantKDTreeNode(
			colorArray, pivot, front.endIdx,
			thresh, front.maxVal, idx
		));

		this.kdtree[idx].isLeaf = false;
		idx++;
	}
	while(pq.length > 0) {
		var front = pq.dequeue();
		if(front.parent >= 0) {
			var parent = this.kdtree[front.parent];
			if (parent.minVal.every(
				(v, i) => v === front.minVal[i])) {
				parent.left = idx;
			} else {
				parent.right = idx;
			}
		}
		this.kdtree[idx] = front;
		idx++;
	}
	var leafindex = 0;
	this.centroids = new Uint8ClampedArray(clusters*3);
	this.n_clusters = clusters;
	for(var i = 0; i < idx; ++i) {
		if(this.kdtree[i].isLeaf) {
			this.kdtree[i].index = leafindex;

			//Calculate centroid
			var leaf = this.kdtree[i];
			var colorsum = [0, 0, 0];
			for(var j = leaf.startIdx*4; j < leaf.endIdx*4; j = j+4) {
				colorsum[0] += colorArray[j];
				colorsum[1] += colorArray[j + 1];
				colorsum[2] += colorArray[j + 2];
			}
			var elems = leaf.endIdx - leaf.startIdx;
			this.centroids[leafindex*3] = Math.round(colorsum[0]/elems);
			this.centroids[leafindex*3 + 1] = Math.round(colorsum[1]/elems);
			this.centroids[leafindex*3 + 2] = Math.round(colorsum[2]/elems);
			leaf.centroid = this.centroids.slice(leafindex*3, leafindex*3 + 3);
			leafindex++;
		}
	}
	/*for(var i = 0; i < idx; ++i) {
		if(this.kdtree[i].isLeaf) {
			this.kdtree[i].index = leafindex;
			leafindex++;

			//Calculate centroid
			var leaf = this.kdtree[i];
			var colorslice = colorArray.slice(leaf.startIdx, leaf.endIdx);
			var elems = leaf.endIdx - leaf.startIdx;
			leaf.centroid = colorslice.reduce((a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]])
																.map(data => Math.round(data/elems));
			this.centroids.push(leaf.centroid);
		}
	}*/
}

QuantKDTree.prototype.lookupColor = function(color) {
	var currNode = this.kdtree[0];
	while(!currNode.isLeaf) {
		var chan = currNode.splitChannel;
		currNode = (color[chan] < currNode.splitThreshold)?
			        this.kdtree[currNode.left]:
			        this.kdtree[currNode.right];
	}
	return currNode.centroid.slice(0);
}

QuantKDTree.prototype.lookupID = function(color) {
	var currNode = this.kdtree[0];
	while(!currNode.isLeaf) {
		var chan = currNode.splitChannel;
		currNode = (color[chan] < currNode.splitThreshold)?
			        this.kdtree[currNode.left]:
			        this.kdtree[currNode.right];
	}
	return currNode.index;
}

/*QuantKDTree.prototype.quantizeImage = function(canvas, destCanvas) {
	var colorArray = makeColorArray(canvas);

	var destColorArray = colorArray.map(data => this.lookupColor(data).concat(255));
	var destFlat = new Uint8ClampedArray([].concat.apply([], destColorArray));
	
	destCanvas.width = canvas.width;
	destCanvas.height = canvas.height;
	var dContext = destCanvas.getContext("2d");
	var imageData = dContext.createImageData(canvas.width, canvas.height);
	imageData.data.set(destFlat);
	dContext.putImageData(imageData, 0, 0);
}*/

QuantKDTree.prototype.quantizeID = function(colorArray) {
	var ids = new Uint16Array(colorArray.length / 4);
	for(i = 0; i < colorArray.length/4; i++) {
		ids[i] = this.lookupID(colorArray.slice(i*4, i*4+3));
	}
	return ids;
}

module.exports = QuantKDTree;
},{"./js-priority-queue/priority-queue.js":4}],7:[function(require,module,exports){
var utils = require('./utils.js');
var kdTree = require('./kd-tree-javascript/kdTree.js');

kd_tree_sample_points = [
{x: 0.000000, y: -1.000000, z: 0.000000},
{x: 0.723607, y: -0.447220, z: 0.525725},
{x: -0.276388, y: -0.447220, z: 0.850649},
{x: -0.894426, y: -0.447216, z: 0.000000},
{x: -0.276388, y: -0.447220, z: -0.850649},
{x: 0.723607, y: -0.447220, z: -0.525725},
{x: 0.276388, y: 0.447220, z: 0.850649},
{x: -0.723607, y: 0.447220, z: 0.525725},
{x: -0.723607, y: 0.447220, z: -0.525725},
{x: 0.276388, y: 0.447220, z: -0.850649},
{x: 0.894426, y: 0.447216, z: 0.000000},
{x: 0.000000, y: 1.000000, z: 0.000000},
{x: -0.257937, y: -0.550685, z: 0.793860},
{x: -0.232822, y: -0.657519, z: 0.716563},
{x: -0.200688, y: -0.760403, z: 0.617666},
{x: -0.162456, y: -0.850654, z: 0.499995},
{x: -0.120413, y: -0.920955, z: 0.370598},
{x: -0.077607, y: -0.967950, z: 0.238853},
{x: -0.036848, y: -0.992865, z: 0.113408},
{x: 0.096471, y: -0.992865, z: 0.070089},
{x: 0.203181, y: -0.967950, z: 0.147618},
{x: 0.315251, y: -0.920955, z: 0.229040},
{x: 0.425323, y: -0.850654, z: 0.309011},
{x: 0.525420, y: -0.760403, z: 0.381735},
{x: 0.609547, y: -0.657519, z: 0.442856},
{x: 0.675300, y: -0.550685, z: 0.490628},
{x: 0.638452, y: -0.476987, z: 0.604038},
{x: 0.531941, y: -0.502302, z: 0.681712},
{x: 0.405008, y: -0.519572, z: 0.752338},
{x: 0.262869, y: -0.525738, z: 0.809012},
{x: 0.114564, y: -0.519572, z: 0.846711},
{x: -0.029639, y: -0.502302, z: 0.864184},
{x: -0.161465, y: -0.476988, z: 0.863951},
{x: 0.771771, y: -0.476987, z: -0.420539},
{x: 0.812729, y: -0.502301, z: -0.295238},
{x: 0.840673, y: -0.519571, z: -0.152694},
{x: 0.850648, y: -0.525736, z: 0.000000},
{x: 0.840673, y: -0.519571, z: 0.152694},
{x: 0.812729, y: -0.502301, z: 0.295238},
{x: 0.771771, y: -0.476987, z: 0.420539},
{x: 0.096471, y: -0.992865, z: -0.070089},
{x: 0.203181, y: -0.967950, z: -0.147618},
{x: 0.315251, y: -0.920955, z: -0.229040},
{x: 0.425323, y: -0.850654, z: -0.309011},
{x: 0.525420, y: -0.760403, z: -0.381735},
{x: 0.609547, y: -0.657519, z: -0.442856},
{x: 0.675300, y: -0.550685, z: -0.490628},
{x: -0.834716, y: -0.550681, z: 0.000000},
{x: -0.753442, y: -0.657515, z: 0.000000},
{x: -0.649456, y: -0.760399, z: 0.000000},
{x: -0.525730, y: -0.850652, z: 0.000000},
{x: -0.389673, y: -0.920953, z: 0.000000},
{x: -0.251147, y: -0.967949, z: 0.000000},
{x: -0.119245, y: -0.992865, z: 0.000000},
{x: -0.377183, y: -0.476988, z: 0.793861},
{x: -0.483971, y: -0.502302, z: 0.716565},
{x: -0.590366, y: -0.519572, z: 0.617668},
{x: -0.688189, y: -0.525736, z: 0.499997},
{x: -0.769872, y: -0.519570, z: 0.370600},
{x: -0.831051, y: -0.502299, z: 0.238853},
{x: -0.871565, y: -0.476984, z: 0.113408},
{x: -0.257937, y: -0.550685, z: -0.793860},
{x: -0.232822, y: -0.657519, z: -0.716563},
{x: -0.200688, y: -0.760403, z: -0.617666},
{x: -0.162456, y: -0.850654, z: -0.499995},
{x: -0.120413, y: -0.920955, z: -0.370598},
{x: -0.077607, y: -0.967950, z: -0.238853},
{x: -0.036848, y: -0.992865, z: -0.113408},
{x: -0.871565, y: -0.476984, z: -0.113408},
{x: -0.831051, y: -0.502299, z: -0.238853},
{x: -0.769872, y: -0.519570, z: -0.370600},
{x: -0.688189, y: -0.525736, z: -0.499997},
{x: -0.590366, y: -0.519572, z: -0.617668},
{x: -0.483971, y: -0.502302, z: -0.716565},
{x: -0.377183, y: -0.476988, z: -0.793861},
{x: -0.161465, y: -0.476988, z: -0.863951},
{x: -0.029639, y: -0.502302, z: -0.864184},
{x: 0.114564, y: -0.519573, z: -0.846711},
{x: 0.262869, y: -0.525738, z: -0.809012},
{x: 0.405008, y: -0.519572, z: -0.752338},
{x: 0.531941, y: -0.502302, z: -0.681712},
{x: 0.638453, y: -0.476987, z: -0.604038},
{x: 0.931188, y: 0.357738, z: 0.070089},
{x: 0.956626, y: 0.251149, z: 0.147618},
{x: 0.964711, y: 0.129893, z: 0.229041},
{x: 0.951058, y: -0.000000, z: 0.309013},
{x: 0.915098, y: -0.129893, z: 0.381737},
{x: 0.860698, y: -0.251151, z: 0.442858},
{x: 0.794547, y: -0.357741, z: 0.490629},
{x: 0.794547, y: -0.357741, z: -0.490629},
{x: 0.860698, y: -0.251151, z: -0.442858},
{x: 0.915098, y: -0.129893, z: -0.381737},
{x: 0.951058, y: 0.000000, z: -0.309013},
{x: 0.964711, y: 0.129893, z: -0.229041},
{x: 0.956626, y: 0.251149, z: -0.147618},
{x: 0.931188, y: 0.357738, z: -0.070089},
{x: 0.221089, y: 0.357741, z: 0.907271},
{x: 0.155215, y: 0.251152, z: 0.955422},
{x: 0.080276, y: 0.129894, z: 0.988273},
{x: -0.000000, y: -0.000000, z: 1.000000},
{x: -0.080276, y: -0.129894, z: 0.988273},
{x: -0.155215, y: -0.251152, z: 0.955422},
{x: -0.221089, y: -0.357741, z: 0.907271},
{x: 0.712150, y: -0.357741, z: 0.604039},
{x: 0.687159, y: -0.251152, z: 0.681715},
{x: 0.645839, y: -0.129894, z: 0.752343},
{x: 0.587786, y: 0.000000, z: 0.809017},
{x: 0.515946, y: 0.129894, z: 0.846716},
{x: 0.436007, y: 0.251152, z: 0.864188},
{x: 0.354409, y: 0.357742, z: 0.863953},
{x: -0.794547, y: 0.357741, z: 0.490629},
{x: -0.860698, y: 0.251151, z: 0.442858},
{x: -0.915098, y: 0.129893, z: 0.381737},
{x: -0.951058, y: -0.000000, z: 0.309013},
{x: -0.964711, y: -0.129893, z: 0.229041},
{x: -0.956626, y: -0.251149, z: 0.147618},
{x: -0.931188, y: -0.357738, z: 0.070089},
{x: -0.354409, y: -0.357742, z: 0.863953},
{x: -0.436007, y: -0.251152, z: 0.864188},
{x: -0.515946, y: -0.129894, z: 0.846716},
{x: -0.587786, y: 0.000000, z: 0.809017},
{x: -0.645839, y: 0.129894, z: 0.752342},
{x: -0.687159, y: 0.251152, z: 0.681715},
{x: -0.712150, y: 0.357741, z: 0.604039},
{x: -0.712150, y: 0.357741, z: -0.604039},
{x: -0.687159, y: 0.251152, z: -0.681715},
{x: -0.645839, y: 0.129894, z: -0.752343},
{x: -0.587786, y: -0.000000, z: -0.809017},
{x: -0.515946, y: -0.129894, z: -0.846716},
{x: -0.436007, y: -0.251152, z: -0.864188},
{x: -0.354409, y: -0.357742, z: -0.863953},
{x: -0.931188, y: -0.357738, z: -0.070089},
{x: -0.956626, y: -0.251149, z: -0.147618},
{x: -0.964711, y: -0.129893, z: -0.229041},
{x: -0.951058, y: 0.000000, z: -0.309013},
{x: -0.915098, y: 0.129893, z: -0.381737},
{x: -0.860698, y: 0.251151, z: -0.442858},
{x: -0.794547, y: 0.357741, z: -0.490629},
{x: 0.354409, y: 0.357742, z: -0.863953},
{x: 0.436007, y: 0.251152, z: -0.864188},
{x: 0.515946, y: 0.129894, z: -0.846716},
{x: 0.587786, y: -0.000000, z: -0.809017},
{x: 0.645839, y: -0.129894, z: -0.752342},
{x: 0.687159, y: -0.251152, z: -0.681715},
{x: 0.712150, y: -0.357741, z: -0.604039},
{x: -0.221089, y: -0.357741, z: -0.907271},
{x: -0.155215, y: -0.251152, z: -0.955422},
{x: -0.080276, y: -0.129894, z: -0.988273},
{x: 0.000000, y: 0.000000, z: -1.000000},
{x: 0.080276, y: 0.129894, z: -0.988273},
{x: 0.155215, y: 0.251152, z: -0.955422},
{x: 0.221089, y: 0.357741, z: -0.907271},
{x: 0.871565, y: 0.476984, z: 0.113408},
{x: 0.831051, y: 0.502299, z: 0.238853},
{x: 0.769872, y: 0.519570, z: 0.370600},
{x: 0.688189, y: 0.525736, z: 0.499997},
{x: 0.590366, y: 0.519572, z: 0.617668},
{x: 0.483971, y: 0.502302, z: 0.716565},
{x: 0.377183, y: 0.476988, z: 0.793861},
{x: 0.161465, y: 0.476988, z: 0.863951},
{x: 0.029639, y: 0.502302, z: 0.864184},
{x: -0.114564, y: 0.519573, z: 0.846711},
{x: -0.262869, y: 0.525738, z: 0.809012},
{x: -0.405008, y: 0.519572, z: 0.752338},
{x: -0.531941, y: 0.502302, z: 0.681712},
{x: -0.638453, y: 0.476987, z: 0.604038},
{x: -0.771771, y: 0.476987, z: 0.420539},
{x: -0.812729, y: 0.502301, z: 0.295238},
{x: -0.840673, y: 0.519571, z: 0.152694},
{x: -0.850648, y: 0.525736, z: -0.000000},
{x: -0.840673, y: 0.519571, z: -0.152694},
{x: -0.812729, y: 0.502301, z: -0.295238},
{x: -0.771771, y: 0.476987, z: -0.420539},
{x: -0.638452, y: 0.476987, z: -0.604038},
{x: -0.531941, y: 0.502302, z: -0.681712},
{x: -0.405008, y: 0.519572, z: -0.752338},
{x: -0.262869, y: 0.525738, z: -0.809012},
{x: -0.114564, y: 0.519572, z: -0.846711},
{x: 0.029639, y: 0.502302, z: -0.864184},
{x: 0.161465, y: 0.476988, z: -0.863951},
{x: 0.377183, y: 0.476988, z: -0.793861},
{x: 0.483971, y: 0.502302, z: -0.716565},
{x: 0.590366, y: 0.519572, z: -0.617668},
{x: 0.688189, y: 0.525736, z: -0.499997},
{x: 0.769872, y: 0.519570, z: -0.370600},
{x: 0.831051, y: 0.502299, z: -0.238853},
{x: 0.871565, y: 0.476984, z: -0.113408},
{x: 0.036848, y: 0.992865, z: 0.113408},
{x: 0.077607, y: 0.967950, z: 0.238853},
{x: 0.120413, y: 0.920955, z: 0.370598},
{x: 0.162456, y: 0.850654, z: 0.499995},
{x: 0.200688, y: 0.760403, z: 0.617666},
{x: 0.232822, y: 0.657519, z: 0.716563},
{x: 0.257937, y: 0.550685, z: 0.793860},
{x: 0.834716, y: 0.550681, z: 0.000000},
{x: 0.753442, y: 0.657515, z: 0.000000},
{x: 0.649456, y: 0.760399, z: 0.000000},
{x: 0.525730, y: 0.850652, z: 0.000000},
{x: 0.389673, y: 0.920953, z: 0.000000},
{x: 0.251147, y: 0.967949, z: 0.000000},
{x: 0.119245, y: 0.992865, z: 0.000000},
{x: -0.096471, y: 0.992865, z: 0.070089},
{x: -0.203181, y: 0.967950, z: 0.147618},
{x: -0.315251, y: 0.920955, z: 0.229040},
{x: -0.425323, y: 0.850654, z: 0.309011},
{x: -0.525420, y: 0.760403, z: 0.381735},
{x: -0.609547, y: 0.657519, z: 0.442856},
{x: -0.675300, y: 0.550685, z: 0.490628},
{x: -0.096471, y: 0.992865, z: -0.070089},
{x: -0.203181, y: 0.967950, z: -0.147618},
{x: -0.315251, y: 0.920955, z: -0.229040},
{x: -0.425323, y: 0.850654, z: -0.309011},
{x: -0.525420, y: 0.760403, z: -0.381735},
{x: -0.609547, y: 0.657519, z: -0.442856},
{x: -0.675300, y: 0.550685, z: -0.490628},
{x: 0.036848, y: 0.992865, z: -0.113408},
{x: 0.077607, y: 0.967950, z: -0.238853},
{x: 0.120413, y: 0.920955, z: -0.370598},
{x: 0.162456, y: 0.850654, z: -0.499995},
{x: 0.200688, y: 0.760403, z: -0.617666},
{x: 0.232822, y: 0.657519, z: -0.716563},
{x: 0.257937, y: 0.550685, z: -0.793860},
{x: 0.166198, y: 0.978672, z: -0.120749},
{x: 0.307167, y: 0.943208, z: -0.126518},
{x: 0.215245, y: 0.943209, z: -0.253036},
{x: 0.451375, y: 0.882854, z: -0.129731},
{x: 0.361800, y: 0.894429, z: -0.262863},
{x: 0.262862, y: 0.882855, z: -0.389192},
{x: 0.587783, y: 0.798549, z: -0.129731},
{x: 0.506729, y: 0.819912, z: -0.266403},
{x: 0.409951, y: 0.819913, z: -0.399604},
{x: 0.305014, y: 0.798552, z: -0.518924},
{x: 0.706258, y: 0.696558, z: -0.126519},
{x: 0.638194, y: 0.723610, z: -0.262864},
{x: 0.550008, y: 0.733353, z: -0.399605},
{x: 0.447209, y: 0.723612, z: -0.525728},
{x: 0.338569, y: 0.696561, z: -0.632593},
{x: 0.801022, y: 0.586331, z: -0.120750},
{x: 0.747366, y: 0.614342, z: -0.253038},
{x: 0.672087, y: 0.629942, z: -0.389194},
{x: 0.577830, y: 0.629943, z: -0.518926},
{x: 0.471599, y: 0.614344, z: -0.632594},
{x: 0.362366, y: 0.586334, z: -0.724502},
{x: -0.063483, y: 0.978672, z: -0.195376},
{x: -0.025408, y: 0.943209, z: -0.331227},
{x: -0.174138, y: 0.943209, z: -0.282901},
{x: 0.016098, y: 0.882855, z: -0.469369},
{x: -0.138197, y: 0.894430, z: -0.425319},
{x: -0.288916, y: 0.882855, z: -0.370262},
{x: 0.058250, y: 0.798552, z: -0.599101},
{x: -0.096779, y: 0.819914, z: -0.564248},
{x: -0.253366, y: 0.819914, z: -0.513369},
{x: -0.399272, y: 0.798552, z: -0.450440},
{x: 0.097915, y: 0.696561, z: -0.710785},
{x: -0.052790, y: 0.723612, z: -0.688185},
{x: -0.210088, y: 0.733355, z: -0.646571},
{x: -0.361804, y: 0.723612, z: -0.587778},
{x: -0.497009, y: 0.696561, z: -0.517479},
{x: 0.132684, y: 0.586334, z: -0.799129},
{x: -0.009708, y: 0.614345, z: -0.788978},
{x: -0.162463, y: 0.629944, z: -0.759458},
{x: -0.314971, y: 0.629944, z: -0.709904},
{x: -0.455902, y: 0.614344, z: -0.643998},
{x: -0.577066, y: 0.586334, z: -0.568513},
{x: -0.205432, y: 0.978671, z: 0.000000},
{x: -0.322868, y: 0.943208, z: -0.078192},
{x: -0.322868, y: 0.943208, z: 0.078192},
{x: -0.441423, y: 0.882855, z: -0.160354},
{x: -0.447210, y: 0.894429, z: 0.000000},
{x: -0.441423, y: 0.882855, z: 0.160354},
{x: -0.551779, y: 0.798551, z: -0.240532},
{x: -0.566539, y: 0.819912, z: -0.082322},
{x: -0.566539, y: 0.819912, z: 0.082322},
{x: -0.551779, y: 0.798551, z: 0.240532},
{x: -0.645740, y: 0.696561, z: -0.312768},
{x: -0.670817, y: 0.723611, z: -0.162457},
{x: -0.679848, y: 0.733353, z: 0.000000},
{x: -0.670817, y: 0.723611, z: 0.162457},
{x: -0.645740, y: 0.696560, z: 0.312768},
{x: -0.719015, y: 0.586334, z: -0.373135},
{x: -0.753363, y: 0.614343, z: -0.234576},
{x: -0.772492, y: 0.629942, z: -0.080177},
{x: -0.772492, y: 0.629942, z: 0.080177},
{x: -0.753363, y: 0.614343, z: 0.234576},
{x: -0.719015, y: 0.586334, z: 0.373135},
{x: -0.063483, y: 0.978672, z: 0.195376},
{x: -0.174138, y: 0.943209, z: 0.282901},
{x: -0.025408, y: 0.943209, z: 0.331227},
{x: -0.288916, y: 0.882855, z: 0.370262},
{x: -0.138197, y: 0.894430, z: 0.425319},
{x: 0.016098, y: 0.882855, z: 0.469369},
{x: -0.399272, y: 0.798552, z: 0.450440},
{x: -0.253366, y: 0.819914, z: 0.513369},
{x: -0.096779, y: 0.819914, z: 0.564248},
{x: 0.058250, y: 0.798552, z: 0.599101},
{x: -0.497009, y: 0.696561, z: 0.517479},
{x: -0.361804, y: 0.723612, z: 0.587778},
{x: -0.210088, y: 0.733355, z: 0.646571},
{x: -0.052790, y: 0.723612, z: 0.688185},
{x: 0.097915, y: 0.696561, z: 0.710785},
{x: -0.577066, y: 0.586334, z: 0.568513},
{x: -0.455902, y: 0.614345, z: 0.643998},
{x: -0.314971, y: 0.629944, z: 0.709904},
{x: -0.162463, y: 0.629944, z: 0.759458},
{x: -0.009708, y: 0.614345, z: 0.788978},
{x: 0.132684, y: 0.586335, z: 0.799129},
{x: 0.166198, y: 0.978672, z: 0.120749},
{x: 0.215245, y: 0.943209, z: 0.253036},
{x: 0.307167, y: 0.943208, z: 0.126518},
{x: 0.262862, y: 0.882855, z: 0.389192},
{x: 0.361800, y: 0.894429, z: 0.262863},
{x: 0.451375, y: 0.882854, z: 0.129731},
{x: 0.305014, y: 0.798552, z: 0.518924},
{x: 0.409951, y: 0.819913, z: 0.399604},
{x: 0.506729, y: 0.819912, z: 0.266403},
{x: 0.587783, y: 0.798549, z: 0.129731},
{x: 0.338569, y: 0.696561, z: 0.632593},
{x: 0.447209, y: 0.723612, z: 0.525728},
{x: 0.550008, y: 0.733353, z: 0.399605},
{x: 0.638194, y: 0.723610, z: 0.262864},
{x: 0.706258, y: 0.696558, z: 0.126519},
{x: 0.362366, y: 0.586334, z: 0.724502},
{x: 0.471599, y: 0.614344, z: 0.632594},
{x: 0.577830, y: 0.629943, z: 0.518926},
{x: 0.672087, y: 0.629942, z: 0.389194},
{x: 0.747366, y: 0.614342, z: 0.253038},
{x: 0.801022, y: 0.586331, z: 0.120750},
{x: 0.903740, y: 0.380897, z: -0.195376},
{x: 0.921508, y: 0.266063, z: -0.282902},
{x: 0.854992, y: 0.399094, z: -0.331229},
{x: 0.918856, y: 0.136410, z: -0.370264},
{x: 0.861804, y: 0.276396, z: -0.425322},
{x: 0.782446, y: 0.409229, z: -0.469371},
{x: 0.892805, y: -0.000000, z: -0.450443},
{x: 0.846660, y: 0.140059, z: -0.513372},
{x: 0.776630, y: 0.280118, z: -0.564251},
{x: 0.688190, y: 0.409230, z: -0.599104},
{x: 0.845290, y: -0.133032, z: -0.517481},
{x: 0.809019, y: 0.000000, z: -0.587782},
{x: 0.749882, y: 0.140059, z: -0.646576},
{x: 0.670821, y: 0.276397, z: -0.688189},
{x: 0.579226, y: 0.399096, z: -0.710788},
{x: 0.782501, y: -0.253933, z: -0.568515},
{x: 0.753368, y: -0.133032, z: -0.644002},
{x: 0.704293, y: 0.000000, z: -0.709909},
{x: 0.636088, y: 0.136411, z: -0.759463},
{x: 0.553820, y: 0.266065, z: -0.788982},
{x: 0.465085, y: 0.380900, z: -0.799132},
{x: 0.093451, y: 0.380900, z: -0.919882},
{x: 0.015700, y: 0.266064, z: -0.963827},
{x: -0.050816, y: 0.399096, z: -0.915500},
{x: -0.068205, y: 0.136410, z: -0.988302},
{x: -0.138198, y: 0.276397, z: -0.951055},
{x: -0.204615, y: 0.409230, z: -0.889193},
{x: -0.152509, y: -0.000000, z: -0.988302},
{x: -0.226618, y: 0.140059, z: -0.963861},
{x: -0.296648, y: 0.280118, z: -0.912981},
{x: -0.357124, y: 0.409230, z: -0.839639},
{x: -0.230948, y: -0.133033, z: -0.963829},
{x: -0.309016, y: -0.000000, z: -0.951057},
{x: -0.383207, y: 0.140059, z: -0.912982},
{x: -0.447215, y: 0.276397, z: -0.850649},
{x: -0.497012, y: 0.399096, z: -0.770520},
{x: -0.298885, y: -0.253934, z: -0.919883},
{x: -0.379680, y: -0.133033, z: -0.915503},
{x: -0.457527, y: -0.000000, z: -0.889196},
{x: -0.525732, y: 0.136410, z: -0.839642},
{x: -0.579229, y: 0.266065, z: -0.770522},
{x: -0.616302, y: 0.380900, z: -0.689266},
{x: -0.845982, y: 0.380899, z: -0.373136},
{x: -0.911804, y: 0.266063, z: -0.312769},
{x: -0.886396, y: 0.399095, z: -0.234577},
{x: -0.961008, y: 0.136410, z: -0.240533},
{x: -0.947213, y: 0.276396, z: -0.162458},
{x: -0.908902, y: 0.409229, z: -0.080178},
{x: -0.987059, y: 0.000000, z: -0.160355},
{x: -0.986715, y: 0.140059, z: -0.082322},
{x: -0.959966, y: 0.280117, z: 0.000000},
{x: -0.908902, y: 0.409229, z: 0.080178},
{x: -0.988023, y: -0.133031, z: -0.078192},
{x: -1.000000, y: 0.000001, z: 0.000000},
{x: -0.986715, y: 0.140059, z: 0.082323},
{x: -0.947213, y: 0.276397, z: 0.162458},
{x: -0.886395, y: 0.399095, z: 0.234577},
{x: -0.967222, y: -0.253931, z: 0.000000},
{x: -0.988023, y: -0.133030, z: 0.078193},
{x: -0.987059, y: 0.000001, z: 0.160356},
{x: -0.961008, y: 0.136411, z: 0.240534},
{x: -0.911803, y: 0.266065, z: 0.312769},
{x: -0.845982, y: 0.380900, z: 0.373136},
{x: -0.616302, y: 0.380900, z: 0.689266},
{x: -0.579229, y: 0.266064, z: 0.770521},
{x: -0.497012, y: 0.399096, z: 0.770520},
{x: -0.525732, y: 0.136410, z: 0.839641},
{x: -0.447216, y: 0.276397, z: 0.850649},
{x: -0.357124, y: 0.409230, z: 0.839639},
{x: -0.457527, y: -0.000001, z: 0.889196},
{x: -0.383208, y: 0.140059, z: 0.912982},
{x: -0.296649, y: 0.280118, z: 0.912981},
{x: -0.204616, y: 0.409230, z: 0.889193},
{x: -0.379681, y: -0.133033, z: 0.915502},
{x: -0.309017, y: -0.000001, z: 0.951056},
{x: -0.226619, y: 0.140059, z: 0.963861},
{x: -0.138199, y: 0.276397, z: 0.951055},
{x: -0.050817, y: 0.399096, z: 0.915500},
{x: -0.298885, y: -0.253934, z: 0.919883},
{x: -0.230948, y: -0.133033, z: 0.963828},
{x: -0.152509, y: -0.000000, z: 0.988302},
{x: -0.068206, y: 0.136410, z: 0.988302},
{x: 0.015699, y: 0.266064, z: 0.963827},
{x: 0.093451, y: 0.380900, z: 0.919882},
{x: 0.465085, y: 0.380900, z: 0.799132},
{x: 0.553820, y: 0.266064, z: 0.788983},
{x: 0.579226, y: 0.399096, z: 0.710788},
{x: 0.636088, y: 0.136410, z: 0.759463},
{x: 0.670820, y: 0.276396, z: 0.688190},
{x: 0.688190, y: 0.409229, z: 0.599104},
{x: 0.704293, y: -0.000001, z: 0.709909},
{x: 0.749882, y: 0.140058, z: 0.646576},
{x: 0.776630, y: 0.280116, z: 0.564252},
{x: 0.782446, y: 0.409228, z: 0.469372},
{x: 0.753368, y: -0.133034, z: 0.644002},
{x: 0.809019, y: -0.000002, z: 0.587783},
{x: 0.846659, y: 0.140057, z: 0.513373},
{x: 0.861804, y: 0.276394, z: 0.425323},
{x: 0.854992, y: 0.399093, z: 0.331230},
{x: 0.782501, y: -0.253934, z: 0.568515},
{x: 0.845289, y: -0.133034, z: 0.517482},
{x: 0.892805, y: -0.000002, z: 0.450444},
{x: 0.918856, y: 0.136407, z: 0.370266},
{x: 0.921508, y: 0.266061, z: 0.282904},
{x: 0.903740, y: 0.380896, z: 0.195377},
{x: 0.298886, y: 0.253934, z: -0.919883},
{x: 0.379681, y: 0.133033, z: -0.915502},
{x: 0.230948, y: 0.133033, z: -0.963828},
{x: 0.457527, y: -0.000000, z: -0.889196},
{x: 0.309017, y: -0.000000, z: -0.951056},
{x: 0.152509, y: 0.000000, z: -0.988302},
{x: 0.525732, y: -0.136411, z: -0.839641},
{x: 0.383207, y: -0.140060, z: -0.912982},
{x: 0.226619, y: -0.140060, z: -0.963861},
{x: 0.068205, y: -0.136410, z: -0.988302},
{x: 0.579229, y: -0.266065, z: -0.770521},
{x: 0.447216, y: -0.276398, z: -0.850648},
{x: 0.296648, y: -0.280119, z: -0.912980},
{x: 0.138199, y: -0.276398, z: -0.951055},
{x: -0.015699, y: -0.266065, z: -0.963827},
{x: 0.616302, y: -0.380900, z: -0.689265},
{x: 0.497012, y: -0.399097, z: -0.770520},
{x: 0.357124, y: -0.409231, z: -0.839639},
{x: 0.204615, y: -0.409231, z: -0.889192},
{x: 0.050817, y: -0.399097, z: -0.915500},
{x: -0.093451, y: -0.380900, z: -0.919881},
{x: -0.782501, y: 0.253934, z: -0.568515},
{x: -0.753368, y: 0.133032, z: -0.644002},
{x: -0.845290, y: 0.133032, z: -0.517482},
{x: -0.704293, y: -0.000000, z: -0.709910},
{x: -0.809018, y: -0.000000, z: -0.587783},
{x: -0.892805, y: 0.000000, z: -0.450444},
{x: -0.636087, y: -0.136411, z: -0.759464},
{x: -0.749881, y: -0.140059, z: -0.646577},
{x: -0.846659, y: -0.140059, z: -0.513374},
{x: -0.918856, y: -0.136410, z: -0.370265},
{x: -0.553819, y: -0.266065, z: -0.788983},
{x: -0.670819, y: -0.276397, z: -0.688191},
{x: -0.776628, y: -0.280118, z: -0.564253},
{x: -0.861803, y: -0.276396, z: -0.425324},
{x: -0.921507, y: -0.266063, z: -0.282904},
{x: -0.465084, y: -0.380900, z: -0.799132},
{x: -0.579224, y: -0.399096, z: -0.710789},
{x: -0.688189, y: -0.409230, z: -0.599106},
{x: -0.782445, y: -0.409229, z: -0.469374},
{x: -0.854991, y: -0.399094, z: -0.331231},
{x: -0.903739, y: -0.380897, z: -0.195378},
{x: -0.782501, y: 0.253934, z: 0.568515},
{x: -0.845290, y: 0.133032, z: 0.517482},
{x: -0.753368, y: 0.133032, z: 0.644002},
{x: -0.892805, y: -0.000000, z: 0.450444},
{x: -0.809018, y: 0.000000, z: 0.587783},
{x: -0.704293, y: 0.000000, z: 0.709910},
{x: -0.918856, y: -0.136410, z: 0.370265},
{x: -0.846659, y: -0.140059, z: 0.513374},
{x: -0.749881, y: -0.140059, z: 0.646577},
{x: -0.636087, y: -0.136411, z: 0.759464},
{x: -0.921508, y: -0.266063, z: 0.282904},
{x: -0.861803, y: -0.276396, z: 0.425324},
{x: -0.776629, y: -0.280118, z: 0.564253},
{x: -0.670819, y: -0.276397, z: 0.688191},
{x: -0.553819, y: -0.266065, z: 0.788983},
{x: -0.903739, y: -0.380897, z: 0.195378},
{x: -0.854991, y: -0.399094, z: 0.331231},
{x: -0.782445, y: -0.409229, z: 0.469374},
{x: -0.688189, y: -0.409230, z: 0.599106},
{x: -0.579224, y: -0.399096, z: 0.710789},
{x: -0.465084, y: -0.380900, z: 0.799132},
{x: 0.298886, y: 0.253934, z: 0.919883},
{x: 0.230948, y: 0.133032, z: 0.963828},
{x: 0.379681, y: 0.133033, z: 0.915502},
{x: 0.152509, y: -0.000000, z: 0.988302},
{x: 0.309017, y: 0.000000, z: 0.951056},
{x: 0.457527, y: 0.000000, z: 0.889196},
{x: 0.068206, y: -0.136410, z: 0.988302},
{x: 0.226619, y: -0.140060, z: 0.963861},
{x: 0.383207, y: -0.140060, z: 0.912982},
{x: 0.525732, y: -0.136411, z: 0.839641},
{x: -0.015699, y: -0.266065, z: 0.963827},
{x: 0.138199, y: -0.276397, z: 0.951055},
{x: 0.296648, y: -0.280119, z: 0.912980},
{x: 0.447216, y: -0.276398, z: 0.850648},
{x: 0.579229, y: -0.266065, z: 0.770521},
{x: -0.093451, y: -0.380900, z: 0.919882},
{x: 0.050817, y: -0.399097, z: 0.915500},
{x: 0.204615, y: -0.409230, z: 0.889192},
{x: 0.357124, y: -0.409230, z: 0.839639},
{x: 0.497012, y: -0.399097, z: 0.770520},
{x: 0.616302, y: -0.380900, z: 0.689266},
{x: 0.967222, y: 0.253931, z: 0.000000},
{x: 0.988023, y: 0.133031, z: 0.078192},
{x: 0.988023, y: 0.133031, z: -0.078192},
{x: 0.987059, y: -0.000000, z: 0.160355},
{x: 1.000000, y: 0.000000, z: 0.000000},
{x: 0.987059, y: 0.000000, z: -0.160355},
{x: 0.961008, y: -0.136410, z: 0.240533},
{x: 0.986715, y: -0.140059, z: 0.082322},
{x: 0.986715, y: -0.140059, z: -0.082322},
{x: 0.961008, y: -0.136410, z: -0.240533},
{x: 0.911804, y: -0.266064, z: 0.312769},
{x: 0.947213, y: -0.276396, z: 0.162458},
{x: 0.959966, y: -0.280117, z: 0.000000},
{x: 0.947213, y: -0.276396, z: -0.162458},
{x: 0.911804, y: -0.266064, z: -0.312769},
{x: 0.845982, y: -0.380899, z: 0.373136},
{x: 0.886396, y: -0.399095, z: 0.234576},
{x: 0.908902, y: -0.409229, z: 0.080178},
{x: 0.908902, y: -0.409229, z: -0.080178},
{x: 0.886396, y: -0.399095, z: -0.234576},
{x: 0.845982, y: -0.380899, z: -0.373136},
{x: 0.577066, y: -0.586334, z: -0.568513},
{x: 0.497009, y: -0.696561, z: -0.517479},
{x: 0.455902, y: -0.614344, z: -0.643999},
{x: 0.399272, y: -0.798552, z: -0.450441},
{x: 0.361804, y: -0.723612, z: -0.587779},
{x: 0.314971, y: -0.629943, z: -0.709905},
{x: 0.288916, y: -0.882855, z: -0.370263},
{x: 0.253366, y: -0.819913, z: -0.513370},
{x: 0.210087, y: -0.733354, z: -0.646572},
{x: 0.162463, y: -0.629943, z: -0.759459},
{x: 0.174138, y: -0.943209, z: -0.282902},
{x: 0.138197, y: -0.894429, z: -0.425321},
{x: 0.096779, y: -0.819912, z: -0.564250},
{x: 0.052789, y: -0.723611, z: -0.688186},
{x: 0.009708, y: -0.614344, z: -0.788979},
{x: 0.063482, y: -0.978671, z: -0.195377},
{x: 0.025407, y: -0.943208, z: -0.331229},
{x: -0.016099, y: -0.882854, z: -0.469371},
{x: -0.058250, y: -0.798550, z: -0.599103},
{x: -0.097915, y: -0.696560, z: -0.710786},
{x: -0.132684, y: -0.586334, z: -0.799129},
{x: -0.362367, y: -0.586334, z: -0.724501},
{x: -0.338569, y: -0.696561, z: -0.632593},
{x: -0.471601, y: -0.614344, z: -0.632593},
{x: -0.305014, y: -0.798552, z: -0.518923},
{x: -0.447211, y: -0.723612, z: -0.525727},
{x: -0.577832, y: -0.629943, z: -0.518924},
{x: -0.262862, y: -0.882855, z: -0.389192},
{x: -0.409952, y: -0.819913, z: -0.399603},
{x: -0.550010, y: -0.733353, z: -0.399603},
{x: -0.672088, y: -0.629942, z: -0.389192},
{x: -0.215245, y: -0.943209, z: -0.253036},
{x: -0.361801, y: -0.894429, z: -0.262863},
{x: -0.506730, y: -0.819912, z: -0.266402},
{x: -0.638195, y: -0.723609, z: -0.262863},
{x: -0.747367, y: -0.614341, z: -0.253036},
{x: -0.166198, y: -0.978671, z: -0.120749},
{x: -0.307168, y: -0.943208, z: -0.126518},
{x: -0.451376, y: -0.882853, z: -0.129730},
{x: -0.587784, y: -0.798549, z: -0.129730},
{x: -0.706258, y: -0.696557, z: -0.126518},
{x: -0.801022, y: -0.586330, z: -0.120749},
{x: -0.801022, y: -0.586330, z: 0.120750},
{x: -0.706258, y: -0.696558, z: 0.126518},
{x: -0.747367, y: -0.614341, z: 0.253037},
{x: -0.587784, y: -0.798549, z: 0.129731},
{x: -0.638195, y: -0.723609, z: 0.262864},
{x: -0.672088, y: -0.629941, z: 0.389193},
{x: -0.451375, y: -0.882853, z: 0.129731},
{x: -0.506730, y: -0.819911, z: 0.266403},
{x: -0.550009, y: -0.733352, z: 0.399605},
{x: -0.577832, y: -0.629942, z: 0.518925},
{x: -0.307168, y: -0.943208, z: 0.126519},
{x: -0.361801, y: -0.894428, z: 0.262864},
{x: -0.409952, y: -0.819912, z: 0.399605},
{x: -0.447211, y: -0.723610, z: 0.525729},
{x: -0.471601, y: -0.614343, z: 0.632594},
{x: -0.166198, y: -0.978671, z: 0.120750},
{x: -0.215246, y: -0.943208, z: 0.253038},
{x: -0.262863, y: -0.882854, z: 0.389194},
{x: -0.305015, y: -0.798550, z: 0.518925},
{x: -0.338569, y: -0.696560, z: 0.632594},
{x: -0.362367, y: -0.586333, z: 0.724502},
{x: 0.719015, y: -0.586334, z: -0.373135},
{x: 0.753363, y: -0.614343, z: -0.234576},
{x: 0.645740, y: -0.696560, z: -0.312768},
{x: 0.772493, y: -0.629942, z: -0.080177},
{x: 0.670817, y: -0.723611, z: -0.162457},
{x: 0.551780, y: -0.798551, z: -0.240532},
{x: 0.772493, y: -0.629942, z: 0.080178},
{x: 0.679849, y: -0.733353, z: 0.000000},
{x: 0.566540, y: -0.819912, z: -0.082322},
{x: 0.441423, y: -0.882854, z: -0.160354},
{x: 0.753364, y: -0.614343, z: 0.234576},
{x: 0.670818, y: -0.723610, z: 0.162458},
{x: 0.566541, y: -0.819911, z: 0.082323},
{x: 0.447211, y: -0.894428, z: 0.000001},
{x: 0.322869, y: -0.943208, z: -0.078191},
{x: 0.719016, y: -0.586333, z: 0.373136},
{x: 0.645741, y: -0.696559, z: 0.312769},
{x: 0.551781, y: -0.798550, z: 0.240533},
{x: 0.441424, y: -0.882854, z: 0.160356},
{x: 0.322870, y: -0.943208, z: 0.078193},
{x: 0.205432, y: -0.978671, z: 0.000001},
{x: -0.132684, y: -0.586334, z: 0.799129},
{x: -0.097915, y: -0.696561, z: 0.710785},
{x: 0.009709, y: -0.614344, z: 0.788978},
{x: -0.058249, y: -0.798552, z: 0.599101},
{x: 0.052790, y: -0.723612, z: 0.688185},
{x: 0.162463, y: -0.629944, z: 0.759458},
{x: -0.016097, y: -0.882855, z: 0.469370},
{x: 0.096780, y: -0.819913, z: 0.564249},
{x: 0.210089, y: -0.733354, z: 0.646572},
{x: 0.314971, y: -0.629943, z: 0.709905},
{x: 0.025409, y: -0.943209, z: 0.331228},
{x: 0.138199, y: -0.894429, z: 0.425321},
{x: 0.253368, y: -0.819912, z: 0.513370},
{x: 0.361805, y: -0.723611, z: 0.587779},
{x: 0.455903, y: -0.614344, z: 0.643999},
{x: 0.063484, y: -0.978671, z: 0.195377},
{x: 0.174140, y: -0.943208, z: 0.282902},
{x: 0.288918, y: -0.882854, z: 0.370264},
{x: 0.399274, y: -0.798550, z: 0.450441},
{x: 0.497011, y: -0.696560, z: 0.517480},
{x: 0.577067, y: -0.586333, z: 0.568513}
]
kd_tree_points_with_index = kd_tree_sample_points.map((point, idx) => {
	point.index = idx;
	return point;
});
	
module.exports.length = kd_tree_points_with_index.length;
module.exports.tree = new kdTree.kdTree(
	kd_tree_points_with_index,
	utils.euclideanDist,
	['x', 'y', 'z']
);
},{"./kd-tree-javascript/kdTree.js":5,"./utils.js":9}],8:[function(require,module,exports){
var hazeTreeLib = require('./sample_642.js');
var hazeTree = hazeTreeLib.tree;

transmittanceMap = function(colorArrayFlat, picWidth, picHeight, airLight) {
	var	pixCount = picWidth*picHeight;
	var colorArray = colorArrayFlat;
	var ballPointCount = hazeTreeLib.length;
	var nearestQuery = new Uint16Array(pixCount);
	var nextNearestQuery = new Uint16Array(pixCount);
	var furthestDist = new Float32Array(ballPointCount);
	var colorNorm = new Float32Array(pixCount);
	var dists = new Float32Array(pixCount*2);

	self.postMessage({signal: "Clustering points…"});

	var ff = 0.0;
	for(var i = 0; i < pixCount; ++i) {
		var cc = [
			colorArray[4*i]/255 - airLight[0],
			colorArray[4*i + 1]/255 - airLight[1],
			colorArray[4*i + 2]/255 - airLight[2]
		];
		var cN = Math.sqrt(cc[0]*cc[0] + cc[1]*cc[1] + cc[2]*cc[2]);
		colorNorm[i] = cN; 
		var cND = { x:cc[0]/cN, y:cc[1]/cN, z:cc[2]/cN };
		var kdquery = hazeTree.nearest(cND, 2, 0.4);
		var nQ = kdquery[1][0].index;
		var nnQ = kdquery[0][0].index;
		nearestQuery[i] = nQ;

		ff = Math.max(kdquery[0][1], ff);

		furthestDist[nQ] = Math.max(furthestDist[nQ], cN);

		if(kdquery[0][1] - kdquery[1][1] < 1e-2 || furthestDist[nnQ] == 0) {
			furthestDist[nnQ] = Math.max(furthestDist[nnQ], cN);
		}
		/*if(furthestDist[nnQ] == 0) {
			furthestDist[nnQ] = cN;
		}*/
		
		nextNearestQuery[i] = kdquery[0][0].index;
		dists[i*2] = kdquery[1][1];
		dists[i*2 + 1] = kdquery[0][1];

	}

	
	self.postMessage({signal: "Calculating raw transmittance…"});
	var maxColor = [255, 255, 255];
	for(var i = 0; i < pixCount*4; i += 4) {
		maxColor[0] = Math.min(maxColor[0], colorArray[i]);
		maxColor[1] = Math.min(maxColor[1], colorArray[i+1]);
		maxColor[2] = Math.min(maxColor[2], colorArray[i+2]);
	}
	var maxTrans = 1.0;
	for(var i = 0; i < 3; ++i) {
		maxTrans = Math.min(maxTrans, 1 - maxColor[i]/(airLight[i]*255));
	}
	var transmittance = new Float32Array(pixCount);
	for(var i = 0, idx = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var t1 = maxTrans*colorNorm[idx]
						 /furthestDist[nearestQuery[idx]];
			var t2 = maxTrans*colorNorm[idx]
						 /furthestDist[nextNearestQuery[idx]];
			var weightsum = dists[idx*2] + dists[idx*2 + 1];
			var t = t1*dists[idx*2 + 1] + t2*dists[idx*2];
			t /= weightsum;
			var lbRatio = Math.min(
				colorArray[idx*4 + 0]/255/airLight[0],
				colorArray[idx*4 + 1]/255/airLight[1],
				colorArray[idx*4 + 2]/255/airLight[2]
			);
			transmittance[idx] = Math.max(t, 1 - lbRatio);
		}
	}
	if(transmittance.length > 2e6) {
		var partHeight = Math.floor(3e5 / picWidth);
		var parts = Math.ceil(picHeight/partHeight);
		var partPixCount = partHeight * picWidth;
		for(var o = 0, i = 1; o < pixCount; o += partPixCount, ++i) {
			self.postMessage({signal: "Dehazing image: block: " + i + " / " + parts});
			var len = (o + partPixCount < picHeight*picWidth)? partPixCount: picHeight*picWidth - o;
			var tp = new Float32Array(transmittance.buffer, o*4, len);
			var cp = new Uint8ClampedArray(colorArray.buffer, o*4, len*4);
			var np = new Uint16Array(nearestQuery.buffer, o*2, len);
			smoothTransmittance(tp, cp, np,
								ballPointCount, len/picWidth, picWidth);
		}
	}
	self.postMessage({signal: "Finalizing transmittance map…"});
    smoothTransmittance(transmittance, colorArray, nearestQuery, ballPointCount, picHeight, picWidth);
	return transmittance;
}

function smoothTransmittance(
	transmittance, colorArray, nearestQuery,
	ballPointCount, picHeight, picWidth) {

	var pixCount = picHeight*picWidth;
	var sum =    new Float32Array(ballPointCount)
		sum2 =   new Float32Array(ballPointCount),
		pCount = new Uint32Array(ballPointCount);
	for(var i = 0; i < pixCount; ++i) {
		var p = nearestQuery[i];
		var t = transmittance[i];
		sum[p] += t;
		sum2[p] += t*t;
		pCount[p]++;
	}
	var one_var = new Float32Array(ballPointCount);
	for(var i = 0; i < ballPointCount; ++i) {
		var avg = sum[i]/pCount[i], v = (sum2[i]/pCount[i] - avg*avg);
		one_var[i] = (v !== 0)? 1/v: 0;
	}
	var lambda = 0.1;
	var epsilon = 1e-6;
	var coeffs = new Float32Array(pixCount*5);
	var one_varPix = new Float32Array(pixCount);
	for(var i = 0, idx = 0; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = one_var[nearestQuery[idx]];
			one_varPix[idx] = c;
			coeffs[idx*5 + 4] = c;
		}
	}
	function laplacianCoeff(i, j, o0, o1) {
		var idx = (i + o0)*picWidth + (j + o1);
		var idxij = i*picWidth + j;
		var cN = [
			(colorArray[idx*4 + 0] - colorArray[idxij*4 + 0])/255,
			(colorArray[idx*4 + 1] - colorArray[idxij*4 + 1])/255,
			(colorArray[idx*4 + 2] - colorArray[idxij*4 + 2])/255,
		].reduce((a, b) => a + b*b, 0) + epsilon;
		var coeff = lambda*2/cN;
		return coeff;
	}
	for(var i = 1, idx = picWidth; i < picHeight; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, -1, 0);
			coeffs[idx*5] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 1; i < picHeight; ++i, ++idx) {
		for(var j = 1; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 0, -1);
			coeffs[idx*5 + 1] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 0; i < picHeight; ++i, ++idx) {
		for(var j = 0; j < picWidth-1; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 0, 1);
			coeffs[idx*5 + 2] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	for(var i = 0, idx = 0; i < picHeight-1; ++i) {
		for(var j = 0; j < picWidth; ++j, ++idx) {
			var c = laplacianCoeff(i, j, 1, 0);
			coeffs[idx*5 + 3] = -c;
			coeffs[idx*5 + 4] += c;
		}
	}
	var maxC = 0;
	var s1 = 0, s2 = 0;
	for(var i = 0; i < coeffs.length; ++i) {
		s1 += coeffs[i];
		s2 += coeffs[i]*coeffs[i];
		maxC = Math.max(maxC, Math.abs(coeffs[i]));
	}
	//console.log(coeffs);
	s1 /= coeffs.length;
	maxC = Math.sqrt(s2/coeffs.length - s1*s1)/Math.SQRT1_2;
	var oMaxC = 1;//maxC;
	for(var i = 0; i < coeffs.length; ++i) {
		coeffs[i] *= oMaxC;
	}
	var RHS = new Float32Array(pixCount);
	//console.log(pixCount);
	for(var i = 0; i < pixCount; ++i) {
		RHS[i] = one_varPix[i]*transmittance[i]*oMaxC;
	}
	
	//Conjugate gradients
	solveLinear(coeffs, RHS, transmittance, 300, picHeight, picWidth);
	
	return transmittance;
}

function solveLinear(A, rhs, x, max_iter, height, width) {
	/*var avg = 0;
	for(var i = 0; i < x.length; ++i) {
		if(!(i % width) && i) {
			for(var j = -width; j < 0; ++j) {
				x[i + j] = avg;
			}
			avg = 0;
		}
		avg += x[i]/width;
	}*/
	/*if(x.length > 1e6) {
		var eta = 1e-4;
		AdaM(A, x, rhs, eta, max_iter, height, width);
	}*/
	//if(x.length == 3e5) {
		/*var avg = 0;
		for(var i = 0; i < x.length; ++i) {
			avg += x[i]/x.length;
		}
		x.fill(avg);
		console.log("PCG", avg);*/
	//}
	var ICF = VMICF(A, width);
	/*if(useAdam) {
		var Ax = new Float32Array(rhs.length);
		var R = new Float32Array(rhs.length);
		var irhs = new Float32Array(rhs.length);
		var PAx = new Float32Array(rhs.length);
		apply(Ax, x, A, height, width);
		ICP(PAx, ICF, Ax, width);
		ICP(irhs, ICF, rhs, width);
		msub(R, PAx, irhs);
		var rnorm = iprod(R, R)/R.length;
		console.log(rnorm);
		if(rnorm > 1e-3) {
			AdaM(A, x, rhs, ICF, 1e-4, max_iter, height, width);
		}
		else PCG(A, x, rhs, ICF, max_iter, height, width);
	}
	else*/ PCG(A, x, rhs, ICF, max_iter, height, width);
	/*}*/
}

function AdaM(A, x, rhs, ICF, eta, max_iter, height, width) {
	//var ICF = VMICF(A, width);
	var irhs = new Float32Array(rhs.length);
	var R = new Float32Array(rhs.length);
	var Mt = new Float32Array(rhs.length);
	var Vt = new Float32Array(rhs.length);
	var Ax = new Float32Array(rhs.length);
	var PAx = new Float32Array(rhs.length);
	var etaFac = Math.sqrt(0.1);

	ICP(irhs, ICF, rhs, width);

	var normPrev = 1e9;
	for(var k = 0; k < max_iter; ++k) {
		apply(Ax, x, A, height, width);
		ICP(PAx, ICF, Ax, width);
		//msub(R, Ax, rhs);
		//msub(R, rhs, Ax);
		msub(R, PAx, irhs);
		var rnorm = iprod(R, R)/R.length;
		if(normPrev/rnorm < 0.5) eta /= 10;

		self.postMessage({signal: "Smoothing with AdaM.  Error: " + rnorm});
		if(rnorm < 2e-4) break;
		if(k%10 == 49) {
			eta *= 0.97;
		}
		
		//apply(Vt, R, A, height, width);
		//ICP(Mt, ICF, Vt, width);
		//var e = rnorm/iprod(R, Mt);

		for(var i = 0; i < x.length; ++i) {
			Mt[i] = 0.9*Mt[i] + 0.1*R[i];
			Vt[i] = 0.999*Vt[i] + 0.001*R[i]*R[i];
			x[i] -= eta*etaFac*Mt[i]/(Math.sqrt(Vt[i]) + 1e-8);
			if(x[i] < 0) {
				x[i] = 0;
			} else if(x[i] > 1) {
				x[i] = 1;
			}
			//x[i] += e*R[i];
		}
	}
}

function PCG(A, x, rhs, ICF, max_iter, height, width) {
	//ICF = A.slice(0);
	//var ICF = VMICF(A, width);
	var R = new Float32Array(rhs.length);
	var Z = new Float32Array(rhs.length);
	var P = new Float32Array(rhs.length);
	var Ax = new Float32Array(rhs.length);
	var Ap = new Float32Array(rhs.length);
	var zTr = 0, zTrOld = 0;

	apply(Ax, x, A, height, width);
	msub(R, rhs, Ax);
	//mprod(Z, R, M);
	//SSOR(Z, A, R, 1, width);
	ICP(Z, ICF, R, width);
	P = Z.slice(0);
	zTrOld = iprod(Z, R);
	zTr = zTrOld;

	var prhs = new Float32Array(rhs.length);
	ICP(prhs, ICF, rhs, width);
	//ICP(x, ICF, rhs, width);
	var bnorm = iprod(prhs, prhs);

	var startTime = new Date();
	for(var k = 0; k < max_iter; ++k) {
		apply(Ap, P, A, height, width);
		var alpha = 0.9*zTr/iprod(Ap, P);
		incVec(1, x, alpha, P);
		incVec(1, R, -alpha, Ap);
		var rnorm = iprod(R, R)/R.length;
		/*if(k % 10 == 9) {
			self.postMessage({signal: "Smoothing with PCG.  Error: " + rnorm});
		}*/
		var endTime = new Date();
		if(endTime - startTime > 1000) {
			self.postMessage({signal: "Smoothing with PCG.  Error: " + rnorm});
			startTime = endTime;
		}


		if(rnorm < 2e-1) break;
		//if(k >= 70 && rnorm > 1e-4) break;
		//mprod(Z, M, R);
		//SSOR(Z, A, R, 1, width);
		ICP(Z, ICF, R, width);
		zTr = iprod(Z, R);
		var beta = zTr/zTrOld;
		incVec(beta, P, 1, Z);
		zTrOld = zTr;
	}
}

function VMICF(A, width) {
	var ICF = A.slice(0);
	var n = A.length/5;
	
	for(var i = 0; i < n - width; ++i) {
		var i5 = i*5;
		var d = 1/ICF[i5 + 4];
		var d1 = ICF[i5 + 2]*d;
		var d2 = ICF[i5 + 3]*d;
		
		ICF[i5 + 9] -= d1*ICF[i5 + 2];
		var t = Math.abs(d2*ICF[i5 + 2]);
		ICF[i5 + 9] += t;
		ICF[i5 + width*5 + 4] += t;
		ICF[i5 + width*5 + 4] -= d2*ICF[i5 + 3];
	}
	for(var i = n - width; i < n-1; ++i) {
		var i5 = i*5;
		var d = 1/ICF[i5 + 4];
		var d1 = ICF[i5 + 2]*d;
		
		ICF[i5 + 9] -= d1*ICF[i5 + 2];
	}
	for(var i = 1; i < n; ++i) {
		ICF[i*5 + 1] = ICF[i*5 - 3];
	}
	for(var i = width; i < n; ++i) {
		ICF[i*5] = ICF[(i-width)*5 + 3];
	}
	return ICF;
}

function MICF(A, width) {
	var ICF = A.slice(0);
	var n = A.length/5;
	
	for(var i = 0; i < width; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		var d = Math.abs(ICF[i5 - 3]*ICF[i5 - 2]/ICF[i5 - 1]);
		ICF[i5 + 4] += d;
		ICF[i5 + width*5 - 1] += d;
	}
	for(var i = width; i < n - width + 1; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		var d = Math.abs(ICF[i5 - 3]*ICF[i5 - 2]/ICF[i5 - 1]);
		ICF[i5 + 4] += d;
		ICF[i5 + width*5 - 1] += d;
		ICF[i5 + 4] -= ICF[i5 - width*5 + 3]*ICF[i5 - width*5 + 3]/ICF[i5 - width*5 + 4];
	}
	for(var i = n - width + 1; i < n; ++i) {
		var i5 = i*5;
		ICF[i5 + 4] -= ICF[i5 - 3]*ICF[i5 - 3]/ICF[i5 - 1];
		ICF[i5 + 4] -= ICF[i5 - width*5 + 3]*ICF[i5 - width*5 + 3]/ICF[i5 - width*5 + 4];
	}
	for(var i = 1; i < n; ++i) {
		ICF[i*5 + 1] = ICF[i*5 - 3];
	}
	for(var i = width; i < n; ++i) {
		ICF[i*5] = ICF[(i-width)*5 + 3];
	}
	return ICF;
}

function ICP(Z, ICF, R, width) {
	var n = Z.length;
	//var Z1 = new Float64Array(Z);
	Z[0] = R[0] / ICF[4];
	for(var i = 1; i < width; ++i) {
		Z[i] = (R[i] - ICF[i*5 + 1]*Z[i-1]) / ICF[i*5 + 4];
	}
	for(var i = width; i < n; ++i) {
		Z[i] = (R[i] - ICF[i*5]*Z[i - width] - ICF[i*5 + 1]*Z[i - 1])/ICF[i*5 + 4];
	}

	for(var i = 0; i < n; ++i) {
		Z[i] *= ICF[i*5 + 4]
	}

	Z[n - 1] /= ICF[n*5 - 1];
	for(var i = n-2; i > n - 1 - width; --i) {
		Z[i] = (Z[i] - ICF[i*5 + 2]*Z[i+1])/ICF[i*5 + 4];
	}
	for(var i = n-1-width; i >=0; --i) {
		Z[i] = (Z[i] - ICF[i*5 + 3]*Z[i + width] - ICF[i*5 + 2]*Z[i+1]) / ICF[i*5 + 4];
	}
	return;
}

function SSOR(Z, A, R, w, width) {
	var w2 = (2-w)/w;
	var n = Z.length;
	for(var i = 0; i < n; ++i){
		Z[i] = R[i]*w2;
	}
	Z[0] *= w;
	for(var i = 1; i < width; ++i) {
		Z[i] = w*(Z[i] - A[i*5 + 1]*Z[i-1]);
	}
	for(var i = width; i < n; ++i) {
		Z[i] = w*(Z[i] - A[i*5]*Z[i - width] - A[i*5 + 1]*Z[i-1]);
	}
	Z[n - 1] *= w/A[n*5 - 1];
	for(var i = n-2; i > n - 1 - width; --i) {
		Z[i] = w/A[i*5 + 4]*(Z[i] - A[i*5 + 2]*Z[i+1]);
	}
	for(var i = n-1-width; i >=0; --i) {
		Z[i] = w/A[i*5 + 4]*(Z[i] - A[i*5 + 3]*Z[i+width] - A[i*5 + 2]*Z[i+1]);
	}
	return;
}

function apply(Ax, x, A, height, width) {
	Ax.fill(0);
	for(var i = 0, j = width; i < x.length - width; ++i, ++j) {
		Ax[j] += A[j*5]*x[i];
	}
	for(var i = 0, idx = 0; i < height; ++i, ++idx) {
		for(var j = 0; j < width-1; ++j, ++idx) {
			Ax[idx + 1] += A[idx*5 + 5 + 1]*x[idx];
		}
	}
	for(var i = 0, idx = 1; i < height; ++i, ++idx) {
		for(var j = 1; j < width; ++j, ++idx) {
			Ax[idx - 1] += A[idx*5 - 5 + 2]*x[idx];
		}
	}
	for(var i = width, j = 0; i < x.length; ++i, ++j) {
		Ax[j] += A[j*5 + 3]*x[i];
	}
	for(var i = 0; i < x.length; ++i) {
		Ax[i] += A[i*5 + 4]*x[i];
	}
}

function msub(diff, a, b) {
	for(var i = 0; i < a.length; ++i) {
		diff[i] = a[i] - b[i];
	}
}

function mprod(prod, a, b) {
	for(var i = 0; i < prod.length; ++i) {
		prod[i] = a[i]*b[i];
	}
}

function iprod(a, b) {
	var dot = 0;
	for(var i = 0; i < a.length; ++i) {
		dot += a[i]*b[i];
	}
	return dot;
}

function incVec(a, am, b, bm) {
	for(var i = 0; i < am.length; ++i) {
		am[i] = a*am[i] + b*bm[i];
	}
}

module.exports = transmittanceMap;
},{"./sample_642.js":7}],9:[function(require,module,exports){
function makeColorArray(canvas, normalize = false) {
	var context = canvas.getContext('2d');
	var colorArrayFlat = Array.from(context.getImageData(
			0, 0, canvas.width, canvas.height).data);
	if(normalize) {
		colorArrayFlat.map(d => d/255);
	}
	var retArray = Array(Math.ceil(colorArrayFlat.length/4)).fill();
	for(var i = 0; i < retArray.length; ++i) {
		retArray[i] = [
			colorArrayFlat[4*i], colorArrayFlat[4*i+1], colorArrayFlat[4*i+2]
		];
	}
	return retArray;
}

function arange(start, step, end) {
	var nnums = Math.floor((end - start) / step) + 1;
	var ret = new Float32Array(nnums);
	for(var i = 0; i < nnums; ++i) {
		ret[i] = start + i*step;
	}
	return ret;
	//return Array(nnums).fill().map((_, idx) => start + idx*step);
}

function linRange(start, elems, end) {
	var step = (end - start)/(elems-1);
	var ret = new Float32Array(elems);
	for(var i = 0; i < elems; ++i) {
		ret[i] = start + i*step;
	}
	return ret;
	//return Array(elems).fill().map((_, idx) => start + idx*step);
}

function cartesian(A, B) {
	return [].concat(...A.map(d => B.map(e => [d, e])));
}

function range(size) {
	return [...Array(size).keys()];
}

function range(start, end) {
	var size = end - start;
	return [...Array(size).keys()].map(d => d + start);
}

function list2dict3D(array) {
	var ret = array.map(data => {
		return { x: data[0], y: data[1], z: data[2] };
	});
	return ret;
}

function dict2list3D(dict) {
	return dict.map(entry => [entry.x, entry.y, entry.z]);
}

function euclideanDist(a, b) {
	var diff = {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z
	};
	return Math.sqrt(diff.x*diff.x + diff.y*diff.y + diff.z*diff.z);
}

function angleDist(a, b) {
	var innerProd = a.x*b.x + a.y*b.y + a.z*b.z;
	innerProd = Math.max(-1.0, Math.min(innerProd, 1.0));
	return Math.acos(innerProd) / Math.PI * 2;
}

flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

function cloneCanvas(oldCanvas) {
	var newCanvas = document.createElement('canvas');
	var context = newCanvas.getContext('2d');

	newCanvas.width = oldCanvas.width;
	newCanvas.height = oldCanvas.height;

	context.drawImage(oldCanvas, 0, 0);
	return newCanvas;
}
 module.exports.makeColorArray = makeColorArray;
 module.exports.arange = arange;
 module.exports.linRange = linRange;
 module.exports.cartesian = cartesian;
 module.exports.range = range;
 module.exports.list2dict3D = list2dict3D;
 module.exports.dict2list3D = dict2list3D;
 module.exports.euclideanDist = euclideanDist;
 module.exports.angleDist = angleDist;
 module.exports.flatten = flatten;
 module.exports.cloneCanvas = cloneCanvas;
 
},{}],10:[function(require,module,exports){
var gui_utils = require('./functions/gui_utils.js');
var processImage = gui_utils.processImage,
    sliderChange = gui_utils.sliderChange,
    changeGamma = gui_utils.changeGamma,
    dehazePreview = gui_utils.dehazePreview,
    drawDehazed = gui_utils.drawDehazed,
    mixHaze = gui_utils.mixHaze,
    calculateOriginal = gui_utils.calculateOriginal;

window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();
			reader.readAsDataURL(file);	
			reader.onload = function(e) {
				document.getElementById("airLightSection").style.visibility = "visible";
				document.getElementById("transmittanceDiv").style.visibility = "hidden";
				fileDisplayArea.innerHTML = "";

				var img = new Image();
				img.src = reader.result;
				img.onload = function() {
					processImage(img);
				};
			}
		} else {
			fileDisplayArea.innerHTML = "File not supported!"
		}
	});

	var gammaSlide = document.getElementById('gammaSlide'),
			gammaVal = document.getElementById('gammaVal');
	gammaSlide.addEventListener('input', function(e){
		sliderChange(this, gammaVal);
		var canvas = document.getElementById('originalPic');
		changeGamma(window.origCanvas, canvas, new Number(this.value))
	});
	gammaVal.innerHTML = gammaSlide.value;

	var minAirSlide = document.getElementById('minAirSlide'),
			minAirVal = document.getElementById('minAirVal'),
			maxAirSlide = document.getElementById('maxAirSlide'),
			maxAirVal = document.getElementById('maxAirVal');
	minAirSlide.addEventListener('input', function(e){
		if(maxAirSlide.value - 0.05 < this.value) {
			this.value = maxAirSlide.value - 0.05;
		}
		sliderChange(this, minAirVal);
	});
	minAirVal.innerHTML = minAirSlide.value;
	maxAirSlide.addEventListener('input', function(e){
		if(minAirSlide.value > this.value - 0.05) {
			this.value = new Number(minAirSlide.value) + 0.05;
		}
		sliderChange(this, maxAirVal);
	});
	maxAirVal.innerHTML = maxAirSlide.value;

	var dehazePreviewButton = document.getElementById('dehazePreviewButton');
	dehazePreviewButton.addEventListener('click', function(e){
		//findAirLight();
		dehazePreview();
	});
	/*var transmittanceButton = document.getElementById('transmittanceButton');
	transmittanceButton.addEventListener('click', function(e){
		findAndDrawResults();
	});*/

	var distSlide = document.getElementById('distSlide'),
	    distVal = document.getElementById('distVal'),
	    hazeAmountSlide = document.getElementById('hazeAmountSlide'),
	    hazeAmountVal = document.getElementById('hazeAmountVal'),
	    gammaOutSlide = document.getElementById('gammaOutSlide'),
			gammaOutVal = document.getElementById('gammaOutVal');

	distSlide.addEventListener('input', function(e){
		oninput=sliderChange(this, distVal);
		var canvas = document.getElementById('originalPic');
		var destCanvas = document.getElementById('dehazeResult');
		drawDehazed(canvas, destCanvas, window.transmittance, window.airLight);
	});
	distVal.innerHTML = distSlide.value;
	hazeAmountSlide.addEventListener('input', function(e){
		sliderChange(this, hazeAmountVal);
		var canvas = window.origCanvas;
		mixHaze(window.dehazeFlat, canvas.width, canvas.height,
						window.dehazedCanvas, window.transmittance, window.airLight,
						new Number(this.value));
		var gammaVal = new Number(document.getElementById('gammaOutSlide').value);
		canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/gammaVal)
	});
	hazeAmountVal.innerHTML = hazeAmountSlide.value;
	gammaOutSlide.addEventListener('input', function(e){
		sliderChange(this, gammaOutVal);
		var canvas = document.getElementById('dehazeResult');
		changeGamma(window.dehazedCanvas, canvas, 1/new Number(this.value))
	});
	gammaOutVal.innerHTML = gammaOutSlide.value;

	var originalButton = document.getElementById("originalButton");
	originalButton.addEventListener('click', function(e){
		calculateOriginal();
	});
}

},{"./functions/gui_utils.js":3}],11:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            'function(require,module,exports){' + fn + '(self); }',
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        'function(require,module,exports){' +
            // try to call default if defined to also support babel esmodule exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);' +
        '}',
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}],12:[function(require,module,exports){
var QuantKDTree = require('../functions/min-variance-quantization.js');
var estimateAirLight = require('../functions/airlight.js');
var transmittanceMap = require('../functions/transmittance.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var clusters = data.clusters;
		var imageflat = data.image;
		var minEst = data.minEst;
		var maxEst = data.maxEst;
		var picWidth = data.picWidth;
		var picHeight = data.picHeight;

		var startTime = new Date();
		self.postMessage({signal: "Finding air light…"});
		var quantStruct = new QuantKDTree(imageflat.slice(0), clusters);
		var endTime = new Date();
		console.log("Finished quantization in " + (endTime - startTime)/1000 + " secs.");

		var airLight = estimateAirLight(imageflat, quantStruct, minEst, maxEst);
		endTime = new Date();
		console.log("Finished air light in " + (endTime - startTime)/1000 + " secs.");

		self.postMessage({signal: "Finding transmittance map…"});
		var transmittance = transmittanceMap(imageflat, picWidth, picHeight, airLight);
		self.postMessage({
			signal: "finish",
			airLight: airLight,
			transmittance:transmittance}, [transmittance.buffer]);
		self.close();
	}
}
},{"../functions/airlight.js":2,"../functions/min-variance-quantization.js":6,"../functions/transmittance.js":8}],13:[function(require,module,exports){
var QuantKDTree = require('../functions/min-variance-quantization.js');
var estimateAirLight = require('../functions/airlight.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var clusters = data.clusters;
		var imageflat = data.image;
		var minEst = data.minEst;
		var maxEst = data.maxEst;

		var startTime = new Date();
		var image = Array(Math.ceil(imageflat.length/4)).fill();
		for(var i = 0; i < image.length; ++i) {
			image[i] = [
				imageflat[4*i], imageflat[4*i+1], imageflat[4*i+2]
			];
		}
		var quantStruct = new QuantKDTree(image.slice(0), clusters);
		var endTime = new Date();
		console.log("Finished quantization in " + (endTime - startTime)/1000 + " secs.");

		var airLight = estimateAirLight(image, quantStruct, minEst, maxEst);
		endTime = new Date();
		console.log("Finished air light in " + (endTime - startTime)/1000 + " secs.");
		self.postMessage(airLight);

		self.close();
	}
}
},{"../functions/airlight.js":2,"../functions/min-variance-quantization.js":6}],14:[function(require,module,exports){
var transmittanceMap = require('../functions/transmittance.js');

module.exports = function(self) {
	onmessage = function(e) {
		var data = e.data;
		var colorArray = data.colorArray,
				picWidth = data.picWidth,
				picHeight = data.picHeight,
				airLight = data.airLight;
		var transmittance = transmittanceMap(colorArray, picWidth, picHeight, airLight);
		self.postMessage({signal:"finish", transmittance: transmittance}, [transmittance.buffer]);
		self.close();
	}
}
},{"../functions/transmittance.js":8}]},{},[10]);
