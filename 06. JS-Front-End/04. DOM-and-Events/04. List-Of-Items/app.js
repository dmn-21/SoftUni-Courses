function addItem() {
    let items = document.getElementById('items');
    let input = document.getElementById('newItemText');
    let newLi = document.createElement('li');

    newLi.textContent = input.value;
    items.appendChild(newLi);
    input.value = ''; 
}