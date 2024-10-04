document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random() * numeroMaximo; //Comando 'random'para "sortear" um número entre um número estipulado.
        numeroAleatorio = Math.floor(numeroAleatorio + 1); //Comando 'Math' para arredondar o número.

        //Utilizar os comandos para arredondar:
                                        //seil: Arredonda para cima
                                        //floor: Arredonda para baixo
                                        //round: arredonda 0.5 acima para cima ou abaixo para baixo.

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block';
    })
})