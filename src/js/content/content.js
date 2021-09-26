document.addEventListener('click', (e) => {
  console.log(e);
  if (e.target.autocomplete !== 'nope') {
    e.target.autocomplete = 'nope';
    e.target.blur();
    e.target.focus();

    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].autocomplete = 'nope';
    }
  }
});
