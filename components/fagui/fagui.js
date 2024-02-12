// components/fagui/fagui.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    htmlSnip:'',
    htmlSnip2:`<div class="div_class">
    <h5>信息发布说明:</h5>
    <p class="div_class_p">用户所有发布信息必须符合《互联网信息服务管理办法》中所规定的内容</p>
    <p class="div_class_p"> 第十五条互联网信息服务提供者不得制作、复制、发布、传播含有下列内容的信息：</p>
    <ul class="div_class_ul">
    <li>1.反对宪法所确定的基本原则的；</li>
    <li>2.危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
    <li>3.损害国家荣誉和利益的；</li>
    <li>4.煽动民族仇恨、民族歧视，破坏民族团结的；</li>
    <li>5.破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
    <li>6.散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
    <li>7.散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
    <li>8.侮辱或者诽谤他人，侵害他人合法权益的；</li>
    <li>9.含有法律、行政法规禁止的其他内容的。</li>
    </ul>
  </div>`
  },

  /**
   * 组件的方法列表
   */
  methods: {
     async getfagui(){
          const localhost = getApp().globalData.localhost
          const openid = wx.getStorageSync('openid') 
          //console.log(localhost)
          const {data:res}=await wx.p.request({
            methods:'GET',
            url: localhost + '/wx/getfagui?openid=' + openid,
          })
          //console.log(res);
          if(res.success){
            this.setData({
              htmlSnip:res.message
          })
          }
         
      }
  },
  lifetimes:{
    created(){
      this.getfagui()
    } 
  }
})