/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClientService } from '@project/models';
import { Entity, IStorableEntity, IEntityFactory } from '@project/core';
import { IRepository } from './repository.interface';
import { NotImplementedException } from '@nestjs/common';
import { ExceptionMessage } from '@project/constant';

export abstract class BasePostgresRepository<
  T extends Entity & IStorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>
> implements IRepository<T>
{
  constructor(
    protected entityFactory: IEntityFactory<T>,
    protected readonly client: PrismaClientService
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async findById(id: T['id']): Promise<T> {
    throw new NotImplementedException(ExceptionMessage.NotImplemented);
  }

  public async save(entity: T): Promise<void> {
    throw new NotImplementedException(ExceptionMessage.NotImplemented);
  }

  public async update(entity: T): Promise<T> {
    throw new NotImplementedException(ExceptionMessage.NotImplemented);
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new NotImplementedException(ExceptionMessage.NotImplemented);
  }
}
