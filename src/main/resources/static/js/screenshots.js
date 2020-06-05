  /**
   * v 1.2.0
   * by小王
   * 博客 http://www.wdhhh.cn
   */
  /**-----------可传入参数---------**/
  let contrast; //截图框宽高比
  let controlPointSize; //控制点大小
  let themeColor; //截图框和按钮的背景颜色
  let btnText; //确认截图按钮文字
  let textColor; //按钮文字颜色
  /**-----------可传入参数---------**/

  /**----------定义参数----------**/
  let params = { //拖拽拉伸所需参数
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    currentX: 0,
    currentY: 0,
    flag: false,
    kind: "drag"
  };
  let isMobile = "ontouchstart" in window; //是否pc端
  let windowWidth = window.innerWidth; //获取窗口大小
  let windowHeight = window.innerHeight;
  let originWidth; // 图片原始宽度
  let originHeight; // 图片原始高度
  let scale = 1; // 图片宽度缩放比例（当前绘图后/原始）
  /**----------定义参数----------**/

  /**----------------定义初始组件变量----------**/
  let container;
  let imgDiv; // 存放mycanvas
  let btnDiv;
  let confirmBtn; // 确认截图按钮
  let oRelDiv; // 截图框
  let myCanvas; //截图后的canvas
  let img; //存放加载的图片
  let fileInput; //存放文件上传控件
  let newImage = new Image(); //用于返回的img对象
  /**----------------定义初始组件变量----------**/


  /**--------------触发函数-------------------**/
  const uploadImg = (XbtnText = 'OK', XtextColor = "#fff", Xcontrast = 0, XcontrolPointSize = 20, XthemeColor = "#409EFF", callback) => {
    btnText = XbtnText;
    textColor = XtextColor
    contrast = Xcontrast; //接收截图框宽高比
    controlPointSize = XcontrolPointSize; //接收控制点大小
    themeColor = XthemeColor; //接收截图框颜色


    /**------------图片加载---------------**/
    img = new Image();
    img.src = '';
    img.setAttribute('id', 'img');
    img.onload = () => {
      originWidth = img.naturalWidth;
      originHeight = img.naturalHeight;
      //图片宽度大于窗口宽度
      if (originWidth > windowWidth) {
        //图片比例大于窗口比例(表示图片更宽)
        if (originWidth / originHeight > windowWidth / windowHeight) {
          originHeight = windowWidth * originHeight / originWidth
          originWidth = windowWidth;
        } else {
          originWidth = windowHeight * originWidth / originHeight
          originHeight = windowHeight;
        }
      } else if (originHeight > windowHeight) {
        originWidth = windowHeight * originWidth / originHeight
        originHeight = windowHeight;
      }
      //设置图片缩放比例
      scale = originWidth / img.naturalWidth;
      //调整定位
      imgDiv.style.left = (windowWidth - originWidth) / 2 + 'px';
      imgDiv.style.top = (windowHeight - originHeight) / 2 + 'px';


      //显示canvas
      imgDiv.style.display = ''
      imgDiv.appendChild(myCanvas);
      //设置canvas大小
      myCanvas.width = originWidth;
      myCanvas.height = originHeight;
      let ctx = myCanvas.getContext('2d');
      // 绘制图片
      ctx.drawImage(img, 0, 0, originWidth, originHeight);
      // 开启截图
      screenshotsed();
    };
    /**------------图片加载---------------**/

    /**------------图片选择-------------**/
    fileInput = document.createElement('input');
    fileInput.setAttribute('multiple', 'multiple');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('id', 'fileInput');
    /**------------图片选择-------------**/
    //选择完毕,监听文件选择控件
    fileInput.addEventListener('change', function () {
      /**----------创建初始组件和结点------------**/
      let bodyContainer;
      bodyContainer = document.createElement("div");
      bodyContainer.innerHTML = `
    <div id="container">
      <div id="btnDiv">
        <button id="confirmBtn">` + btnText + `</button>
      </div>
      <div id="imgDiv" style="display: none;"></div>
    </div>`;
      document.body.insertBefore(bodyContainer, document.body.lastElementChild);
      myCanvas = document.createElement('canvas');
      myCanvas.setAttribute('id', 'myCanvas');
      myCanvas.innerText = '您的浏览器不支持 HTML5 canvas 标签。';
      myCanvas.style.zIndex = 19990903;
      /**---------创建初始组件------------**/

      /**---------获取初始组件-----------**/
      container = document.getElementById('container');
      imgDiv = document.getElementById('imgDiv'); // 存放mycanvas
      btnDiv = document.getElementById('btnDiv');
      confirmBtn = document.getElementById('confirmBtn'); // 确认截图按钮
      oRelDiv = document.createElement("div"); // 截图框
      /**---------获取初始组件-----------**/

      /**-----------设置组件样式---------**/
      imgDiv.style.left = 224.5;
      imgDiv.style.top = 355.5;
      imgDiv.style.position = 'fixed';
      container.style.position = "fixed";
      container.style.top = 0;
      container.style.zIndex = 19990903;
      btnDiv.style.height = '30px';
      btnDiv.style.position = 'fixed';
      btnDiv.style.zIndex = 19990903;
      confirmBtn.style.background = themeColor
      confirmBtn.style.border = "none"
      confirmBtn.style.color = textColor
      confirmBtn.style.borderRadius = "2px"
      confirmBtn.style.padding = "4px"
      confirmBtn.style.position = "fixed"
      confirmBtn.style.bottom = '40px'
      confirmBtn.style.left = '50%'
      confirmBtn.style.zIndex = 199909039
      /**-------------设置样式---------**/
      /**----------确认截图-------------**/
      confirmBtn.addEventListener("click", () => {
        //进行确认截图后的操作
        cropImage();
        //删除结点
        container.parentElement.removeChild(container);
        //回调函数
        callback();
      });
      /**----------确认截图-------------**/
      img.src = getObjectURL(this.files[0]);
    });
    fileInput.click();
  };

  /**---------------------工具函数---------------------**/
  //获取文件url
  let getObjectURL = (file) => {
    let url = null;
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    }
    return url;
  };

  // 获取指定元素DOM
  const ID = (id) => {
    return document.getElementById(id);
  };

  //获取相关CSS属性方法
  let getCss = (o, key) => {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
  };
  /**---------------------工具函数---------------------**/



  /**----------------截图控件开启函数------------------**/
  const screenshotsed = () => {
    // 获取canvas中图片大小
    let iCurWidth = originWidth;
    let iCurHeight = originHeight;

    // 可调整截图框
    oRelDiv.innerHTML = '';
    oRelDiv.style.position = "absolute";
    oRelDiv.style.width = originWidth + "px";
    oRelDiv.style.height = originHeight + "px";
    oRelDiv.style.top = myCanvas.offsetTop + 'px';
    oRelDiv.id = "cropContainer";
    //计算截图框的初始高宽
    if (contrast) {
      //如果图片宽高比大于传入宽高比
      if (iCurWidth / iCurHeight >= contrast) {
        var iOrigHeight = iCurHeight;
        var iOrigWidth = iOrigHeight * contrast;
      } else {
        var iOrigWidth = iCurWidth;
        var iOrigHeight = iOrigWidth / contrast;
      }
    } else {
      var iOrigWidth = iCurWidth;
      var iOrigHeight = originHeight;
    }
    // 将oRelDiv插入到myCanvas前
    myCanvas.parentNode.insertBefore(oRelDiv, myCanvas);

    //初始化坐标与剪裁高宽
    let cropW = iOrigWidth; //截图框默认宽度
    let cropH = iOrigHeight; //截图框默认高度
    let posX = myCanvas.width / 2 - cropW / 2; // 截图框左上角x坐标
    let posY = myCanvas.height / 2 - cropH / 2; // 截图框左上角y坐标
    //设置截图框控件点
    oRelDiv.innerHTML = '<div id="zxxCropBox" style="height:' + cropH + 'px; width:' + cropW +
      'px; position:absolute; left:' +
      posX + 'px; top:' + posY + 'px; border:1px solid ' + themeColor + ';">' +
      '<div id="zxxDragBg" style="height:100%; background:#fff; opacity:0.1; filter:alpha(opacity=30); cursor:move"></div>' +
      '<div id="dragLeftTop" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px;border-radius:50%; background:' + themeColor + ';opacity:0.8;  overflow:hidden; left:-' + controlPointSize / 2 + 'px; top:-' + controlPointSize / 2 + 'px; cursor:nw-resize;"></div>' +
      '<div id="dragLeftBot" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px;border-radius:50%; background:' + themeColor + ';opacity:0.8;  overflow:hidden; left:-' + controlPointSize / 2 + 'px; bottom:-' + controlPointSize / 2 + 'px; cursor:sw-resize;"></div>' +
      '<div id="dragRightTop" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px;border-radius:50%; background:' + themeColor + ';opacity:0.8; overflow:hidden; right:-' + controlPointSize / 2 + 'px; top:-' + controlPointSize / 2 + 'px; cursor:ne-resize;"></div>' +
      '<div id="dragRightBot" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px;border-radius:50%; background:' + themeColor + ';opacity:0.8;  overflow:hidden; right:-' + controlPointSize / 2 + 'px; bottom:-' + controlPointSize / 2 + 'px; cursor:se-resize;"></div>' +
      '<div id="dragTopCenter" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px; background:' + themeColor + ';opacity:0.8;overflow:hidden; top:-' + controlPointSize / 2 + 'px; left:50%; margin-left:-' + controlPointSize / 2 + 'px; cursor:n-resize;"></div>' +
      '<div id="dragBotCenter" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px; background:' + themeColor + ';opacity:0.8;overflow:hidden; bottom:-' + controlPointSize / 2 + 'px; left:50%; margin-left:-' + controlPointSize / 2 + 'px; cursor:s-resize;"></div>' +
      '<div id="dragRightCenter" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px; background:' + themeColor + ';opacity:0.8;overflow:hidden; right:-' + controlPointSize / 2 + 'px; top:50%; margin-top:-' + controlPointSize / 2 + 'px; cursor:e-resize;"></div> ' +
      '<div id="dragLeftCenter" style="position:absolute; width:' + controlPointSize + 'px; height:' + controlPointSize + 'px; background:' + themeColor + ';opacity:0.8;overflow:hidden; left:-' + controlPointSize / 2 + 'px; top:50%; margin-top:-' + controlPointSize / 2 + 'px; cursor:w-resize;"></div>' +
      '</div>';
    //pc端监听函数
    const startDrag = (point, target, kind) => {
      //point是拉伸点，target是被拉伸的目标，其高度及位置会发生改变
      //此处的target与上面拖拽的target是同一目标，故其params.left,params.top可以共用，也必须共用
      //初始化宽高
      params.width = getCss(target, "width");
      params.height = getCss(target, "height");
      //初始化坐标
      if (getCss(target, "left") !== "auto") {
        params.left = getCss(target, "left");
      }
      if (getCss(target, "top") !== "auto") {
        params.top = getCss(target, "top");
      }
      //target是移动对象
      point.onmousedown = (event) => {
        params.kind = kind;
        params.flag = true;
        if (!event) {
          event = window.event;
        }
        let e = event;
        params.currentX = e.clientX; //鼠标按下时坐标x轴
        params.currentY = e.clientY; //鼠标按下时坐标y轴
        point.onselectstart = () => {
          return false;
        };

        document.onmousemove = (event) => {
          let e = event ? event : window.event;
          if (params.flag) {
            let nowX = e.clientX; // 鼠标移动时x坐标
            let nowY = e.clientY; // 鼠标移动时y坐标
            let disX = nowX - params.currentX; // 鼠标x方向移动距离
            let disY = nowY - params.currentY; // 鼠标y方向移动距离
            if (params.kind === "n") { //上拉伸
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "w") { //左拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "e") { //右拉伸
              target.style.width = parseInt(params.width) + disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "s") { //下拉伸
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "nw") { //左上拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "ne") { //右上拉伸
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              target.style.width = parseInt(params.width) + disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "sw") { //左下拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "se") { //右下拉伸
              target.style.width = parseInt(params.width) + disX + "px";
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else { //移动
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.top = parseInt(params.top) + disY + "px";
            }
          }

          document.onmouseup = () => {

            params.flag = false;
            if (getCss(target, "left") !== "auto") {
              params.left = getCss(target, "left");
            }
            if (getCss(target, "top") !== "auto") {
              params.top = getCss(target, "top");
            }
            params.width = getCss(target, "width");
            params.height = getCss(target, "height");

            //给隐藏文本框赋值
            posX = parseInt(target.style.left);
            posY = parseInt(target.style.top);
            cropW = parseInt(target.style.width);
            cropH = parseInt(target.style.height);
            if (posX < 0) {
              posX = 0;
            }
            if (posY < 0) {
              posY = 0;
            }
            if ((posX + cropW) > iCurWidth) {
              cropW = iCurWidth - posX;
            }
            if ((posY + cropH) > iCurHeight) {
              cropH = iCurHeight - posY;
            }
          };
        }
      };
    };
    //移动端监听函数
    let startDragInMobile = (point, target, kind) => {
      //point是拉伸点，target是被拉伸的目标，其高度及位置会发生改变
      //此处的target与上面拖拽的target是同一目标，故其params.left,params.top可以共用，也必须共用
      //初始化宽高
      params.width = getCss(target, "width");
      params.height = getCss(target, "height");

      //初始化坐标
      if (getCss(target, "left") !== "auto") {
        params.left = getCss(target, "left");
      }
      if (getCss(target, "top") !== "auto") {
        params.top = getCss(target, "top");
      }
      //target是移动对象
      point.ontouchstart = (event) => {
        params.kind = kind;
        params.flag = true;
        if (!event) {
          event = window.event;
        }
        let e = event;

        params.currentX = e.changedTouches[0].clientX; //鼠标按下时坐标x轴
        params.currentY = e.changedTouches[0].clientY; //鼠标按下时坐标y轴
        //防止IE文字选中，有助于拖拽平滑
        point.onselectstart = () => {
          return false;
        };

        document.ontouchmove = (event) => {
          let e = event ? event : window.event;
          if (params.flag) {
            let nowX = e.changedTouches[0].clientX; // 鼠标移动时x坐标
            let nowY = e.changedTouches[0].clientY; // 鼠标移动时y坐标
            let disX = nowX - params.currentX; // 鼠标x方向移动距离
            let disY = nowY - params.currentY; // 鼠标y方向移动距离
            //高度增加或减小，位置上下移动
            if (params.kind === "n") { //上拉伸
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "w") { //左拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "e") { //右拉伸
              target.style.width = parseInt(params.width) + disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "s") { //下拉伸
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "nw") { //左上拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "ne") { //右上拉伸
              target.style.top = parseInt(params.top) + disY + "px";
              target.style.height = parseInt(params.height) - disY + "px";
              target.style.width = parseInt(params.width) + disX + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else if (params.kind === "sw") { //左下拉伸
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.width = parseInt(params.width) - disX + "px";
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.width = parseInt(target.style.height) * contrast + "px";
              }
            } else if (params.kind === "se") { //右下拉伸
              target.style.width = parseInt(params.width) + disX + "px";
              target.style.height = parseInt(params.height) + disY + "px";
              if (contrast) {
                target.style.height = parseInt(target.style.width) / contrast + "px";
              }
            } else { //移动
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.top = parseInt(params.top) + disY + "px";
            }
          }

          document.ontouchend = () => {
            params.flag = false;
            if (getCss(target, "left") !== "auto") {
              params.left = getCss(target, "left");
            }
            if (getCss(target, "top") !== "auto") {
              params.top = getCss(target, "top");
            }
            params.width = getCss(target, "width");
            params.height = getCss(target, "height");

            //给隐藏文本框赋值
            posX = parseInt(target.style.left);
            posY = parseInt(target.style.top);
            cropW = parseInt(target.style.width);
            cropH = parseInt(target.style.height);
            if (posX < 0) {
              posX = 0;
            }
            if (posY < 0) {
              posY = 0;
            }
            if ((posX + cropW) > iCurWidth) {
              cropW = iCurWidth - posX;
            }
            if ((posY + cropH) > iCurHeight) {
              cropH = iCurHeight - posY;
            }
          };
        }
      };
    };
    if (isMobile) {
      //移动端绑定
      // alert('移动端')
      startDragInMobile(ID("zxxDragBg"), ID("zxxCropBox"), "drag");
      startDragInMobile(ID("dragLeftTop"), ID("zxxCropBox"), "nw");
      startDragInMobile(ID("dragLeftBot"), ID("zxxCropBox"), "sw");
      startDragInMobile(ID("dragRightTop"), ID("zxxCropBox"), "ne");
      startDragInMobile(ID("dragRightBot"), ID("zxxCropBox"), "se");
      startDragInMobile(ID("dragTopCenter"), ID("zxxCropBox"), "n");
      startDragInMobile(ID("dragBotCenter"), ID("zxxCropBox"), "s");
      startDragInMobile(ID("dragRightCenter"), ID("zxxCropBox"), "e");
      startDragInMobile(ID("dragLeftCenter"), ID("zxxCropBox"), "w");
    } else {
      //pc端绑定
      // alert('pc端')
      startDrag(ID("zxxDragBg"), ID("zxxCropBox"), "drag");
      startDrag(ID("dragLeftTop"), ID("zxxCropBox"), "nw");
      startDrag(ID("dragLeftBot"), ID("zxxCropBox"), "sw");
      startDrag(ID("dragRightTop"), ID("zxxCropBox"), "ne");
      startDrag(ID("dragRightBot"), ID("zxxCropBox"), "se");
      startDrag(ID("dragTopCenter"), ID("zxxCropBox"), "n");
      startDrag(ID("dragBotCenter"), ID("zxxCropBox"), "s");
      startDrag(ID("dragRightCenter"), ID("zxxCropBox"), "e");
      startDrag(ID("dragLeftCenter"), ID("zxxCropBox"), "w");
    }


    //图片不能被选中，目的在于使拖拽顺滑
    ID("myCanvas").onselectstart = () => {
      return false;
    };
    img.onselectstart = () => {
      return false;
    };
  };
  /**----------------截图控件开启函数结束------------------**/

  /**----------------确定截图函数------------------**/
  const cropImage = () => {
    let newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'newCanvas');
    newCanvas.width = parseInt(params.width);
    newCanvas.height = parseInt(params.height);
    newCanvas.style.border = "0px solid #d3d3d3";
    let newCtx = newCanvas.getContext('2d');
    newCtx.drawImage(img,
      parseInt(params.left) / scale,
      parseInt(params.top) / scale,
      parseInt(params.width) / scale,
      parseInt(params.height) / scale,
      0,
      0,
      parseInt(params.width),
      parseInt(params.height));
    // canvas转化为图片
    newImage.src = newCanvas.toDataURL("image/png");
  }
  /**----------------确定截图函数------------------**/
  /**--------------返回blob对象-----------------**/
  let getNewImg = () => {
    return newImage;
  }
  /**--------------返回blob对象-----------------**/
  /**---------------------------导出-----------------------**/
  var screenshots = {
    getNewImg,
    uploadImg
  }
  // export default screenshots
  /**---------------------------导出-----------------------**/