import { nanoid } from 'nanoid';
import { UserProvider } from 'src/graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAuth extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('enum', { enum: UserProvider })
  provider: UserProvider;

  @OneToMany(() => User, (user) => user.userAuths)
  @JoinColumn()
  user: Partial<User>;

  _beforeInsert() {
    this.id = nanoid();
  }
}
