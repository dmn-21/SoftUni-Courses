function create(words) {
   let content = document.getElementById('content');

   for (const word of words) {
      let newDiv = document.createElement('div');
      let newP = document.createElement('p');
      newP.textContent = word;
      newP.style.display = 'none';

      newDiv.addEventListener('click', () => {
         newP.style.display = 'block';
      });
      
      newDiv.appendChild(newP);
      content.appendChild(newDiv);
   }
}