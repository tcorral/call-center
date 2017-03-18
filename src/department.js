//import DecisionTree from './decision-tree';
'use strict';
const DecisionTree = require('./decision-tree');

class Department {
  constructor(name, id) {
    this.id =id;
    this.name = name;
    this.employees = [];
    this.agents = [];
    this.calls = [];
    this.decisionTree = new DecisionTree();
    this.delayCheckFreeAgentCheck = 5000;
    this.maxRecursionTimes = 5;
  }

  getDepartments() { /*Dummy method, it will be added by call center on register it*/ }

  registerEmployee(employee) {
    console.log('Employee ' + employee.fullname + ' has been registered in '  + this.name);
    this.employees.push(employee);
    employee.department = this;
  }

  checkFreeAgentCheck(manager, extraDelayer) {
    var self = this;
    extraDelayer = extraDelayer || 1;
    setTimeout(function recursive() {
      console.log('Looking for a free agent');
      let agent = manager || self.getNextFreeAgent();
      if(agent) {
        console.log('Free agent found ' + agent.fullname);
        agent.handleCall();
      } else {
        if(this.maxRecursionTimes === extraDelayer) {
          console.log('Max. recursion times');
          agent.call.reject();
        } else {
          console.log('Waiting ' + (self.delayCheckFreeAgentCheck * extraDelayer));
          setTimeout(recursive, (self.delayCheckFreeAgentCheck * ++extraDelayer));
        }
      }
    }, this.delayCheckFreeAgentCheck * extraDelayer);
  }

  getNextFreeAgent() {
    console.log('Getting a new free agent');
    for(let i = 0, agentsLength = this.agents.length; i < agentsLength; i++) {
      let agent = this.agents[i];
      if(agent.isFree() && agent.employees.length === 0) {
        console.log('Free agent: ' + agent.fullname);
        return agent;
      }
    }
    return null;
  }

  scalateCall(agent) {
    console.log('Escalating call attended by ' + agent.fullname );
    if (this.agents.indexOf(agent) > -1
      && this.agents.indexOf(agent.manager) > -1
      && agent.manager.isFree()) {
      console.log(agent.manager.fullname + ' is going to handle the call');
      agent.manager.handleCall(agent.call);
    } else if(agent.manager) {
      console.log('Manager is busy');
      this.checkFreeAgentCheck(agent.manager);
    } else {
      console.log('Call ' + agent.call.phone + ' has been rejected by ' + agent.fullname);
      agent.call.reject();
    }
  }

  redirectTo(agent, departmentId) {
    const department = this.getDepartmentsInCallCenter().find((item) => {
      return item.id === departmentId;
    });
    console.log('Redirect is required. Current department ' + this.name + '; Next department: ' +  department.name);
    if(!department) {
      console.log(agent.fullname + ' has rejected the call');
      agent.call.reject();
    } else{
      console.log('Looking for a new free agent');
      const newAgent = department.getNextFreeAgent();
      if(!newAgent) {
        console.log('All the agents are busy');
        department.checkFreeAgentCheck();
      }else {
        console.log(newAgent.fullname + ' handles the call');
        newAgent.handleCall(agent.call);
      }
    }
  }

  addAgent(employee) {
    this.agents.push(employee);
  }

  removeAgent(employee) {
    var index = this.agents.indexOf(employee);
    if (index > -1) {
      this.agents.splice(index, 1);
    }
  }

  addCall(call) {
    const callPriority = call.priority;
    const agent = this.getNextFreeAgent();
    if (!this.calls[callPriority]) {
      this.calls[callPriority] = [];
    }
    this.calls[callPriority].push(call);
    if(agent) {
      agent.handleCall();
    } else {
      this.checkFreeAgentCheck();
    }
  }


  getNextCall(agent) {
    let call = null;
    if (this.agents.indexOf(agent) === -1) {
      return call;
    }
    for (let callPriority = 0, callsLen = this.calls.length; callPriority < callsLen; callPriority++) {
      if (this.calls[callPriority].length) {
        call = this.calls[callPriority].shift();
        return call;
      }
    }
    return call;
  }
}

//export default Department;
module.exports = Department;
