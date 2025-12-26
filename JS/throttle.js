function handleClick(event) {
    console.log('Button clicked!');
}


function throttle (func, ms) {
    let flag = false
    return function(...args) {
        if(!flag) {
            flag = true
            setTimeout(() => {
                flag = false
                func.apply(this, args)
            }, ms)
        }
    }
}

// 创建一个节流函数实例
const throttledFunc = throttle(handleClick, 2000);

// 连续调用同一个实例
throttledFunc();
setTimeout(() => throttledFunc(), 500);  // 500ms后再次调用，还在节流时间内
setTimeout(() => throttledFunc(), 2500);  // 2500ms后再次调用
// 只有第一次和第三次调用会执行
