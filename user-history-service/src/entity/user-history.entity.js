import { EntitySchema } from 'typeorm';
import { UserEntity } from './user.entity.js';

export const UserHistoryEntity = new EntitySchema({
  name: "user_history", // Will use table name `category` as default behaviour.
  // tableName: "categories", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: true,
    },
    event: {
      type: "varchar",
      enum: ['create', 'update'], // create | update
    },
    oldValue: {
      name: 'old_value',
      type: 'varchar'
    },
    newValue: {
      name: 'new_value',
      type: 'varchar'
    },
    createdAt: {
      name: 'created_at',
      createDate: true
    }
  },
  relations: {
    user: {
      target: UserEntity,
      type: "many-to-one",
      cascade: 'remove',
      joinColumn: {
        name: 'user_id'
      }
    }
  },
});