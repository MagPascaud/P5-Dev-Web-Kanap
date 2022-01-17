console.log('je suis dans le produit');
//récupéer l'ID présent 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

getProduct()
    .then(function (product) {
        displayProduct(product)
    })

//récupérer le produit sélectionné
function getProduct() {
    return fetch('http://localhost:3000/api/products/' + productId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            else {
                console.log("Erreur")
            }
        })
        .then(function (value) {
            return value;
        })
        .catch(function (err) {
            //Erreur
        });
}

//mettre les infos au bon endroit dans le html
function displayProduct(productId) {

    console.log(productId);
    document
        .getElementsByClassName("item__img")
        .innerHTML = `<img src="${productId.imageUrl}" alt="${productId.altTxt}">`;

    document
        .getElementById("title")
        .innerHTML = `<h1 id="title">${productId.name}</h1>`;
    document
        .getElementById("price")
        .innerHTML = `<span id="price">${productId.price}</span>`;
    document
        .getElementById("description")
        .innerHTML = `<p id="description">${productId.description}</p>`;





}


//gérer les évenements de sélection de couleur



//gérer les évenements de quantité



//gérer l'évenement d'ajout de panier