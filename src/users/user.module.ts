import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthManager } from './services/user-auth-manager.service';
import { UserManager } from './services/user-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  providers: [UserService, UserManager, UserAuthManager],
  exports: [UserService],
})
export class UserModule {}