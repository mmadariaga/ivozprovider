export class Session {

  username: string;
  token: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }

  getUsername() {
    return this.username;
  }

  getToken() {
    return this.token;
  }
}
  