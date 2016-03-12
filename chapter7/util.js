/*
 * 查找数组中所有出现的x，并返回一个包含匹配索引的数组
 */
function findAll(a,x){
	var results=[];
	var pos=0;
//	if(arr instanceof Array){
	if(Array.isArray(arr)){
		var len=a.length;
		while(pos<len){
			pos=a.indexOf(x,pos);
			if(pos == -1) break;
			results.push(pos);
			pos+=1;
		}
	}
	return results;
}

/**
 * EMCAScript 3中检测是否数组
 */
function isArray(o){
	return Function.isArray || function(O){
		return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]";
	}
}
/**
 * 判定o是不是一个类数组对象
 * 字符串和函数有length属性，但是
 * 它们可以用typeof检测将其排除。
 * 在客户端Javascript中，DOM文本节点也有length属性，需要
 * 额外判断o.nodeType!=3 将其排除
 */
function isArrayLike(o){
	if(o && typeof o =="object"
		&& isFinite(o.length) && o.length>=0
		&& o.length===Math.floor(o.length) 
		&& o.length < Math.pow(2,32))
		return true;
	else
		return false;
}

//给类数组定义数组的方法
Array.join = Array.join || function(a,sep){
	return Array.prototype.join.call(a,sep);
}

Array.slice = Array.slice || function(arr,from,to){
	return Array.prototype.slice.call(arr,from,to);
}
