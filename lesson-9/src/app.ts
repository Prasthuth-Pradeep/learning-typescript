type Admin = {
  name: string;
  privileges?: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

function printEmployeeInfo(emp: ElevatedEmployee) {
  console.log('Name : ', emp.name);
  if( 'privileges' in emp) {
    console.log('privileges: ', emp.privileges )
  }

  if( 'startDate' in emp) {
    console.log('date : ', emp.startDate);
  }
}

printEmployeeInfo({
  name: 'Prasthuth',
  startDate: new Date()
})

// typeOf, in, instenceOf

interface Bird  {
  type: 'bird';
  flyingSpeed: number;
}

interface Hourse {
  type: 'hourse';
  runningSpeed: number;
}

type Animal = Bird | Hourse;

function moveAnimal(animal: Animal){
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'hourse':
      speed = animal.runningSpeed;
      break;
  }

  console.log(`Moving at speed ${speed}.`);
}

moveAnimal({ type: 'bird', flyingSpeed: 30});


// const inputelement = <HTMLInputElement>document.getElementById('user-input')!;
// const inputelement = document.getElementById('user-input')! as HTMLInputElement;
const inputElement =  document.getElementById('user-input');

if(inputElement){
  (inputElement as HTMLInputElement).value = 'Hi there!';
}

// inputelement.value = 'Hi there!'


interface ErrorContainer {
  [key: string]: string;
}


const errorBag: ErrorContainer = {
  email: 'Not a valid Email!',
  userName: 'Name should be in lowercase!'
}

// TODO Function overload
// TODO Optional chaining


const userInput = null;
const storeData = userInput ?? 'DEFAULT';