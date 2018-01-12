// Storage Controller





// Item Controller
const ItemCtrl = (function() {
 //Item Constructor
 const Item = function(id, name, calories){
   this.id = id
   this.name = name
   this.calories = calories
 }
 // Data Structure / State
 const data = {
   items: [
     /*{
       id: 0,
       name: 'Steak Dinner',
       calories: 1200
     },
     {
       id: 1,
       name: 'Cookie',
       calories: 400
     },
     {
       id: 2,
       name: 'Eggs',
       calories: 200
     },*/
     ],
   currentItem: null,
   totalCalories: 0
 }
 return {
   getItems: function(){
    return data.items 
   },
   
   addItem: function(name, calories){
     let ID
     //Create ID
     if(data.items.length > 0){
       ID = data.items[data.items.length - 1].id + 1
     } else {
       ID = 0
     }
     //Calories To Number
     calories = parseInt(calories)
     
     //Create new item
     newItem = new Item(ID, name, calories)
     
     //Add To Item Array
     data.items.push(newItem)
     
     return newItem
   },
   
   logData: function(){
     return data
   }
 }
})()







// UI Controller
const UICtrl = (function() {
  
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  // Public Method
  return {
    populateItemList: function(items){
      let html = ''
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
			</li>
        `
      })
      //Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    
    getSelectors: function(){
      return UISelectors
    },
    addListItem: function(item){
			//Show The List
			document.querySelector(UISelectors.itemList).style.display = 'block'
      //Create Li Element
      const li = document.createElement('li')
      //Add Class
      li.className = 'collection-item'
      //Add Id
      li.id = `item-${item.id}`
      //Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`
			//Insert Item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
      document.querySelector(UISelectors.itemNameInput).value = ''
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none'
    }
  }
})()









// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function(){
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors()
    
    
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit)
    
  }
  
  // Add item submit
  const itemAddSubmit = function(e){
    
    // Get form input from UI Controller
    const input = UICtrl.getItemInput()
    
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      //Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      
      //Add item to UI list
      UICtrl.addListItem(newItem)
      
      //Clear Fields
      UICtrl.clearInput()
    }
    
    e.preventDefault()
  }
  
  // Public Method
  return {
    init: function(){
      
      //Fetch items from data structure
      const items = ItemCtrl.getItems()
      
      // Check if any items
      if(items.length === 0){
        UICtrl.hideList()
      } else {
        //Populate list with items
        UICtrl.populateItemList(items)
      }
      
      
      //Load Event Listeners
      loadEventListeners()
    }
  }
})(ItemCtrl, UICtrl)


// Initializing App
  AppCtrl.init()