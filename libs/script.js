var interactiveObj;
var canvas1Points = new Array();
var currentSign='≤';
var mode3Canvas1Points = new Array();
var mode3Canvas2Points = new Array();
var mode3Canvas3Points = new Array();
var mode3option1='';
var mode3option2='';
var point1,point2;

var a,b,c,d;
var lineCounter=0;
var LHS_string='';
var RHS_string='';
var op1Active=1;
var op2Active=1;
var op3Active=1;
var op4Active=1;
var op5Active=1;
var op6Active=1;
var op7Active=1;
var opBusy=0;
var op1Counter=0;
var op2Counter=0;
var op3Counter=0;
var op4Counter=0;
var op5Counter=0;
var op6Counter=0;
var op7Counter=0;

var op7rightVal1;
var op7rightVal2;

var op3promptFlag=1;
var op4promptFlag=1;

var range1;
var range2;
var ansArr;
var ansString1='';
var ansString2='';
var rangeStart;
var rangeStop;
var mode3AnsString='';

var tempPoint1;
var tempPoint2;


window.onload = start;

function start(){
	interactiveObj = new questionInteractive();
	loadXML(languageXml,function(){	
		$('#container').show();	
		interactiveObj.init();	
	});
}

function showScreen(no){
	$('.screenDiv').hide();
	$('#screen'+no).show(1000);
}

function questionInteractive(){
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.numLanguage = "english";
	}
	else this.numLanguage = getParameters['numberLanguage'];

	if(typeof getParameters['language']=='undefined'){
		this.language='english';
	}
	else this.language=getParameters['language'];
	
	if(typeof getParameters['inequalitySign']=='undefined'){
		$('#workingArea').html('Please enter inequalitySign parameter!  (more | less | moreEqual | lessEqual | equal)');
	}
	else this.symbol = getParameters['inequalitySign'];
	
	switch(this.symbol){
		case 'more': this.symbol = '>';
					break;
		case 'less':this.symbol = '<';
					break;
		case 'moreEqual':this.symbol = '≥';
					break;
		case 'lessEqual':this.symbol = '≤';
					break;
		case 'equal':this.symbol = '=';
					break;
		default:$('#workingArea').html('Please enter inequalitySign parameter!  (more | less | moreEqual | lessEqual | equal)');
					break;
	}
	
	if(typeof getParameters['a']=='undefined'){
		$('#workingArea').html('co-efficient a of aX missing !');
	}
	else a = getParameters['a'];
	
	if(typeof getParameters['b']=='undefined'){
		$('#workingArea').html('co-efficient b missing');
	}
	else b = getParameters['b'];
	
	if(typeof getParameters['c']=='undefined'){
		$('#workingArea').html('co-efficient c missing');
	}
	else c = getParameters['c'];
	
	if(typeof getParameters['d']=='undefined'){
		$('#workingArea').html('co-efficient d missing!');
	}
	else d = getParameters['d'];
	
	if(typeof getParameters['disableModeOptions']=='undefined'){
		$('#container').html('pass disableModeOptions parameter 1/0');
	}
	else this.disableModeOptions = getParameters['disableModeOptions'];
	
	if(typeof getParameters['selectMode']=='undefined'){
		$('#container').html('please pass selectMode parameter 0/1/2/3');
	}
	else this.selectMode = getParameters['selectMode'];
}


function initiateMode(val){
	if(val){
		putTip(val);
		showScreen(val);
		$('.modeDiv').css({
			'background-color':'rgba(255,149,111,1)',
		});
		$('#mode'+val).css('background-color','rgb(173, 238, 102)');
		if(interactiveObj.disableModeOptions==1){
			$('#modeContainer').hide();
		}
	}
}

function getFrac(a,b){
	var FracStr="";   
		FracStr+= '<div class="dispFrac">';	
		FracStr+= '<div class="fracNum">'+a+'</div>';
		FracStr+= '<div class="fracDen">'+b+'</div>';
		FracStr+= '</div>';
	return FracStr;
}

function constant(val){
	if(val<0){
		this.sign = '-';
	}
	else this.sign='+';
	
	if(val==0){
		this.display = '';
		this.sign='';
	}
	else this.display = Math.abs(val);
	
	this.value = parseFloat(val);
	this.fracTrue=0;
}

function constFrac(num,den){
	this.fracTrue =1;
	this.num = num;
	this.den = den;
	this.value = parseFloat(num/den);
	if(this.value<0){
		this.sign = '-';
	}
	else this.sign = '+';
	this.display = getFrac(Math.abs(num),Math.abs(den));
	
}

function frac(numerator,denominator,flag){
	
	if(numerator==0 || denominator==0){
		this.display='';
		this.sign='';
		this.value=0;
	}
	else{
		if(flag){
			this.fracTrue = 1;
			this.num = parseInt(numerator);
			this.den = parseInt(denominator);
			this.value = this.num/this.den;
			this.display = getFrac(changeLanguage(Math.abs(this.num),interactiveObj.numLanguage)+'x',Math.abs(this.den));		
			if(this.num<0 || this.den<0){
				this.sign='-';
			}	
			else this.sign='+';
		}
		else{
			this.fracTrue = 0;
			this.value = numerator;
			if(this.value==1 || this.value==-1){
				this.display = 'x';
			}
			else this.display = changeLanguage(Math.abs(numerator),interactiveObj.numLanguage)+'x';
			
			if(numerator<0){
				this.sign='-';
			}
			else{
				this.sign='+';
			}
		}	
	}
}

function getLine(A,B,C,D){	
	var sign1,sign2,sign3,sign4;
	if(A.sign==''){
		sign1='';
	}
	else{
		sign1 = (A.sign=='-')?'-':''; 
	}
	
	if(B.sign==''){
		sign2='';
	}
	else{
		if(A.sign==''){
			if(B.sign=='+'){
				sign2='';
			}
			else sign2='-';
		}
		else
		sign2 = (B.sign=='-')?' - ':' + ';
	}
	
	if(C.sign==''){
		sign3 = '';
	}
	else{
		sign3 = (C.sign=='-')?'-':'';
	}
	
	if(D.sign==''){
		sign4 = '';
	}
	else{
		if(C.sign==''){
			if(D.sign=='+'){
				sign4='';
			}
			else sign4='-';
		}
		else
		sign4 = (D.sign=='-')?' - ':' + ';
	}
	
	LHS_string = sign1+a.display + sign2 + b.display;
	RHS_string = sign3 + c.display + sign4+ d.display;
}

