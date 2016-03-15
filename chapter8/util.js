/**
 * 嵌套函数实例
 * @param {Object} a
 * @param {Object} b
 */
function hypotenuse(a,b){
	function square(x){return x*x;}
	return Math.sqrt(square(a)+square(b));
}

/**
 * 获取对象的自有属性，不包括方法
 * @param {Object} o
 * @param {Object} a(optional)
 */
function getPropName(o,/** optional */ a){
//	if(a === undefined) a=[];
	a=a||[];//这种方法更好
	for(var prop in o){
		if(!o.hasOwnProperty(prop)) continue;
		if(typeof o[prop] === "function") continue;
		a.push(prop);
	}
	return a;
}

/**
 * 获取参数中的最大值
 */
function max(){
	var max=Number.NEGATIVE_INFINITY;
	for (var i = 0, len = arguments.length; i < len; i++) {
		if (arguments[i] > max) 
			max = arguments[i];
	}
	return max;
}

/**
 * 数组复制
 * @param {Object} from
 * @param {Object} from_start
 * @param {Object} to
 * @param {Object} to_start
 * @param {Object} length
 */
function arraycopy(from,from_start,to,to_start,length){
	if(!Array.isArray(from) || !Array.isArray(to))
		throw "参数错误";
	for(var i=from_start,j=to_start;i<from_start+length;i++,j++){
		to[j]=from[i];
	}
}

/**
 * 传入对象做为参数
 * @param {Object} args
 */
function easycopy(args){
	arraycopy(args.from,
					args.from_start||0,
					args.to,
					args.to_start||0,
					args.length);
}

/**
 * 使用匿名函数空间隐藏一组属性名
 */
//定义一个扩展函数，用来将第二个以及后续参数复制至第一个参数
//这里处理了IE bug：如果o的属性拥有一个不可枚举的同名属性，则
//for/in循环不会枚举对象o的可枚举属性，也就是说不会正确的处理
//诸如toString属性，除非我们显示的检测它
var extend = (function(){
	for(var p in {toString:null}){//检测是否存在bug
		//执行到这里的话意味着for/in循环会正确工作并返回
		return function extend(o){
			for(var i=0;i<arguments.length;i++){
				var source = arguments[i];
				for(var prop in source){
					o[prop] = source[prop];
				}
			}
			return o;
		};
	}
	
	//修补IE bug版本的extend
	return function patched_extend(o){
		for(var i=1;i<arguments.length;i++){
			var source = arguments[i];
			//复制所有可枚举属性
			for(var prop in source) o[prop] =source[prop];
			
			//检查特殊属性
			for(var j=0;j<protoprops.length;j++){
				prop = protoprops[j];
				if(source.hasOwnProperty(prop))
					o[prop] = source[prop];
			}
		}
		return o;
	};
	//需要检测的特殊属性
	var protoprops = ["toString","valueOf","constructor","hasOwnProperty"
								,"isPrototypeOf","propertyIsEnumerable","toLocaleString"];
}());

/**
 * 利用闭包实现的私有属性存取器方法
 */
function addPrivateProperty(o,name,predicate){
	var value;//这是一个属性值
	
	//getter方法简单的将其返回
	o["get"+name]=function(){return value;};
	
	//setter方法首先检查值是否合法，若不合法就抛出异常
	o["set"+name]=function(v){
		if(predicate && !predicate(v))
			throw Error("set " +name+" : invalid value "+v );
		else
			value=v;
	};
}

/**
 * 检测参数的个数是否是期望的
 * @param {Object} args
 */
function check(args){
	var actual = args.length;
	var expected = args.callee.length;
	if(actual !== expected)
		throw Error("Actual "+actual +", Expected "+expected);
}


/**
 * bind实现(返回一个新的函数
 * @param {Object} f 函数
 * @param {Object} o 对象
 */
function bind(f,o){
	if(f.bind(o)) return f.bind(o);
	else 
		return function(){
			return f.apply(o,arguments)
		} ;
}
