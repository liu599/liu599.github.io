// ==UserScript==
// @name       绯月表情增强插件2016
// @namespace  
// @version    1.1.1
// @description 简化版~>_<~KF论坛专用的回复表情/插图/颜文字插件, 在发帖时快速输入自定义表情和论坛BBCODE
// @icon        https://blog.nekohand.moe/archive/favicon.ico
// @homepage    https://greasyfork.org/zh-CN/scripts/17063-%E7%BB%AF%E6%9C%88%E8%A1%A8%E6%83%85%E5%A2%9E%E5%BC%BA%E6%8F%92%E4%BB%B62016
// @include     http://*gal.com/*
// @include     http://*9moe.com/*
// @include     http://*kfgal.com/*
// @match       https://sstmlt.net/*
// @match       http://www.mmy.moe/*
// @match       http://www.mddmm.com/*
// @include     https://*miaola.info/*
// @include     http://*miaola.info/*
// @copyright   2016, eddie32
// @license     MIT
// @run-at      document-end
// ==/UserScript==

/* 自定义内容*/

// 功能栏标题

var ItemTitleArray = new Array('0.kf',
                               '1.常用',
                               '2.颜',
                               '3.LL小',
                               '4.LL大',
                               '5.AC娘',
                               '6.百合');
// 链接ID, 对应, 100101开始的整数。
var loadTitleArray = [];
var ItemLength = ItemTitleArray.length;


var loadTitleArray = new Array(100101,
                               100102,
                               100103,
                               100104,
                               100105,
                               100106,
                               100107);
                              
//不显示的元素位置
var itemDoNotShow =[];
var user=getCookie("setup");
//alert(user);
var itemDoNotShow = new Array();
if (user != ""){
    // alert(user.split(','));
    itemDoNotShow = user.split(',');
   // alert(itemDoNotShow);
    if(itemDoNotShow.length>0){
        for(var j=0; j<itemDoNotShow.length;j++){
            ItemTitleArray[itemDoNotShow[j]] = undefined;
            loadTitleArray[itemDoNotShow[j]] = undefined;
        }
    }
}



var totalNum = ItemTitleArray.length; // 功能栏数量
var textareas, textarea;
var emptyContainer;
var startPos, endPos; // 当前光标位置定位


/************************** 内置表情 *******************/
// 1:kf自带
websithurl = window.location.href;
//console.log(websithurl.indexOf('2dgal')+1);
if(!(websithurl.indexOf('2dgal')+1)&&
   !(websithurl.indexOf('9moe')+1)&&
   !(websithurl.indexOf('kfgal')+1)&&
   !(websithurl.indexOf('ddgal')+1)&&
   !(websithurl.indexOf('miaola')+1)){
    //console.log(websithurl.indexOf('mmy')+1);
    imgpath = '1';
}

var KFSmileURL = [];
var KFSmileTitle = [];
var KFSmileCode  = [];
for(var j = 0; j < 48; j++) {
    KFSmileURL[j] = 'http://2dgal.com/'+imgpath+'/post/smile/em/em' +
        ((j)>=9?(j+1):('0'+(j+1))) + '.gif';
    KFSmileTitle[j] = '';
    KFSmileCode[j] = '[s:'+(j+10)+']';
}


