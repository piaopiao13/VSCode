
function handleClick(event) {
    console.log('Button clicked!');
    // console.log('this is:', this)    // 不使用 apply: window 或 undefined
    // console.log('event:', event)     // undefined
}


function debounce (func, ms) {
    let timer
    // console.log("1", timer)

    // 使用 rest 参数：function(...args) 确保能接收所有传入的参数（包括 event 对象）
    return function(...args) {
        if(timer)
        {
            // console.log('clear')
            clearTimeout(timer)
        }

        // console.log("2", timer)
        // console.log('set')


        // 这里有问题，必须使用 func.apply(this, args)：否则会丢失事件对象的 this 和 event 参数
        // timer = setTimeout( func, ms); 
        
        timer = setTimeout( () => {
            func.apply(this, args)
        }, ms)
        
        // console.log("3", timer)
    }
}

// 创建一个防抖函数实例
const debouncedFunc = debounce(handleClick, 2000);

// 连续调用同一个实例
debouncedFunc();
setTimeout(() => debouncedFunc(), 200);  // 200ms后再次调用
setTimeout(() => debouncedFunc(), 400);  // 400ms后再次调用
setTimeout(() => debouncedFunc(), 3000);  // 3000ms后再次调用，过了上一个的防抖时间2000ms
// 只有最后一次调用会执行，前面的调用都会被取消，因为它们在 2000ms 内被后续调用覆盖了

// 这样每次会执行 debounce，从而创建了多个 timer，而不是共享一个timer，达不到防抖效果
// debounce(handleClick, 100)()
// debounce(handleClick, 100)()
// debounce(handleClick, 100)()


// 事件绑定写法是对的：只会执行一次 debounce，返回的函数作为事件处理器
// 每次点击按钮时，都会调用同一个防抖函数实例
// 所以timer是共享的，达到了防抖效果
// document.querySelector('#debounceBtn').addEventListener('click', debounce(handleClick, 2000));
