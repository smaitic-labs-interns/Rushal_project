// const Employee = {
//     firstname: 'rushal',
//     lastname: 'maharjan'
//   };
  
//   console.log(Employee.firstname);
//   // expected output: "John"
  
//   delete Employee.firstname;
  
//   console.log(Employee.firstname);
//   // expected output: undefined


// const object1 = {

//               "test":{
//                 name:"john",
//                 age: "20"
//               },
//               "test2":{
//                 name:"cena",
//                 age: "30"
//        }
    
// }
// console.log("before deletion")
// console.log(object1);


// delete object1["test"]
// console.log("after deletion")
// console.log(object1)

// const newItem = {
//     name: "pandey",
//     age: "78"
// }

// object1["test3"] = newItem
// console.log("added new item")
// console.log(object1)

// object1["test3"].name = "arteezy"
// console.log("after update")
// console.log(object1) 




// const object2 = {
//     "etc":{
//         name:"miracle",
//         plays: "dota2"

//     },
//     "etc2":{
//         name:"sumail",
//         plays:"dota2"
//     }
// }
// console.log("before")
// console.log(object2)

// delete object2["etc2"]
// console.log("after deletion")
// console.log(object2)

// const newItem = {
//     name: "rtz",
//     plays: "valorant"
// }
// object2["etc3"] = newItem
// console.log("added new item")
// console.log(object2)

// object2["etc3"].name = "abed"
// console.log("updated new item")
// console.log(object2)

// const valo = {
//     test1: {
//         name: "tenz",
//         plays:"valorant"
//     },
//     test2: {
//         name:"subroza",
//         plays: "valorant"
//     },
//     test3: {
//         name: "hiko",
//         plays: "dota2"
//     }
// }

// console.log("before detele")
// console.log(valo)

// const newItem = {
//     name: "daku",
//     plays: "football"
// }

// delete valo["test3"] , valo["test3"] = newItem
// console.log("deted and added new item")
// console.log(valo)

// valo["test3"].plays = "valorant"
// console.log("updated test3")
// console.log(valo)


const obj = {
    "test1": {
        name: "sandesh",
        plays: "football"
    },
    "test2": {
        name:"tenish",
        plays: "tenis"
    },
    "test3": {
        name:"rushal",
        plays:"with girls"
    }
}

console.log("before deleting")
console.log(obj)
//remove
delete obj["test1"]
console.log("after deletion")
console.log (obj)

//add
const newItem = {
    name: "kuta",
    plays: "kamina"
}
obj["test4"] = newItem
console.log("added item")
console.log(obj)

obj["test4"].name = "rushal"
console.log("updated item")
console.log(obj)



