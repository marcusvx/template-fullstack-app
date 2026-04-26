import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserAccountEntity } from './entities/user-account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly accountsRepository: Repository<UserAccountEntity>,
  ) {}

  findAll(): Promise<UserAccountEntity[]> {
    return this.accountsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: string): Promise<UserAccountEntity> {
    const account = await this.accountsRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }

    return account;
  }

  async create(dto: CreateAccountDto): Promise<UserAccountEntity> {
    const account = this.accountsRepository.create({
      fullName: `${dto.firstName} ${dto.lastName}`,
      email: dto.email.toLowerCase(),
      status: 'active',
    });
    return this.accountsRepository.save(account);
  }
}
