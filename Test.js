function foo() {

  console.log(this);
  console.log(this.a);
  
  // 返回一个箭头函数
  return (a) => {
    //this 继承自 foo()         
    console.log( this.a );      
  }; 
}  

var obj1 = {      
  a:2 
};  

var obj2 = {      
  a:3 100
};  

var bar = foo.call( obj1 ); 

bar.call( obj2 ); // 2, 不是 3 !
