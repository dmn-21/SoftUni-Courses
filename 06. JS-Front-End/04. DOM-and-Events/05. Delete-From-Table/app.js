function deleteByEmail() {
    let email = document.querySelector('input[name = "email"]');
    let child = Array.from(document.querySelectorAll('td:nth-child(even)'));
    let result = document.getElementById('result');
    let find = child.find((ch) => ch.textContent === email.value);

    if (find) {
        find.parentElement.remove();
        result.textContent = "Deleted";
    } else {
        result.textContent = "Not found.";
    }
}