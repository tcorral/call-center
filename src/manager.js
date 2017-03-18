var Employee = require('./employee');

class Manager extends Employee {
  constructor(name, surname, manager) {
    super(name, surname, manager);
    this.employees = [];
  }
}
