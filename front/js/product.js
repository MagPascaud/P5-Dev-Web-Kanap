console.log('je suis dans le produit');
//récupéer l'ID présent 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const colorSelect = document.getElementById("colors");
const quantitySelect = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", onAddToCart);
let product;

getProduct()
    .then(function (productFromApi) {
        product = productFromApi;
        displayProduct()

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
function displayProduct() {
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
    for (const color of product.colors) {
        const option = document.createElement("option");
        option.textContent = color;
        option.value = color;
        colors.appendChild(option);
    }
    colors.addEventListener('change', onColorChange);

    const quantity = document.getElementById("quantity");
    quantity.addEventListener('change', onQuantityChange);
}

//gérer les évenements de sélection de couleur
function onColorChange(event) {
    console.log(event.target.value);
    product.selectedColor = event.target.value;

}
//gérer les évenements de quantité
function onQuantityChange(event) {
    console.log(event.target.value);
    product.selectedQuantity = parseInt(event.target.value);
}
//gérer l'évenement d'ajout de panier
function onAddToCart(event) {
    const { price, ...productWithoutPrice } = product;

    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
    const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
    if (!product.selectedQuantity) {
        alert("vous devez choisir une quantité");
        return
    }
    if (!product.selectedColor) {
        alert("vous devez choisir une couleur");
        return
    }
    if (product.selectedQuantity < 1 || product.selectedQuantity > 100) {
        alert("vous devez choisir une quantité entre 1 et 100");
        return
    }
    if (basketLocalStorage.length) {
        console.log("le tableau est plein");
        let sameProductIndex;
        const sameProduct = basketLocalStorage.find(function (el, i) {
            if (productId === el._id && el.selectedColor === product.selectedColor) {
                sameProductIndex = i;
                return true;
            }
        });
        if (!sameProduct) {

            basketLocalStorage.push(productWithoutPrice);
        }
        else {
            sameProduct.selectedQuantity += product.selectedQuantity;
            basketLocalStorage[sameProductIndex] = sameProduct;
        }
    } else {
        console.log("le tableau est vide");
        basketLocalStorage.push(productWithoutPrice);
    }
    localStorage.setItem("basket", JSON.stringify(basketLocalStorage));
    alert("Votre article est ajouté au panier");
}