//封装栈类 -- 基于数组实现
//构造函数
function Stack() {
    //栈中的属性
    this.items = [];
    //定义一个数组用于保存当前栈对象中所有的元素
    //所以此后的出栈和入栈操作其实都是针对数组的插入和删除操作

    //栈的相关方法
    //1.push() -- 添加一个新元素到栈顶位置
    Stack.prototype.push = function (element) {
        this.items.push(element);
    }

    //2.pop() -- 删除栈顶元素并返回该元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    }

    //3.peek() -- 返回栈顶元素，不对栈进行任何修改
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    }

    //4.isEmpty() -- 判断栈是否为空--空返回true,否则返回false
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    //5.size() -- 返回栈的元素个数（栈的长度）
    Stack.prototype.size = function () {
        return this.items.length;
    }

    //6.toString() -- 将栈结构的内容以字符形式返回
    Stack.prototype.toString = function () {
        return this.items.join(' '); //从栈底到栈顶
        // return this.items.reverse().join(' '); //从栈顶到栈底
    }
}