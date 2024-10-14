
// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b:number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}



interface Named {
  readonly name?: string;
  // age: number;
  outputName?: string
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

let useer1: Greetable;


class Person implements Greetable {
  name?: string;
  age = 25;

  constructor(n?: string){
    if(n){ 
      this.name = n;
    }
  }

  greet(phrase: string): void {
    console.log(phrase)
  }
}



// useer1 = {
//   name: "Prasthuth",
//   // age: 25,
//   greet(phrase: string){
//     console.log(phrase + " " + this.name)
//   }
// }

// // useer1.name = ''

// useer1.greet('Hi there - I am')