// 2: 颜文字
var emotionArray = Array("(●・ 8 ・●)", 
                         "╰(๑◕ ▽ ◕๑)╯",
                         "(﹡ˆˆ﹡)",
                         "〜♪♪",
                         "(ﾟДﾟ≡ﾟДﾟ)",
                         "(＾o＾)ﾉ" ,
                         "(|||ﾟДﾟ)",
                         "(`ε´ )",
                         "(╬ﾟдﾟ)",
                         "(|||ﾟдﾟ)" ,
                         "(￣∇￣)",
                         "(￣3￣)",
                         "(￣ｰ￣)",
                         "(￣ . ￣)",
                         "(￣︿￣)",
                         "(￣︶￣)",
                         "(*´ω`*)", 
                         "(・ω・)",
                         "(⌒▽⌒)",
                         "(￣▽￣）",                    
                         " (=・ω・=)",
                         "(｀・ω・´)",
                         "(〜￣△￣)〜",
                         "(･∀･)",
                         "(°∀°)ﾉ",
                         "(￣3￣)",
                         "╮(￣▽￣)╭",		
                         "(&gt;_&gt;)",
                         "(;¬_¬)",
                         "(▔□▔)/",
                         "(ﾟДﾟ≡ﾟдﾟ)!?",
                         "Σ(ﾟдﾟ;)",
                         "Σ( ￣□￣||)",
                         "(´；ω；`)",
                         "（/TДT)/",
                         "ε=ε=(ノ≧∇≦)ノ",
                         "(´･_･`)",
                         "(-_-#)",
                         "（￣へ￣）",
                         "(￣ε(#￣) Σ",
                         "ヽ(`Д´)ﾉ",
                         "(╯°口°)╯(┴—┴",
                         "（#-_-)┯━┯",
                         "_(:3」∠)_",
                         "(笑)",
                         "(汗)",
                         "(泣)",
                         "(苦笑)",
                         "(´・ω・`)",
                         "(╯°□°）╯︵ ┻━┻",
                         "(╯‵□′)╯︵┻━┻",
                         "(´ρ`)",
                         "( ﾟωﾟ)",
                         "(oﾟωﾟo)", 
                         "(　^ω^)",
                         "(｡◕∀◕｡)",
                         "/( ◕‿‿◕ )\\",
                         "ε٩( º∀º )۶з",
                         "(￣ε(#￣)☆╰╮(￣▽￣///)",
                         "（●´3｀）~♪", 
                         "_(:з」∠)_",
                         "хорошо!",
                         "＼(^o^)／",   
                        "ε=ε=ε=┏(゜ロ゜;)┛",
                        "(；°ほ°)",
                        "もうこの国は駄目だぁ",
                        "焔に舞い上がるスパークよ、邪悪な異性交際に、天罰を与え！",
                        "お疲れ様でした");
