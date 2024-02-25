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
let val = document.querySelector("form");
// per il form
let form = document.querySelectorAll(".form-control")
console.log(form);

let n = document.getElementById("nameval");
let b = document.getElementById("brandval");
let p = document.getElementById("priceval");
let d = document.getElementById("descval");
let i = document.getElementById("imgval");

let tempMod;

// query string
let params = new URLSearchParams(window.location.search);
let query = params.get("q");
// console.log(prodList);
// se il link non ha l'id allora carica normale
if (!window.location.search) {
    window.onload = () => (
        getprod()
    )    
} else if (window.location.search) { // altrimenti carica la pagina di info
    // let params = new URLSearchParams(window.location.search);
    // let query = params.get("q");
    fetch(endPoint + query, {
        headers: {
        "Authorization": apiKey,
        "Content-type": "application/json;charset=UTF-8"
        }
        })
    .then(res => res.json())
    .then(raw => infoCreation(raw))
    .catch(error => allert("errore info"))

}

// fetch per trovare i prodotti
async function getprod() {
    try {
        let res = await fetch(endPoint, {
        headers: {
        "Authorization": apiKey,
        "Content-type": "application/json;charset=UTF-8"
        }
        })
    let raw = await res.json();
    console.log(raw);
    createList(raw)    
    } catch (error) {
        alert("nell'ottenere i dati dal server");
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
        img.setAttribute('alt', 'IMAGE NOT FOUND')
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.setAttribute('id', 'C-' + prod._id)
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
            btn.setAttribute('id', prod._id)
            btn.classList.add("desc" ,"btn", "btn-danger", "px-5");
            btn.innerText = "Modifica";  
        } else {
            btn.href = "info.html?q=" + prod._id;
            btn.setAttribute('onclick', 'infoPage()')
            btn.classList.add("desc" ,"btn", "btn-secondary", "px-5"); 
            btn.innerText = "Info";   
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
// verifica se i campi sono compilati
function check() {
    let valCount = 0;
    form.forEach(inp => {
        // console.log(valCount);
        if (inp.validity.valid) {
            valCount ++;
            console.log("nuovo cont: " + valCount);
            val.classList.add("was-validated");
        } else {
            val.classList.add("was-validated");
        }
    })
    if (valCount === 5) {
        console.log("validazione a posto fra");
        addProd()
    }
}
// crea tutti i prodotti
async function addProd() {
    // 0 name , 1 brand , 2 price , 3 description , 4 img
    try {
        // payload

        console.log(n);
        console.log(b);
        console.log(p);
        console.log(d);
        console.log(i);

        // body
        let Mybody = { name: n.value, description: d.value, brand: b.value, imageUrl: i.value, price: p.value};
        // post per aggiungere prodotto
        let post = await fetch(endPoint, {
            method: "POST", body: JSON.stringify(Mybody),
            headers: {
            "Authorization": apiKey,
            "Content-type": "application/json;charset=UTF-8"
            }
            });
        let res = await post.json()
        console.log(res);  
    } catch (error) {
        alert("errore nel post");
    }  
}
// modifica dei prodotti
// fa partire la modifica e copia i dati nel form
async function modify() {
    try {
        tempMod = event.target.id;
        console.log(tempMod + " è l'id");
        let allBtn = document.querySelectorAll("a.btn");
        console.log(allBtn);
        console.log("sopra sono i bottoni");

        allBtn.forEach(bt => {
            console.log(bt.id);
            if (bt.id !== "subProd") {
                bt.classList.add("disabled")
            } else {
                bt.innerText = "Done";
                bt.setAttribute('onclick', 'verify()')
            }
    })
        let get = await fetch(endPoint + tempMod, {
            headers: {
                "Authorization": apiKey,
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        let raw = await get.json();
        console.log("risultato mod get:");
        console.log(raw);
        n.value = raw.name;
        b.value = raw.brand;
        p.value = raw.price;
        d.value = raw.description;
        i.value = raw.imageUrl;
        alert("Return back to top to modify")   
    } catch (error) {
        alert("errore nel tentare di modificare")
    }  
}
// modifiche finite
// verifica se tutti i campi sono compilati
function verify() {
    let valCount = 0;
    form.forEach(inp => {
        // console.log(valCount);
        if (inp.validity.valid) {
            valCount ++;
            console.log("nuovo cont: " + valCount);
            val.classList.add("was-validated");
        } else {
            val.classList.add("was-validated");
        }
    })
    if (valCount === 5) {
        alert("Tutti i campi sono validi");
        putProd()
   } else {
        alert("Riempire tutti i campi")
   }
}

async function putProd() {
    try {
        // let tempD = event.target.id;
        console.log(tempMod + " è l'id");
        let allBtn = document.querySelectorAll("a.btn");
        console.log(allBtn);
        console.log("sopra sono i bottoni");
        // let cardBody = document.getElementById("C-" + tempD)
        // console.log(cardBody.children);

        let myBody = { "name": n.value, "description": d.value, "brand": b.value, "imageUrl": i.value, "price": p.value};
        console.log(myBody);
        let put = await fetch(endPoint + tempMod, {
            method: "PUT", body: JSON.stringify(myBody),
            headers: {
            "Authorization": apiKey,
            "Content-type": "application/json;charset=UTF-8"
            }
            })
        let raw = await put.json();
        console.log("questo è il put:");
        console.log(raw);    
        allBtn.forEach(bt => {
            console.log(bt.id);
            if (bt.id !== "subProd") {
                bt.classList.remove("disabled")
                bt.setAttribute('onclick', 'modify()')
                bt.innerText = "Modify";
            } else {
                bt.classList.remove("disabled")
            }
        })
        alert("Prodotto modificato! Ricarica la pagina per vedere");
    } catch (error) {
            alert("errore nel put");
    }
}
