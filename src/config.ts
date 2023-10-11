let host: string = "http://localhost:2001";
const  baseUrl = (url: string): string => { 
   let result:string= host +'/'+ url;
    return result;
}
export default baseUrl;

