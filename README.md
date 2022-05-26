## js-domExtend
<table>
  <tr>
    <td>作者 ( author )</td>
    <td>tutu辣么可爱(greasyfork)<br>IcedWatermelonJuice(github)</td>
  </tr>
  <tr>
    <td>描述 ( description )</td>
    <td>轻量级原生js增强插件<br>将部分原生dom对象方法模仿jQuery进行二次封装，便于使用</td>
  </tr>
  <tr>
    <td>最后更新时间 ( day )</td>
    <td>2022.5.27 GMT+0800 (中国标准时间)</td>
  </tr>
  <tr>
    <td>最新版本 ( version )</td>
    <td>1.6</td>
  </tr>
  <tr>
    <td>开源许可 ( license )</td>
    <td>MIT</td>
  </tr>
 </table>

## 参考DEMO


```javascript
$domExtendJS();//初始化dom对象方法，全局只需且必须使用一次
var demo=$ele("#demo");//获取dom对象，此时等价于document.querySelector("#demo")
demo.attr("demo-data","demo-attr");//设置dom对象属性
var demoList=$ele(".demo")//获取nodeList对象，此时等价于document.querySelectorAll(".demo")
demoList.eleText("demo-eleText");//改变nodeList对象里每一个dom对象的文本内容
```


## DOM对象方法 

1.function DOM.attr(key, val)  
* parameter0 key:dom对象属性名  
* parameter1 val:dom对象属性值  
* return:对应属性名的值或者原dom对象本身  
* note:没有val则返回对应属性名的值；有val则进行属性设置，返回dom对象本身，支持nodeList对象。本质是对getAttribute、setAttribute、removeAttribute的二次封装，使用体验类似jQuery的$.attr方法 

2.function DOM.css(key, val)  
* parameter0 key:dom对象css样式属性名  
* parameter1 val:dom对象css样式属性值  
* return:对应属性名的值或者原dom对象本身  
* note:没有val则返回对应属性名的值；有val则进行属性设置，返回dom对象本身，支持nodeList对象。本质是对getComputedStyle、DOM.style.setProperty的二次封装，使用体验类似jQuery的$.css方法  

3.function DOM.hide()  
* return:原dom对象本身  
* note:调用DOM.css隐藏dom对象，支持nodeList对象。本质是将dom对象样式display设置为none，使用体验类似jQuery的$.hide方法  

4.function DOM.show()  
* return:原dom对象本身  
* note:调用DOM.css显示dom对象，支持nodeList对象。本质是将dom对象样式display还原为原属性值，使用体验类似jQuery的$.show方法  

5.function DOM.insert(dom, position, reNew)  
* parameter0 dom:选择器字符串、dom对象或多个dom对象组成的Array数组  
* parameter1 position:插入位置，默认值end  
* parameter2 reNew:返回值类型。布尔型可选参数，默认值false。true表示返回插入的dom对象、nodeList对象或dom对象构成的Array数组;  false表示返回原dom对象本身  
* return:原dom对象本身、插入的新dom对象、新nodeList对象或新dom对象构成的Array数组  
* note:position为start时，插入到父节点（原dom对象）开头；position为end时，插入到父节点（原dom对象）结尾；position为before时，插入到dom节点（原dom对象）前面；position为after时，插入到dom节点（原dom对象）后面。本质是对insertBefore、append的二次封装  

6.function DOM.replace(dom)  
* parameter dom:选择器字符串、dom对象或多个dom对象组成的Array数组  
* return:插入的dom对象、nodeList对象或插入的dom对象构成的Array数组
* note:本质是调用DOM.insert后将原dom节点remove

7.function DOM.findNode(nodeName)  
* parameter nodeName:node节点名  
* return:dom对象或dom/node对象组成的Array数组  
* note:支持nodeList对象。本质是通过循环遍历判断dom节点的nodeName  

8.function DOM.eleText(val, remainDom)  
* parameter0 val:需要更改的文本字符串  
* parameter1 remainDom:是否保留原有的dom结构。布尔型可选参数，默认值false。true表示更改text时不影响原有的dom结构;  false表示更改text时会影响原有的dom结构  
* return:原dom对象、nodeList对象或其文本字符串  
* note:支持nodeList对象。当val不为字符串时，调用innerText返回文本字符串；当val为字符串时，若remainDom为false，直接调用innerText更改文本，remainDom为true时通过DOM.findNode寻找#text文本节点，仅对文本节点进行更改。remainDom为false时，使用体验类似jQuery的$.text方法  

9.function DOM.eleHTML(val)  
* parameter0 val:需要更改的html字符串  
* return:原dom对象、nodeList对象或其html字符串  
* note:支持nodeList对象。当val不为字符串时，调用innerHTML返回html字符串；当val为字符串时，直接调用innerHTML更改html，使用体验类似jQuery的$.html方法  

10.function DOM.eleVal(val)  
* parameter0 val:需要更改的dom对象的value值  
* return:原dom对象或其value值  
* note:当val不为字符串时，返回value；当val为字符串时，更改value值，使用体验类似jQuery的$.val方法 

## 其他方法

1.function $ele(dom, dom2)  
* parameter0 dom:需要创建的dom对象的html字符串或者选择器字符串  
* parameter1 dom2:选择器模式时生效，选择器的父节点，默认值document  
* return:dom对象或nodeList对象  
* note:本质是对createElement、querySelectorAll的二次封装，使用体验类似jQuery的$()方法  

2.function $eleFn(dom, dom2)  
* parameter0 dom:选择器字符串  
* parameter1 dom2:选择器的父节点，默认值document  
* return:一组方法  
* note:选择dom对象并执行一些特殊方法。具体用法见$eleFn.listen和$eleFn.ready部分  

(1) function $eleFn.listen(callback, interval)  
* parameter0 callback:对dom对象监控时，循环执行的回调方法  
* parameter1 interval:dom对象的监控时间间隔，默认值500  
* return:定时器ID  
* 本质是调用setInterval不断执行$ele方法检测dom对象是否存在  

(2) function $eleFn.ready(callback, interval)  
* parameter0 callback:dom对象检测到存在时的回调方法  
* parameter1 timeout:dom对象存在性检测的超时时长  
* return:定时器ID  
* note:本质是调用$eleFn.listen检测对象是否存在，setTimeout控制超时时长

3.function $domExtendJS()
* note:初始化dom对象方法，防止在油猴脚本中调用时出现错误
