//实现哈希函数：将字符串转换成HashCode，再将HashCode转换成数组范围内的下标值
function hashFunc(str, size) {
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