function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   let searchInput = document.getElementById('searchField');


   function onClick() {
      let rows = Array.from(document.querySelectorAll('tbody tr'));
      
      for (const row of rows) {
         let trimRow = row.textContent.trim();
         
         if (row.classList.contains('select')) {
            row.classList.remove('select');
         }

         if (trimRow.includes(searchInput.value)) {
            row.classList.add('select');
         }
      }

      searchInput.value = '';
   }
}