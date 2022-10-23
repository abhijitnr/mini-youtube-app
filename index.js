// My api key = "AIzaSyD3WKXZwbplcvQ2BlmIj4n3FlyFpvY_47M"

let search = () => {
    let query = document.querySelector("#query").value;
    getData(query)
}

let getData = async (query) => {

    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyD3WKXZwbplcvQ2BlmIj4n3FlyFpvY_47M`;

    let res = await fetch(url);
    let data = await res.json();

    appendData(data.items);
    //console.log(data.items);

    //return data.items;
}


let appendData = (data) => {

    let container = document.querySelector("#container");

    container.innerHTML = null

    data.forEach((el) => {

        let childDiv = document.createElement("div");
        childDiv.onclick = () => {
            saveVideo(el);
        };
        childDiv.setAttribute("class", "childDiv")

        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;

        let h3 = document.createElement("h3");
        h3.innerText = el.snippet.title;

        childDiv.append(img, h3);
        container.append(childDiv);
    })
};

let saveVideo = (data) => {
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href = "play.html";
};



// For showing the data on homePage

let url1 = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=58&q=india&key=AIzaSyD3WKXZwbplcvQ2BlmIj4n3FlyFpvY_47M"

    async function getProduct(){
        try {
            let response = await fetch(url1);
            let product = await response.json();
    
            appendDatainHome(product.items)
            console.log(product);
        } catch (error){
            console.log(error);
        }
    }
    getProduct();
    
    function appendDatainHome(product) {
    
        document.querySelector("#container").innerHTML = null;

        product.forEach(function(el){
            
            let childDiv = document.createElement("div");
            childDiv.onclick = () => {
                saveVideo(el);
            };
            childDiv.setAttribute("class" , "thumb")
    
            let img = document.createElement("img");
            img.src = el.snippet.thumbnails.medium.url;;
    
            let name = document.createElement("h3");
            name.innerText = el.snippet.title;
    
            childDiv.append(img, name);
            document.querySelector("#container").append(childDiv);
        });
    }

    let filter = async (data) => {
        let datas = await getData(data);
        console.log(datas);
        datas = datas.filter((el) => {
          return el.snippet.channelId === "UCc5FkTYiWH5L3Gk5IyW6Rmw";
        });
       displayVideos(datas);
      };