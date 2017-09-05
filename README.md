# libegor.js
To use this library, add this html code
``` html
<script src="https://libegor.ru/libegor.js"></script>
```
or
``` html
<script src="https://libegor.ru/libegor_mini.js"></script>
```
## Example usage libegor.js, sample 1 "clock":
**view sample work with CSS [here](https://libegor.ru/js/example-1)**
``` html
<div id="clock"></div>
<script>
var div_clock = document.getElementById('clock');

libegor.add(div_clock.parentNode, 'div', {class: 'clock', base: CLASS_CLOCK, replace: div_clock}).loop();
</script>
```
[![sample 1 - clock](https://libegor.ru/data/066940362cf03419337237c02aa88319.png "sample 1 - clock")](https://libegor.ru/js/example-1)

The complete code for the class Declaration **CLASS_CLOCK**

``` html
<div id="clock"></div>
<script>
var CLASS_CLOCK = function () {
	this.obj = {rotate: {h:0,m:0,s:0}, prev: {h:0,m:0,s:0}};
	
	this.add('hour_hand', 'div', {class: 'hand hour'});/* creat DOM "div" element */
	this.add('minute_hand', 'div', {class: 'hand minute'});
	this.add('second_hand', 'div', {class: 'hand second'});
	
	
	this.construct = function () {
		var date = new Date();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		
		
		if (hour > 11) hour -= 12;
		
		
		if(minute % 2 == 0) this.addClass('even');
		else  this.delClass('even');
	
		
		if (this.obj.prev.h > hour) this.obj.rotate.h++;
		if (this.obj.prev.m > minute) this.obj.rotate.m++;
		if (this.obj.prev.s > second) this.obj.rotate.s++;
		
		this.obj.prev.h = hour;
		this.obj.prev.m = minute;
		this.obj.prev.s = second;
		
		
		this.el.hour_hand.style.transform = 'rotate('+((hour/12 + this.obj.rotate.h)*360)+'deg)';
		this.el.minute_hand.style.transform = 'rotate('+((minute/60 + this.obj.rotate.m)*360)+'deg)';
		this.el.second_hand.style.transform = 'rotate('+((second/60 + this.obj.rotate.s)*360)+'deg)';
	}/* construct */
	
	this.loop = function () {
		var p = arguments[0] ? arguments[0] : this;

		p.construct();
		
		setTimeout(function(){p.loop(p)}, 500); 
	}/* loop */
}/* CLASS_CLOCK */

var div_clock = document.getElementById('clock');

libegor.add(div_clock.parentNode, 'div', {class: 'clock', base: CLASS_CLOCK, replace: div_clock}).loop();
</script>
```
