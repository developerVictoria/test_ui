type MenuItem = {
  id: number;
  name: string;
  price: number;
};
//union
type Status = "completed" | "ordered" | "in progress" ;
//to make property option add ? before the colon 
type Order =  {
  id: number;
  item: MenuItem;
  status: Status
  };

let cashRegister: number = 100;
let nextOrderId: number = 1;
let nextMenuItemId: number = 1;
let orderQueue: Array<Order> = [];

let menu: Array<MenuItem> = [
  {id:nextMenuItemId++, name: 'Margarita', price: 1 },
  {id:nextMenuItemId++, name: 'Peperoni', price: 2 },
  {id:nextMenuItemId++, name: 'Hawaian', price: 3 },
  {id:nextMenuItemId++, name: '4 Cheeses', price: 4 }
];

//enum
enum orderStatus {
  COMPLETED = "completed",
  ORDERED = "ordered",
  INPROGRESS = "in progress"
};

//function return types  can be any, void, undentified, standart or custom datatypes
function addNewMenuItem(item: Omit<MenuItem, "id">): MenuItem {
  let newItem: MenuItem = { id:nextMenuItemId++, ...item}
  menu.push(newItem);
  return newItem;
}


function getMenuItemDetails(itemIdentifier: string | number): MenuItem | undefined{
  let menuItem:MenuItem|undefined;

  if(typeof itemIdentifier === "string"){
    menuItem = menu.find((item)=>item.name.toLowerCase()===itemIdentifier.toLowerCase());
  }else if(typeof itemIdentifier === "number"){
    menuItem = menu.find((item)=>item.id===itemIdentifier);
  }else{
    throw new TypeError("Parameter identifier must be string or a number");
  }
  //TODO return the msg that claryfies that item doesn't exist in the menu
  /*
  if(!menuItem){
    console.error(`this item: ${itemIdentifier} doesn't exists in the menu`);
    return 
  }
*/    
  return menuItem;
  
}

function placeOrder(itemName : string): Order | undefined{
  const selectedItem = menu.find((itemObj) => itemObj.name === itemName);
  if(!selectedItem){
    console.error(`${itemName} doesn't exists in the menu`);
    throw new Error();
  }
  cashRegister += selectedItem.price;
  const newOrder: Order = { id: nextOrderId++, item: selectedItem, status: orderStatus.ORDERED };

  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined{
  let order = orderQueue.find((order) => order.id === orderId);
  if(!order){
    console.error(`№${orderId} order doesn't exist in the queue`);
    throw new Error();
  }
  order.status = orderStatus.COMPLETED;
  return order;
}



placeOrder('BBQ');
addNewMenuItem({name : 'BBQ', price: 5});
completeOrder(1);

console.log("Menu :", menu);
console.log("Cash in register :", cashRegister);
console.log("Order queue :", orderQueue);
