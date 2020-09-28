
$(function () {
    let itemGroupEle = $('<div></div>');
    itemGroupEle.attr("class", "item-group")
    // $(".context").append(itemGroupEle)
    $(document.body).append(itemGroupEle);
    $.ajax({
        // url: "http://it.3n5zsnwz.com/list.json",    //请求的网址
        url: "http://it.warmtel.com/api/song/list?pageNo=1&pageSize=10",    //请求的网址
        type: "get",    //请求的方式 get|post
        data: "",       //发送的数据
        dataType: "json",   //返回数据的类型    json | html,text |jsonp
        success: function (resultData) {    //resultData为请求返回的数据
            console.log("resultData>>>", resultData);
            let arry = resultData.resultInfo.list;     //获取json对象中song数组
            //遍历arry数组
            for (const element of arry) {
                //动态去添加标签div等
                let imgEle = $(' <img src="" alt="">');
                $(imgEle).attr("src", element.picture);     //img标签接收图片
                let imgDivEle = $('<div></div>');
                imgDivEle.attr("class", "images");
                imgDivEle.append(imgEle);

                let h3Ele = $('<h3>歌名:</h3>');
                $(h3Ele).html(element.title);   //h3标签接收歌名
                let pEle = $(' <p>歌手：</p>');
                $(pEle).html(element.artist);   //p标签接收歌手名
                let iEle = $("<i></i>");
                $(iEle).attr("class", "fa fa-play-circle");
                $(iEle).attr("url", element.url);   //i标签手动设置url属性接收url地址
                $(iEle).attr("sid", element.sid);   //i标签手动设置sid属性接收sid
                let textEle = $("<div></div>");
                textEle.attr("class", "text");
                textEle.append(h3Ele);
                textEle.append(pEle);

                let itemEle = $('<div></div>');
                itemEle.attr("class", "item");
                itemEle.append(imgDivEle);
                itemEle.append(textEle);
                itemEle.append(iEle);

                itemGroupEle.append(itemEle);
            }
        }
    });


    //控制音乐播放和关闭
    let isPlayer = false;
    //定义全局变量musicID；
    let musicID = "";
    //初始化audio
    let audio = new Audio;

    //点击每一个i标签时的点击事件，把点击事件委托给.item-group最大的父亲div
    //这里的event获取当前点击的事件对象
    $(".item-group").on("click", function (event) {
        const ev = event || window.event;
        const target = ev.target || event.srcElement;

        // 判断是不是i标签。是i标签的话才执行以下代码，只有点击了i标签才能执行下面的代码
        if (target.nodeName.toLowerCase() == "i") {
            let musicurl = $(target).attr("url");
            let musicSid = $(target).attr("sid");
            /**
             * 第一次判断歌曲的sid（musicSid）时候为"",不是的话就会加载播放当前sid（musicSid）的歌曲，并把sid（musicSid）赋值给musicID
             * 第二次判断歌曲的sid（musicSid）时候等与musicID的值，不是的话将暂停正在播放的歌曲，并重新加载新的sid（musicSid）的歌曲
             * 判断当sid（musicSid） ==  musicID的时候，就会执行当前歌曲的暂停或播放的事件
             * 
             * 这里的只创建一个audio对象，无论执行哪一首歌曲的播放，都会先暂停掉上一首歌的音乐
             */
            if (musicID != musicSid) {
                onPause();      //暂停当前正在播放的歌曲
                onload(musicurl);   //加载新的sid的歌曲
                $(".fa-pause-circle").removeClass("fa-pause-circle").addClass("fa-play-circle");    //将icon图标为播放状态的按钮换成暂停状态的按钮
                onPlay();   //播放新的sid的歌曲
                musicID = musicSid; //将新的sid赋值给全局变量musicID
            } else {
                isPlayPause();
            }
            onPlayAndPauseIcon(target);
        }
    })

    //音乐加载
    function onload(musicurl) {
        audio.src = musicurl;
        audio.load();
    }
    //播放暂停
    function isPlayPause() {
        if (isPlayer == false) {
            onPlay();
        } else {
            onPause();
        }
    }
    //播放
    function onPlay() {
        audio.play();
        isPlayer = true;
    }
    //暂停
    function onPause() {
        audio.pause();
        isPlayer = false;
    }
    //切换播放和暂停图标
    function onPlayAndPauseIcon(target) {
        if (isPlayer == false) {
            $(target).attr("class", "fa fa-play-circle");
        } else {
            $(target).attr("class", "fa fa-pause-circle");
        }
    }

})










