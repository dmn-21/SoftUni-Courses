function extractText() {
    let items = Array.from(document.querySelectorAll('#items > li'));
    let result = document.getElementById('result');

    items.forEach((li) => {
        result.textContent += li.textContent + '\n';
    })
}