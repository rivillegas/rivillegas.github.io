window.document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("input").value = "00:00:00"
});




const input = document.getElementById('timeInput');

        input.addEventListener('keydown', function(event) {
            // Permitir teclas de control: backspace, tab, flechas, etc.
            const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (controlKeys.includes(event.key)) {
                return;
            }

            // Prevenir input si no es un número
            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
                return;
            }
            
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;
            
            // Permitir si se está seleccionando todo el texto
            if (selectionStart === 0 && selectionEnd === 8) {
                input.value = '00:00:00';
                input.setSelectionRange(0, 0);
            }
            
            // Permitir input solo en posiciones de dígitos
            if ([2, 5].includes(selectionStart)) {
                input.setSelectionRange(selectionStart + 1, selectionStart + 1);
            }
        });

        input.addEventListener('input', function(event) {
            let value = input.value.replace(/[^0-9]/g, '');
            value = value.padEnd(6, '0');
            value = value.slice(0, 6);
            input.value = `${value.slice(0, 2)}:${value.slice(2, 4)}:${value.slice(4, 6)}`;
        });

        input.addEventListener('focus', function() {
            // Colocar el cursor al inicio cuando el input recibe foco
            input.setSelectionRange(0, 0);
        });

function Iniciar() {
  var inputTiempo = document.getElementById("input").value;
  var horasSolicitadas = inputTiempo.toString().substring(0, 2);
  var minutosSolicitadas = inputTiempo.toString().substring(3, 5);
  var segundosSolicitadas = inputTiempo.toString().substring(6, 8);
  var horas = horasSolicitadas;
  var minutos = minutosSolicitadas;
  var segundos = segundosSolicitadas;
  horasSolicitadas = 60000 * 60 * horasSolicitadas;
  minutosSolicitadas = minutosSolicitadas * 60000;
  segundosSolicitadas = segundosSolicitadas * 1000;

  var total_tiempo_solicitado =
    horasSolicitadas + minutosSolicitadas + segundosSolicitadas;
  console.log(total_tiempo_solicitado);

  var reloj = document.getElementById("temporadizador");

  const intervalo = setInterval(() => {
    if (minutos != 0 && segundos == 0) {
      minutos--;
      segundos = 60;
    }

    if (horas != 0 && minutos == 0) {
      horas--;
      minutos = 60;
    }
    segundos--;

    var horasReloj =
      horas.toString().length == 1 ? "0" + horas.toString() : horas;
    var minutosReloj =
      minutos.toString().length == 1
        ? "0" + minutos.toString()
        : minutos == 60
        ? "00"
        : minutos;
    var segundosReloj =
      segundos.toString().length == 1
        ? "0" + segundos.toString()
        : segundos == 60
        ? "00"
        : segundos;

    reloj.innerHTML =
      "<h1>" + horasReloj + ":" + minutosReloj + ":" + segundosReloj + "</h1>";
    total_tiempo_solicitado = total_tiempo_solicitado - 1000;
    if (total_tiempo_solicitado == 0) {
      clearInterval(intervalo);
    }
  }, 1000);
}
