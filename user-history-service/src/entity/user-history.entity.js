import { EntitySchema } from 'typeorm';
import { UserEntity } from './user.entity.js';

export const UserHistoryEntity = new EntitySchema({
  name: 'user_history',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    event: {
      type: 'varchar',
      enum: ['create', 'update'],
    },
    field: {
      type: 'varchar',
      length: 32,
      nullable: true
    },
    oldValue: {
      name: 'old_value',
      type: 'varchar',
      nullable: true
    },
    newValue: {
      name: 'new_value',
      type: 'varchar',
      nullable: true
    },
    createdAt: {
      name: 'created_at',
      createDate: true,
    },
  },
  relations: {
    userId: {
      target: UserEntity,
      type: 'many-to-one',
      cascade: 'remove',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
