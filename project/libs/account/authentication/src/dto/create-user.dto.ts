export class CreateUserDto {
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarPath?: string;
  public password: string;
}
