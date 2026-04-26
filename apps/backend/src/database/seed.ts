import 'dotenv/config';
import { DataSource } from 'typeorm';
import dataSource from './data-source';
import { SeedResult } from './seeds/seed-records';
import { seedMessages } from './seeds/seed-messages';

type Seed = {
  name: string;
  run: (dataSource: DataSource) => Promise<SeedResult>;
};

const seeds: Seed[] = [
  {
    name: 'messages',
    run: seedMessages,
  },
];

async function runSeeds(): Promise<void> {
  await dataSource.initialize();

  try {
    for (const seed of seeds) {
      const result = await seed.run(dataSource);
      console.log(
        `Seeded ${seed.name}: ${result.inserted} inserted, ${result.skipped} skipped`,
      );
    }
  } finally {
    await dataSource.destroy();
  }
}

void runSeeds();
