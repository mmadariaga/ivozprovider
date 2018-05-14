export class Credentials {
  private username: string = '';
  private password: string = '';

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public toFormData(): FormData {

    const payload = new FormData();
    payload.append('username', this.username);
    payload.append('password', this.password);

    return payload;
  }
}
  