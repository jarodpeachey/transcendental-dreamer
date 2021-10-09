(function () {
  // ELEMENTS
  const wrappers = document.querySelectorAll('.options')

  Array.from(wrappers).forEach(item => {
    const options = item.querySelectorAll('.option')

      Array.from(options).forEach(item => {
    item.addEventListener('click', (e) => {
      Array.from(options).forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
    })
  })
  })
})();
