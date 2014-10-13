/*
* Timeline of development
* Copyright (c) 2014 Ryu Yamashita
* MIT License
*/

(function () {
 
    "use strict";

    function generateTL(elementId){
 
        var date = [];

        var titles = getViewColumnValues('Headline (title)');
        var tags = getViewColumnValues('Tag');
        var starts = getViewColumnValues('Start date');
        var ends = getViewColumnValues('End date');
        var urls = getViewColumnValues('Media URL');

        for (var i = 0; i < titles.length; i++) {
            var obj = {
                startDate: (function(){
                    var startDate = starts[i];
                    return startDate.toString().split("-").join(",");
                })(),
                endDate: (function(){
                    var endDate = ends[i];
                    return endDate.toString().split("-").join(",");
                })(),
                headline: titles[i],
                text: '',
                tag: tags[i],
                classname: '',
                asset: {
                    media: urls[i],
                    thumbnail: '',
                    credit: '',
                    caption: ''
                }
            }
            date.push(obj);
        } // for i
        
        var data = {
            timeline: {
                headline: 'Timeline',
                type: 'default',
                text: 'powered by kViewer',
                asset: {
                    media: urls[0],
                    credit: '',
                    caption: ''
                },
                date: date
            }
        };

        createStoryJS({
            type: 'timeline',
            width: 'auto',
            height: 'auto',
            source: data,
            embed_id: elementId
        });

        return;
    }

    loadJS('https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
    loadJS('https://s3.amazonaws.com/cdn.knightlab.com/libs/timeline/latest/js/timeline-min.js');
    loadJS('https://s3.amazonaws.com/cdn.knightlab.com/libs/timeline/latest/js/storyjs-embed.js');
    loadCSS('https://s3.amazonaws.com/cdn.knightlab.com/libs/timeline/latest/css/timeline.css');
 
    window.addEventListener("DOMContentLoaded", function() {
        (function waitForjQueryLoad() {
            if((typeof jQuery !== 'undefined')&&(typeof createStoryJS !== 'undefined')) {
                var elTable = document.getElementsByClassName('table1')[0];
                var elIndexView = document.getElementsByClassName('index-view')[0];
                var header = document.createElement('div');
                header.setAttribute('id', 'kview-header');
                header.setAttribute('name', 'kview-header');
                elIndexView.insertBefore(header, elTable);
                kviewIndex();
            } else {
                setTimeout(waitForjQueryLoad, 0);
            }
        })();
    }, false);
    
    function kviewIndex(){
        var elSpace = document.getElementById('kview-header');
        var elTimeLine = document.createElement('div');
        elTimeLine.style.width = '100%';
        elTimeLine.style.height = window.innerHeight*0.85 + 'px';
        elTimeLine.style.marginRight = '26px';
        elTimeLine.style.border = 'solid 1px #ccc';
        elTimeLine.setAttribute('id', 'container' );
        elTimeLine.setAttribute('name', 'container' );
        elTimeLine.setAttribute('class', 'container' );
        elSpace.insertBefore(elTimeLine, elSpace.firstChild);

        generateTL('container');
        return;
    }

    // ======<<以下、オプション関数群>>======

    // 外部CSSの読み込み
    function loadCSS(href) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    // 外部JSの読み込み
    function loadJS(src){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // 要素中のテキストを取り出し
    function getElementText(element) {
        if(element){
            if (element.innerText !== undefined) {
                return element.innerText.replace(/\r?\n((?!\r?\n)|(?=\r?\n\r?\n\r?\n))/g,'').replace(/(^\s+)|(\s+$)/g, '');
            } else if (element.textContent !== undefined) {
                return element.textContent.replace(/\r?\n((?!\r?\n)|(?=\r?\n\r?\n\r?\n))/g,'').replace(/(^\s+)|(\s+$)/g, '');
            }
        }else{
            return '';
        }
    }

    // 一覧画面で列方向に要素取得    
    function getViewElements(fieldName){
        var elements = [];
        var elTables = document.getElementsByTagName('tr');
        for(var i=0; i<elTables[0].children.length; i++){
            if(getElementText(elTables[0].children[i]) === fieldName){
                for(var j=1; j<elTables.length; j++){
                    elements.push(elTables[j].children[i]);
                }
            }
        }
        return elements;
    }

    // 一覧画面で列方向にテキスト取得
    function getViewColumnValues(fieldName){
        var values = [];
        var elements = getViewElements(fieldName);
        for(var i=0; i<elements.length; i++){
            values.push(getElementText(elements[i]));
        }
        return values;
    }
  
})();