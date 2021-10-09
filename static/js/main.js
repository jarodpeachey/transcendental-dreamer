(function () {
  console.log = function () {};

  const notBuild = typeof window !== "undefined";

  addScript("/js/navigation.js");
  // addScript("/js/options.js");

  function addScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  // window.addEventListener('popstate', (event) => {
  //   if (window.location.href.includes('products')) {
  //     addScript("/js/options.js");
  //     alert('adding script')
  //   }
  // })
})();