// 3. lovelive专用小
var LoveliveSmalltargetURL = [];
var LoveliveSmalltargetTitle = [];
for(var j = 0; j < 41; j++) {
    LoveliveSmalltargetURL[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion02/Small/Lovelive2nd' +
        (j+1) + '.png';
    LoveliveSmalltargetTitle[j] = j+1;
}

for(var j = 0; j < 40; j++) {
    LoveliveSmalltargetURL[j+41] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/Small/Lovelive' +
        (j+1) + '.png';
     LoveliveSmalltargetTitle[j+41] = j+1;
}

// 4. lovelive专用大
var LoveliveBigtargetURL = [];
var LoveliveBigtargetTitle = [];
for(var j = 0; j < 41; j++) {
    LoveliveBigtargetURL[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion02/Big/Lovelive2nd' +
        (j+1) + '.png';
    LoveliveBigtargetTitle[j] = j+1;
}

for(var j = 0; j < 40; j++) {
    LoveliveBigtargetURL[j+41] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/Big/Lovelive' +
        (j+1) + '.png';
    LoveliveBigtargetTitle[j+41] = j+1;
}

// 5. 快捷输入功能
var functionEmotion = Array("[sell=1][/sell]","[quote][/quote]","[hide=1][/hide]","[code][/code]","[strike][/strike]",
                             "[fly][/fly]","[color=#00FF00][/color]","[b][/b]","[u][/u]","[i][/i]","[hr]", "[bgcolor=][/bgcolor]","[img][/img]",
                            "[img]http://data.nekohand.moe/StorageCenter/uploads/Pictures/blogAcc/smile.gif[/img]",
                            "[img]http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_org.gif[/img]",
                            "[img]http://nekohand.moe/spsmile/03Sora/RlN8rQO_47.gif[/img]"
                            );
var functionDescription = Array("出售贴sell=售价","引用", "隐藏hide=神秘等级","插入代码","删除线","跑马灯","文字颜色","粗体","下划线","斜体","水平线","背景色","插入图片","精神污染","新浪狗","鬼畜笑");

// 6. AC娘

var ACSmile3 = [];
var ACSmile3Title = [];
for(var j = 0; j < 50; j++) {
    ACSmile3[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/ACFUN/' +
        (j+1) + '.png';
    ACSmile3Title[j] = '';
}
var ACSmile2 = [];
var ACSmile2Title = [];
for(var j = 0; j < 10; j++) {
    ACSmile2[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/ACFUN/' +
        (j+51) + '.jpg';
    ACSmile2Title[j] = '';
}

//7. Akari 摇曳百合
var ACSmile1 = [];
var ACSmile1Title = [];
for(var j = 0; j < 20; j++) {
    ACSmile1[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/Dynamic/akari' +
        (j+1) + '.gif';
    ACSmile1Title[j] = '';
}

var AkariSmile1 = [];
var AkariSmile1Title = [];
for(var j = 0; j < 71; j++) {
    AkariSmile1[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/akari/akari' +
        (j+1) + '.png';
    AkariSmile1Title[j] = '';
}

// ACFUN new
var ACSmile4 = [];
var ACSmile4Title = [];
for(var j = 0; j < 50; j++) {
    ACSmile4[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/ACFUN/New/' +
        (j+1) + '.png';
    ACSmile4Title[j] = '';
}
var ACSmile5 = [];
var ACSmile5Title = [];
for(var j = 0; j < 40; j++) {
    ACSmile5[j] = 'http://smile.nekohand.moe/blogAcc/LoveliveEmotion01/EmCol/ACFUN/Niming/' +
        ((j)>=9?(j+1):('0'+(j+1))) + '.gif';
    ACSmile5Title[j] = '';
}

var kfaux = [];

for(var j = 0; j < 19; j++) {
    kfaux[j] = 'http://ss.nekohand.moe/Asource/EmotionPic/KFEM (' +
      (j+1) + ').gif';
}



var w6 = [];

for(var j = 0; j < 43; j++) {
    w6[j] = 'http://nekohand.moe/spsmile/01Sora/0xx' +
         (j+2) + '.png';
}






function loadingHandler(loadindex, target){
    
    switch (loadindex) {
        case 1: // 1:苍雪自带
            userInputImg(target, kfaux, kfaux, '', returnImg, 30, 30);
            userInputImg(target, KFSmileURL,KFSmileCode, KFSmileTitle, returnPlainText, 30, 30);
            userInputPlainText(target,  functionEmotion, functionDescription,returnPlainText);
            break;
        case 3:   // 2: 颜文字
            userInputPlainText(target,emotionArray, emotionArray, returnPlainText);
            break;
        case 4: // Lovelive大法好Small
            userInputImg(target, LoveliveSmalltargetURL, LoveliveSmalltargetURL, LoveliveSmalltargetTitle, returnImg, 90, 90);
            break;
        case 5: // Lovelive大法好Big
            userInputImg(target, LoveliveSmalltargetURL, LoveliveBigtargetURL, LoveliveBigtargetTitle, returnImg, 90, 90);
            break;
        case 6:
            userInputImg(target, ACSmile4, ACSmile4, ACSmile4Title, returnImg, 60, 60);
            userInputImg(target, ACSmile5, ACSmile5, ACSmile5Title, returnImg, 60, 60);
            break;
        case 7:
            userInputImg(target, ACSmile2, ACSmile2, ACSmile2Title, returnImg, 50, 50);
            userInputImg(target, ACSmile1, ACSmile1, ACSmile1Title, returnImg, 50, 50);
            break;
        case 2:
            userInputImg(target, w6, w6, '', returnImg, 100, 100);
            break;

     // 这个函数直接用就好了, 第1个参数不变, 第二第三个参数是地址的数组名, 第四个是Title的数组名, 后面3个是方法, 大小

   // case: 编号     
/*
         case xx:
            在这里添加 
            break;
*/            
//    
        default:
            emptyContainer.innerHTML = '<b style="color:orange">空白表情容器</b>';
            return;
    }
    
}
/* 自定义内容到此结束 */
/*------------------------------------*/






// 用户操作函数
function userInputPlainText(target, textBox,titleBox, func){
   var textlength = textBox.length;
    for (var j=0;j<textlength; j++){
        var newElementEx = document.createElement('a'); 
        var imgaa = document.createElement('img');
        imgaa.style.margin = "4px";
        newElementEx.onclick = func;
        newElementEx._target = textarea;
        newElementEx.style.cursor = 'pointer';
        imgaa.alt = titleBox[j];
        imgaa.useMap = textBox[j];
        target.appendChild(newElementEx);
        newElementEx.appendChild(imgaa);
   }
   target.parentNode.insertAfter(document.createElement('br'));
}

function userInputImg(target,thumbURL, targetURL, targetTitle, func, ImgWidth, ImgHeight){
    var emotionlength = targetURL.length;
    for (var i = 0; i<emotionlength; i++)
    {
        target.appendChild(
                    createButton(
                        textarea,     //对象
                        func,   //方法
                        targetTitle[i],   //提示文字
                        ImgWidth, // 缩略图宽
                        ImgHeight, //缩略图高
                        targetURL[i],thumbURL[i])); // 贴图地址和缩略图地址
    }

}


// 返回纯文本

function insertText(selector, text) {
    var target = document.querySelector(selector);
    var startPos = target.selectionStart;
    //var endPos = target.selectionEnd;
    var value = target.value;
    target.value = value.slice(0, startPos) + text + value.slice(startPos);
}


function returnPlainText(event) {
    var link, textarea, s, selectedTarget;
    link = event.currentTarget;
    textarea = link._target;
    selectedTarget = event.target;
    insertText("textarea", selectedTarget.useMap);
    // 定位光标
//    alert(startPos);
//    if(typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number'){
//        textarea.value = textarea.value.substring(0,startPos) + selectedTarget.innerHTML + textarea.value.substring(endPos, textarea.value.length);
//    }else{
//        textarea.value +=selectedTarget.useMap;
//    }
    event.preventDefault();
}

// 返回Wincode代码
function returnImg(event) {
    var link, textarea, s, selectedTarget;
    link = event.currentTarget;
    textarea = link._target;
    selectedTarget = event.target;
//    textarea.value += '[img]'+selectedTarget.useMap+'[/img]';
    var inserttext = '[img]'+selectedTarget.useMap+'[/img]';
    insertText("textarea", inserttext);
    event.preventDefault();
}

// ImgButton
function createButton(target, func, title, width, height, src, smallsrc) {
    // target: 控制对象
    // func:     方法
    // title:   提示文字
    // width,height  外观
    // src:  路径
    var img, button;
    img = document.createElement('img');
    img.width = width;
    img.height = height;
    img.style.borderTop = img.style.borderLeft = "1px solid #ccc";
    img.style.borderRight = img.style.borderBottom = "1px solid #888";
    img.style.marginRight = "2px";
    img.src = smallsrc;
    img.useMap = src;
    button = document.createElement('a');
    button._target = target;
    button.title = title;
    button.href = '#';
    button.onclick = func;
    button.style.cursor="pointer";
    button.appendChild(img);
    button.style.borderBottom = '1px solid';
    return button;       
}



// 清空容器用函数
function closeHandler(event){
    var deletTarget = document.getElementById('emotioncontainer9999');
    deletTarget.parentNode.removeChild(deletTarget);
    emptyContainer = document.createElement('div');
    emptyContainer.id = 'emotioncontainer9999';
    textarea.parentNode.insertBefore(emptyContainer, textarea);
}
function closeSetupHandler(event){
    var deletTarget = document.getElementById('setup');
    deletTarget.parentNode.removeChild(deletTarget);
}
function reSetupHandler(event){
    var deletTarget = document.getElementById('setup');
    deletTarget.parentNode.removeChild(deletTarget);
    user = prompt("请输入不想使用的表情组, 从0开始以逗号分隔, 如0,1,2,3, 可以留空表示全部显示","");
    setCookie("setup", user, 30);
    //alert(document.location.href);
   
}



//展开动作
function extendHandler(event){
    var newElement2,link,selectedTarget;
    
    /*清空当前容器*/
    closeHandler();
    
    newElement2 = document.createElement('div');
    newElement2.style.border = '1px solid #9999FF';
    //newElement2.innerHTML = '&nbsp;&nbsp;';
    newElement2.style.background = '#FCFCFC';
    newElement2.style.paddingLeft = '4px';
    newElement2.style.height = '200px';
    newElement2.style.width = textarea.style.width;
    newElement2.style.overflow = 'auto';
 //   newElement2.style.position = 'fixed';
   // newElement2.style.top = '0';
   // newElement2.style.left = '5px';
    emptyContainer.appendChild(newElement2);
    
    
    /*表情载入*/
    selectedTarget = event.target;
    var loadIndex = selectedTarget.id - '100100';
    //    alert(loadIndex);
    loadingHandler(loadIndex,newElement2);
    
    event.preventDefault();
}

//生成栏目
function createMenuItem(target,func,title, loadTitle){
    var newElement;
    newElement = document.createElement('a');
    newElement.style.height = '40px';
    newElement.style.width = '100px';
    newElement.innerHTML = '  [' +title+ ']'+'&nbsp;';
    newElement.onclick = func;
    newElement.style.cursor = 'pointer';
    newElement.id = loadTitle;
    if(title!==undefined){
    target.appendChild(newElement);
    }
}
function setupHandler(){
            /*------------------------------------*/
    var user=getCookie("setup");
    if (document.getElementById('setup')){return;}
    if (user != "") {
    newElement = document.createElement('div');
    newElement.id = 'setup';
    newElement.style.left = '43%';
    newElement.style.bottom = '100px';
    newElement.style.width = '400px';
    newElement.style.height = '50px';
    newElement.style.border = '3px solid deeppink';
    newElement.style.padding = '5px 5px';
   
    newElement.style.background = '#eee';
    newElement.innerHTML = ' ';
    document.body.appendChild(newElement);
    document.getElementById('setup').style.position = 'fixed';
    /*
    var submitform = document.createElement('fieldset');
    submitform.id = 'formsetup';
    submitform.style.margin = "10px 10px";
    submitform.innerHTML =' <legend>勾选启用的表情组</legend>';
    document.getElementById('setup').appendChild(submitform);
    for(j=0;j<ItemTitleArray.length;j++)
    {
        var checkBoxItem = document.createElement('input');
        checkBoxItem.type = 'checkbox';
        checkBoxItem.name = ItemTitleArray[j];
        checkBoxItem.value = loadTitleArray[j];
        document.getElementById('formsetup').appendChild(checkBoxItem);
        var descriptionWord = document.createElement('b');
        descriptionWord.innerHTML = ItemTitleArray[j]+'  ';
        document.getElementById('formsetup').appendChild(descriptionWord);
    }*/
    var cookienow = document.createElement('b');
    cookienow.innerHTML = user + '<br>';    
    document.getElementById('setup').appendChild(cookienow);
    var additionalInfo = document.createElement('button');
    additionalInfo.type = 'submit';
    additionalInfo.name = 'setup';
    additionalInfo.innerHTML = ' 保存并关闭 ';
    additionalInfo.onclick = closeSetupHandler;
    additionalInfo.style.cursor = 'pointer';
    document.getElementById('setup').appendChild(additionalInfo);
        
    var additionalInfo2 = document.createElement('button');
    additionalInfo2.type = 'submit';
    additionalInfo2.name = 'setup';
    additionalInfo2.innerHTML = ' 重新设定 ';
    additionalInfo2.onclick = reSetupHandler;
    additionalInfo2.style.cursor = 'pointer';
    document.getElementById('setup').appendChild(additionalInfo2);
/*    
     var additionalInfo = document.createElement('button');
    additionalInfo.type = 'submit';
    additionalInfo.name = 'setup';
    additionalInfo.value = ' 确定 ';
    additionalInfo.onclick = closeSetupHandler;
    additionalInfo.style.cursor = 'pointer';
    document.getElementById('formsetup').appendChild(additionalInfo);
    
     var additionalInfo = document.createElement('button');
    additionalInfo.type = 'submit';
    additionalInfo.name = 'setup';
    additionalInfo.value = ' 默认值 ';
    additionalInfo.onclick = closeSetupHandler;
    additionalInfo.style.cursor = 'pointer';
    document.getElementById('formsetup').appendChild(additionalInfo);
    */
        //alert("Welcome again " + user);
    } else {
       user = prompt("请输入不想使用的表情组, 从0开始以逗号分隔, 如0,1,2,3, 可以留空表示全部显示","");
       if (user != "" && user != null) {
           setCookie("setup", user, 30);
       }
    }
    
}
// 生成项目
function createMenuElement(target, listNumber){
    var newElement;
    newElement = document.createElement('div');
    newElement.style.border = '1px solid #9999FF';
    newElement.id='itemlist';
    newElement.align = 'left';
    newElement.style.paddingLeft = '4px';
    newElement.innerHTML = ' <b style="color:gold">⑨_⑨ </b> ';
    newElement.style.background = '#FCFCFC';
    newElement.style.height = '44px';
    newElement.style.width = '100%' ;
    //document.getElementById('itemlist').style.position = 'relative';
    target.parentNode.insertBefore(newElement, target);
    
    for (var i = 0; i < listNumber; i++) {
        createMenuItem(newElement,extendHandler,ItemTitleArray[i],loadTitleArray[i]);
    }
    
     var brElement = document.createElement('br');

    
    
    var additionalInfo = document.createElement('a');
    additionalInfo.innerHTML = ' <b style="color:red"> [隐藏] </b> ';
    additionalInfo.onclick = closeHandler;
    additionalInfo.style.cursor = 'pointer';
    newElement.appendChild(additionalInfo);
    //newElement.appendChild(brElement);
    var additionalInfo3 = document.createElement('a');
    additionalInfo3.innerHTML = '<b style="color:deeppink;z-index:1001;"> [禁用表情] </b>';
    additionalInfo3.onclick = setupHandler;
    additionalInfo3.style.cursor = 'pointer';
    newElement.appendChild(additionalInfo3);
    
//    var additionalInfo2 = document.createElement('b');
//    additionalInfo2.innerHTML = ' <a style="color:deeppink;text-align:right;" href="http://blog.nekohand.moe/" target="_blank"> eddie32 </a> ';
//    newElement.appendChild(additionalInfo2);
   
   
}

// 设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
     history.go(0);
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}






var KFOL = {
    init: function(){

textareas = document.getElementsByTagName('textarea');
if (!textareas.length) { return; }
        textarea = textareas[0];
        emptyContainer = document.createElement('div');
        emptyContainer.id = 'emotioncontainer9999';
        createMenuElement(textarea, totalNum); 
        textarea.parentNode.insertBefore(emptyContainer, textarea);
    }
}
KFOL.init();
