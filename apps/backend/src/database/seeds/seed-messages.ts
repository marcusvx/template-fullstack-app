import { DataSource } from 'typeorm';
import { MessageEntity } from '../../messages/entities/message.entity';
import { SeedResult, seedRecords } from './seed-records';

const messages = [
  'Hello World',
  'Lorem Ipsum Dolor Sit Amet',
  'Start hacking!',
];

export async function seedMessages(
  dataSource: DataSource,
): Promise<SeedResult> {
  return seedRecords(
    dataSource,
    MessageEntity,
    messages.map((content) => ({
      where: { content },
      data: { content },
    })),
  );
}