function putLine(LHS,RHS,symbol){
	if(LHS==''){
		LHS = '0';
	}
	if(RHS==''){
		RHS = '0';
	}
	
	var html='';
	html+='<div id="line'+lineCounter+'" class="line">';
		html+='<div id="LHS'+lineCounter+'" class="LHS">'+LHS+'</div>';
		html+='<div id="symbolDiv'+lineCounter+'" class="symbolDiv">'+symbol+'</div>';
		html+='<div id="RHS'+lineCounter+'" class="RHS">'+RHS+'</div>';
	html+='</div>';
	$('#scrollArea').append(replaceDynamicText(html,interactiveObj.numLanguage,''));
	$('#line'+lineCounter).show('slide');
	
	var objDiv = document.getElementById("workingArea");
	objDiv.scrollTop = objDiv.scrollHeight;
}

function mode1Params(){
	if(a.indexOf('|')!=-1){
		a = new frac(getParameters['a'].split('|')[0],getParameters['a'].split('|')[1],1);
	}
	else{
		a = new frac(getParameters['a'],getParameters['a'],0);
	}
	
	if(d.indexOf('|')!=-1){
		d = new frac(getParameters['d'].split('|')[0],getParameters['d'].split('|')[1],1);
	}
	else{
		d = new frac(getParameters['d'],getParameters['d'],0);
	}	
	
	b = new constant(b);
	c = new constant(c);
}

function sketchMode2Canvas(){
	
	canvas1Points = new Array();
	canvas1.height = canvas1.height;
	
	$('#canvas1').drawLine({
		strokeStyle:'black',
		strokeWidth:2,
		x1:10+45,y1:50,
		x2:490+45,y2:50,
		layer:true
	});
	
	$('#canvas1').drawLine({
		strokeStyle:"black",
		strokeWidth:1,
		fillStyle:'black',
		x1:00+45,y1:50,
		x2:10+45,y2:45,
		x3:10+45,y3:55,
		closed:true,
		layer:true
	});
	
	$('#canvas1').drawLine({
		strokeStyle:"black",
		strokeWidth:1,
		fillStyle:'black',
		x1:500+45,y1:50,
		x2:490+45,y2:45,
		x3:490+45,y3:55,
		closed:true,
		layer:true,
	});
	
	for(var i=0;i<21;i++){
		$('#canvas1').drawLine({
			strokeStyle:'black',
			strokeWidth:(i==10 || i==0 || i==20)?3:1,
			x1:20+23*i+45,y1:45,
			x2:20+23*i+45,y2:55,
			layer:true
		});
		canvas1Points.push(20+23*i);
		
		$('#canvas1').drawText({
			fillStyle:"black",
			fontSize:12,
			x:20+23*i+45,y:65,
			layer:true,
			text:replaceDynamicText(-10+i,interactiveObj.numLanguage,''),
			fromCenter:true,
			fontStyle:'bold'	
		});
	}
	
}

function plotMode2Point(a,sign){	
	var tempText = replaceDynamicText(a,interactiveObj.numLanguage,'');
	switch(sign){
		case '=':
			$('#statement').html('x is equal to '+tempText+'.');
		break;
		case '<':
			$('#statement').html('x is less than '+tempText+'.');
		break;
		case '>':
			$('#statement').html('x is more than '+tempText+'.');
		break;
		case '≤':
			$('#statement').html('x is less than or equal to '+tempText+'.');
		break;
		case '≥':
			$('#statement').html('x is more than or equal to '+tempText+'.');
		break;
		default:
			//nothing
		break;
	}
	$('#statement').show();
	//console.log(sign);
	sketchMode2Canvas();
	$('#canvas1').drawText({
		fillStyle:"black",
		fontSize:15,
		fontStyle:'bold',
		x:45+250,y:20,
		text:'x '+sign+' '+replaceDynamicText(a,interactiveObj.numLanguage,''),
		layer:true
	});
	
	if(sign=='=' || sign=='≤' || sign=='≥'){
		$('#canvas1').drawArc({
			fillStyle:'blue',
			radius:5,
			x:canvas1Points[a+10]+45,y:50,
			start:0,end:360,
			layer:true
		});
	}
	else{
		$('#canvas1').drawArc({
				strokeStyle:'blue',
				strokeWidth:2,
				radius:5,
				x:canvas1Points[a+10]+45,y:50,
				start:0,end:360,
				layer:true
			});
	}
	
	if(sign=='<' || sign=='≤'){
		$('#canvas1').drawLine({
			strokeStyle:'rgba(0,0,255,0.5)',
			strokeWidth:5,
			x1:canvas1Points[a+10]+45,y1:50,
			x2:canvas1Points[0]-10+45,y2:50, 
			layer:true
		}); 
		
		$('#canvas1').drawLine({
			strokeStyle:"blue",
			strokeWidth:1,
			fillStyle:'blue',
			x1:00+45,y1:50,
			x2:10+45,y2:45,
			x3:10+45,y3:55,
			closed:true,
			layer:true
		});
	}
	if(sign=='>' || sign=='≥'){
		$('#canvas1').drawLine({
			strokeStyle:'rgba(0,0,255,0.5)',
			strokeWidth:3,
			x1:canvas1Points[a+10]+45,y1:50,
			x2:canvas1Points[20]+10+45,y2:50,
			layer:true
		});
		$('#canvas1').drawLine({
			strokeStyle:"blue",
			strokeWidth:1,
			fillStyle:'blue',
			x1:500+45,y1:50,
			x2:490+45,y2:45,
			x3:490+45,y3:55,
			closed:true,
			layer:true,
		});
	}
	
}

function sketchMode3Canvas1(){
	scr3Canvas1.height = scr3Canvas1.height;
	mode3Canvas1Points = new Array();
	$('#scr3Canvas1').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		x1:10,y1:25,
		x2:290,y2:25,
		layer:true
	});
	
	$('#scr3Canvas1').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:0,y1:25,
		x2:10,y2:20,
		x3:10,y3:30,
		closed:true,
		layer:true
	});
	$('#scr3Canvas1').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:300,y1:25,
		x2:290,y2:20,
		x3:290,y3:30,
		closed:true,
		layer:true
	});
	
	for(var i=0;i<9;i++){
		$('#scr3Canvas1').drawLine({
			strokeStyle:"black",
			strokeWidth:1,
			x1:28+280/9*i,y1:20,
			x2:28+280/9*i,y2:30,
			layer:true
		});
		
		$('#scr3Canvas1').drawText({
			fillStyle:"black",
			fontSize:12,
			x:28+280/9*i,y:40,
			text:replaceDynamicText(2*i-8,interactiveObj.numLanguage,''),
			layer:true
		});
	}
	
	for(var i=0;i<18;i++){
		mode3Canvas1Points.push(28+280/18*i);
	}
}

