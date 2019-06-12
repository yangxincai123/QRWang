const webSocketURL = "wss://hiyouclub.com/dy_chp_server/ws/IOS/USER/"
const baseYZHURL = "https://hiyouclub.com/dy_chp_services/"
const baseFilePath = "https://hiyouclub.com/dy_chp_server/"
const baseFileURL = "https://hiyouclub.com/dy_file/"

const payURL_wx = "https://hiyouclub.com/dy_chp_server/dy_wx_op"
const payURL_ali = "https://hiyouclub.com/dy_chp_server/dy_ali"

const userHeadImgPath = "kfh/user/head/"        //用户头像
const userMemHeadImgPath = "chp/user/mem_head/"    //家人头像
const pdtPhotoImgPath = "chp/sp/pdt_photo/"     //产品封面图

const pdtJSPPath = "chppdt.jsp?pdtoid="     //产品详情jsp
const pdtOrderJspPath = "chppdt.jsp?orderoid=" //产品详情jsp

var actionURLMap = function(action) {
  switch (action) {
    case "upload":
      return baseFilePath;
    default:
      return baseYZHURL;
  } 
}

var actionPathMap = function(action) {
  switch (action) {
    case "getPdtList":
      return "chp_user/org/req";
    case "upload":
      return "upfile.jsp";
    default:
      return "";
  } 
}

var URL = function(action){
  return actionURLMap(action)+actionPathMap(action);
}

var req = function (action, param, success, fail, errConfirm=false, method="POST") {
  var req_param = {
    "action": action, 
    "params": param
  }
  wx.request({
    url: URL(action),
    data: req_param,
    method:method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      if(res.data.error == 0){
        if(success){
          success(res);
          return;
        }
      }
      if (res.data.error == -1) {
        wx.showToast({
          title: '登录失效，请重新登录',
        })
        return;
      } 
      if (errConfirm){
        if (success) {
          success(res);
        }
      }
      wx.showToast({
        title: res.data.info,
      });
      return;
    },
    fail(err){
      if(fail){
        fail(err);
      }
      wx.showToast({
        title: '请求出错，请检查网络：[' + err + ']',
      })
    }
  })
}

module.exports = {
  req:req
}