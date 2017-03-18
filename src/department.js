import DecisionTree from './decision-tree';

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
    this.employees.push(employee);
    employee.department = this;
  }

  checkFreeAgentCheck(manager, extraDelayer) {
    var self = this;
    extraDelayer = extraDelayer || 1;
    setTimeout(function recursive() {
      let agent = manager || self.getNextFreeAgent();
      if(agent) {
        agent.handleCall();
      } else {
        if(this.maxRecursionTimes === extraDelayer) {
          agent.rejectCall();
        } else {
          setTimeout(recursive, (self.delayCheckFreeAgentCheck * ++extraDelayer));
        }
      }
    }, this.delayCheckFreeAgentCheck * extraDelayer);
  }

  getNextFreeAgent() {
    for(let i = 0, agentsLength = this.agents.length; i < agentsLength; i++) {
      let agent = this.agents[i];
      if(agent.isFree() && agent.employees.length === 0) {
        return agent;
      }
    }
    return null;
  }

  scalateCall(agent) {
    console.log(`Scalating call to ${agent.fullname}'s manager ${agent.manager.fullname}`);
    if (this.agents.indexOf(agent) > -1
      && this.agents.indexOf(agent.manager) > -1
      && agent.manager.isFree()) {
      agent.rejectCall();
      agent.manager.handleCall(agent.call);
    } else if(agent.manager) {
      this.checkFreeAgentCheck(agent.manager);
      agent.rejectCall();
    } else {
      agent.rejectCall();
    }
  }

  redirectTo(agent, departmentId) {
    const department = this.getDepartmentsInCallCenter().find((item) => {
      return item.id === departmentId;
    });
    console.log(`Redirecting call from department ${this.name} to ${department.name}`);
    if(!department) {
      agent.rejectCall();
    } else{
      agent.rejectCall();
      this.decisionTree.reset();
      const newAgent = department.getNextFreeAgent();
      if(!newAgent) {
        department.checkFreeAgentCheck();
      }else {
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

export default Department;
