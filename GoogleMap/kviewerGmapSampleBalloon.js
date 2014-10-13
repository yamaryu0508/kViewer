(function () {

    "use strict";
    
    loadJS('https://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js');
    loadJS('https://maps-api-ssl.google.com/maps/api/js?v=3&sensor=false');
    
    // ページとJSライブラリ群の読み込み待ち
    window.addEventListener("DOMContentLoaded", function() {
        (function waitForLibsLoad() {
            if((typeof jQuery !== 'undefined')&&(typeof google !== 'undefined')
                && (typeof google.maps !== 'undefined')
                && (typeof google.maps.version !== 'undefined')
                && (typeof google.maps.InfoWindow !== 'undefined')) {
                if( !document.URL.match(/show/) ){
                    // 一覧画面へのカスタマイズ
                    var elTable = document.getElementsByClassName('table1')[0];
                    var elIndexView = document.getElementsByClassName('index-view')[0];
                    var header = document.createElement('div');
                    header.setAttribute('id', 'kview-header');
                    header.setAttribute('name', 'kview-header');
                    elIndexView.insertBefore(header, elTable);
                    kviewIndex();
                } else {
                    // 詳細画面へのカスタマイズ
                }
            } else {
                setTimeout(waitForLibsLoad, 0);
            }
        })();
    }, false);
    
    // 一覧画面のメイン関数
    function kviewIndex(){
        var elHeader = document.getElementById('kview-header');
        
        var elMap = document.createElement('div');
        elMap.setAttribute('id', 'map');
        elMap.setAttribute('name', 'map');
        elMap.setAttribute('style', 'width: auto; height: 300px; margin-bottom: 5px; border: solid 2px #c4b097');
        elHeader.insertBefore(elMap, elHeader.firstChild);

        var lat = getViewColumnValues('イベント会場の住所（緯度）');
        var lng = getViewColumnValues('イベント会場の住所（経度）');

        // ポイントを先に作成
        var latlng = 0;
        for (var i=0; i < lat.length ; i+=1){
            if (isNaN(lat[i]) === false && isNaN(lng[i]) === false){
                latlng = new google.maps.LatLng(lat[i],lng[i]);
                break;
            }
        }

        // Google Mapに表示する地図の設定
        var opts = {
            zoom: 12,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true,
            title: 'target'
        };

        // 地図の要素を定義
        var map = new google.maps.Map(document.getElementById('map'), opts);

        // マーカーを設定
        // マーカーデータを格納
        var infowindow = new google.maps.InfoWindow();
 
        for (i=0; i < lat.length ; i+=1){
            if (isNaN(lat[i]) === false && isNaN(lng[i]) === false){
                var m_latlng = new google.maps.LatLng(lat[i],lng[i]);
                var marker = new google.maps.Marker({
                    position: m_latlng,
                    map: map,
                    icon: 'https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=edge_bc|' + (i+1) + '|FF8060|000000'
                });
                google.maps.event.addListener( marker, 'click', (function( marker, i) {
                    return function() {
                        infowindow.setContent( '<b>' + getViewColumnValues('タイトル')[i] + '</b>');
                        infowindow.open( map, marker);
                    }
                })( marker, i));
            } // if 
        } // for
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

    // Google APIsの読み込み対策
    var nativeWrite = document.write;
    document.write = function(html) {
        var m = html.match(/script.+src="([^"]+)"/);
        if(m){
            loadJS(m[1]);
        } else {
            nativeWrite(html);
        } 
    };
    
})();
