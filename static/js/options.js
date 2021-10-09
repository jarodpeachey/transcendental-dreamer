(function () {
  // ELEMENTS
  const wrappers = document.querySelectorAll('.options')
      console.log(wrappers);
    alert(wrappers)

  Array.from(wrappers).forEach(item => {
    const options = item.querySelectorAll('.option')
    console.log(options);
    alert(options)
  
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
