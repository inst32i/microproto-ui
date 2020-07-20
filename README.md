# 小型安全度量系统原型

(基于Vue.js - 前端工程)

## 配置说明
在该目录打开命令提示行或者gitbash

输入 npm install 安装依赖

(这一过程缺什么装什么,npm本身很慢,建议更换淘宝下载源或者直接用cnpm,详细内容可以百度一下,积累一下npm的使用对学习有帮助)

输入 npm run dev 来跑起来前端,(默认)浏览器打开http://localhost:8080,可以看到前端页面

如果需要部署到服务器 npm run build,生成一个dist文件夹,将里面的文件部署到服务器(tomcat,nginx之类的

## 目录结构说明

只说明src文件夹下结构,其余内容与本项目无关不做详细说明

src
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── HelloWorld.vue
│   └── Ping.vue
├── main.js
└── router
    └── index.js

assets文件夹  静态资源(图片、js、css)可以存放在这里
components    vue的组件文件夹,路由表中通过'@/components/组件名'来引用(不是组件名.vue)
main.js       vue根实例构建器,一般不需要更改
index.js     路由表,可根据已有的两个路由仿写

## 与后端进行数据交互

首先需要安装axios库, npm install axios --save (npm不行的话用cnpm)

前端vue组件中,以下代码用于与后端数据交互:

<script>
	import axios from 'axios';
	...
	getMessage () {
		const path = 'http://localhost:5000/ping';	//这里面localhost:5000是后端启动后的端口地址,ping是app.py中注册的路由地址
        axios.get(path)
        .then((res) => {
          // axios异步取回数据,在回调函数中可以获取到取回的数据,一般为json格式
          console.log(res)
        })
        .catch((error) => {
          // 回调失败的报错提示
          console.error(error);
        });
	}
	...
</script>