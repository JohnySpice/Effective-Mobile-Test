import dataSource from '../db/data-source.js';
import { UserHistoryEntity, UserEntity } from '../entity/index.js';

export async function findAll({ limit, offset, id }) {
  const userHistoryRep = dataSource.getRepository(UserHistoryEntity);
  const defaultLimit = 10;
  const defaultOffset = 0;
  const maxLimit = 100;
  const checkedLimit = !limit || limit > maxLimit ? defaultLimit : limit;
  const checkedOffset = !offset || offset > maxLimit ? defaultOffset : offset;
  let query = userHistoryRep.createQueryBuilder()
    .loadAllRelationIds()
    .limit(checkedLimit)
    .offset(checkedOffset)
    .orderBy('created_at', 'DESC');
  if (id) query = query.where("user_id = :id", { id: id });
  return query.getMany();
}

export async function create(changes) {
  const userHistoryRep = dataSource.getRepository(UserHistoryEntity);
  const historyRecord = userHistoryRep.create(changes);
  await userHistoryRep.save(historyRecord);
}
