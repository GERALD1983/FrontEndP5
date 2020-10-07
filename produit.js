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
    let lentilles = document.getElementById("lentilles");
    let panier = document.getElementById("panier");

    descripP.textContent = response.description;
    imgP.setAttribute("src", response.imageUrl);
    titleP.textContent = "Appareil photo : " + response.name;
    prixP.textContent = "Prix : " + response.price + " euro";

    for (i = 0; i < response.lenses.length; i++) {
      let option = document.createElement("option");
      lentilles.appendChild(option);
      option.textContent = response.lenses[i];
      option.value = response.lenses[i];
    }

    function clic() {
      console.log("Clic !");
      console.log(
        response.name,
        lentilles.value,
        response.price,
        response.imageUrl
      );

      let tab = {
        name: response.name,
        lentille: lentilles.value,
        prix: response.price,
        img: response.imageUrl,
      };
      let tabLine = JSON.stringify(tab);
      localStorage.setItem("object", tabLine);

      console.log(localStorage.getItem("object"));

      var line = localStorage.getItem("object");
      var objectJs = JSON.parse(line);

      console.log(objectJs);
      console.log(line.length);
      console.log(objectJs.name);
      console.log(localStorage.length);
    }
    panier.addEventListener("click", clic);
  }
};
request.open("GET", url);
request.send();
/*
lentilles.addEventListener("change", function () {
  console.log(lentilles.value);
});*/
/*
console.log(localStorage.length);
localStorage.setItem("timer", 12);
console.log(localStorage.getItem("timer"));

localStorage.setItem("name", "salut");
console.log(localStorage.getItem("name"));
*/
