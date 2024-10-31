export abstract class UserAuthenticatedDto {
  constructor(
    public email: string,
    public id: string,
    public token: string,
  ) { }
}
