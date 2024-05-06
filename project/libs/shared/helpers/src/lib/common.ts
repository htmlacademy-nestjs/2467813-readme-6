import {
  ClassTransformOptions,
  Transform,
  plainToInstance,
} from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = {
  value: number;
  unit: DateTimeUnit;
};

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;
export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];
export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export const getMongoConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string =>
  `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export const getMessageNotFoundDocument = (name: string, id: string) => {
  return `${name} with ID ${id} not found`;
};

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return {
    value,
    unit,
  };
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export function ToLowerCase() {
  return Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => (typeof v === 'string' ? v.toLowerCase() : v));
    }
    return typeof value === 'string' ? value.toLowerCase() : value;
  });
}
