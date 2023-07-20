import { registerAs } from '@nestjs/config';

type JwtModuleOptions = {
  global: boolean;
  secretOrPrivateKey: string;
  signOptions: {
    expiresIn: string;
  };
};

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
