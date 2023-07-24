import { BaseEntity } from 'src/common/database/base.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuth } from './user-auth.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  lastLoginTime: Date;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  auths: UserAuth[];
}
