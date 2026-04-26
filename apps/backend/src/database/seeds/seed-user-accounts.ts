import 'dotenv/config';
import dataSource from '../data-source';
import { UserAccountEntity } from '../../accounts/entities/user-account.entity';

async function seedUserAccounts(): Promise<void> {
  await dataSource.initialize();

  try {
    const userAccountRepository = dataSource.getRepository(UserAccountEntity);

    await userAccountRepository.upsert(
      {
        fullName: 'Template Admin',
        email: 'admin@template.local',
        status: 'active',
      },
      ['email'],
    );
  } finally {
    await dataSource.destroy();
  }
}

void seedUserAccounts();
