const API_KEY = "pub_714bc1b9216d4dd2a1a221ec1ea00339";

export async function fetchNews(){
    const response = await fetch(`https://newsdata.io/api/1/latest?language=en&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data)

     if(!response.ok){
        alert("failed to fetch api");
        throw new Error(data.message);
    }

    return data.results;
}