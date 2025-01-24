let a = 2;
a = "ana"; // Me indica que es un error, ya que a es number y ana es string

let persona = {
  name: "Ana",
  age: 42,
};

persona.age;
persona.name;

let anyValue: any = "ana"; //ignora el tipo (hay que evitar)

let b: unknown = true; //no sé de qué tipo es

//acá marca como que name es un any, no logra hacer la inferencia, por lo tanto hay que poner el tipo
function saludar(name: string) {
  console.log(name);
}

saludar("Ana");

//Como tipar objetos en un parámetro de función: opción 1

function pepe({ name, age }: { name: string; age: number }) {
  console.log(`Hola ${name}, tenes ${age} años`);
}

pepe({ name: "Pepe", age: 33 });

//Como tipar objetos en un parámetro de función: opción 2
function popi(persona: { name: string; age: number }): number {
  const { name, age } = persona;
  console.log(`Hola ${name}, tenes ${age} años`);
  return age; //tiene inferencia de lo que devuelve pq en el parámetro puse que era number, pero también lo puedo especificar como arriba
}

popi({ name: "Popi", age: 23 });

//Function as el "any" de las funciones, por lo que también deberíamos evitarlo. Es más correcto decir
//sayHiFromFunction recibe como parámetro la función greet

const sayHiFromFunction = (fn: (name: string) => void) => {
  //void porque no devuelve nada. Si pongo string se queja. Para que no se queje con string tengo que poner en greet return mingzi. Void lo que indica es que no te importa lo que devuelva y que no tiene que devolver nada.
  fn("Miguel");
};

const greet = (mingzi: string) => {
  console.log(`Hola ${mingzi}`);
};

sayHiFromFunction(greet);

//Tipar arrow function
const sumar = (a: number, b: number): number => {
  return a + b;
};

//Tipar con never para funciones que sabés que nunca van a devolver nada (porque se detiene en el throw.. y no llega al return). En el void sí llega al final, pero no devuelve nada.
function throwError(message: string): never {
  throw new Error(message);

  //return implícito (no llega hasta acá porque se detienen en el throw y por eso es un never)
}

// Inferencia funciones anonimas según el contexto
// A veces funciona la inferencia sin tener que hacer el tipado, como con foreach, map, etc

const paises = ["japon", "korea", "china"];

paises.forEach(function (pais) {
  console.log(pais.toUpperCase); //aca ya sabia que seria un string porque reconocio que era un array de strings
});

//Type Alias: creo un tipo y ahora sé que la variable hero es del tipo Hero que he creado
type Hero = {
  age: number;
  name: string;
};

let hero: Hero = {
  age: 45,
  name: "popeye",
};

function createHero(name: string, age: number): Hero {
  return { name, age };
}
//acá ya se dice que thor es del tipo Hero
const thor = createHero("thor", 34);

//también puedo poner el parámetro así, con el objeto y su tipo
function createHero2(hero: Hero): Hero {
  const { name, age } = hero;
  return { name, age };
}

//si paso entonces el objeto como parámetro entonces acá tengo que cambiar a objeto también al momento de llamar la función
const thor2 = createHero2({ name: "thor", age: 34 });

//Template Union Type
//Creación de un tipo para usar adentro de otros tipos
type HeroId = `${string}-${string}-${string}-${string}-${string}`;
//Optional Properties
type Hero2 = {
  readonly id?: HeroId; //propiedad solo de lectura para evitar que sea cambiada y el tipo que se asignó para el Id. No hace que el código sea inmutable, ya que funciona solo cuando se está escribiendo el código, no en su ejecución. Solo avisa que no se puede hacer algo. Para que sea inmutable tendría que usar JS como, por ejemplo Object.freeze
  age: number;
  name: string;
  isActive?: boolean; //la interrogación dice que es una propiedad opcional
};

function createHero3(hero: Hero): Hero2 {
  const { name, age } = hero;
  return { name, age, isActive: true, id: crypto.randomUUID() }; //acá si pongo otro tipo de id, como 5555, se va a quejar porque no es del tipo que cree arriba//;
}

const thor3 = createHero3({ name: "thor", age: 34 });
console.log(thor3.isActive);

thor3.id?.toString(); //acá se agregó automaticamente el ? porque es una forma que tiene de preguntarse: si tiene id ejecuto eso y si no tiene no lo ejecuto. Como un if.

//Otro ejemplo del type union template

type HexaDecimalColor = `#${string}`;

let color: HexaDecimalColor = `333333`; //acá se queja pq no tiene el # que defini en el tipo
let color2: HexaDecimalColor = `#333333`;
