const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    // for (let i = 0; i < response.length; i++) {
    //   let descrip = ["descri1", "descri2", "descri3", "descri4", "descri5"];
    //   let img = ["img1", "img2", "img3", "img4", "img5"];
    //   let title = ["titre1", "titre2", "titre3", "titre4", "titre5"];
    //   let prix = ["prix1", "prix2", "prix3", "prix4", "prix5"];

    //   console.log(response[i]._id);

    //   document.getElementById(descrip[i]).innerHTML = response[i].description;
    //   document.getElementById(img[i]).setAttribute("src", response[i].imageUrl);
    //   document.getElementById(title[i]).innerHTML =
    //     "Appareil photo : " + response[i].name;
    //   document.getElementById(prix[i]).innerHTML =
    //     "Prix : " + response[i].price + " euro";
    // }

    /*let produit = document.getElementById("produit");
    var carte = `<div class="card border-primary shadow"><img class="card-img-top" src="" alt="logo-job" height="355px"/><div class="card-body"><h4 class="card-title">Appareil photo :</h4><h6>Description : </h6><p class="card-text"></p><h6 class="pb-1">Prix : euro</h6><a class="btn btn-info" href="produit.html" role="button">Voir le produit</a></div></div>`;
    /* var carte = `<div class="card border-primary shadow"><img class="card-img-top" src="${response[i].imageUrl}" alt="logo-job" height="355px"/><div class="card-body"><h4 class="card-title">Appareil photo : ${response[i].name}</h4><h6>Description : </h6><p class="card-text">${response[i].description}</p><h6 class="pb-1">Prix : ${response[i].price} euro</h6><a class="btn btn-info" href="produit.html" role="button">Voir le produit</a></div></div>`;
     */
    // console.log(response[i]._id);
    // document.getElementById(descrip[i]).innerHTML = response[i].description;
    // document.getElementById(img[i]).setAttribute("src", response[i].imageUrl);
    // document.getElementById(title[i]).innerHTML =
    //   "Appareil photo : " + response[i].name;
    // document.getElementById(prix[i]).innerHTML =
    //   "Prix : " + response[i].price + " euro";
    var a = document.getElementById("carte");
    let produit = document.getElementById("produit");

    for (let i = 0; i < response.length - 1; i++) {
      var clone = a.cloneNode(true);
      produit.appendChild(clone);
    }
    let carteClone = document.querySelectorAll("#carte");
    console.log(carteClone);
    let descrip = document.querySelectorAll("#descri1");
    let img = document.querySelectorAll("#img1");
    let title = document.querySelectorAll("#titre1");
    let prix = document.querySelectorAll("#prix1");

    for (let i = 0; i < response.length; i++) {
      descrip[i].textContent = response[i].description;
      img[i].setAttribute("src", response[i].imageUrl);
      title[i].textContent = "Appareil photo : " + response[i].name;
      prix[i].textContent = "Prix : " + response[i].price + " euro";
    }
  }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
