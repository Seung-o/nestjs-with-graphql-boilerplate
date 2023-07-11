import { UserProvider } from 'src/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  lastLoginTime: string;

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user)
  userAuths: UserAuth[];
}
