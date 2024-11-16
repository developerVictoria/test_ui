let menu = [
  { name: 'Margarita', price: 1 },
  { name: 'Peperoni', price: 2 },
  { name: 'Hawaian', price: 3 },
  { name: '4 Cheeses', price: 4 }
];

const orderStatus = {
  COMPLETED: 'completed',
  ORDERED: 'ordered',
  INPROGRESS: 'in progress'
};

let cashRegister = 100;
let nextOrderId = 1;
let orderQueue = [];

function addNewMenuItem(item) {
  menu.push(item);
}

function placeOrder(itemName) {
  const selectedItem = menu.find((itemObj) => itemObj === itemName);
  cashRegister += selectedItem.price;
  const newOrder = { id: nextOrderId++, item: selectedItem, status: orderStatus.ORDERED };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId) {
  const order = orderQueue.find((order) => order.id === orderId);
  order.status = orderStatus.COMPLETED;
  return order;
}
