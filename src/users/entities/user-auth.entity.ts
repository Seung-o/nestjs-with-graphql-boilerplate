import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/common/database/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserProvider } from '../enums/user-provider.enum';
import { UserAuth } from '../interfaces/user-auth.interface';

@Entity('user_auth')
export class UserAuthEntity extends BaseEntity implements UserAuth {
  @PrimaryColumn()
  id: string;

  @Column('enum', { enum: UserProvider })
  provider: UserProvider;

  @ManyToOne(() => UserEntity, (user) => user.auths, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  @JoinColumn()
  user: UserEntity;

  @BeforeInsert()
  _beforeInsert() {
    this.id = nanoid();
  }
}
