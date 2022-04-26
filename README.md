## js-domExtend
* author:tutu辣么可爱  
* day:2022.4.27 GMT+0800 (中国标准时间)  
* description:原生js增强插件，将部分原生dom对象方法模仿jQuery进行二次封装，便于使用  
* version:1.1  
* license:MIT License  

## DOM对象方法 


1.function DOM.attr(key, val)  
* parameter0 key:dom对象属性名  
* parameter1 val:dom对象属性值  
* note:没有val则返回对应属性名的值；有val则进行属性设置，返回dom对象本身。本质是对getAttribute、setAttribute、removeAttribute的二次封装，使用体验类似jQuery的$.attr方法 

2.function DOM.css(key, val)  
* parameter0 key:dom对象css样式属性名  
* parameter1 val:dom对象css样式属性值  
* note:没有val则返回对应属性名的值；有val则进行属性设置，返回dom对象本身。本质是对getComputedStyle、DOM.style.setProperty的二次封装，使用体验类似jQuery的$.css方法  

3.function DOM.hide()  
* note:调用DOM.css隐藏dom对象，返回dom对象本身。本质是将dom对象样式display设置为none，使用体验类似jQuery的$.hide方法。DOM.hide支持nodeList对象  

4.function DOM.show()  
* note:调用DOM.css显示dom对象，返回dom对象本身。本质是将dom对象样式display还原为原属性值，使用体验类似jQuery的$.show方法。DOM.show支持nodeList对象  

5.function DOM.insert(dom, position)  
* parameter0 dom:选择器字符串、dom对象或多个dom对象组成的Array数组  
* parameter1 position:插入位置，默认值end  
* note:返回值为dom节点本身。position为start时，插入到DOM父节点开头；position为end时，插入到DOM父节点结尾；position为before时，插入到dom节点前面；position为after时，插入到dom节点后面。本质是对insertBefore、append的二次封装  

6.function DOM.replace(dom)  
* parameter dom:选择器字符串、dom对象或多个dom对象组成的Array数组  
* note:返回值为新dom节点。本质是调用DOM.insert后将原dom节点remove

## 其他方法

1.function $ele(dom, dom2)  
* parameter0 dom:需要创建的dom对象的html字符串或者选择器字符串  
* parameter1 dom2:选择器模式时生效，选择器的父节点，默认值document  
* note:本质是对createElement、querySelectorAll的二次封装，使用体验类似jQuery的$()方法  

2.function $eleFn(dom, dom2)  
* parameter0 dom:选择器字符串  
* parameter1 dom2:选择器的父节点，默认值document  
* note:返回一组方法，用于对需要选择的dom对象进行监控，具体用法见$eleFn.listen和$eleFn.ready部分  

(1) function $eleFn.listen(callback, interval)  
* parameter0 callback:对dom对象监控时循环执行的回调方法  
* parameter1 interval:dom对象的监控时间间隔，默认值500  
* note:返回定时器ID。本质是调用setInterval不断执行$ele方法检测dom对象是否存在  

(2) function $eleFn.ready(callback, interval)  
* parameter0 callback:dom对象检测到存在时的回调方法  
* parameter1 timeout:dom对象检测存在的超时时长  
* note:返回定时器ID。本质是调用$eleFn.listen检测对象是否存在，setTimeout控制超时时长
