import { nanoid } from 'nanoid';
import { UserProvider } from 'src/graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity()
export class UserAuth extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('enum', { enum: UserProvider })
  provider: UserProvider;

  @OneToMany(() => User, (user) => user.auths)
  @JoinColumn()
  user: Partial<User>;

  _beforeInsert() {
    this.id = nanoid();
  }
}
