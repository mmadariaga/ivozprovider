export class Credentials {
  private username: string = '';
  private password: string = '';

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getUsername(): string {
    return this.username;
  }

  public toFormData(): FormData {

    const payload = new FormData();
    payload.append('username', this.username);
    payload.append('password', this.password);

    return payload;
  }
}
  