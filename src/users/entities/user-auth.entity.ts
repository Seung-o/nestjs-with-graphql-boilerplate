import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/common/database/base.entity';
import { UserProvider } from 'src/graphql';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAuth extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('enum', { enum: UserProvider })
  provider: UserProvider;

  @ManyToOne(() => User, (user) => user.auths, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  _beforeInsert() {
    this.id = nanoid();
  }
}
