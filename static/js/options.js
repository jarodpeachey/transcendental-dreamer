(function () {
  // ELEMENTS
  const wrappers = document.querySelectorAll('.options')
  console.log(wrappers);

  if (wrappers && wrappers.length > 0) {
  Array.from(wrappers).forEach(item => {
    const options = item.querySelectorAll('.option')
    console.log(options);
  
    Array.from(options).forEach(item => {
      item.addEventListener('click', (e) => {
        Array.from(options).forEach(item => {
          item.classList.remove('active')
        })
        e.target.classList.add('active')
      })
    })
  })
  }


})();
