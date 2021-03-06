//封装队列类 --- 基于数组实现
function Queue() {
    //属性
    this.items = []; //把对队列的操作变为对数组的操作实现

    //方法
    //1.enqueue(el) -- 向队列尾部插入一个或多个项
    Queue.prototype.enqueue = function (...element) {
        this.items.push(...element);
    }

    //2.dequeue()   -- 移除队列的第一项并返回该项
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }

    //3.front()     -- 返回队列的第一项，队列不做任何修改
    Queue.prototype.front = function () {
        return this.items[0];
    }

    //4.isEmpty()   -- 如果队列中不包含任何元素，返回true,否则返回false
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    //5.size()      -- 返回队列中包含的元素个数，与数组的length相似
    Queue.prototype.size = function () {
        return this.items.length;
    }

    //6.toString()  -- 将队列中的内容转换成字符串形式
    Queue.prototype.toString = function () {
        return this.items.split(' ');
    }
}