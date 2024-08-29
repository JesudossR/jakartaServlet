const uri = "http://localhost:8080/hello";
let models = [];

function getItems() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayAllItems(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}

function displayAllItems(data) {
    const tBody = document.getElementById("models");
    tBody.innerHTML = "";

    data.forEach((item) => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.id));

        let td2 = tr.insertCell(1);
        td2.appendChild(document.createTextNode(item.modelName));

        let td3 = tr.insertCell(2);
        td3.appendChild(document.createTextNode(item.year));

        let td4 = tr.insertCell(3);
        td4.appendChild(document.createTextNode(item.price));

        let td5 = tr.insertCell(4);
        td5.appendChild(document.createTextNode(item.company));

        let td6 = tr.insertCell(5);
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.setAttribute("onclick", `editItem(${item.id})`);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);
        td7.appendChild(deleteButton);
    });

    models = data;
}

function addItem() {
    const model = {
        id: document.getElementById("id").value.trim(),
        modelName: document.getElementById("modelname").value.trim(),
        year: parseInt(document.getElementById("year").value.trim()),
        price: parseInt(document.getElementById("price").value.trim()),
        company: document.getElementById("company").value.trim()
    };

    if (!model.modelName || isNaN(model.year) || isNaN(model.price) || !model.company) {
        alert("Please fill out all fields correctly.");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", uri, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            getItems(); // Refresh the list of items
        } else if (this.readyState == 4) {
            console.error("Error adding item. Status:", this.status);
        }
    };
    xhttp.send(JSON.stringify(model));
}

function deleteItem(id) {
    const item = { id: id };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", uri, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 204) {
            getItems(); // Refresh the list of items
        } else if (this.readyState == 4) {
            console.error("Error deleting item. Status:", this.status);
        }
    };
    xhttp.send(JSON.stringify(item));
}

function editItem(id) {
    const model = models.find(m => m.id === id);
    if (!model) return;

    document.getElementById("modelname").value = model.modelName;
    document.getElementById("year").value = model.year;
    document.getElementById("price").value = model.price;
    document.getElementById("company").value = model.company;

    const saveButton = document.getElementById("myBtn");
    saveButton.innerText = "Update";
    saveButton.setAttribute("onclick", `updateItem(${id})`);
}

function updateItem(id) {
    const model = {
        id: id,
        modelName: document.getElementById("modelname").value.trim(),
        year: parseInt(document.getElementById("year").value.trim()),
        price: parseInt(document.getElementById("price").value.trim()),
        company: document.getElementById("company").value.trim()
    };

    if (!model.modelName || isNaN(model.year) || isNaN(model.price) || !model.company) {
        alert("Please fill out all fields correctly.");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", uri, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 204) {
            getItems(); // Refresh the list of items
            resetForm();
        } else if (this.readyState == 4) {
            console.error("Error updating item. Status:", this.status);
        }
    };
    xhttp.send(JSON.stringify(model));
}

function resetForm() {
    document.getElementById("modelname").value = "";
    document.getElementById("year").value = "";
    document.getElementById("price").value = "";
    document.getElementById("company").value = "";
    const saveButton = document.getElementById("myBtn");
    saveButton.innerText = "Save";
    saveButton.setAttribute("onclick", "addItem()");
}
