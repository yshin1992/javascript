/**
 * 继承
 * @param obj
 * @returns
 */
function inherit(obj){
	if(typeof obj == null)
		throw TypeError();
	if(Object.create)
		return Object.create(obj);//创建一个对象继承与obj
	var t=typeof obj;
	if(t!=="object" && t!=="function")
		throw TypeError();
	//传统的继承方法
	function f(){};
	f.prototype=obj;
	return new f();
}

/**
 * 这个工厂方法返回一个新的“范围对象”
 * @param from
 * @param to
 */
function range(from,to){
	//原型对象作为函数的一个属性存储，并定义所有“范围对象”所共享的方法
	var r=inherit(range.methods);
	//存储新的“范围对象”的起始位置和结束位置
	//这两个属性是不可继承的，每个对象都拥有唯一的属性
	r.from=from;
	r.to=to;
	
	return r;
}

//原型对象定义方法，这些方法为每个范围对象所继承
range.methods={
		//如果x在范围内，则返回true
		//这个方法可以比较数字范围、也可比较字符串和日期范围
		includes:function(x){
			return this.from <=x && this.to>=x;
		},
		
		foreach:function(f){
			for(var x=Math.ceil(this.from);x<=this.to;x++)
				f(x);
		},
		
		toString:function(){
			return "("+this.from+"..."+this.to+");";
		}
};