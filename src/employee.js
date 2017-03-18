import promptSync from 'prompt-sync';
const prompt = promptSync();

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
      console.log(`${this.fullname} is attending phone call: ${this.call.phone}`);
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
    this.resolveCall();
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

  resolveCall() {
    console.log(`Phone call: ${this.call.phone} has been resolved by ${this.fullname}`);
    this.call.resolve();
  }

  rejectCall() {
    console.log(`Phone call: ${this.call.phone} has been rejected by ${this.fullname}`);
    this.call.reject();
    this.free = true;
  }

  scalateCall() {
    this.department.scalateCall(this);
  }

  isFree() {
    return this.free;
  }
}

export default Employee;
