import { Entity, IStorableEntity, ISubscriber } from '@project/core';

export class EmailSubscriberEntity
  extends Entity
  implements IStorableEntity<ISubscriber>
{
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(subscriber?: ISubscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: ISubscriber): void {
    if (!subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.firstName = subscriber.firstName;
    this.lastName = subscriber.lastName;
  }

  public toPOJO(): ISubscriber {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
