//ES6中的Set类就是一个集合
//自己基于Object封装实现一个Set类

function mySet() {
  //使用一个对象来保存集合中的元素 （因为Object的keys本身就是一个集合）
  this.items = {}

  //集合的操作方法
  //1. add(value):向集合中添加一个新的项
  mySet.prototype.add = function (value) {
    //判断当前集合中是否已经包含了该元素
    if (this.items.hasOwnProperty(value)) {
      return '该元素已经存在';
    }

    //将元素添加到集合中
    this.items[value] = value;
    return `元素${value}添加成功`;
  }

  //2. remove(value):从集合中移除某一项
  mySet.prototype.remove = function (value) {
    //判断集合中是否包含该元素
    if (!this.items.hasOwnProperty(value)) {
      return '集合中不存在该元素';
    }

    //将元素从集合中删除
    delete this.items[value];
    return `元素${value}删除成功`
  }

  //3. has(value):如果集合中有这个值，返回true,否则返回false
  mySet.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
  }

  //4. clear():移除集合中的所有项
  mySet.prototype.clear = function () {
    this.items = {};
    return '集合已被清空';
  }

  //5. size():返回集合中元素的个数
  mySet.prototype.size = function () {
    return Object.keys(this.items).length;
  }

  //6. values():返回一个包含集合中所有值的数组
  mySet.prototype.values = function () {
    return Object.values(this.items);
  }

  //---------------------------------------------------------------------------

  //集合间的操作
  //1. 并集
  mySet.prototype.union = function (otherSet) {
    //创建一个新的集合，代表2个集合的并集
    let unionSet = new mySet()

    //遍历集合1中的所有值，并且添加到新集合中
    for (let item of this.values()) {
      unionSet.add(item);
    }

    //遍历集合2中的所有值，判断是否需要添加到新集合中
    for (let item of otherSet.values()) {
      //如果unionSet中没有该元素则添加该元素
      // if(!unionSet.has(item)){
      //   unionSet.add(item);
      // }

      //因为add方法本身就有进行重复添加的判断，所以可以直接添加
      unionSet.add(item);
    }

    //将最终的新集合返回
    return unionSet;
  }

  //2. 交集
  mySet.prototype.interSection = function (otherSet) {
    //创建一个新集合，代表2个集合的交集
    let interSectionSet = new mySet();

    //遍历集合1中的所有元素，如果该元素也在集合2中，就添加到新集合中
    for (let item of this.values()) {
      if (otherSet.has(item)) {
        interSectionSet.add(item);
      }
    }

    //将最终的新集合返回
    return interSectionSet;
  }

  //3. 差集
  mySet.prototype.difference = function (otherSet) {
    //创建一个新集合，代表2个集合的差集
    let differenceSet = new mySet();

    //遍历集合1中的所有元素，如果该元素不在集合2中，就添加到新集合中
    for (let item of this.values()) {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    }

    //将最终的新集合返回
    return differenceSet;
  }

  //4. 子集：判断某一集合是否是另一集合的子集,是返回true,不是返回false
  mySet.prototype.subset = function (otherSet) {
    //判断集合1是否大于集合2，如果大于，那么集合1肯定不是集合2的子集
    //如果不大于，就判断集合1中的所有元素是否都在集合2中存在
    //如果都存在，那么集合1是集合2的子集
    //只要有一个元素不存在，那么集合1就不是集合2的子集

    if (this.size() > otherSet.size()) {
      return false;
    } else {
      for (let item of this.values()) {
        if (!otherSet.has(item)) {
          return false;
        }
      }

      return true;
    }
  }

}