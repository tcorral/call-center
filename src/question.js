class Question {
  constructor(config) {
    this.name = config.name;
    this.message = config.statement;
    this.scaleOn = config.scaleOn;
    this.redirectOn = config.redirectOn;
    this.redirectTo = config.redirectTo;
  }

  shouldBeScaled(answer) {
    return (this.scaleOn === answer);
  }

  shouldBeRedirected(answer) {
    return (this.redirectOn === answer);
  }
}

export default Question;