function sketchMode3Canvas2(){
	scr3Canvas2.height = scr3Canvas2.height;
	mode3Canvas2Points = new Array();
	$('#scr3Canvas2').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		x1:10,y1:25,
		x2:290,y2:25,
		layer:true
	});
	
	$('#scr3Canvas2').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:0,y1:25,
		x2:10,y2:20,
		x3:10,y3:30,
		closed:true,
		layer:true
	});
	$('#scr3Canvas2').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:300,y1:25,
		x2:290,y2:20,
		x3:290,y3:30,
		closed:true,
		layer:true
	});
	
	for(var i=0;i<9;i++){
		$('#scr3Canvas2').drawLine({
			strokeStyle:"black",
			strokeWidth:1,
			x1:28+280/9*i,y1:20,
			x2:28+280/9*i,y2:30,
			layer:true
		});
		
		$('#scr3Canvas2').drawText({
			fillStyle:"black",
			fontSize:12,
			x:28+280/9*i,y:40,
			text:replaceDynamicText(2*i-8,interactiveObj.numLanguage,''),
			layer:true
		});
	}
	
	for(var i=0;i<18;i++){
		mode3Canvas2Points.push(28+280/18*i);
	}
}

function sketchMode3Canvas3(){
	scr3Canvas3.height = scr3Canvas3.height;
	mode3Canvas3Points = new Array();
	$('#scr3Canvas3').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		x1:10,y1:25,
		x2:290,y2:25,
		layer:true
	});
	
	$('#scr3Canvas3').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:0,y1:25,
		x2:10,y2:20,
		x3:10,y3:30,
		closed:true,
		layer:true
	});
	$('#scr3Canvas3').drawLine({
		strokeStyle:"black",
		strokeWidth:2,
		fillStyle:"black",
		x1:300,y1:25,
		x2:290,y2:20,
		x3:290,y3:30,
		closed:true,
		layer:true
	});
	
	for(var i=0;i<9;i++){
		$('#scr3Canvas3').drawLine({
			strokeStyle:"black",
			strokeWidth:1,
			x1:28+280/9*i,y1:20,
			x2:28+280/9*i,y2:30,
			layer:true
		});
		
		$('#scr3Canvas3').drawText({
			fillStyle:"black",
			fontSize:12,
			x:28+280/9*i,y:40,
			text:replaceDynamicText(2*i-8,interactiveObj.numLanguage,''),
			layer:true
		});
	}
	
	for(var i=0;i<18;i++){
		mode3Canvas3Points.push(28+280/18*i);
	}
}

function plotMode3Point1(a,sign){
	sketchMode3Canvas1();
	if(sign!='&lt;' && sign!='&gt;'){
		$('#scr3Canvas1').drawArc({
			strokeStyle:"#ED517A",
			fillStyle:"#ED517A",
			radius:4,
			start:0,end:360,
			x:mode3Canvas1Points[a+8],y:25,
			layer:true
		});	
	}
	else{
		$('#scr3Canvas1').drawArc({
			strokeStyle:"#ED517A",
			strokeWidth:2,
			fillStyle:'#E4E4FE',
			radius:4,
			start:0,end:360,
			x:mode3Canvas1Points[a+8],y:25,
			layer:true
		});
	}
	if(sign=='&lt;' || sign=='≤'){
		$('#scr3Canvas1').drawLine({
			strokeStyle:"#ED517A",
			strokeWidth:3,
			x1:10,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});
		$('#scr3Canvas1').drawLine({
			strokeStyle:"#ED517A",
			strokeWidth:3,
			fillStyle:"#ED517A",
			x1:0,y1:25,
			x2:10,y2:20,
			x3:10,y3:30,
			closed:true,
			layer:true
		});
	}
	if(sign=='&gt;' || sign=='≥'){
		$('#scr3Canvas1').drawLine({
			strokeStyle:"#ED517A",
			strokeWidth:3,
			x1:290,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});	
		$('#scr3Canvas1').drawLine({
			strokeStyle:"#ED517A",
			strokeWidth:3,
			fillStyle:"#ED517A",
			x1:300,y1:25,
			x2:290,y2:20,
			x3:290,y3:30,
			closed:true,
			layer:true
		});
	}	
}

function plotMode3Point2(a,sign){
	sketchMode3Canvas2();
	if(sign!='&lt;' && sign!='&gt;'){
		$('#scr3Canvas2').drawArc({
			strokeStyle:"#7474B1",
			fillStyle:"#7474B1",
			radius:4,
			start:0,end:360,
			x:mode3Canvas2Points[a+8],y:25,
			layer:true
		});		
	}
	else{
		$('#scr3Canvas2').drawArc({
			strokeStyle:"#7474B1",
			strokeWidth:2,
			fillStyle:'#E4E4FE',
			radius:4,
			start:0,end:360,
			x:mode3Canvas2Points[a+8],y:25,
			layer:true
		});	
	}
	
	if(sign=='&lt;' || sign=='≤'){
		$('#scr3Canvas2').drawLine({
			strokeStyle:"#7474B1",
			strokeWidth:3,
			x1:10,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});
		$('#scr3Canvas2').drawLine({
			strokeStyle:"#7474B1",
			strokeWidth:3,
			fillStyle:"#7474B1",
			x1:0,y1:25,
			x2:10,y2:20,
			x3:10,y3:30,
			closed:true,
			layer:true
		});
	}
	if(sign=='&gt;' || sign=='≥'){
		$('#scr3Canvas2').drawLine({
			strokeStyle:"#7474B1",
			strokeWidth:3,
			x1:290,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});	
		$('#scr3Canvas2').drawLine({
			strokeStyle:"#7474B1",
			strokeWidth:3,
			fillStyle:"#7474B1",
			x1:300,y1:25,
			x2:290,y2:20,
			x3:290,y3:30,
			closed:true,
			layer:true
		});
	}
	

}

