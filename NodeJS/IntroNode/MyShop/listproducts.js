var list = require('faker');

for (var i = 0; i < 10; i++) {
  console.log(list.commerce.productName() + ' - ' + list.commerce.price());
}
