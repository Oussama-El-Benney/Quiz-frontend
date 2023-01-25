export class User {
  constructor(
    public username: string,
    public roles: string,
    private accessToken: string,
    private _tokenExpirationDate: Date,
    private refreshToken: string,
  ) {}
  get token() {
    const expiry = (JSON.parse(atob(this.accessToken.split('.')[1]))).exp;
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this.accessToken;
  }
}