function plotMode3Point3(a,sign){
	//sketchMode3Canvas3();
	if(sign!='&lt;' && sign!='&gt;'){
		$('#scr3Canvas3').drawArc({
			strokeStyle:"green",
			fillStyle:"green",
			radius:4,
			start:0,end:360,
			x:mode3Canvas2Points[a+8],y:25,
			layer:true
		});		
	}
	else{
		$('#scr3Canvas3').drawArc({
			strokeStyle:"green",
			strokeWidth:2,
			fillStyle:'green',
			radius:4,
			start:0,end:360,
			x:mode3Canvas2Points[a+8],y:25,
			layer:true
		});	
	}
	
	if(sign=='&lt;' || sign=='≤'){
		$('#scr3Canvas3').drawLine({
			strokeStyle:"green",
			strokeWidth:3,
			x1:10,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});
		$('#scr3Canvas3').drawLine({
			strokeStyle:"green",
			strokeWidth:3,
			fillStyle:"green",
			x1:0,y1:25,
			x2:10,y2:20,
			x3:10,y3:30,
			closed:true,
			layer:true
		});
	}
	if(sign=='&gt;' || sign=='≥'){
		$('#scr3Canvas3').drawLine({
			strokeStyle:"green",
			strokeWidth:3,
			x1:290,y1:25,
			x2:mode3Canvas1Points[a+8],y2:25,
			layer:true
		});	
		$('#scr3Canvas3').drawLine({
			strokeStyle:"green",
			strokeWidth:3,
			fillStyle:"green",
			x1:300,y1:25,
			x2:290,y2:20,
			x3:290,y3:30,
			closed:true,
			layer:true
		});
	}
}

function drawIndicatorLines(toBottom){
	var temp=0;
	if(toBottom){
		temp=0;
	}
	else temp = -100;
	
	scr3Canvas4.height = scr3Canvas4.height;
	
	$('#scr3Canvas4').drawLine({
		strokeStyle:"green",
		strokeWidth:1,
		x1:mode3Canvas1Points[tempPoint1+8],y1:25,
		x2:mode3Canvas1Points[tempPoint1+8],y2:225+temp,
		layer:true
	});
	$('#scr3Canvas4').drawLine({
		strokeStyle:"green",
		strokeWidth:1,
		x1:mode3Canvas2Points[tempPoint2+8],y1:25,
		x2:mode3Canvas2Points[tempPoint2+8],y2:225+temp,
		layer:true
	});
	
	if(toBottom){
		if(mode3option1!='&lt;' && mode3option1!='&gt;'){
			$('#scr3Canvas3').drawArc({
				strokeStyle:"green",
				fillStyle:"green",
				radius:3,
				start:0,end:360,
				x:mode3Canvas3Points[tempPoint1+8],y:25,
				layer:true
			});																// point from canvas1
		}
		else{
			$('#scr3Canvas3').drawArc({
				strokeStyle:"green",
				strokeWidth:2,
				fillStyle:'#E4E4FE',
				radius:3,
				start:0,end:360,
				x:mode3Canvas3Points[tempPoint1+8],y:25,
				layer:true
			});	
		}
		
		if(mode3option2!='&lt;' && mode3option2!='&gt;'){
			$('#scr3Canvas3').drawArc({
				strokeStyle:"green",
				fillStyle:"green",
				radius:3,
				start:0,end:360,
				x:mode3Canvas3Points[tempPoint2+8],y:25,
				layer:true
			});		
		}
		else{																//point from canvas2
			$('#scr3Canvas3').drawArc({
				strokeStyle:"green",
				strokeWidth:2,
				fillStyle:'#E4E4FE',
				radius:3,
				start:0,end:360,
				x:mode3Canvas3Points[tempPoint2+8],y:25,
				layer:true
			});	
		}		
	}
	else{
		
	}
}

function showPrompt(msg){
	$(".promptText").html(msg);
	$("#screenModal").show();
	$('#OK').focus();
}


