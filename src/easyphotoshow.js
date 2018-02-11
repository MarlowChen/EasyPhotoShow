var EasyPhotoShow = function(){
	var elems;
	var windowW = window.innerWidth,
		windowH = window.innerHeight;

	var setW = windowW*0.6;

	var setImgW = this.naturalWidth,
		setImgH = this.naturalHeight,
		setSideW = setImgW*1.2,
		setSideH = setImgH*1.2;

	var defaultImgW = this.naturalWidth, //important
		defaultImgH = this.naturalHeight; //important

	var body = document.getElementsByTagName("BODY")[0],
	 	model = document.createElement("div"),
	 	side =  document.createElement("div"),
	 	img = document.createElement("img"); 

	var className = "EasyPhotoShow",
		sp = 100,
		isHaveBg = false,
		isFixedBg = false,
		isRwd = true,
		isAnimate=true,
		bgStyle="background:white;";

	var selectsClass;
	var ie8Class;
	var data;


function ie8(){
    if(!document.getElementsByClassName){
        document.getElementsByClassName = function(className, element){
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i=0; i<children.length; i++){
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j=0; j<classNames.length; j++){
                    if (classNames[j] == className){ 
                        elements.push(child);
                        break;
                    }
                }
            } 
            return elements;
        };
    }

}

