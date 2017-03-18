'use strict';

class Call {
  constructor(phone, priority) {
    priority = priority || 0;
    this.phone = phone;
    this.agentsInvolved = [];
    this.resolved = null;
    this.priority = priority;
  }

  addAgent(agent) {
    console.log(agent.fullname + ' has been added to call by ' + this.phone);
    this.agentsInvolved.push(agent);
  }

  resolve() {
    console.log('Call by phone ' + this.phone + ' has been resolved');
    this.resolved = true;
  }

  reject() {
    console.log('Call by phone ' + this.phone + ' has been rejected');
    this.resolved = false;
  }
}

//export default Call;
module.exports = Call;