questionInteractive.prototype.init = function() 
{
	for(var i=1;i<=7;i++){
		$('#operation'+i).html(miscArr['misc10'+i]);
	}
	
	for(var i=1;i<=3;i++){
		$('#mode'+i).html(promptArr['p10'+i]);	
	}	
	$('#toolTip').html(promptArr['p104']);
	
	$('#OK').live('click',function(){
		$('#screenModal').hide();
	});
	$('.promptContainer').draggable({
		'containment':'#container'
	});
	
	$('#mode1').live('click',function(){
		showScreen(1);
		putTip(1);
		$('.modeDiv').css({
			'background-color':'rgba(255,149,111,1)',

		});
		$('#mode1').css('background-color','rgb(173, 238, 102)');
		
	});
	
	$('#mode2').live('click',function(){
		sketchMode2Canvas();
		showScreen(2);
		putTip(2);
		$('.modeDiv').css({
			'background-color':'rgba(255,149,111,1)',
		});
		$('#mode2').css('background-color','rgb(173, 238, 102)');
		
	});
	
	$('#mode3').live('click',function(){
		showScreen(3);
		putTip(3);
		$('.modeDiv').css({
			'background-color':'rgba(255,149,111,1)',
		});
		$('#mode3').css('background-color','rgb(173, 238, 102)');
		
	});
	
	$('#button1').css('background-color','#adee66');
	$('#buttonsTag').html('x '+$('#button1').attr('val')+' a');
	$('.button').live('click',function(){
		$('.button').css('background-color','white');
		$(this).css('background-color','#adee66');
		$('#buttonsTag').html('x '+$(this).attr('val')+' a');
		currentSign = $(this).attr('val');
		sketchMode2Canvas();
		$('#statement').html('');
	});
	
	$('#redSlider').slider({
		//handle:'handle22',
		range: 'min',
		min: -10,
		max: 10,
		value: 20,
		step:1,
		slide: function(event,ui){
			$('#sliderVal').html(replaceDynamicText(ui.value,interactiveObj.numLanguage,''));
			plotMode2Point(ui.value,currentSign);
		}
	});
	
	
	$('.control1butt').live('click',function(){
		$('.control1butt').css('background-color','rgba(255,255,255,0.7)');
		$('#sliderContainer2').show();
		$('#dispControl1').html('Move slider');
		$('.control1butt').css('border','');
		$(this).css('background-color','#adee66');
		$(this).css('border','1px solid #8376E8');
		sketchMode3Canvas1();
		sketchMode3Canvas3();
		mode3option1 = $(this).html();
		scr3Canvas4.height = scr3Canvas4.height;
		$('#mode3Ans').html('');
	});
	$('.control2butt').live('click',function(){
		$('.control2butt').css('background-color','rgba(255,255,255,0.7)');
		$('#sliderContainer3').show();
		$('#dispControl2').html('Move slider');
		$('.control2butt').css('border','');
		$(this).css('background-color','#adee66');
		$(this).css('border','1px solid #8376E8');
		sketchMode3Canvas2();
		sketchMode3Canvas3();
		mode3option2 = $(this).html();
		scr3Canvas4.height = scr3Canvas4.height;
		$('#mode3Ans').html('');
	});
	
	sketchMode3Canvas1();
	sketchMode3Canvas2();
	sketchMode3Canvas3();
	
	$('#redSlider2').slider({
		//handle:'handle22',
		range: 'min',
		min: -8,
		max: 8,
		value: 0,
		step:1,
		slide: function(event,ui){
			$('#dispControl1').html('x '+mode3option1+' '+replaceDynamicText(ui.value,interactiveObj.numLanguage,''));
			plotMode3Point1(ui.value,mode3option1);
			scr3Canvas4.height = scr3Canvas4.height;
			sketchMode3Canvas3();
			point1 = ui.value;
			tempPoint1 = point1;
			$('#mode3Ans').html('');
			range1 = new Array();
			if(mode3option1=='≤' || mode3option1=="&lt;"){
				for(var i=point1;i>=-8;i--){
					range1.push(i);
				}
				if(mode3option1=='≤'){
					ansString1 = promptArr['p124'];
				}
				if(mode3option1=='&lt;'){
					ansString1 = promptArr['p122'];
				}
			}
			if(mode3option1=='='){
				range1.push(point1);
			}
			if(mode3option1=="&gt;" || mode3option1=='≥'){
				for(var i=point1;i<=8;i++){
					range1.push(i);
				}
				
				if(mode3option1=='&gt;'){
					ansString1 = promptArr['p121'];
				}
				if(mode3option1=='≥'){
					ansString1 = promptArr['p123'];
				}
			}
			
		}
	});
	$('#redSlider3').slider({
		//handle:'handle22',
		range: 'min',
		min: -8,
		max: 8,
		value:0,
		step:1,
		slide: function(event,ui){
			$('#dispControl2').html('x '+mode3option2+' '+replaceDynamicText(ui.value,interactiveObj.numLanguage,''));
			plotMode3Point2(ui.value,mode3option2);
			point2 = ui.value;
			tempPoint2 = point2;
			scr3Canvas4.height = scr3Canvas4.height;
			sketchMode3Canvas3();
			$('#mode3Ans').html('');
			range2 = new Array();
			if(mode3option2=='≤' || mode3option2=="&lt;"){
				for(var i=point2;i>=-8;i--){
					range2.push(i);
				}
				if(mode3option2=='≤'){
					ansString2 = promptArr['p124'];
				}
				if(mode3option2=='&lt;'){
					ansString2 = promptArr['p122'];
				}
			}
			if(mode3option2=='='){
				range2.push(point2);
			}
			if(mode3option2=="&gt;" || mode3option2=='≥'){
				for(var i=point2;i<=8;i++){
					range2.push(i);
				}
				if(mode3option2=='&gt;'){
					ansString2 = promptArr['p121'];
				}
				if(mode3option2=='≥'){
					ansString2 = promptArr['p123'];
				}
			}
		}
	});	
	$('#and').live('click',function(){
		sketchMode3Canvas3();
		getIntersectionArray();
		getIntersectionArray();
		if(ansArr.length>1){
			$('#scr3Canvas3').drawLine({
				strokeStyle:"green",
				strokeWidth:3,
				x1:mode3Canvas3Points[rangeStart+8],y1:25,
				x2:mode3Canvas3Points[rangeStop+8],y2:25,
				layer:true
			});
			drawIndicatorLines(1);
			decideTextAND();
			
		}
		if(ansArr.length==1){
			drawIndicatorLines(0);
			$('#scr3Canvas3').drawArc({
				strokeStyle:"green",
				strokeWidth:3,
				radius:3,
				x:mode3Canvas3Points[rangeStart+8],y:25,
				layer:true
			});
			if(mode3option2=='='){
				point1 = point2;
			}
			else{
				//nothing
			}
			mode3AnsString = promptArr['p125'];
			
		}
		if(ansArr.length==0){
			mode3AnsString = promptArr['p126'];
		}
		
		$('#mode3Ans').html(replaceDynamicText(mode3AnsString+'.',interactiveObj.numLanguage,''));
		
	});

	$('#or').live('click',function(){
		sketchMode3Canvas3();
		OR_logic();
		decideTextOR();
	});
	
	initiateMode(interactiveObj.selectMode);

	mode1Params();
	mode1Events(); 
	getLine(a,b,c,d);	
	putLine(LHS_string,RHS_string,interactiveObj.symbol);
}


