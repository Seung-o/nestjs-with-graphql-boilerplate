import { BaseEntity } from 'src/common/database/base.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthEntity } from './user-auth.entity';
import { User } from '../interfaces/user.interface';

@Entity('user')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @CreateDateColumn()
  lastLoginTime: Date;

  @Column({ nullable: true })
  refreshToken?: string | null;

  @OneToMany(() => UserAuthEntity, (userAuth) => userAuth.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  auths: UserAuthEntity[];
}
