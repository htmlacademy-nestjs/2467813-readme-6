/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessage } from '@project/constant';
import {
  ClassTransformOptions,
  Transform,
  plainToInstance,
} from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

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

export const getMessageConfig = (name: string, message: string) => {
  return `[${name} Config Validation Error]: ${message}`;
};

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new HttpException(
      `${ExceptionMessage.ParseTime} ${time}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new HttpException(
      ExceptionMessage.ParseTimeNan,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
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

export function IsYoutubeUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isYoutubeUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const urlPattern =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
          return typeof value === 'string' && urlPattern.test(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'The text must be a valid YouTube URL';
        },
      },
    });
  };
}
