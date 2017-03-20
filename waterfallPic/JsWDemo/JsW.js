/**
 * Created by KyleSaMa on 2016/8/16.
 */
window.onload = function() {
    imgLocation("container", "boxes");
    window.onscroll = function () {
        if (checkFlag()) {
            var cparent = document.getElementById("container");
            var imgNum = 50;//需要加载图片数目
            for(var i = 0;i < imgNum;i++){
                var ccontent = document.createElement("div");
                ccontent.className = "boxes";
                cparent.appendChild(ccontent);
                var bimg = document.createElement("div");
                bimg.className = "b_img";
                ccontent.appendChild(bimg);
                var img = document.createElement("img");
                img.src = "img/"+ (i+50) + ".jpg"; //从第50张开始
                bimg.appendChild(img);
            }
            imgLocation("container", "boxes");
        }
    }
}


function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"boxes");
    var lastContentFromTop = ccontent[ccontent.length - 1].offsetTop;
    var scorllTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;

    if(lastContentFromTop < scorllTop + pageHeight){
        return true;
    }
}
function imgLocation(parent,content){
    //将parent(id)下所有content取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    var imgWidth = ccontent[0].offsetWidth;//图片宽度
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);//每行的图片张数
    cparent.style.cssText = "width:"+imgWidth * cols+"px; margin:0 auto";

    var BoxHeightArr = [];
    for(var i = 0;i<ccontent.length;i++){
        if(i<cols){
            BoxHeightArr[i] = ccontent[i].offsetHeight;
        }
        else{
            var minHeight = Math.min.apply(null,BoxHeightArr);
            var minIndex = getMinHeightLoc(BoxHeightArr,minHeight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }

    }
}

function getMinHeightLoc(array,min){
    //返回array数组里的min（最小值）所在位置
    for(var x in array){
        if(array[x] == min){
            return x;
        }
    }

}
function getChildElement(parent,content){
   //把parent里的content元素(class)内容取出返回
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for(var i = 0;i<allContent.length;i++){
        if(allContent[i].className == content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}