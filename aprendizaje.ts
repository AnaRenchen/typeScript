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
const sayHiFromFunction = (fn: (mingzi: string) => void) => {
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
//acá ya se dice que thor es del tipo Hero, al hacer uso de la función
const thor = createHero("thor", 34);

//también puedo poner el parámetro así, con el objeto y su tipo
function createHero2(hero: Hero): Hero {
  const { name, age } = hero;
  return { name, age };
}

//si paso entonces el objeto como parámetro entonces acá tengo que cambiar a objeto también al momento de llamar la función
const thor2 = createHero2({ name: "thor", age: 34 });

//Creación de un tipo para usar adentro de otros tipos
type HeroId = `${string}-${string}-${string}-${string}-${string}`; //Template Union Type: es la forma que va a tener este id
type HeroPowerScale = "galactico" | "fuerte";

//Optional Properties
type Hero2 = {
  readonly id?: HeroId; //propiedad solo de lectura para evitar que sea cambiada y el tipo que se asignó para el Id. No hace que el código sea inmutable, ya que funciona solo cuando se está escribiendo el código, no en su ejecución. Solo avisa que no se puede hacer algo. Para que sea inmutable tendría que usar JS como, por ejemplo Object.freeze
  age: number;
  name: string;
  isActive?: boolean; //la interrogación dice que es una propiedad opcional
  PowerScale?: HeroPowerScale;
};

//Acá en el input puedo poner Hero o Hero3 que tienen name y age o solo el HeroBasicInfo que son las dos propiedades a las que hago referencia
function createHero3(input: HeroBasicInfo): Hero2 {
  const { name, age } = input;
  return { name, age, isActive: true, id: crypto.randomUUID() }; //acá si pongo otro tipo de id, como 5555, se va a quejar porque no es del tipo que cree arriba//;
}

const thor3 = createHero3({ name: "thor", age: 34 });
console.log(thor3.isActive);

thor3.id?.toString(); //acá se agregó automaticamente el ? porque es una forma que tiene de preguntarse: si tiene id ejecuto eso y si no tiene no lo ejecuto. Como un if.

thor3.PowerScale = "sss";

//Otro ejemplo del type union template
type HexaDecimalColor = `#${string}`;

let color: HexaDecimalColor = `333333`; //acá se queja pq no tiene el # que defini en el tipo
let color2: HexaDecimalColor = `#333333`;

//Como acá dije que ann puede ser un number o un string, no se queja. Es como una unión de tipos. Es como el joint de sql
let ann: number | string;

ann = "a";
ann = 3;

//Crear nuevos tipos através de otros tipos

type HeroBasicInfo = {
  name: string;
  age: number;
};

type HeroProperties = {
  readonly id?: HeroId;
  isActive?: boolean;
  PowerScale?: HeroPowerScale;
};

//Se crea un nuevo tipo que junta los dos
type Hero3 = HeroBasicInfo & HeroProperties;

//Type Indexing: es extraer un tipo
type HeroProperties2 = {
  isActive: boolean;
  address: {
    planet: string;
    city: string;
  };
};

//...se puede acceder al tipo que está arriba en el objeto. En el caso de address, como es un objeto con planet y city, si solo escribo planet se queja, tengo que escribir los dos. Permite reutilizar partes de un tipo que tengamos

//addressHero es el mismo que el tipo de la propiedad address dentro del tipo HeroProperties2. En otras palabras, addressHero será un objeto que tiene las mismas propiedades que address. Eso es lo que quiere decir HeroProperties2[]
const addressHero: HeroProperties2["address"] = {
  planet: "Earth",
  city: "Madrid",
};

//Type from value
const address = {
  planet: "earth",
  city: "madrid",
};

//el typeof en TS tiene todavía más poder que en JS, pq te permite crear tipos a partir de código existente
type Address = typeof address;

//acá estaba esperando el mismo tipo que arriba
const addressEjemplo: Address = {
  planet: "mars",
  city: "buenos aires",
};

function createAddress() {
  return {
    planet: "mars",
    city: "buenos aires",
  };
}

//el tipo de este address se recupera de lo que devuelve la función createAddress. Se guarda el return de la función arriba en Address2
type Address2 = ReturnType<typeof createAddress>;

//Arrays: hay que tipar el array para que TS no piense que debe estar vacío

const languages = [];

languages.push("inglés");

const languages2: (string | number)[] = []; //en language vamos a tener un array de strings o de number(si quiero puedo elegir uno u otro así string[]=[]). también se puede escribir así. Array<string>

languages2.push("inglés");
languages2.push(2);

console.log(languages2);

const heroBasicInfo: HeroBasicInfo[] = []; //acá estoy diciendo que el array será del tipo HeroBasicInfo que cree arriba

//Una tupla es un array que tiene un límite fijado de longitud, es decir, son arrays con un tamaño fijo
type CellValue = "X" | "Y" | "";
type GameBoard = readonly [
  //acá se pone el readonly pq hay un problema en las tuplas que permite determinados cambios
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];

//Acá si intento poner algo distinto del CellValue o del GameBoard se queja
//String[][] para tiparlo, ya que es un array de un array de strings
const gameBoard: GameBoard = [
  ["X", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//Enuns: enumeraciones
//Según como lo hagas pueden compilarse a código JS o no
// Funciona para datos finitos, que uno conoce y que puede controlar
// Así como está el código será traspilado y JS les otorgará un número para cada uno. Para que eso no pase tendría que poner adelante de enum que es una constante. Si no quiero que se numere automaticamente tengo que poner el tipo:
//La forma const antes de enum genera menos código, pero si se hace algo para que sea consumido desde afuera es recomendable no usarla para que se pueda ver el tipo

enum ERROR_TYPES {
  NOT_FOUND = "no se encuentra",
  UNAUTHORIZED = "no autorizado",
  FORBIDEN = "no podes pasar",
}

function mostrarMensaje(tipoDeError: ERROR_TYPES) {
  //se utiliza el enum acá como un tipo
  if ((tipoDeError = ERROR_TYPES.NOT_FOUND)) {
    console.log("hola");
  } else if ((tipoDeError = ERROR_TYPES.FORBIDEN)) {
    console.log("hello");
  } else if ((tipoDeError = ERROR_TYPES.UNAUTHORIZED)) {
    console.log("que tal");
  }
}

//Aserciones de tipos
