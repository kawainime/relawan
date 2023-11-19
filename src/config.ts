// let host: string = "http://localhost:2001";
let host: string = "https://relawanku.vercel.app";
const  baseUrl = (url: string): string => { 
   let result:string= host +'/'+ url;
    return result;
}
export default baseUrl;

