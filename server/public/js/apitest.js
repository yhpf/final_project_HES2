// Test the Todo API
// This file is the JS for to test the Todo app API
// the html code to the test can be found in index.html

(function(){
  const baseURL = 'http://167.172.150.105:8081'; // this has to be changed to the correct URL when live

  function testAPIs(){
    // test list first
    var testId = '';
    var testJSON = {};

    // LIST
    callAPI('GET', '/api/index', null, null)
      .then((list)=>{
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        testId = list[0]._id;

      // CREATE
      let input = document.querySelector('input[type="file"]')
      let data = new FormData()
      data.append('file', input.files[0]);
      data.append('title', 'Title API test');
      data.append('description','This is an AJAX API test. I hope it is working.');
      data.append('duedate', '2022-05-03T00:00:00.000Z');
      callAPI('POST', '/api/index', null, data)
        .then((todo)=>{
          todoId = todo._id;
          savedTodo = todo;  // keep a handle to the created todo object
          console.log('\n\n***************************\ncreate results:');
          console.log(todo);

        // find
        callAPI('GET','/api/index/'+todoId, null, null)
          .then((todo)=>{
            console.log('\n\n***************************\nfind results:');
            console.log(todo);

          // update
          testJSON.description += ' appended by the AJAX API ';
          callAPI('PUT','/api/index/'+todoId, null, savedTodo)
            .then((todo)=>{
              console.log('\n\n***************************\nupdate results:');
              console.log(todo);

            //delete
            callAPI('DELETE', '/api/index/'+todoId, null, null)
              .then((result)=>{
               console.log('\n\n***************************\ndelete result:');
               console.log(result);
              })

            });
          });
        });
      })
    .catch((err)=>{
      console.error(err);
    });
  }


  async function callAPI(method, uri, params, body){
    jsonMimeType = {
      'Content-type':'application/json'
    }
    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
      var response = await fetch(baseURL + uri, {
        method: method, // GET, POST, PUT, DELETE, etc.
        ...(method=='POST' ? {body: body} : {}),
        ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
      });
      return response.json(); // parses response to JSON
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }

  // Calls our test function when we click the button
  //  afer validating that there's a file selected.
  document.querySelector('#testbutton').addEventListener("click", ()=>{
    let input = document.querySelector('input[type="file"]')
    if (input.value){
      testAPIs();
    }else{
      alert("please select a file first");
    }
  });
})();