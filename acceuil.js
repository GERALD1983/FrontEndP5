// ajaxget

ajaxGet("http://localhost:3000/api/cameras", afficherProduits);

// recuperation carte html et parent

let carte = document.getElementById("carte");
let produit = document.getElementById("produit");

function afficherProduits(response) {
  console.log(response);

  // boucle de clonage de carte html et association parent

  for (let j = 0; j < response.length - 1; j++) {
    let clone = carte.cloneNode(true);
    produit.appendChild(clone);
  }

  // recuperation de toutes les carte cloner et leur contenu

  let carteClone = document.querySelectorAll("#carte");
  let descrip = document.querySelectorAll("#descri1");
  let img = document.querySelectorAll("#img1");
  let title = document.querySelectorAll("#titre1");
  let prix = document.querySelectorAll("#prix1");
  console.log(carteClone);

  // boucle ajout du contenu dans les differentes cartes et redirection sur la page produit choisi

  for (let i = 0; i < response.length; i++) {
    descrip[i].textContent = response[i].description;
    img[i].setAttribute("src", response[i].imageUrl);
    img[i].setAttribute("height", "330px");
    title[i].textContent = "Appareil photo : " + response[i].name;
    prix[i].textContent = "Prix : " + response[i].price + " euro";

    console.log("http://localhost:3000/api/cameras/" + response[i]._id);

    let pageProduit = document.querySelectorAll("#page2");
    pageProduit[i].href = "produit.html?/id=" + response[i]._id;
    console.log(pageProduit);
  }
}
