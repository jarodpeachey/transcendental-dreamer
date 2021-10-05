(function () {
  console.log = function () {};

  const notBuild = typeof window !== "undefined";

  addScript("/js/navigation.js");

  function addScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
})();
