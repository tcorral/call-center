//import Department from './department';
'use strict';

const Department = require('./department');

class CallCenter {
  constructor(){
    this.departments = [];
    this.addDepartment(new Department('Global', 0));
  }

  getGlobalDepartment() {
    return this.departments[0];
  }

  addCall(call) {
    console.log('Adding call ' + call.phone);
    this.departments[0].addCall(call);
  }

  addDepartment(department) {
    console.log('Adding department ' + department.name);
    this.departments.push(department);
    department.getDepartmentsInCallCenter = () => {
      return this.getDepartments().filter(function (item) {
          return item.id !== department.id;
      });
    }
  }

  getDepartments() {
    return this.departments;
  }
}

//export default CallCenter;
module.exports = CallCenter;
