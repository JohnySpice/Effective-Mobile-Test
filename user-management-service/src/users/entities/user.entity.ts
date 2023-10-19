import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ColumnOptions,
} from 'typeorm';

const dateColumnsOptions = {
  type: 'timestamp',
  transformer: {
    from: (value: Date) => Date.parse(value.toISOString()),
    to: (value) => value,
  },
} as ColumnOptions;

enum EGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64, name: 'first_name' })
  firstName: string;

  @Column({ length: 64, nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ enum: EGender })
  gender: string;

  @Column({ length: 128 })
  email: string;

  @Column({ type: 'smallint' })
  age: number;

  @CreateDateColumn(dateColumnsOptions)
  createdAt: number;

  @UpdateDateColumn(dateColumnsOptions)
  updatedAt: number;
}
