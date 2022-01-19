console.log('je suis dans le produit');
//récupéer l'ID présent 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

getProduct()
    .then(function (product) {
        displayProduct(product)
        colorProduct(product)
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
function displayProduct(product) {
    console.log(product);

    const title = document.getElementById("title");
    title.textContent = `${product.name}`;

    const price = document.getElementById("price");
    price.textContent = `${product.price}`

    const description = document.getElementById("description");
    description.textContent = `${product.description}`

    const image = document.getElementById("image");
    image.src = `${product.imageUrl}`;
    image.alt = `${product.altTxt}`;

    const colors = document.getElementById("colors");
    for (const color of product.colors){
        const option = document.createElement("option");
        option.textContent = color;
        option.value = color;
        colors.appendChild(option);
    }
    colors.addEventListener('change',onColorChange);

    const quantity = document.getElementById("quantity");
    quantity.addEventListener('change',onQuantityChange);
}


//gérer les évenements de sélection de couleur
function onColorChange(event) {
    console.log(event);
    
}
//gérer les évenements de quantité
function onQuantityChange(event) {
    console.log(event);
}


//gérer l'évenement d'ajout de panier