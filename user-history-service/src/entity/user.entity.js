import {
  EntitySchema,
} from 'typeorm';


export const UserEntity = new EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: true,
    },

    firstName: {
      type: 'varchar',
      length: 64,
      name: 'first_name'
    },

    lastName: {
      type: 'varchar',
      length: 64,
      nullable: true,
      name: 'last_name'

    },

    gender: {
      type: "varchar",
      enum: ['male', 'female']
    },

    email: {
      type: 'varchar',
      length: 128,

    },
    age: {
      type: 'smallint'
    },

    createdAt: {
      createDate: true
    },

    updatedAt: {
      updateDate: true
    },
  }
});
