function Logger(target: Function) {
  console.log("Loading...");
  console.log(target);
}

// Factory decoractor
// function Logger(loggString: string) {
//   return function (constructor: Function) {
//     console.log(loggString);
//     console.log(constructor);
//   };
// }

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("Rendering templates...");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @WithTemplate("<h1>My Person</h1>", "app")
@WithTemplateReeturn("<h1>My Person</h1>", "app")
@Logger
class Person {
  name: string = "Prasthuth";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);

// -----------------

function Log(target: any, propertyname: string | symbol) {
  console.log("Proprty decorator");
  console.log(target, propertyname);
}

function Log2(target: any, name: string, description: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log3(
  target: any,
  name: string | symbol,
  description: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log title: string;
  private _price: number;

  @Log2 set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid proce - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 getPriceithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// --------

// Return decoractor
function WithTemplateReeturn(template: string, hookId: string) {
  return function <T extends { new (...srg: any[]): { name: string } }>(
    orninalConstructor: T
  ) {
    return class extends orninalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering templates...");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// ------------

function AutoBind(
  _: any,
  _2: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}


class Printer {
  message = 'This works!';

  @AutoBind 
  showMessage(){
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage)

// ---------------

interface ValidatorConfig {
  [property: string] : {
    [validatableProps: string]: string [] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for(const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}


class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number){
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCource = new Course(title, price);
  if(!validate(createdCource)) {
    alert('Invalid input!');
    return;
  }
  console.log(createdCource);
}) 




 