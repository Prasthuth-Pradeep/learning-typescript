abstract class Department {
  // private name: string;
  static year: number = 2024;
  private employees: string[] = [];

  constructor(public id: string, public name: string) {
    // this.name = n;
    // console.log(name)
  }

  static createEmployee(name: string) {
    return { name: name}
  }

  abstract describe(this: Department) : void;

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log("length: " + this.employees.length);
    console.log("employee list: " + this.employees);
  }
}

class ITDepartment extends Department {
  public admins: string[] = [];

  constructor(id: string, admins: string[]){
    super(id, 'IT');

    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID : " + this.id);
  }
}

class Accounting extends Department {
  public reports: string[] = [];
  private lastReport: string;
  private static instance: Accounting;

  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport
    }
    return new Error('No report found!')
  }

  set setRecentReport(value: string) {
    if(!value) { throw new Error('Please pass a valid value!')}
    this.addReport(value);
  }

  private constructor(readonly id: string, reports: string[]){
    super(id, 'IT');

    this.reports = reports;
    this.lastReport = reports[0];
  }

  static getInstance(){
    if(Accounting.instance) {
      return this.instance;
    }

    this.instance = new Accounting('D2', []);
    return this.instance;
  }

  describe() {
    console.log("Acounting Department - ID : " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  getReports(){
    console.log(this.reports);
  }
}

// const accounting = new Accounting("D1", []);
const accounting = Accounting.getInstance();
const IT = new ITDepartment("D2", ["Prasthuth"]);

console.log(IT)
console.log(accounting)
IT.addEmployees("Prasthuth");
IT.addEmployees("Pradeep");
accounting.addReport("Something went wrong!");
accounting.getReports();
accounting.setRecentReport = 'New Report';
console.log(accounting.mostRecentReport);
// accounting.employees[2] = 'Dummy'; // Not assignable because of private

IT.describe();
IT.printEmployeeInfo();

const employee1 = Department.createEmployee('Prasthuth Pradeep');
console.log(employee1, Department.year);

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// console.log(accounting);
// accounting.describe();
// accountingCopy.describe();
