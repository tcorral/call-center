class Call {
  constructor(phone, priority) {
    priority = priority || 0;
    this.phone = phone;
    this.agentsInvolved = [];
    this.resolved = null;
    this.priority = priority;
  }

  addAgent(agent) {
    this.agentsInvolved.push(agent);
  }

  resolve() {
    this.resolved = true;
  }

  reject() {
    this.resolved = false;
  }
}

export default Call;
