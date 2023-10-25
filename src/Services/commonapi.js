import axios from "axios";


export const commonapi = async(method, url, data)=>{
    let reqConfig = {
    method,
    url,
    data,
    headers: {
    "content-type": "application/json",
    },
    }

    return await axios(reqConfig).then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
}