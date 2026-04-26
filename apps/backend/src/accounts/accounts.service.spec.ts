import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { UserAccountEntity } from './entities/user-account.entity';

type MockRepository<T extends object = object> = Pick<
  Repository<T>,
  'create' | 'find' | 'findOneBy' | 'save'
>;

describe('AccountsService', () => {
  let service: AccountsService;
  let accountsRepository: jest.Mocked<MockRepository<UserAccountEntity>>;

  const account: UserAccountEntity = {
    id: '018f0c72-9c61-7000-8000-000000000001',
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    createdAt: new Date('2026-04-26T00:00:00.000Z'),
    status: 'active',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(UserAccountEntity),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AccountsService);
    accountsRepository = module.get(getRepositoryToken(UserAccountEntity));
  });

  it('finds all accounts ordered by newest first', async () => {
    accountsRepository.find.mockResolvedValue([account]);

    await expect(service.findAll()).resolves.toEqual([account]);
    expect(accountsRepository.find).toHaveBeenCalledWith({
      order: { createdAt: 'DESC' },
    });
  });

  it('returns an account by id', async () => {
    accountsRepository.findOneBy.mockResolvedValue(account);

    await expect(service.getById(account.id)).resolves.toEqual(account);
    expect(accountsRepository.findOneBy).toHaveBeenCalledWith({
      id: account.id,
    });
  });

  it('throws when an account does not exist', async () => {
    accountsRepository.findOneBy.mockResolvedValue(null);

    await expect(service.getById(account.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('creates an active account with normalized email', async () => {
    const accountToSave = {
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      status: 'active',
    } as UserAccountEntity;
    const savedAccount = {
      ...accountToSave,
      id: '018f0c72-9c61-7000-8000-000000000002',
      createdAt: new Date('2026-04-26T01:00:00.000Z'),
    };

    accountsRepository.create.mockReturnValue(accountToSave);
    accountsRepository.save.mockResolvedValue(savedAccount);

    await expect(
      service.create({
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'GRACE@EXAMPLE.COM',
      }),
    ).resolves.toEqual(savedAccount);

    expect(accountsRepository.create).toHaveBeenCalledWith({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      status: 'active',
    });
    expect(accountsRepository.save).toHaveBeenCalledWith(accountToSave);
  });
});
