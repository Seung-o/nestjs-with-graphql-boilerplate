import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { User } from './entities/user.entity';
import { UserAuthManager } from './services/user-auth-manager.service';
import { UserManager } from './services/user-manager.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  providers: [UserResolver, UserService, UserManager, UserAuthManager],
  exports: [UserService],
})
export class UserModule {}
