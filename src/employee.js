//import prompt from 'prompt';
'use strict';

var prompt = require('prompt-sync')();

class Employee {
  constructor(name, surname, manager) {
    this.name = name;
    this.surname = surname;
    this.free = false;
    this.manager = manager;
    this.employees = [];
    this.call = null;
    this.department = null;

    if(manager) {
      manager.employees.push(this);
    }
  }

  get fullname() {
    return this.name + ' ' + this.surname;
  }

  handleCall(call) {
    this.call = call || this.department.getNextCall(this);
    if (this.call) {
      this.call.addAgent(this);
      this.free = false;
    } else {
      this.free = true;
    }
    this.askQuestions();
  }

  askQuestions() {
    let decisionTree = this.department.decisionTree;
    let question;
    let answer;

    question = decisionTree.getNextQuestion();

    console.log(this.name);
    while(question) {
      answer = prompt(question.message);
      if (question.shouldBeRedirected(answer)) {
        this.department.redirectTo(this, question.redirectTo);
        return false;
      } else if (question.shouldBeScaled(answer)) {
        this.department.scalateCall(this);
        return false;
      } else {
        question = decisionTree.getNextQuestion();
      }
    }
    this.call.resolve();
  }

  startWorkingDay() {
    this.department.addAgent(this);
    this.free = true;
  }

  endWorkingDay() {
    this.department.removeAgent(this);
    this.free = false;
  }

  setManager(manager) {
    this.manager = manager;
  }

  scalateCall() {
    this.department.scalateCall(this);
  }

  isFree() {
    return this.free;
  }
}

//export default Employee;
module
  .exports = Employee;