function mode1Events(){
	
	$('#toolTip').live('click',function(){
		$('#tipScreen').show('slide',1000);
	});
	$('#close').live('click',function(){
		$('#tipScreen').hide('slide',1000);
	});
	
	
	$('.inputBox').live('keypress',function(e) {
        e.keyCode = (e.keyCode != 0)?e.keyCode:e.which; 
	//	console.log(e.keyCode);
		var value = $(this).val();
        var a = [];
        var k = e.which;
        for (x = 48; x < 58; x++)
            a.push(x);
          
        if (!($.inArray(k,a)>=0) && e.keyCode != 9 && e.keyCode != 8  && e.keyCode!=45)
            e.preventDefault();
        if(($(this).val().length+1)>2 && e.keyCode != 8 && e.keyCode != 13){
           e.preventDefault();
        }
	});
	
	$('#operation1').live('click',function(){
		if(op1Active && !opBusy){
			op1Counter++;
			if(op1Counter==3){
				showPrompt(promptArr['p105']);
			}
			if(op1Counter<=5){
				lineCounter++;
				var temp1=' - <input id="op1Input1Line'+lineCounter+'" pattern="[0-9]*" class="op1Input inputBox" value=""></input>';
				var temp2=' - <input id="op1Input2Line'+lineCounter+'" pattern="[0-9]*" class="op1Input inputBox" value=""></input>';
				putLine(LHS_string+temp1,RHS_string+temp2,interactiveObj.symbol);
				op1Active=0;
				opBusy=1;
			}
			else{
				showPrompt(promptArr['p106']);
			}
		}
	});		//subtract from both sides
	$('.op1Input').live('keyup',function(e){
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		var value = parseInt($(this).val());		
		if(e.keyCode<=57 && e.keyCode>=48 || e.keyCode==8){
			if(isNaN(value)){
				value='';
			}
			$('#op1Input1Line'+lineCounter).attr('value',value);	
			$('#op1Input2Line'+lineCounter).attr('value',value);	
		}
		
		if(e.keyCode==13){
			console.log(value);
			$('.op1Input').attr('disabled','disabled');
			var temp = b.value - value;
			b = new constant(temp);
			temp = c.value - value;
			c = new constant(temp);
			getLine(a,b,c,d);
			lineCounter++;
			putLine(LHS_string,RHS_string,interactiveObj.symbol);
			op1Active=1;
			opBusy=0;
		}
	});

	$('#operation2').live('click',function(){
		if(op2Active && !opBusy){
			op2Counter++;
			if(op2Counter==3){
				showPrompt(promptArr['p105']);
			}
			if(op2Counter<=5){
				lineCounter++;
				var temp1=' + <input id="op2Input1Line'+lineCounter+'" pattern="[0-9]*" class="op2Input inputBox"></input>';
				var temp2=' + <input id="op2Input2Line'+lineCounter+'" pattern="[0-9]*" class="op2Input inputBox"></input>';
				putLine(LHS_string+temp1,RHS_string+temp2,interactiveObj.symbol);
				op2Active=0;
				opBusy=1;
			}
			else{
				showPrompt(promptArr['p106']);
			}
		}
	});		//add on both siudes
	$('.op2Input').live('keyup',function(e){
		var value = parseInt($(this).val());
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		if(e.keyCode<=57 && e.keyCode>=48 || e.keyCode==8){
			if(isNaN(value)){
				value='';
			}
			$('#op2Input1Line'+lineCounter).attr('value',value);	
			$('#op2Input2Line'+lineCounter).attr('value',value);	
		}
		if(e.keyCode==13){
			$('.op2Input').attr('disabled','disabled');
			var temp = b.value + value;
			b = new constant(temp);
			temp = c.value + value;
			c = new constant(temp);
			getLine(a,b,c,d);
			lineCounter++;
			putLine(LHS_string,RHS_string,interactiveObj.symbol);
			op2Active=1;
			opBusy=0;
		}
	});
	
	$('#operation3').live('click',function(){		//multiply on both sides
		if(op3Active && !opBusy){
			if(a.fracTrue || d.fracTrue){
				if((a.value==0 && c.value==0) || (b.value==0 && d.value==0 )){
					lineCounter++;
					var temp1=' X <input id="op3Input1Line'+lineCounter+'" pattern="[0-9]*" class="op3Input inputBox"></input>';
					var temp2=' X <input id="op3Input2Line'+lineCounter+'" pattern="[0-9]*" class="op3Input inputBox"></input>';
					putLine('('+LHS_string+')'+temp1,'('+RHS_string+')'+temp2,interactiveObj.symbol);
					op3Active=0;
					opBusy=1;
				}
				else{
					showPrompt(promptArr['p107']);
				}	
			}
			else{
				showPrompt(promptArr['p118']);
			}
		}
	});		//multiply both sides
	$('.op3Input').live('keyup',function(e){
		var value = parseInt($(this).val());
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		if(e.keyCode<=57 && e.keyCode>=48 || e.keyCode==8){
			if(isNaN(value)){
				value='';
			}
			$('#op3Input1Line'+lineCounter).attr('value',value);	
			$('#op3Input2Line'+lineCounter).attr('value',value);	
		}
		if(e.keyCode==13 && value!=''){
			if(value>0){
				var BLAH = a.den;
				if(a.value==0){
					BLAH = d.den;
				}
				
				if(Math.abs(value)!=Math.abs(BLAH)){
					$('#op3Input1Line'+lineCounter).attr('value','');	
					$('#op3Input2Line'+lineCounter).attr('value','');
					if(op3promptFlag==1){
						showPrompt(promptArr['p110']);
					}
					else{
						showPrompt(promptArr['p111']);
					}
					op3promptFlag = op3promptFlag*-1;
				}
				else{
					$('.op3Input').attr('disabled','disabled');
					if(d.value==0){
						a = new frac(a.num,a.num,0);
						c = new constant(c.value*value);	
					}
					else{
						d = new frac(d.num,d.num,0);
						b = new constant(b.value*value);
					}
					
					getLine(a,b,c,d);
					lineCounter++;
					putLine(LHS_string,RHS_string,interactiveObj.symbol);
					opBusy=0;
					checkEquation();
				}
			}
			else{
				$('#op3Input1Line'+lineCounter).attr('value','');	
				$('#op3Input2Line'+lineCounter).attr('value','');	
				showPrompt(promptArr['p114']);
			}
			
		}
	});
	
	$('#operation4').live('click',function(){				//divide on both sides
		if(op4Active && !opBusy){
			if(a.fracTrue || d.fracTrue){
				showPrompt(promptArr['p117']);
			}
			else{
				if((a.value==0 && c.value==0) || (b.value==0 && d.value==0)){
					op4Counter++;
					lineCounter++;
					var temp1='<input id="op4Input1Line'+lineCounter+'" pattern="[0-9]*" class="op4Input inputBox"></input>';
					var temp2='<input id="op4Input2Line'+lineCounter+'" pattern="[0-9]*" class="op4Input inputBox"></input>';
					var temp3,temp4;
					
					temp3 = getFrac(LHS_string,temp1);
					temp4 = getFrac(RHS_string,temp2);
					putLine(temp3,temp4,interactiveObj.symbol);
					op4Active=0;
					opBusy=1;	
				}
				else{
					showPrompt(promptArr['p107']);
				}
			}
		}
	});		// divide both sides
	$('.op4Input').live('keyup',function(e){
		var value = parseInt($(this).val());
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		if(e.keyCode<=57 && e.keyCode>=48 || e.keyCode==8){
			if(isNaN(value)){
				value='';
			}
			$('#op4Input1Line'+lineCounter).attr('value',value);	
			$('#op4Input2Line'+lineCounter).attr('value',value);	
		}
		if(e.keyCode==13 && value!=''){
			if(value>0){
				var BLAH = a.value;
				if(a.value==0){
					BLAH = d.value;
				}
				
				if(Math.abs(value)!=Math.abs(BLAH)){
					$('#op4Input1Line'+lineCounter).attr('value','');	
					$('#op4Input2Line'+lineCounter).attr('value','');
					if(op4promptFlag==1){
						showPrompt(promptArr['p112']);
					}
					else{
						showPrompt(promptArr['p113']);
					}
					op4promptFlag = op4promptFlag*-1;
				}
				else{
					$('.op4Input').attr('disabled','disabled');
					
					if(d.value==0){
						a = new frac(BLAH/value,BLAH/value,0);
						if(c.value%value==0){
							c = new constant(c.value/value);
						}
						else{
							c = new constFrac(c.value,value);			
						}	
					}
					else{
						d = new frac(BLAH/value,BLAH/value,0);
						if(b.value%value==0){
							b = new constant(b.value/value);
						}
						else{
							b = new constFrac(b.value,value);			
						}	
					}
					getLine(a,b,c,d);
					lineCounter++;
					putLine(LHS_string,RHS_string,interactiveObj.symbol);
					opBusy=0;
					checkEquation();
				}	
			}
			else{
				$('#op4Input1Line'+lineCounter).attr('value','');	
				$('#op4Input2Line'+lineCounter).attr('value','');
				showPrompt(promptArr['p114']);
			}
		}
	});
	
	$('#operation5').live('click',function(){				//flip the inequality
		if(op5Active && !opBusy){
			var newSymbol;
			switch(interactiveObj.symbol){
				case "≥" : newSymbol="≤";
					break;
				case "<": newSymbol=">";
					break;
				case ">": newSymbol="<";
					break;
				case "=":newSymbol="=";
					break;
				case "≤":newSymbol="≥";
					break;
				default: //nothing
					break;
			}
			interactiveObj.symbol = newSymbol;
			var temp1 = a;
			var temp2 = b;
			a = d;
			b = c;
			d = temp1;
			c = temp2;
			getLine(a,b,c,d);
			lineCounter++;
			putLine(LHS_string,RHS_string,interactiveObj.symbol);	
		}	
	});		
	
	// multiply with -1
	
	$('#operation6').live('click',function(){
		if(op6Active && !opBusy){
			var newSymbol;
			switch(interactiveObj.symbol){
				case "≥" : newSymbol="≤";
					break;
				case "<": newSymbol=">";
					break;
				case ">": newSymbol="<";
					break;
				case "=":newSymbol="=";
					break;
				case "≤":newSymbol="≥";
					break;
				default: //nothing
					break;
			}
			interactiveObj.symbol = newSymbol;
			
			if(a.fracTrue){
				a = new frac(-1*a.num,a.den,1);
			}
			else{
				a = new frac(-1*a.value,a.value,0);
			}
			
			if(b.fracTrue){
				b = new constFrac(-1*b.num,b.den);
			}
			else{
				b = new constant(-1*b.value);
			}
			
			if(c.fracTrue){
				c = new constFrac(-1*c.num,c.den);
			}
			else c = new constant(-1*c.value);
			
			if(d.fracTrue){
				d = new frac(-1*d.num,d.den,1);
			}
			else{
				d = new frac(-1*d.value,d.value,0)
			}
		
			getLine(a,b,c,d);
			lineCounter++;
			putLine(LHS_string,RHS_string,interactiveObj.symbol);
			checkEquation();
		}
	});		//multiply by -1

	$('#operation7').live('click',function(){			//group like terms
		if(op7Active && !opBusy){			
			if(a.fracTrue || d.fracTrue){
				showPrompt(promptArr['p116']);
			}
			else{
				var temp1;
				temp1 = b.value;
				b = new frac(-1*d.value,-1*d.value,0);
				d = new constant(-1*temp1);
				getLine(a,b,c,d);
				lineCounter++;
				putLine(LHS_string,RHS_string,interactiveObj.symbol);
				
				op7rightVal1 = parseFloat(a.value) + parseFloat(b.value);
				op7rightVal2 = parseInt(c.value)+parseInt(d.value);
				
				a = new frac(1,1,0);
				b = new constant(0);
				c = new constant(0);
				d = new frac(0,0,0);
				getLine(a,b,c,d);
				lineCounter++;
				var html1='<input id="op7input1" pattern="[0-9]*" class="op7Input inputBox"></input> ';
				var html2='<input id="op7input2" pattern="[0-9]*" class="op7Input inputBox"></input> ';
				putLine(html1+LHS_string,RHS_string+html2,interactiveObj.symbol);
				opBusy=1;
				op7Active=0; 	
			}
		}
	});		//group like terms
	$('#op7input1').live('keyup',function(e){
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		var value = parseFloat($('#op7input1').attr('value'));
		if(e.keyCode==13 && value!=''){
			if(value==op7rightVal1){
				$('#op7input1').css('border','2px solid rgb(50,200,50)');
				$('#op7input1').attr('disabled','disabled');
				if($('#op7input2').attr('value')==''){
					setTimeout(function(){
						$('#op7input2').focus();
					},100);
				}
				if($('#op7input2').attr('value')==op7rightVal2){
					a = new frac(op7rightVal1,op7rightVal1,0);
					b = new constant(0);
					c = new constant(op7rightVal2);
					d = new frac(0,0,0);
					getLine(a,b,c,d);
					opBusy=0;
					lineCounter++;
					putLine(LHS_string,RHS_string,interactiveObj.symbol);
				}
			}
			else{
				showPrompt(promptArr['p109']);
				$('#op7input1').attr('value','');
			}	
		}
	});
	$('#op7input2').live('keyup',function(e){
		e.keyCode = (e.keyCode != 0)?e.keyCode:e.which;
		var value = parseFloat($('#op7input2').attr('value'));
		if(e.keyCode==13 && value!=''){
			if(value==op7rightVal2){
				$('#op7input2').css('border','2px solid rgb(50,200,50)');
				$('#op7input2').attr('disabled','disabled');
				if($('#op7input1').attr('value')==''){
					setTimeout(function(){
						$('#op7input1').focus();
					},100);
				}
				if($('#op7input1').attr('value')==op7rightVal1){
					a = new frac(op7rightVal1,op7rightVal1,0);
					b = new constant(0);
					c = new constant(op7rightVal2);
					d = new frac(0,0,0);
					getLine(a,b,c,d);
					opBusy=0;                    
					lineCounter++;
					putLine(LHS_string,RHS_string,interactiveObj.symbol);
				}
			}
			else{
				showPrompt(promptArr['p109']);
				$('#op7input2').attr('value','');
			}	
		}
	});	
}

