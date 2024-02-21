// front office
// endpoit + key (do not steal is useless)
let endPoint = "https://striveschool-api.herokuapp.com/api/product/";
let apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzOTllNzI0ZjYwNTAwMTkzN2Q0YjAiLCJpYXQiOjE3MDgzNjYzMTEsImV4cCI6MTcwOTU3NTkxMX0.sa1CjCaf4qheNGCPDEa-_8zvpfdmkTuJ5I9hufEiS3M";
// lista prodotti
let prodList = document.getElementById("prodList");
// per riconoscere il back ffice
let back = document.getElementsByTagName("title");
console.log("sei nel " + back[0].innerText);
// per la validazione
let val = document.querySelector("form").classList
// per il form
let form = document.querySelectorAll("input.form-control")
// console.log(prodList);
// se il link non ha l'id allora carica normale
if (!window.location.search) {
    window.onload = () => (
        getprod()
    )    
} else if (window.location.search) { // altrimenti carica la pagina di info
    let params = new URLSearchParams(window.location.search);
    let query = params.get("q");
    fetch(endPoint + query, {
        headers: {
        "Authorization": apiKey
        }
        })
    .then(res => res.json())
    .then(raw => infoCreation(raw))
    .catch(error => console.log("errore info"))

}

// fetch per trovare i prodotti
async function getprod() {
    try {
        let res = await fetch(endPoint, {
        headers: {
        "Authorization": apiKey
        }
        })
    let raw = await res.json();
    console.log(raw);
    createList(raw)    
    } catch (error) {
        console.log("ERRORE FRA");
    }
}
// creazione lista prodotti
function createList(raw) {
    raw.forEach(prod => {
        // creazione
        // console.log(prod);
        let card = document.createElement("div");
        // console.log(card);
        card.classList.add("card");
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        let text = document.createElement("p");
        text.classList.add("card-text");
        let price = document.createElement("p");
        price.classList.add("price", "fw-bold", "fs-3");
        let bot = document.createElement("div");
        bot.classList.add("bot");
        let btn = document.createElement("a");
        // cambia la proprietà del bottone in base alla pagina
        if (back[0].innerText === "Back office") {
            btn.setAttribute('onclick', 'modify()')
            btn.classList.add("desc" ,"btn", "btn-danger", "px-5");
            btn.innerText = "Modifica";  
        } else {
            btn.href = "info.html?q=" + prod._id;
            btn.setAttribute('onclick', 'infoPage()')
            btn.classList.add("desc" ,"btn", "btn-secondary", "px-5");   
        }
        // console.log(btn);

        // per valorizzarli
        img.src= prod.imageUrl;
        img.alt= "Immagine non presente";
        title.innerText = prod.name;
        text.innerText = prod.description;
        price.innerText = "€" + prod.price;

        // per inserirli
        prodList.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody)
        cardBody.appendChild(title)
        cardBody.appendChild(text)
        cardBody.appendChild(price)
        cardBody.appendChild(bot)
        bot.appendChild(btn)
    });
}

// inserisce i risultati nellla pagina info
function infoCreation(raw) {
        let img = document.querySelector("img.img-fluid");
        console.log(img);
        img.src = raw.imageUrl;
        let title = document.querySelector("h2.card-title");
        title.innerText = raw.name;
        let text = document.querySelector("p.card-text")
        // console.log(text);
        text.innerText = raw.description;
        let price = document.querySelector("span.price");
        price.innerText= "€" + raw.price;
        let brand = document.querySelector("span.brend");
        brand.innerText = raw.brand;
}

// aggiungere prodotti

function check() {
    let valCount = 0;
    form.forEach(inp => {
        console.log(valCount);
        if (inp.validity.valid) {
            valCount ++;
            console.log("nuovo cont: " + valCount);
            val.add("was-validated");
        } else {
            val.add("was-validated");
        }
    })
    if (valCount === 5) {
        console.log("a posto fra");
        addProd()
    }
}

async function addProd() {
    
}
// modifica dei prodotti
