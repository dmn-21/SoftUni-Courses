function solve() {
  let output = document.getElementById('output');
  let textarea = document.getElementById('input');
  let sentences = textarea.value.split('.');
  sentences.pop();
  
  while (sentences.length > 0) {
    let paragraph = sentences.splice(0, 3).map((p) => p.trimStart());
    let newParagraph = document.createElement('p');
    newParagraph.textContent = paragraph.join('.') + '.';
    output.appendChild(newParagraph);
  }
}