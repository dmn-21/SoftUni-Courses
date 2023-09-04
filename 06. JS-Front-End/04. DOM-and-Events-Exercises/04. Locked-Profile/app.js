function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll('main > div > button'));
    buttons.forEach((btn) => {
        btn.addEventListener('click', toggleInformation);
    });

    function toggleInformation(e) {
        let btn = e.currentTarget;
        let info = btn.parentElement;
        let children = Array.from(info.children);
        let div = children[9];
        let IsChecked = children[2];

        if (IsChecked.checked) {

        }
        else if (btn.textContent === 'Hide it') {
            div.style.display = 'none';
            btn.textContent = 'Show More';
        } else {
            div.style.display = 'block';
            btn.textContent = 'Hide it';
        }
    }
}