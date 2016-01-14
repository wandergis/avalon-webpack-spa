# avalon与webpack写单页面应用，使用`mmState`控制路由跳转
学习和使用avalon已经一个多月了,中间历经坎坷,踩坑跳坑,也算是积累了一些avalon的相关实践的经验.
趁着项目结束,终于有闲暇实践来整理和沉淀这些知识.

> 这是一个集成了`avalon` `jquery` `gulp` `webpack` `mmstate` `purecss`的偏工程化的一个项目模板,支持异步加载和打包，替换oniui的avalon和avalon.shim版本为1.4.7.1，~~目前热替换部分还有一些问题,等以后再解决了.~~ 热替换已解决

## [在线访问](http://wandergis.github.io/avalon-webpack-spa/dist/#!/home)

## [项目主页](http://wandergis.github.io/avalon-webpack-spa)

## 使用方法
注意事项

1. `mkdir demo && cd demo && git clone https://github.com/wandergis/avalon-webpack-spa.git`
2. `npm install` 
	确保安装了node,及全局安装了gulp和webpack
	
3. `gulp` 或者 `npm start` 启动开发模式，支持热替换
4. `webpack`打包到dist目录，`webpack -p` 打包压缩到dist目录

## 效果截图

![](http://7xp11v.com1.z0.glb.clouddn.com/15-12-9/90700504.jpg)


![](http://7xp11v.com1.z0.glb.clouddn.com/15-12-9/98172742.jpg)


## 关于ie8的兼容问题
1. ajax在低版本ie下默认会从缓存读取，需要加上对应的时间戳，直接在avalon.ajax的请求配置的`cache`设置为`false`
2. 需要取vm的值的情况下请使用vm的`$model`属性
3. 数组的增加和获取长度请使用`pushArray`和`size`
4. 不要直接定义`data:{}`然后给data动态增加属性,不要过多的嵌套
5. oniui的分页控件在数据获取之后再设置，否则ie8下面不出现
6. 验证控件的异步问题，将逻辑写在`validationVM.validateAll`的验证成功的方法中
7. 绑定下拉框的数据获取，只需要select的绑定的对象的值
8. 使用oniui最好使用1.4.7版本的avalon，解决了光标和下拉联动的问题

## 参考文章
-  [webpack入门指谜](http://segmentfault.com/a/1190000002551952?_ea=192337)
-  [webpack打包avalon＋oniui+jquery](http://www.cnblogs.com/rubylouvre/p/4963984.html)
-  [webpack+avalon+mmState打包方案](http://www.cnblogs.com/rubylouvre/p/4995106.html)