function checkEquation(){
	if((a.value==1 && d.value==0 && b.value==0) || (a.value==0 && d.value==1 && c.value==0)){
		opBusy=1;
		showPrompt(promptArr['p115']);
		$('#line'+lineCounter).css({
			'background':'#9FD373'
		});
	}
}

function getIntersectionArray(){
	ansArr = new Array();
	var length = range1.length;
	for(var i=0;i<length;i++){
		if(in_array(range1[i],range2)){
			ansArr.push(range1[i]);
		}
	}
	rangeStop = ansArr[0];
	rangeStart = ansArr[0];
	for(var i=0;i<ansArr.length;i++){
		if(ansArr[i]>rangeStop){
			rangeStop = ansArr[i];
		}
		if(ansArr[i]<rangeStart){
			rangeStart = ansArr[i];
		}
		
	}
}

function OR_logic(){
	ansArr = new Array();
	var length = range1.length;
	for(var i=0;i<length;i++){
		if(in_array(range1[i],range2)){
			ansArr.push(range1[i]);
		}
	}
	if(ansArr.length==0){
		plotMode3Point3(point1,mode3option1);
		plotMode3Point3(point2,mode3option2);
	}
	else{
		for(var i=0;i<length;i++){
			if(!in_array(range1[i],ansArr)){
				ansArr.push(range1[i]);
			}
		}
		for(var i=0;i<range2.length;i++){
			if(!in_array(range2[i],ansArr)){
				ansArr.push(range2[i]);
			}
		}
		rangeStop = ansArr[0];
		rangeStart = ansArr[0];
		for(var i=0;i<ansArr.length;i++){
			if(ansArr[i]>rangeStop){
				rangeStop = ansArr[i];
			}
			if(ansArr[i]<rangeStart){
				rangeStart = ansArr[i];
			}	
		}
		
		$('#scr3Canvas3').drawLine({
			strokeStyle:"green",
			strokeWidth:3,
			x1:mode3Canvas3Points[rangeStart+8],y1:25,
			x2:mode3Canvas3Points[rangeStop+8],y2:25,
			layer:true
		});
		if(rangeStop==8){
			drawRightArrow();
		}
		if(rangeStart==-8){
			drawLeftArrow();
		}
	}
	
	drawIndicatorLines(1);
	
	
	
}

