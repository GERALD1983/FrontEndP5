console.log(localStorage.getItem("object"));
line = localStorage.getItem("object");

objectJs = JSON.parse(line);

console.log(objectJs);
console.log(line.length);
console.log(objectJs[0]);
console.log(localStorage.length);

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response[0].imageUrl);

    var prod = document.getElementById("prod");
    var price = document.getElementById("price");
    var quant = document.getElementById("quant");
    var tot = document.getElementById("tot");
    var soustot = document.getElementById("soustot");

    var produit = document.getElementById("produit");
    var prix = document.getElementById("prix");
    var quantite = document.getElementById("quantite");
    var total = document.getElementById("total");
    var soustotal = document.getElementById("soustotal");

    var img = document.getElementById("img");

    for (j = 0; j < objectJs.length - 1; j++) {
      var cloneproduit = produit.cloneNode(true);
      prod.appendChild(cloneproduit);

      // var cloneimg = img.cloneNode(true);
      //produit.appendChild(cloneimg);

      var cloneprix = prix.cloneNode(true);
      price.appendChild(cloneprix);

      var clonequantite = quantite.cloneNode(true);
      quant.appendChild(clonequantite);

      var clonetotal = total.cloneNode(true);
      tot.appendChild(clonetotal);
    }
    var produitAll = document.querySelectorAll("#produit");
    var prixAll = document.querySelectorAll("#prix");
    var totalAll = document.querySelectorAll("#total");
    var imgAll = document.querySelectorAll("#img");

    console.log(imgAll);

    for (i = 0; i < objectJs.length; i++) {
      console.log(objectJs[i]);
      console.log(objectJs[i][0].name);
      console.log(objectJs[i][0].imageUrl);

      imgAll[i].setAttribute("src", objectJs[i][0].imageUrl);

      produitAll[i].textContent =
        objectJs[i][0].name + "  " + "lenses:  " + objectJs[i][1];
      produitAll[i].appendChild(imgAll[i]);

      prixAll[i].textContent = objectJs[i][0].price;

      totalAll[i].textContent = objectJs[i][0].price;

      soustotal.textContent = prixAll[i].textContent * objectJs.length;
    }
    console.log(prixAll);
  }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