EasyPhotoShow.prototype.show = function(setting){

	ie8();
	elems = document.getElementsByClassName(className);

	data = setting;

try {
	if(data!=null){
		className = (data.className!=null)?data.className : className;
		sp = (data.speed!=null)?data.speed : sp;
		isHaveBg = (data.scenes!=null)?data.scenes : isHaveBg;
		bgStyle = (data.scenesStyle!=null)?data.scenesStyle : bgStyle;
		isFixedBg = (data.fixedScenes!=null)?data.fixedScenes : isFixedBg;
		isRwd = (data.responsive!=null)?data.responsive : isRwd;
		isAnimate = (data.animateShow!=null)?data.animateShow : isAnimate;
	}
}
catch(err){
	logMyErrors(e);
}	
	for (var i=elems.length; i--;) {

	    //elems[i].addEventListener('click', photoShow, false);
	    addEvent("click",elems[i],photoShow);
	}

	function photoShow(){
		selectsClass = this;
		setImgW = this.naturalWidth,
		setImgH = this.naturalHeight;	
		setSideW = setImgW*1.2,
		setSideH = setImgH*1.2;

		defaultImgW = this.naturalWidth	;
		defaultImgH = this.naturalHeight;

		model.id = "EasyShowModel";
		side.id = "EasyShowSide";
		img.id = "EasyShowImg";

		if(isRwd == true){
			setRwd();
		}

		if(isFixedBg == true){
		setImgW = this.naturalWidth,
		setImgH = this.naturalHeight;

			if(windowW>windowH){
				setSideH = windowH*0.95;
				setSideW = windowW*0.8;	
			}else if(windowW<windowH){
				setSideW = windowW*0.9;	
				setSideH = windowH*0.4;
			}				
		
			setFixedScenes();
		}


		model.setAttribute("style","width:100%;" +
			"height:100%;" +
			"background:rgba(0, 0, 0, 0.75);" +
			"position: fixed;" +
    		"top: 0;"+
    		"left: 0;"			
			);

	
		img.setAttribute("style","width:" +0 + "px;" + 
			"height:"+0+"px; "+ 
			"background:none;"+
    		"position: fixed;"+
    		"transform: translate(-50%, -50%);"+
    		"top: 50%;"+
    		"left: 50%;" +
    		"opacity: 0;"
			);



	img.src = this.src;	

	if(isHaveBg == true){
		setSide();
	}else{
		model.appendChild(img);
	}	

	body.appendChild(model);

	if(isAnimate == true){
		EasyPhotoShow.doAnimate();
	}else{

			img.style.width = setImgW + "px";
			img.style.height = setImgH + "px";			
			img.style.opacity = 1;

			side.style.width = setSideW*1.05 + "px";
			side.style.height = setSideH + "px";
			side.style.opacity = 1;				
			

	}
	
	closeModel();
	}

	function setSide(){
		side.setAttribute("style","width:0%;" +
			"height:0%;" +
			bgStyle  +
			"position: fixed;" +
			"transform: translate(-50%, -50%);"+
    		"top: 50%;"+
    		"left: 50%;" +
    		"opacity: 0;"			
			);		

	side.appendChild(img);
	
	model.appendChild(side);
	
	}

	function setRwd(){
		if(windowW<windowH){

			if(defaultImgW>defaultImgH){

				var reSize = defaultImgW/defaultImgH;
				setImgW = windowW*0.9;
				setImgH = setImgW/reSize;
				
				setSideW = setImgW*1;	
				setSideH = setImgH*1.1;	
			}else if(defaultImgW==defaultImgH){
				setImgW = windowW*0.8;
				setImgH = windowW*0.8;
				setSideW = setImgW*1.05;	
				setSideH = setImgH*1.05;				
			}else if(defaultImgW<defaultImgH){
				var reSize = defaultImgW/defaultImgH;
				setImgW = windowW*0.9;
				setImgH = setImgW/reSize;
				
				setSideW = setImgW*1.1;	
				setSideH = setImgH*1.05;	

				do {
				setImgW = setImgW*0.95;
				setImgH = setImgW/reSize;
				setSideW = setImgW*1.1;	
				setSideH = setImgH*1.05;					
				}
				while (setSideH > windowH);


			}

		}else{
			if(defaultImgW>defaultImgH){

				var reSize = defaultImgW/defaultImgH;
				setImgW = windowW*0.9;
				setImgH = setImgW/reSize;
				
				setSideW = setImgW*1;	
				setSideH = setImgH*1.1;	

				do {
					setImgW = setImgW*0.95;
					setImgH = setImgW/reSize;
					setSideW = setImgW*1;	
					setSideH = setImgH*1.1;					
				}
				while (setSideH > windowH);

			}else if(defaultImgW==defaultImgH){
				setImgW = windowH*0.8;
				setImgH = windowH*0.8;
				setSideW = setImgW*1.05;	
				setSideH = setImgH*1.08;				
			}else if(defaultImgW<defaultImgH){
				var reSize = defaultImgH/defaultImgW;
				setImgH = windowH*0.9;
				setImgW = setImgH/reSize;
				
				setSideW = setImgW*1.2;	
				setSideH = setImgH*1.05;	


			}

		}

		if(setImgW>defaultImgW || setImgH>defaultImgH){
			setImgW=defaultImgW;
			setImgH=defaultImgH;

		}

	}

	function setFixedScenes(){
		if(windowW<windowH){

			if(defaultImgW>defaultImgH){
				setImgW = setSideW*1;
				var sizeH = setImgW/defaultImgW;
				setImgH = setImgH*sizeH;	
			}else if(defaultImgW==defaultImgH){
				setImgW = setSideW*0.7;
				setImgH = setSideW*0.7;



			}else if(defaultImgW<defaultImgH){
				setImgH = setSideH*0.8;
				var sizeW = setImgH/defaultImgH;
				setImgW = setImgW*sizeW;				
			}

				do{
					setImgW = setImgW*0.95;
					setImgH = setImgH*0.95;
				}
				while (setSideH<setImgH);			

		}else{
			if(defaultImgW>defaultImgH){
				setImgW = setSideW*1;
				var sizeH = setImgW/defaultImgW;
				setImgH = setImgH*sizeH;	
			}else if(defaultImgW==defaultImgH){
				setImgW = setSideH*0.9;
				setImgH = setSideH*0.9;
			}else if(defaultImgW<defaultImgH){
				setImgH = setSideH*0.9;
				var sizeW = setImgH/defaultImgH;
				setImgW = setImgW*sizeW;				
			}

		}


		if(setImgW>defaultImgW || setImgH>defaultImgH){
			setImgW=defaultImgW;
			setImgH=defaultImgH;

		}


	}

	function closeModel(){
		var modelId= document.getElementById("EasyShowModel");
		//modelId.addEventListener('click', removeModel, false);
		addEvent("click",modelId,removeModel);

	}


		function removeModel(){
				this.parentNode.removeChild(this);
			
		}

return EasyPhotoShow;

}


