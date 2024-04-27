import { Entity } from '@project/core';

export interface IRepository<T extends Entity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<void | string>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
