import { IStorableEntity, IAuthUser } from '@project/core';
import { Entity } from '@project/core';
import { SALT_ROUNDS } from '../const';
import { genSalt, hash, compare } from 'bcrypt';

export class BlogUserEntity
  extends Entity
  implements IStorableEntity<IAuthUser>
{
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarPath?: string;
  public passwordHash: string;

  constructor(user?: IAuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: IAuthUser): void {
    if (!user) {
      return;
    }

    this.id = this.id ?? '';
    this.email = user.email;
    this.avatarPath = user.avatarPath ?? '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): IAuthUser {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarPath: this.avatarPath,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
