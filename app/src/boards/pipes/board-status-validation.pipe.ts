import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value); // 처리가 된 인자의 값
    console.log(metadata); // 인자에 대한 메타 데이터를 포함한 객체

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`); // 예외가 발생하면 클라이언트에 바로 전해짐
    }

    return value; // return된 값은 Route 핸들러로 전해짐
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
