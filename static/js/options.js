(function () {
  // ELEMENTS
  const options = document.querySelectorAll(".option");

  Array.from(options).forEach(item => {
    item.addEventListener('click', (e) => {
      Array.from(options).forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
    })
  })
})();
