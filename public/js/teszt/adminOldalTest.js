const { test } = QUnit;

QUnit.module("kicsiE",  (h)=> {

   
    test("letezik-e", (assert)=> {
       
          assert.ok(kicsiE, "letezik");
       
    });
    test("function-e", (assert)=> {  
       
        assert.ok(typeof kicsiE=="function", "function");
     
  });
  test('minden felkapcsolva',(assert)=> {
    let oszlopnev=[]
    
    assert.equal(kicsiE(false,gepek),"9");
  });
 
});
