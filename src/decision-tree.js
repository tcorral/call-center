'use strict';
class DecisionTree {
  constructor(questions) {
    this.currentIndex = 0;
    this.questions = questions || [];
  }

  reset() {
    this.currentIndex = 0;
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  getNextQuestion() {
    return this.questions[this.currentIndex++];
  }
}

//export default DecisionTree;
module.exports = DecisionTree;
