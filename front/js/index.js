//Appel des fonctions de récupération et d'affichage de la liste des produits
getProducts()
    .then(function (products) {
        displayProducts(products)
    });
//Ce fichier doit aller chercher la liste de produits depuis le serveur
function getProducts() {
    return fetch('http://localhost:3000/api/products')
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            else {
                console.error("Erreur")
            }
        })
        .then(function (value) {
            return value;
        })
        .catch(function (err) {
            alert("la liste des produits n'a pas pu être chargée");
        });
}
//Afficher les produits dans la section items
function displayProducts(products) {
    const itemsSection = document.getElementById("items");
    for (const product of products) {
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