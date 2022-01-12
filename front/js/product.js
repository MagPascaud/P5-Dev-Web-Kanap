console.log('je suis dans le produit');
//récupéer l'ID présent 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//récupérer le produit sélectionné
function getProduct(){
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

//mettre les infos au bon endroit dans le html



//gérer les évenements de sélection de couleur



//gérer les évenements de quantité



//gérer l'évenement d'ajout de panier