const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);

    var a = document.getElementById("carte");
    let produit = document.getElementById("produit");

    for (let j = 0; j < response.length - 1; j++) {
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

      console.log("http://localhost:3000/api/cameras/" + response[i]._id);

      let page2 = document.querySelectorAll("#page2");
      page2[i].href = "produit.html?/id=" + response[i]._id;
      console.log(page2);
    }
  }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
