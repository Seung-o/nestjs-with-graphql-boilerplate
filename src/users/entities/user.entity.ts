import { UserProvider } from 'src/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  lastLoginTime: string;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user)
  auths: UserAuth[];
}
