//链地址法实现哈希表: [[[k,v],[k,v],[k,v],[k,v]...],[[k,v],[k,v],[k,v]...],...]

//创建HashTable构造函数
function HashTable() {
  //属性
  this.storage = []; // 用于存放数据的数组
  //装填因子：loadFactor = count / limit
  this.count = 0; //数组中已经有的元素个数
  this.limit = 7; //数组总共可以存放的元素个数（最好为质数）


  //哈希函数
  HashTable.prototype.hashFunc = function (str, size) {
    // 1.初始化hashCode的值
    let hashCode = 0;

    // 2.霍纳算法, 来计算hashCode的数值
    // 字符串的下标值从左往右数，字符串最左边的字符下标值为0，对应霍纳法则公式中的an
    // 霍纳法则中的x的值设为质数37
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i); //获取到字符对应的Unicode编码
    }

    // 3.取模运算 --- 计算出对应的数组的下标值
    // size表示数组的长度
    return hashCode % size;
  }

  //方法
  // 1. 插入 & 修改
  HashTable.prototype.put = function (key, value) {
    //根据key获取索引值，找到数据对应的位置
    let index = this.hashFunc(key, this.limit);

    //根据索引值取出bucket, 如果bucket不存在则创建bucket，并放置在对应的位置
    let bucket = this.storage[index];
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    //线性查找bucket中是否存在key,有key则进行修改操作，无key则进行插入操作
    for (let tuple of bucket) {
      if (tuple[0] === key) {
        tuple[1] = value;
        return '修改成功';
      }
    }
    //bucket中没有找到对应的key则进行插入操作
    bucket.push([key, value]);
    this.count++;

    //判断哈希表是否需要进行扩容
    //装填因子loadFactor>0.75的时候需要进行扩容
    // if( this.count / this.limit > 0.75)
    if (this.count > this.limit * 0.75) {
      this.resize(this.getPrime(this.limit * 2));
    }

    return '插入成功';
  }

  // 2. 根据key值获取对应元素
  HashTable.prototype.get = function (key) {
    // 根据key获取到对应的数组索引值index
    let index = this.hashFunc(key, this.limit);

    // 根据index获取到数组对应位置的数据bucket
    let bucket = this.storage[index];

    // 如果bucket为空则直接返回null
    if (!bucket) return null;

    // 如果bucket不为空，则线性查找bucket里面的元素，找到则返回对应的值，未找到就返回null
    for (let tuple of bucket) {
      if (tuple[0] === key) return tuple[1];
    }
    return null;
  }

  // 3. 删除key对应的元素
  HashTable.prototype.remove = function (key) {
    // 根据key获取到对应的数组索引值index
    let index = this.hashFunc(key, this.limit);

    // 根据index获取到数组对应位置的数据bucket
    let bucket = this.storage[index];

    // 如果bucket为空则直接返回false
    if (!bucket) return '元素不存在';

    // 如果bucket不为空，则线性查找bucket里面的元素，找到则删除对应的值，未找到就返回false
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;

        //判断哈希表是否需要减小容量
        //当装填因子loadFactor < 0.25时需要减小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          this.resize(this.getPrime(Math.floor(this.limit / 2)));
        }

        return tuple[1];
      }
    }
    return '元素不存在';
  }

  // 4. 判断哈希表是否为空, 为空返回true, 不为空返回false
  HashTable.prototype.isEmpty = function () {
    return this.count === 0;
  }

  // 5. 获取哈希表中元素的个数
  HashTable.prototype.size = function () {
    return this.count;
  }

  // 6. 哈希表扩容/缩容
  HashTable.prototype.resize = function (newLimit) {
    // 保存旧的数据内容
    let oldStorage = this.storage;

    // 重置所有属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;

    // 遍历oldStorage中所有的数据项，重新调用哈希函数，找到元素在容量改变后的数组中的对应位置并插入
    for (let bucket of oldStorage) {
      //如果bucket为空
      if (!bucket) continue;

      //如果bucket不为空，则在容量改变后的新数组中重新插入数据
      for (let tuple of bucket) {
        this.put(tuple[0], tuple[1]);
      }
    }
  }

  //判断某个数是否是质数
  this.isPrime = function (num) {
    let temp = parseInt(Math.sqrt(num));

    for (let i = 2; i <= temp; i++) {
      if (num % i === 0) return false;
    }

    return true;
  }

  //获取质数
  this.getPrime = function (num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
}