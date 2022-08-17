const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const path = process.env.USER_PATH
const Bcrypt = require('bcrypt')
const {MongoClient} = require('mongodb');
// require('dotenv').config();
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const database = "Ecommerce_portal"
const db_connect = async(collection)=>{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection(collection);
}

async function getUserData() {
  let con = await db_connect("users")
  const data = await con.find().toArray()
  return data
}
async function updateUserData(user) {
  try {
    fs.writeFile(path, JSON.stringify(user, null, 2), (error) => {
      if (error) {
        throw error;
      }
      return true;
    });
  } catch (e) {
    return false;
  }
}
async function addUser (user){
  try{
    let con = await db_connect("users")
    const data = await con.insertOne(user)
      return  data.acknowledged
  }catch(e){

  }
}
async function findUserFromEmail (email){
  try{
  const peoples = await getUserData();
  for (let i = 0; i < peoples.length; i++) {
    if (email === peoples[i].email) {
      return true
    }
  }
  return false
}catch (e){
  throw e
}
}

async function findUserFromLoginDetails (email, password){
  const peoples = await getUserData();
    for (let i = 0; i < peoples.length; i++) {
      if(peoples[i].email === email){
      if (Bcrypt.compareSync(password, peoples[i].password)){
        return true
      }
    }
  }
  return false
}


module.exports = { getUserData, updateUserData,addUser,findUserFromEmail ,findUserFromLoginDetails };
