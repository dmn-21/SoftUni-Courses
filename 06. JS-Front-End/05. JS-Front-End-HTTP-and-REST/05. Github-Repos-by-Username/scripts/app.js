async function loadRepos() {
	const BASE_URL = 'https://api.github.com/repos/';    
    const username = document.getElementById('username');
    const repos = document.getElementById('repos');
    const usernameVal = username.value;

    try {
        const allRes = await fetch(`${BASE_URL}${usernameVal}`);
        const data = await allRes.json();
        data.forEach(({ repo }) => {
            const li = document.createElement('li');
            li.textContent = `${repo}`;
            repos.appendChild(li);    
        })
    } catch (err) {
        const li = document.createElement('li');
        li.textContent = err.message
        repos.appendChild(li);
    }
}