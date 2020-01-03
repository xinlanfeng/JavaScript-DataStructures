//创建字典的构造函数
function Dictionary() {
  //字典属性
  this.items = {}

  //字典的一些方法
  //1. set(key,value)：向字典中添加新元素
  Dictionary.prototype.set = function (key, value) {
    if (this.items.hasOwnProperty(key)) {
      return 'key已经存在';
    }

    this.items[key] = value;
    return '添加元素成功';
  }

  //2. has(key)：判断字典中是否有某个键名，有则返回true，反之则返回false
  Dictionary.prototype.has = function (key) {
    return this.items.hasOwnProperty(key);
  }

  //3. remove(key)：通过键名从字典中移除对应的值
  Dictionary.prototype.remove = function (key) {
    if (!this.has(key)) return '该元素不存在';

    delete this.items[key];
    return '元素删除成功';
  }

  //4. get(key)：通过键名查找对应的值并返回
  Dictionary.prototype.get = function (key) {
    //如果key不存在则返回undefined
    return this.items[key];
  }

  //5. size()：返回字典所包含元素的数量
  Dictionary.prototype.size = function () {
    return Object.keys(this.items).length;
  }

  //6. keys()：返回字典所包含的所有键名
  Dictionary.prototype.keys = function () {
    return Object.keys(this.items);
  }

  //7. values()：返回字典所包含的所有值
  Dictionary.prototype.values = function () {
    return Object.values(this.items);
  }

  //8. clear()：将这个字典中的所有元素全部删除
  Dictionary.prototype.clear = function () {
    this.items = {};
    return '字典已全部清空';
  }
}