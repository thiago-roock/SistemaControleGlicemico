$(document).ready(function () {
  // pegamos o valor no localStorage
  const nightModeStorage = localStorage.getItem('modoDarkStorageSCG')
  const nightMode = document.querySelector('#switch-flat')

  // caso tenha o valor no localStorage
  if (nightModeStorage) {
    // ativa o night mode
    document.documentElement.classList.add('night-mode')
    jQuery("#corpo").removeClass("is-link");
    jQuery("#corpo").addClass("is-black");

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
      jQuery("#corpo").removeClass("is-link");
      jQuery("#corpo").addClass("is-black");

      localStorage.setItem('modoDarkStorageSCG', true)

      return
    }
    // senão remove
    jQuery("#corpo").removeClass("is-black");
    jQuery("#corpo").addClass("is-link");
    jQuery(".modoDark").show();
    jQuery(".modoWhite").hide();
    localStorage.removeItem('modoDarkStorageSCG')
  })


});
