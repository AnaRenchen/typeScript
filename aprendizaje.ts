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
