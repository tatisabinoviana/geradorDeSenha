let medidor = 4;
document.getElementById('quantidade').innerHTML = medidor;
let forcaDaSenha = 10;
const progressbar = document.querySelector('.progress-bar');
let checkboxMaiusculas = false;
let checkboxMinusculas = true;
let checkboxNumeros = false;
let checkboxSimbolos = false;
let resultadoSenha = '';
const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz';
const caracteresNumeros = '0123456789';
const caracteresSimbolos = '!@#$%^&*()_+[]{}|;:,.<>?';
let caracteres = caracteresMinusculos;

function mudancaDoRange(value) {
  medidor = value;
  document.getElementById('quantidade').innerHTML = medidor;
  limparCampoSenha();
}
function caracteresCompleto() {
  caracteres = '';
  if (checkboxMaiusculas) {
    caracteres = `${caracteres}${caracteresMaiusculos}`;
  }
  if (checkboxMinusculas) {
    caracteres = `${caracteres}${caracteresMinusculos}`;
  }
  if (checkboxNumeros) {
    caracteres = `${caracteres}${caracteresNumeros}`;
  }
  if (checkboxSimbolos) {
    caracteres = `${caracteres}${caracteresSimbolos}`;
  }
  if (
    !checkboxMaiusculas &&
    !checkboxMinusculas &&
    !checkboxNumeros &&
    !checkboxSimbolos
  ) {
    caracteres = caracteresMinusculos;
  }
}

function checkboxAtivoMaiusculas() {
  if (document.getElementById('checkbox-maiusculas').checked) {
    checkboxMaiusculas = true;
  } else {
    checkboxMaiusculas = false;
  }
  medeForcaDaSenha();
}
function checkboxAtivoMinusculas() {
  if (document.getElementById('checkbox-minusculas').checked) {
    checkboxMinusculas = true;
  } else {
    checkboxMinusculas = false;
  }
  medeForcaDaSenha();
}
function checkboxAtivoNumeros() {
  if (document.getElementById('checkbox-numeros').checked) {
    checkboxNumeros = true;
  } else {
    checkboxNumeros = false;
  }
  medeForcaDaSenha();
}
function checkboxAtivoSimbolos() {
  if (document.getElementById('checkbox-simbolos').checked) {
    checkboxSimbolos = true;
  } else {
    checkboxSimbolos = false;
  }
  medeForcaDaSenha();
}

function medeForcaDaSenha() {
  if (
    checkboxMaiusculas &&
    checkboxMinusculas &&
    checkboxNumeros &&
    checkboxSimbolos
  ) {
    forcaDaSenha = 100;
  } else if (
    (checkboxMaiusculas && checkboxMinusculas && checkboxNumeros) ||
    (checkboxMaiusculas && checkboxMinusculas && checkboxSimbolos)
  ) {
    forcaDaSenha = 50;
  } else {
    forcaDaSenha = 10;
  }
  console.log('forcaDaSenha:', forcaDaSenha);
  progressbar.style.setProperty('--progress', forcaDaSenha);
  limparCampoSenha();
}

// range.addEventListener('input', function () {
//   const value = range.value;
//   progressbar.style.setProperty('--progress', value);
// });

function gerarSenha() {
  // let checkboxMaiusculas = false;
  // let checkboxMinusculas = true;
  // let checkboxNumeros = false;
  // let checkboxSimbolos = false;
  // caracteres = caracteresMinusculos;
  // if (checkboxMaiusculas) {
  //   caracteres = caracteresMinusculos;
  //   if (checkboxMinusculas) {
  //     caracteres = +caracteresMaiusculos;
  //     if (checkboxNumeros) {
  //       caracteres = +caracteresNumeros;
  //       if (checkboxSimbolos) {
  //         caracteres = +caracteresSimbolos;
  //       }
  //     }
  //   }
  // }
  caracteresCompleto();
  const caracteresArray = Array.from(caracteres);
  const randomValues = new Uint32Array(medidor);
  let senhaGerada = '';
  window.crypto.getRandomValues(randomValues);

  for (let i = 0; i < medidor; i++) {
    const randomIndex = randomValues[i] % caracteresArray.length;
    senhaGerada += caracteresArray[randomIndex];
  }
  resultadoSenha = senhaGerada;
  document.getElementById('senha').innerHTML = resultadoSenha;
}
// async function copiaSenha() {
//   if (!navigator.clipboard) {
//     alert('A API Clipboard não é suportada pelo seu navegador.');
//     return;
//   }
//   console.log('Click!');
//   const textArea = document.getElementById('senha').value;
//   await navigator.clipboard.writeText(textArea);
// }
function copiaSenha() {
  // const texto = document.getElementById('senha').value;
  const textarea = document.createElement('textarea');
  textarea.value = resultadoSenha;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    if (resultadoSenha) {
      alert('Texto copiado para a área de transferência!');
    } else {
      alert('Por favor, gere alguma senha válida!');
    }
  } catch (err) {
    console.error('Falha ao copiar usando document.execCommand: ', err);
    alert('Não foi possível copiar o texto.');
  }
  document.body.removeChild(textarea);
}
function limparCampoSenha() {
  resultadoSenha = '';
  document.getElementById('senha').innerHTML = '';
}
