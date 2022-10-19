import axios from "axios";

async function baseAxi({apiDetails, path={}, query={}, body={}, headers={}}) {
    try {
      Object.entries(path).map(data=>{
        console.log(data[0]);
        console.log(data[1]);
        apiDetails.url= (apiDetails.url).replace(`:${data[0]}`, data[1]);
      
    })
    // console.log(apiDetails);
    // console.log(path);
      const instance = axios.create({
        baseURL: "http://localhost:8000/api/",
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      
          ...headers
      }
      });
      const res = await instance({
          url: apiDetails.url,
          method: apiDetails.method,
          data: body,
          params:query
        })
        return res
    } catch (err) {
      throw err;
    }
  }
export default baseAxi

 