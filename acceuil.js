const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      let descrip = ["descri1", "descri2", "descri3", "descri4", "descri5"];
      let img = ["img1", "img2", "img3", "img4", "img5"];
      let title = ["titre1", "titre2", "titre3", "titre4", "titre5"];
      let prix = ["prix1", "prix2", "prix3", "prix4", "prix5"];

      console.log(response[i]._id);

      document.getElementById(descrip[i]).innerHTML = response[i].description;
      document.getElementById(img[i]).setAttribute("src", response[i].imageUrl);
      document.getElementById(title[i]).innerHTML =
        "Appareil photo : " + response[i].name;
      document.getElementById(prix[i]).innerHTML =
        "Prix : " + response[i].price + " euro";
    }
  }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
