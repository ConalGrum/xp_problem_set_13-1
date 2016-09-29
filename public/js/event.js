window.onload = function() {
  /*btnCategorySubmit.addEventListener('click', function() {
  });*/

    const categoryReq = new XMLHttpRequest();
    categoryReq.open('GET', "/categories");
    categoryReq.responseType = 'json';
    categoryReq.onload = function(res) {
        console.log(res);
    }
    categoryReq.send();

  btnCategorySubmit.onclick = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/categories");
    xhr.responseType = 'json';
    xhr.onload = function(res) {
        console.log(res);
        location.reload(true);

    }
    console.log("----------------------name-------------------- is : ",document.getElementById("txtCategoryName").value)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
        name: document.getElementById("txtCategoryName").value
    }));
  };

  btnProductSubmit.onclick = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/products");
    xhr.responseType = 'json';
    xhr.onload = function(res) {
        console.log(res);
        location.reload(true);

    }

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send
    (
        JSON.stringify
        (
          { name: document.getElementById("txtProductName").value,
            price : document.getElementById("txtPrice").value,
            description : document.getElementById("txtDescription").value,
            categories : ""

          }

        ));
  };

let xhr = new XMLHttpRequest();
xhr.open("GET", "/products");
xhr.responseType = 'json';

xhr.addEventListener('load', (e) => {
  var arrayProducts = e.target.response;
  console.log(e.target.response);
for (var i = 0; i < arrayProducts.length; i++) {
  document.getElementById('divProductLinkControl').innerHTML += arrayProducts[i].name + '<br>';
}
})

xhr.send();
}
