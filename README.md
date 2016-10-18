# react-glider
## 这是啥？
这是一个基于reactjs的滑屏组件
## 特点
详见 [wiki](https://github.com/felixzxk/react-glider/wiki)
## 安装demo
先clone到本地

    git clone https://github.com/felixzxk/react-glider.git

然后到demo目录安装依赖
    
    npm i

按装react-glider组件（demo里已经有组件了，不需要另外安装）

    npm i --save react-glider
    
## 运行demo
依赖包安装完成后，执行下面的命令

    npm run dev

编译完成后访问 [localhost:3002](http://localhost:3002) 
## 关于webpack
只设置了开发服务，可以热加载，没有配置打包服务，本demo旨在演示功能；
webpack需要全局安装

    npm i webpack -g

需要修改端口号的话可以在package.json文件中配置port的值:

    "scripts": {
        "dev": "webpack-dev-server --progress --colors --host localhost --port 3002 --inline --hot"
    },

## 使用
待续...
