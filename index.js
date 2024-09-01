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
  gerarSenha();
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
    // caracteresCompleto();
  } else {
    checkboxMaiusculas = false;
    // caracteresCompleto();
  }
  medeForcaDaSenha();
}
function checkboxAtivoMinusculas() {
  if (document.getElementById('checkbox-minusculas').checked) {
    checkboxMinusculas = true;
    // caracteresCompleto();
  } else {
    checkboxMinusculas = false;
    // caracteresCompleto();
  }
  medeForcaDaSenha();
}
function checkboxAtivoNumeros() {
  if (document.getElementById('checkbox-numeros').checked) {
    checkboxNumeros = true;
    // caracteresCompleto();
  } else {
    checkboxNumeros = false;
    // caracteresCompleto();
  }
  medeForcaDaSenha();
}
function checkboxAtivoSimbolos() {
  if (document.getElementById('checkbox-simbolos').checked) {
    checkboxSimbolos = true;
    // caracteresCompleto();
  } else {
    checkboxSimbolos = false;
    // caracteresCompleto();
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
  gerarSenha();
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
