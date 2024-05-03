import { NotFoundException } from '@nestjs/common';

export class TokenNotExistsException extends NotFoundException {
  constructor(tokenId: string) {
    super(`Token with ID ${tokenId} does not exists`);
  }
}
