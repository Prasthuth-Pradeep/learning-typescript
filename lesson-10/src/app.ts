// Generics
// const nameList: Array<string> = [];
// nameList[0].split("");

// const proise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!');
//   }, 200 );
// })

// proise.then(data => {
//   data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign({}, objA, objB);
}

const mergedObj = merge({ name: "Prasthuth" }, { age: 25 });
console.log(mergedObj);
console.log(mergedObj.name);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }

  return [element, descriptionText];
}

const describe = countAndDescribe("Hi there!");
console.log(describe);

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "value: " + obj[key];
}

const person = { name: "Prasthuth", age: 25 };

const result = extractAndConvert(person, "name");
console.log(result);

interface CourceGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
) {
  let courceGoal: Partial<CourceGoal> = {};
  courceGoal.title = title;
  courceGoal.description = description;
  courceGoal.completeUntil = completeUntil;
  return courceGoal as CourceGoal;
};

const names: Readonly<string[]> = ['Prasthuth', 'Pradeep'];
// names.push('Dummy');
