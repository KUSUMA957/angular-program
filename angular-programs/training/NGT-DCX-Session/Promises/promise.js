// //promise is an built in object that represents a value that may be available in terms of success/resolved or rejected or pending
// //handles asynchronos operatisn like login validation
// // and database queries 
// const myPromise = new Promise((resolve,reject)=>{
//     let success = true;
//     if(success){
//         resolve("Task Completed");
//     }else{
//         reject("Task Failed");
//     }
// });
// myPromise.then(result=>{console.log(result);}).catch(error=>{
//    console.log(error);
// });
// // resolve changes the promise state pending to fulfilled and passes alue task completed to the then 
// // and if not completed it changes from pending to rejected
// // catch works when promis is failed 
// // promise craeed - pending 
// // success -resolved
// // failuer - rejects 
// function Login(username,password){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(username == "admin" && password ==="password"){
//                 resolve("Login Successful");
//             }else{
//                 reject("invalid credentials");
//             }
//         } , 3000);
//     });
// }
// Login("admin","password")
//     .then(result=>{
//         console.log(result);
//     }).catch(error=>{
//         console.log(error);
//     });
//     // fetch("https://jsonplaceholder.typicode.com/users")
//     // .then(response=>{
//     //     if(!response.ok){
//     //         throw new Error(" neetwork response is not ok");
//     //     }
//     //     return response.json();
//     // })
//     // .then(users => {
//     //     users.forEach(user => {
//     //         console.log("User Name: " + user.name);
//     //         console.log("Email: " + user.email);
//     //         console.log("City: " + user.address.city);
//     //         console.log("-------------------");
//     //     });
//     // })
//     // .catch(error => {
//     //     console.error("There was a problem with the fetch operation:", error);
//     // });

//     fetch("https://jsonplaceholder.typicode.com/users/1")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Network response is not ok");
//         }
//         return response.json();
//     })
//     .then(user => {
//         console.log("User Name: " + user.name);
//         console.log("Email: " + user.email);
//         console.log("City: " + user.address.city);
//         console.log("-------------------");
//     })
//     .catch(error => {
//         console.error("There was a problem with the fetch operation:", error);
//     });
//     // fetch is  a method return promises and convert response to json
//     fetch("https://jsonplaceholder.typicode.com/posts",{method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body:JSON.stringify({title:"foo", body:"bar", userId:1})})
//     .then(response =>response.json())
//     .then(data =>{
//        console.log("Post created with ID: " + data.id);
//        })
//        .catch(error =>{
//            console.error("Error creating post:", error.message);
//        }
//        );

// async function functionName(){
//     return "Result";
// }
// functionName().then(result=>{
//     console.log(result);
// }).catch(error=>{
//     console.error(error);
// });
// // the function return s a promise taht 
// //Makes function asynchronous, returns a Promise
// //await is used to wait for promise 
// //it will be used to wait for promise
// // to resolve or reject before moving 
// function fetchData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const data = "Data fetched from server";
//             resolve(data);  // sending success result
//         }, 2000);
//     });
// }

// fetchData()
//     .then(result => {
//         console.log(result);   // prints after 2 seconds
//     })
//     .catch(error => {
//         console.error("Error fetching data:", error);
//     });
// // Promise‑based function
// function fetchData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const data = "Data fetched from server";
//             resolve(data);   // success
//         }, 2000);
//     });
// }

// // async/await function
// async function getData() {
//     try {
//         const result = await fetchData();   // wait for the promise
//         console.log(result);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// getData();   // calling the async function
async function getUserById() {
    try {
        const response = await fetch("http://localhost:8080/api/users/1");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const user = await response.json();

        console.log("User ID: " + user.userId);
        console.log("username"+user.username);
        //console.log("full name"+user.fullName);
        //console.log("User Name: " + user.name);
        //console.log("Email: " + user.email);
        //console.log("City: " + user.address.city);
        console.log("-----------------------");

    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
}

getUserById();//await  pass function until promise resolves
// applications of async and await are 
//alling apis 
//file operations
//database queries 
//payment processing 
//micro service communication
// error handling in asynchronous code
async function getUsers() {
    try {
        const response = await fetch("http://localhost:8080/api/users/all");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const users = await response.json();

        users.forEach(user => {
            console.log("User ID: " + user.userId);
            console.log("Username: " + user.username);
            console.log("Full Name: " + user.fullName);
            console.log("Email: " + user.email);
            console.log("-----------------------");
        });
    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
}
getUsers();
async function getUserByName() {
    try {
        const response = await fetch("http://localhost:8080/api/users/search/John%20Doe");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const user1 = await response.json();
        console.log("User ID: " + user1.userId);
        console.log("username"+user1.username);
        console.log("full name"+user1.fullName);
        //console.log("User Name: " + user.name);
        console.log("Email: " + user1.email);
        //console.log("City: " + user.address.city);
        console.log("-----------------------");

    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
}
getUserByName();
async function getAttachmentById() {
    try {
        const response = await fetch("http://localhost:8080/api/attachments/1");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const user2 = await response.json();

        console.log("attachmentiD: " + user2.attachmentId);
        console.log("filename"+user2.fileName);
        console.log("filepath"+user2.filePath);
        //console.log("User Name: " + user.name);
        //console.log("Email: " + user.email);
        //console.log("City: " + user.address.city);
        console.log("-----------------------");

    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
}
getAttachmentById();
async function getUsersMost() {
    try {
        const response = await fetch("http://localhost:8080/api/users/most-tasks");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const users = await response.json();

        users.forEach(user => {
            console.log("User ID: " + user.userId);
            console.log("Username: " + user.username);
            console.log("Full Name: " + user.fullName);
            console.log("Email: " + user.email);
            console.log("-----------------------");
        });
    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
}
getUsersMost();
async function getTaskByCategoryId() {
    try {
      const response = await fetch("http://localhost:8080/api/tasks/category/3");
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      console.log("RAW:", data); 
  
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  }
  getTaskByCategoryId();
  