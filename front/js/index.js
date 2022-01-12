console.log("je suis dans l'accueil");
getProducts()
    .then(function (products) {
        displayProducts(products)
    })
//ce fichier doit aller chercher la liste de produits depuis le serveur
function getProducts() {
    return fetch('http://localhost:3000/api/products')
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
//puis afficher les produits dans la section items
function displayProducts(products) {
    const itemsSection = document.getElementById("items");
    for (const product of products) {
        console.log(product);
        const link = document.createElement("a");
        link.href = `./product.html?id=${product._id}`;
        link.innerHTML = `<article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`;
        itemsSection.appendChild(link)

    }
}
