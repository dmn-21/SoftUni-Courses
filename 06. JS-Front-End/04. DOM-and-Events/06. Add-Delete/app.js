function addItem() {
    let input = document.getElementById('newItemText'); 
    let items = document.getElementById('items'); 
    let newLi = document.createElement('li');
    let newA = document.createElement('a');

    newLi.textContent = input.value;
    newA.textContent = '[Delete]';
    newA.setAttribute('href', '#');
    newA.addEventListener('click', deleteHandler);
    items.appendChild(newLi);
    newLi.appendChild(newA);
    input.value = '';

    function deleteHandler(e) {
        const liItem = e.currentTarget.parentElement;
        liItem.remove();
    }
}