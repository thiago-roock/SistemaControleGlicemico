$(document).ready(function () {
  // pegamos o valor no localStorage
  const nightModeStorage = localStorage.getItem('modoDarkStorage')
  const nightMode = document.querySelector('#switch-flat')

  // caso tenha o valor no localStorage
  if (nightModeStorage) {
    // ativa o night mode
    document.documentElement.classList.add('night-mode')
    jQuery("#corpo").addClass("is-dark");
    // já deixa o input marcado como ativo
    nightMode.checked = true
  }

  // ao clicar mudaremos as cores
  nightMode.addEventListener('click', () => {
    // adiciona a classe `night-mode` ao html
    document.documentElement.classList.toggle('night-mode')

    // se tiver a classe night-mode
    if (document.documentElement.classList.contains('night-mode')) {
      // salva o tema no localStorage
      jQuery("#corpo").addClass("is-dark");

      localStorage.setItem('modoDarkStorage', true)

      return
    }
    // senão remove
    jQuery("#corpo").removeClass("is-dark");
    jQuery(".modoDark").show();
    jQuery(".modoWhite").hide();
    localStorage.removeItem('modoDarkStorage')
  })


});
