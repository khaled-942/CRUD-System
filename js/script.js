let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDescription = document.getElementById("productDescription");
let addBtn = document.getElementById("addBtn");
let deleteBtn = document.getElementById("deleteProduct");
let tableBody = document.getElementById("tableBody");

let index;
let productContainer;
if (localStorage.getItem("crudProject") == null) {
   productContainer = [];
}
else {

   productContainer = JSON.parse(localStorage.getItem("crudProject"));
   displayProduct()
}
function addProduct() {
   if (addBtn.innerHTML == "Add Product") {
      let product = {
         name: productName.value,
         price: productPrice.value,
         category: productCategory.value,
         description: productDescription.value
      }
      productContainer.push(product);
      localStorage.setItem('crudProject', JSON.stringify(productContainer));
      clearData();
      displayProduct()
   }
   else if (addBtn.innerHTML == "Update") {
      realUpdate(index);
   }

}


addBtn.addEventListener("click", addProduct);

function clearData() {
   productName.value = "";
   productPrice.value = "";
   productCategory.value = "";
   productDescription.value = "";
}


function displayProduct() {
   let box = "";
   for (let i = 0; i < productContainer.length; i++) {
      box +=
         `
   <tr>
      <td>
         ` + i + `
      </td>
      <td>
         ` + productContainer[i].name + `
      </td>
      <td>
      ` + productContainer[i].price + `
      </td>
      <td>
      ` + productContainer[i].category + `
      </td>
      <td>
      ` + productContainer[i].description + `
      </td>
      <td>
         <button class="btn btn-outline-warning" onclick = "forUpdate(`+ i + `)">Update</button>
      </td>
      <td>
         <button class="btn btn-outline-danger" onclick = "deletePro(`+ i + `)">Delete</button>
      </td>
   </tr>
   `
   }
   tableBody.innerHTML = box;
}


function deletePro(productIndex) {
   productContainer.splice(productIndex, 1);
   localStorage.setItem('crudProject', JSON.stringify(productContainer));
   displayProduct();
}

function forUpdate(productIndex) {

   productName.value = productContainer[productIndex].name;
   productPrice.value = productContainer[productIndex].price;
   productCategory.value = productContainer[productIndex].category;
   productDescription.value = productContainer[productIndex].description;
   addBtn.innerHTML = "Update";
   index = productIndex;
}

function realUpdate(index) {
   productContainer[index].name = productName.value;
   productContainer[index].price = productPrice.value;
   productContainer[index].category = productCategory.value;
   productContainer[index].description = productDescription.value;
   localStorage.setItem('crudProject', JSON.stringify(productContainer));
   displayProduct();
   clearData();
   addBtn.innerHTML = "Add Product";
}

function search(item) {
   let box2 = '';
   for (let i = 0; i < productContainer.length; i++) {
      if (productContainer[i].name.toLowerCase().includes(item.toLowerCase())) {
         box2 +=
            `
         <tr>
      <td>
         ` + i + `
      </td>
      <td>
         ` + productContainer[i].name + `
      </td>
      <td>
      ` + productContainer[i].price + `
      </td>
      <td>
      ` + productContainer[i].category + `
      </td>
      <td>
      ` + productContainer[i].description + `
      </td>
      <td>
         <button class="btn btn-outline-warning" onclick = "forUpdate(`+ i + `)">Update</button>
      </td>
      <td>
         <button class="btn btn-outline-danger" onclick = "deletePro(`+ i + `)">Delete</button>
      </td>
   </tr>

         `
      }
   }
   tableBody.innerHTML = box2;
}