EasyPhotoShow.prototype.doAnimate = function(){
	var doImgAnimate = setInterval(animateImg(0,0,0,0,0,sp),1);

	function animateImg(w,h,dw,dh,o,s){
		return function(){

			if(setImgW>setImgH){

				var dsw = setSideW/setImgW;
				var dsh = setSideH/setImgH;
				var scaleSp = setImgW/setImgH;

				w = (w<setSideW)?w+=(s*dsw*scaleSp):setSideW;
				dw = (dw<setImgW)?dw+=(s*scaleSp):setImgW;
				h = (h<setSideH)?h+=(s*dsh):setSideH;
				dh = (dh<setImgH)?dh+=(s):setImgH;

			}else if(setImgW==setImgH){

				var dsw = setSideW/setImgW;
				var dsh = setSideH/setImgH;

				w = (w<setSideW)?w+=(s*dsw):setSideW;
				dw = (dw<setImgW)?dw+=(s):setImgW;
				h = (h<setSideH)?h+=(s*dsh):setSideH;
				dh = (dh<setImgH)?dh+=(s):setImgH;

			}else{

				var dsw = setSideW/setImgW;
				var dsh = setSideH/setImgH;
				var scaleSp = setImgH/setImgW;

				w = (w<setSideW)?w+=(s*dsw):setSideW;
				dw = (dw<setImgW)?dw+=(s):setImgW;
				h = (h<setSideH)?h+=(s*dsh*scaleSp):setSideH;
				dh = (dh<setImgH)?dh+=(s*scaleSp):setImgH;						
			}
		
			o = (o<1)?o+=0.01:1;	


			if(isHaveBg){

				side.style.width = 0 + w*1.05 + "px";
				side.style.height = 0 + h + "px";
				side.style.opacity = o;				
			}

			img.style.width = 0 + dw + "px";
			img.style.height = 0 + dh + "px";			
			img.style.opacity = o;			

				if(o>=1 && w==setSideW && h==setSideH && dw==setImgW && dh==setImgH){
					clearInterval(doImgAnimate);
				}

		}
	}

}

EasyPhotoShow.prototype.setClassName = function(name){	
	if(name!==undefined){
		className = name;
	}
	return EasyPhotoShow;
}


EasyPhotoShow.prototype.speed = function(speed){
	sp = speed;
	return EasyPhotoShow;
}

EasyPhotoShow.prototype.scenes = function(isScenes){
	if(isScenes==true){
		isHaveBg = true;
	}
	return EasyPhotoShow;
}

EasyPhotoShow.prototype.scenesStyle = function(style){
	if(style!=null){
		bgStyle = style;
	}
	return EasyPhotoShow;
}


EasyPhotoShow.prototype.fixedScenes = function(isFixedScenes){
	if(isFixedScenes==true){
		isFixedBg = true;
	}
	return EasyPhotoShow;
}

EasyPhotoShow.prototype.responsive = function(rwd){
	if(rwd==false){
		isRwd = false;
	}
	return EasyPhotoShow;
}

EasyPhotoShow.prototype.animateShow = function(animate){
	if(animate==false){
		isAnimate = false;
	}
	return EasyPhotoShow;
}


var thisEasyPhotoShow = this;

function resetEasyPhotoShow(EasyPhotoShow){

var model = document.getElementById("EasyShowModel");

windowW = screen.width;
windowH = screen.height;
		
if(model != null){
 selectsClass.click();
}
}

addEvent("orientationchange",window,function(){
resetEasyPhotoShow(thisEasyPhotoShow);	
});



function addEvent(evnt, elem, func) {
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem[evnt] = func;
   }
}

}

var EasyPhotoShow = new EasyPhotoShow();