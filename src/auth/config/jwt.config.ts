import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'JWT',
  (): JwtModuleOptions => ({
    global: true,
    secretOrPrivateKey: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRE_IN,
    },
  }),
);
