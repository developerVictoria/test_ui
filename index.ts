type MenuItem = {
  name: string;
  price: number;
}
//to make property option add ? before semicolon 
type Order =  {
  id: number;
  item: MenuItem;
  status: string;
  }

let menu: Array<MenuItem> = [
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

let cashRegister: number = 100;
let nextOrderId: number = 1;
let orderQueue: Array<Order> = [];

function addNewMenuItem(item: MenuItem) {
  menu.push(item);
}


function placeOrder(itemName : string) {
  const selectedItem = menu.find((itemObj) => itemObj.name === itemName);
  if(!selectedItem){
    console.error(`${itemName} doesn't exists in the menu`);
    throw new Error();
  }
  cashRegister += selectedItem.price;
  const newOrder = { id: nextOrderId++, item: selectedItem, status: orderStatus.ORDERED };

  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  let order = orderQueue.find((order) => order.id === orderId);
  if(!order){
    console.error(`№${orderId} order doesn't exist in the queue`);
    throw new Error();
  }
  order.status = orderStatus.COMPLETED;
  return order;
}


addNewMenuItem({name : 'BBQ', price: 5});

placeOrder('BBQ');

completeOrder(1);

console.log("Menu :", menu);
console.log("Cash in register :", cashRegister);
console.log("Order queue :", orderQueue);
