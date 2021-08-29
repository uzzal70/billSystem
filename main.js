var products = [];

function setDataOnRow(rowObject, item)
{
  var pName = item.productName;
  var pPrice = item.price;
  $(rowObject).find(".productName").html(pName);
  $(rowObject).find(".price").html(pPrice);
  $(rowObject).find(".noOfQnty").val(1);
  $(rowObject).find(".itemTotal").html(pPrice);
}
function addProduct(item)
{
  var product = {
    id: item.id,
    productName: item.productName,
    price: item.price,
    noOfQnty: 1,
    itemTotal: parseInt(item.price)
  };
  products.push(product);
}
function updateQuantity(e)
{
  var tr = e.target.parentElement.parentElement;
  var id = tr.getAttribute("data-id");
  var quantity = e.target.value;
    for (let product of products) {
      if (product.id == id) {
        product.noOfQnty = quantity;
        product.itemTotal = quantity * product.price;
        tr.childNodes[3].innerText = product.itemTotal;
      }
    }
  calculateTotal();
}
function calculateTotal()
{
  var productTotal = 0;
  for (let product of products) {
    productTotal = productTotal + product.itemTotal;
  }
  $(".totalAmount").text(productTotal);
}

$.typeahead({
  input: '.product',
  minLength: 1,
  maxItem: 15,
  order: "asc",
  template: function (query, item)
  {
    return '<span class="row">' +
      '<span class="productName">{{productName}} <small>(Price: {{price}} tk)</small></span>'
  },
  emptyTemplate: "no result for {{query}}",
  source: {
    product: {
      display: "productName",
      data: [
        { "id": 1, "productName": "Frouit", "price": 125.00 },
        { "id": 2, "productName": "Oil", "price": 150.00 },
        { "id": 3, "productName": "Rice", "price": 55.00 },
        { "id": 4, "productName": "Egg", "price": 100.00 }
      ],
    },
  },

  callback: {
    onClickAfter: function (node, a, item, event)
    {
      event.preventDefault();
      var tr = document.createElement('tr');
      tr.setAttribute("data-id", item.id);
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');

      td1.setAttribute("class", "productName");
      td2.setAttribute("class", "price");
      td4.setAttribute("class", "itemTotal");

      var textQuantity = document.createElement('input');
      textQuantity.setAttribute("class", "noOfQnty");
      textQuantity.setAttribute("size", "5");
      textQuantity.addEventListener('keyup', updateQuantity);

      td3.appendChild(textQuantity);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      setDataOnRow(tr, item);
      $("#tableOrderDetail tbody").append(tr);
      $('.product').val('');
      addProduct(item);
      calculateTotal();
    },

    onInit: function (node, a, item, event)
    {
      console.log('Typeahead Initiated on ' + node.selector);
    }
  }
});



