/**
 * 把p中可枚举属性复制到o中，并返回o
 * 如果o中含有同名属性，则对其覆盖
 */
function extend(o, p){
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 把p中可枚举属性复制到o中，并返回o
 * 如果o中含有同名属性，则略过
 */
function merge(o, p){
    for (prop in p) {
        if (o.hasOwnProperty(prop)) 
            continue;
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 删除o中p没有的属性
 * @param {Object} o
 * @param {Object} p
 */
function restrict(o, p){
    for (prop in o) {
        if (!(prop in p)) 
            delete o[prop];
    }
    return o;
}

/**
 * 删除o中与p同名的属性
 * @param {Object} o
 * @param {Object} p
 */
function substract(o, p){
    for (prop in p) 
        delete o[prop];
    return o;
}

/**
 * 合并o，p
 * 如果o,p有同名属性使用p中的属性
 * @param {Object} o
 * @param {Object} p
 */
function union(o, p){
    return extend(extend({}, o), p);
}

/**
 * 求o，p中属性的交集，但是忽略p中的属性值
 * @param {Object} o
 * @param {Object} p
 */
function intersection(o, p){
    return restrict(extend({}, o), p);
}

/**
 * 返回一个数组，数组中包含的是对象的属性名
 * @param {Object} o
 */
function keys(o){
    if (typeof o !== "object") 
        throw TypeError;
    var result = [];
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) 
            result.push[prop];
    }
    return result;
}

/**
 * 继承
 * @param {Object} p
 */
function inherit(p){
    if (p == null) 
        throw TypeError();
    if (Object.create) 
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") 
        throw TypeError();
    function f(){
    };
    f.prototype = p;
    return new f();
}

/**
 * 对象的属性$n是只读的
 * 并且只增不减
 */
var serialNumber={
	$n:0,
	set n(next){
		if(this.$n<next)
			this.$n=next;
		else
			throw "序列号不能比当前值小";
	},
	get n(){
		return this.$n++;
	}
} 

var random={
	get oct(){return Math.random()*256;},
	get uint16(){return Math.random()*65535;},
	get int16(){return (Math.random()*65535)-32768;}
}

/**
 * 给Object添加一个不可枚举的extend方法
 * 这个方法继承自调用它的对象，将作为参数传入的对象的属性进行一一复制
 * 除了值之外，也复制属性的所有属性，除非包括了同名属性。
 */
Object.defineProperty(Object.prototype,"extend",{
	writable:true,
	enumerable:false,
	configurable:true,
	value:function(o){
		//得到所有的自有属性，包括不可枚举属性
		var names=Object.getOwnPropertyNames(o);
		for(var i=0;i<names.length;i++){
			if(names[i] in this)
				continue;
			var desc=Object.getOwnPropertyDescriptor(o,names[i]);
			//用desc给this创建一个新属性
			Object.defineProperty(this,names[i],desc);
		}
	}
});

/**
 * classof()函数
 * @param {Object} o
 */
function classof(o){
	if(o === null) return "Null";
	if(o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}




