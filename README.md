# typeScript

Es JS con una sintasis para tipos. Añade tipos estáticos para JS. No es un lenguaje de programación separado.
No funciona en tiempo de ejecución. Lo que llega directamente al navegador es JS. Ejemplo:
const name = "Ana" - const name es typestript y Ana es JS
El typescript se compila y se convierte a JS.
Otorga seguridad al código de JS.
Los tipos en JS tienen una naturaleza dinámica y débil a la vez, ya que puedo, por ejemplo, fácilmente cambiar el valor de una variable:
let a = "hola";
a = 3; -> cambió de string a number
TS va a hacer que los tipos queden fuertes y estáticos. No podemos cambiar el tipo de la variable como si nada.

- TS nos avisa que lo que hicimos al asignar un number a la variable a es un error.
  Le indicamos a TS los tipos que esperamos:

function suma (a:number, b:number){
return a +b
}
suma (2,3)

Si a y b fueran string, funcionaría igual, pero no haría una suma, sino que una concatenación.

- TS no funciona en tiempo de ejecución. TS funciona en compilación y JS en ejecución. El navegador no entiende nada de TS.

Añadir tipado a TS:
const nombre: string = "Ana";
El tipado solo funciona en la compilación del código, no en la ejecución. No llega al navegador.

También funciona con objetos

- TS es capaz de observar el objeto e inferir para decir qué tipo de dato es.
  Hay que evitar escribir los tipos, es mejor así. Dejar que TS lo haga.

Cuando usamos any para decir de qué tipo es una variable, lo que estamos haciendo es decirle a TS que ignore el tipado (y no que sería cualquier tipo). Debemos evitar el any.

Cuando decimos unknow estamos diciendo que no sabemos cuál es el tipo.

La inferencia de TS tiene un límite: ejemplo, funciones.
Además de los parámetros, también se puede indicar lo que devuelve. TS tiene inferencia del tipo que devuelve.

Type Alias: una de las cosas más potentes que tiene TS.
Se crea un type propio para definir como es algo.

Template Union Type
