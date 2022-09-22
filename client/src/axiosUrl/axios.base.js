import axios from "axios";

const baseAxi = async(apiDetails, body  )=>{
    try{
        // console.log(apiDetails);
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            timeout: 1000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }    
          });
          const res = await instance({
            url: apiDetails.url,
            method: apiDetails.method,
            data: body ? body : " "
          })
          return res
    }catch(err){
        throw err
    }
}
export default baseAxi