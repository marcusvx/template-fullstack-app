import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';

export type SeedRecord<T extends ObjectLiteral> = {
  where: FindOptionsWhere<T>;
  data: DeepPartial<T>;
};

export type SeedResult = {
  inserted: number;
  skipped: number;
};

export async function seedRecords<T extends ObjectLiteral>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
  records: SeedRecord<T>[],
): Promise<SeedResult> {
  const repository = dataSource.getRepository(entity);
  const recordsToInsert: DeepPartial<T>[] = [];

  for (const record of records) {
    const exists = await repository.existsBy(record.where);

    if (exists) {
      continue;
    }

    recordsToInsert.push(record.data);
  }

  if (recordsToInsert.length > 0) {
    await repository.save(repository.create(recordsToInsert));
  }

  return {
    inserted: recordsToInsert.length,
    skipped: records.length - recordsToInsert.length,
  };
}
