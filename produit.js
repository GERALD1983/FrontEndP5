let id = window.location.search.substring(5);
console.log(id);
const url = `http://localhost:3000/api/cameras/${id}`;

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);

    let descripP = document.getElementById("descrip_produit");
    let imgP = document.getElementById("img_produit");
    let titleP = document.getElementById("title_produit");
    let prixP = document.getElementById("prix_produit");
    let option1 = document.getElementById("lent1");
    let option2 = document.getElementById("lent2");

    descripP.textContent = response.description;
    imgP.setAttribute("src", response.imageUrl);
    titleP.textContent = "Appareil photo : " + response.name;
    prixP.textContent = "Prix : " + response.price + " euro";

    if (response.lenses[1] !== undefined) {
      option1.textContent = response.lenses[0];
      option2.textContent = response.lenses[1];
    } else {
      option1.textContent = response.lenses[0];
      option2.remove(option2);
    }
  }
};
request.open("GET", url);
request.send();
