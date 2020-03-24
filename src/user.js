

export default class User {
  constructor() {
    this.state = this.generateState();
    // this.generateState = this.generateState.bind(this);
  }

  generateState() {
    return Math
      .random()
      .toString(36)
      .substring(2, 15) +
    Math
      .random()
      .toString(36)
      .substring(2, 15);
  }
  
  
}