import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
  ) {}

  create(dto: CreateMessageDto = {}): Promise<MessageEntity> {
    const message = this.messagesRepository.create({
      content: dto.content ?? 'Hello World',
    });

    return this.messagesRepository.save(message);
  }

  findAll(skip = 0, limit = 100): Promise<MessageEntity[]> {
    return this.messagesRepository.find({
      skip,
      take: limit,
    });
  }

  findLatest(limit = 10): Promise<MessageEntity[]> {
    return this.messagesRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getById(id: string): Promise<MessageEntity> {
    const message = await this.messagesRepository.findOneBy({ id });

    if (!message) {
      throw new NotFoundException(`Message ${id} not found`);
    }

    return message;
  }
}
