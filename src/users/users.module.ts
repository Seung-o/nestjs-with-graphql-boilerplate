import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthService } from './services/user-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  providers: [UserService, UserAuthService],
  exports: [UserService],
})
export class UserModule {}
