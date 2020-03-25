

export default class User {
  constructor() {
    this.state = this.generateState();
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