function decideTextOR(){
	
	if(ansString1==promptArr['p121'] && ansString2==promptArr['p121']){
		point1 = (point1<point2)?point1:point2;
		mode3AnsString = promptArr['p119'];
	}
	else if(ansString1==promptArr['p122'] && ansString2==promptArr['p122']){
		point1 = (point1<point2)?point2:point1;
		mode3AnsString = promptArr['p119'];
	}
 	else if((ansString1==promptArr['p121'] && ansString2==promptArr['p123']) || (ansString1==promptArr['p123'] && ansString2==promptArr['p121'])){
		point1 = (point1<point2)?point1:point2;
		ansString1 = (point1<point2)?ansString1:ansString2;
		mode3AnsString = promptArr['p119'];
	}
	else if((ansString1==promptArr['p122'] && ansString2==promptArr['p124']) || (ansString1==promptArr['p124'] && ansString2==promptArr['p122'])){
		point1 = (point1<point2)?point2:point1;
		ansString1 = (point1<point2)?ansString2:ansString1;
		mode3AnsString = promptArr['p119'];
	}
	
	else{
		mode3AnsString = promptArr['p119']+promptArr['p127'];
	}
	
	$('#mode3Ans').html(replaceDynamicText(mode3AnsString+'.',interactiveObj.numLanguage,''));	
}

function decideTextAND(){
	if((ansString1==promptArr['p122'] && ansString2==promptArr['p122']) || (ansString1==promptArr['p124'] && ansString2==promptArr['p124'])){
		point1 = (point1<point2)?point1:point2;
		mode3AnsString = promptArr['p119'];
		drawLeftArrow();
	}
	else
	if((ansString1==promptArr['p121'] && ansString2==promptArr['p121']) || (ansString1==promptArr['p123'] && ansString2==promptArr['p123'])){
		point1 = (point1>point2)?point1:point2;
		mode3AnsString = promptArr['p119'];
		drawRightArrow();
	}
	else
	if((ansString1==promptArr['p122'] && ansString2==promptArr['p124']) || (ansString1==promptArr['p124'] && ansString2==promptArr['p122'])){
		if(point1<point2){
			mode3AnsString = promptArr['p119'];
		}
		else{
			point1 = point2;
			ansString1 = ansString2;
			mode3AnsString = promptArr['p119'];
		}	
		drawLeftArrow();
	}
	else
	if((ansString1==promptArr['p121'] && ansString2==promptArr['p123']) || (ansString1==promptArr['p123'] && ansString2==promptArr['p121'])){
		if(point1>point2){
			mode3AnsString = promptArr['p119'];
		}
		else{
			point1 = point2;
			ansString1 = ansString2;
			mode3AnsString = promptArr['p119'];
		}	
		drawRightArrow();
	}
	else{
		mode3AnsString = promptArr['p119']+promptArr['p120'];
	}
}


function drawLeftArrow(){
	$('#scr3Canvas3').drawLine({
		strokeStyle:"green",
		strokeWidth:3,
		fillStyle:"green",
		x1:0,y1:25,
		x2:10,y2:20,
		x3:10,y3:30,
		closed:true,
		layer:true
	});
	$('#scr3Canvas3').drawLine({
		strokeStyle:"green",
		strokeWidth:3,
		fillStyle:"green",
		x1:0,y1:25,
		x2:mode3Canvas3Points[0],y2:25,
		layer:true
	});
	
}

function drawRightArrow(){
	$('#scr3Canvas3').drawLine({
		strokeStyle:"green",
		strokeWidth:3,
		fillStyle:"green",
		x1:300,y1:25,
		x2:290,y2:20,
		x3:290,y3:30,
		closed:true,
		layer:true
	});
	$('#scr3Canvas3').drawLine({
		strokeStyle:"green",
		strokeWidth:3,
		fillStyle:"green",
		x1:300,y1:25,
		x2:mode3Canvas3Points[16],y2:25,
		layer:true
	});
}


function putTip(modeNo){
	$('#tipHead').html(promptArr['p141']);
	if(modeNo==1){
		$('#tip1').html(replaceDynamicText(promptArr['p128'],interactiveObj.numLanguage,''));
		$('#tip2').html(replaceDynamicText(promptArr['p129'],interactiveObj.numLanguage,''));
		$('#tip3').html(replaceDynamicText(promptArr['p130'],interactiveObj.numLanguage,''));
		$('#tip4').html(replaceDynamicText(promptArr['p131'],interactiveObj.numLanguage,''));
		$('#tip5').html(replaceDynamicText(promptArr['p132'],interactiveObj.numLanguage,''));
	}
	else if(modeNo==2){
		$('#tip1').html(replaceDynamicText(promptArr['p133'],interactiveObj.numLanguage,''));
		$('#tip2').html(replaceDynamicText(promptArr['p134'],interactiveObj.numLanguage,''));
		$('#tip3').html(replaceDynamicText(promptArr['p135'],interactiveObj.numLanguage,''));
		$('#tip4').html(replaceDynamicText(promptArr['p136'],interactiveObj.numLanguage,''));
		$('#tip5').hide();
	}
	else{
		$('#tip1').html(replaceDynamicText(promptArr['p137'],interactiveObj.numLanguage,''));
		$('#tip2').html(replaceDynamicText(promptArr['p138'],interactiveObj.numLanguage,''));
		$('#tip3').html(replaceDynamicText(promptArr['p139'],interactiveObj.numLanguage,''));
		$('#tip4').html(replaceDynamicText(promptArr['p140'],interactiveObj.numLanguage,''));
		$('#tip5').hide();
	}
}