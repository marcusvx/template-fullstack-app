import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessagesService } from './messages.service';

type MockRepository<T extends object = object> = Pick<
  Repository<T>,
  'create' | 'find' | 'findOneBy' | 'save'
>;

describe('MessagesService', () => {
  let service: MessagesService;
  let messagesRepository: jest.Mocked<MockRepository<MessageEntity>>;

  const message: MessageEntity = {
    id: '018f0c72-9c61-7000-8000-000000000001',
    content: 'Hello World',
    createdAt: new Date('2026-04-26T00:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(MessagesService);
    messagesRepository = module.get(getRepositoryToken(MessageEntity));
  });

  it('creates a default message when no content is provided', async () => {
    const messageToSave = {
      content: 'Hello World',
    } as MessageEntity;
    const savedMessage = {
      ...messageToSave,
      id: message.id,
      createdAt: message.createdAt,
    };

    messagesRepository.create.mockReturnValue(messageToSave);
    messagesRepository.save.mockResolvedValue(savedMessage);

    await expect(service.create()).resolves.toEqual(savedMessage);
    expect(messagesRepository.create).toHaveBeenCalledWith({
      content: 'Hello World',
    });
    expect(messagesRepository.save).toHaveBeenCalledWith(messageToSave);
  });

  it('finds messages with pagination', async () => {
    messagesRepository.find.mockResolvedValue([message]);

    await expect(service.findAll(5, 20)).resolves.toEqual([message]);
    expect(messagesRepository.find).toHaveBeenCalledWith({
      skip: 5,
      take: 20,
    });
  });

  it('finds latest messages ordered by newest first', async () => {
    messagesRepository.find.mockResolvedValue([message]);

    await expect(service.findLatest(10)).resolves.toEqual([message]);
    expect(messagesRepository.find).toHaveBeenCalledWith({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  });

  it('returns a message by id', async () => {
    messagesRepository.findOneBy.mockResolvedValue(message);

    await expect(service.getById(message.id)).resolves.toEqual(message);
    expect(messagesRepository.findOneBy).toHaveBeenCalledWith({
      id: message.id,
    });
  });

  it('throws when a message does not exist', async () => {
    messagesRepository.findOneBy.mockResolvedValue(null);

    await expect(service.getById(message.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
