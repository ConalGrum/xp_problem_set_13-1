'use strict'
window.onload = function() {

    const categoryReq = new XMLHttpRequest();
    categoryReq.open('GET', "/categories");
    categoryReq.responseType = 'json';
    categoryReq.onload = function(res) {
        res.currentTarget.response.forEach(function(category) {
            var checkbox = document.createElement("input");
            var label = document.createElement("label");
            var description = document.createTextNode(category.name);
            checkbox.id = category.name;
            checkbox.type = "checkbox"; // make the element a checkbox
            checkbox.name = "categories"; // give it a name we can check on the server side
            label.appendChild(checkbox);
            label.appendChild(description);
            document.getElementById('categories').appendChild(label);
            console.log(category);
        });
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
        console.log("----------------------name-------------------- is : ", document.getElementById("txtCategoryName").value)
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

        var result = {}
        var checkboxes = document.getElementById('categories');
        checkboxes.childNodes.forEach(function(category) {
            if (category.checked) {
                console.log("category name is : ", category.name)
                result.push("test")
            }
        })

        xhr.send(
            JSON.stringify({
                name: document.getElementById("txtProductName").value,
                price: document.getElementById("txtPrice").value,
                description: document.getElementById("txtDescription").value,
                //categories: result
            }));
    };

    // var checkboxValues = function() {
    //     var result = []
    //     var checkboxes = document.getElementById('categories');
    //     checkboxes.childNodes.forEach(function(category) {
    //         if (category.checked) {
    //             console.log("category name is : ", category.name)
    //             result.push("test")
    //         }
    //     })
    // }
}
