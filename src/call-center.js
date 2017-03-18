import Department from './department';

class CallCenter {
  constructor(){
    this.departments = [];
    this.addDepartment(new Department('Global', 0));
  }

  getGlobalDepartment() {
    return this.departments[0];
  }

  addCall(call) {
    this.departments[0].addCall(call);
  }

  addDepartment(department) {
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

export default CallCenter;
