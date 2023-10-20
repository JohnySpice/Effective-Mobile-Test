import dataSource from '../db/data-source.js';
import { UserHistoryEntity } from '../entity/index.js';

export async function findAll(params) {
  const userHistoryRep = dataSource.getRepository(UserHistoryEntity);
  const defaultLimit = 10;
  const maxLimit = 100;
  const take = params.limit > maxLimit ? defaultLimit : params.limit;
  const skip = params.offset > maxLimit ? defaultLimit : params.offset;
  let findOptions = {
    take,
    skip,
  };
  if (params.id) findOptions.where = { id: params.id };
  return userHistoryRep.find(findOptions);
}
