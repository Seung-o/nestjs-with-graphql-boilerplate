import { InternalServerErrorException } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config/dist';
import * as Joi from 'joi';
import { join } from 'path';

const getEnvFilePath = (): string => {
  const baseEnvDirctory = 'environments';

  switch (process.env.SERVICE_ENV) {
    case 'local':
      return join(baseEnvDirctory, '.env.local');
    case 'development':
      return join(baseEnvDirctory, '.env.development');
    case 'production':
      return join(baseEnvDirctory, '.env.production');
    default:
      throw new InternalServerErrorException();
  }
};

export const CONFIG_VALIDATOR: ConfigModuleOptions = {
  validationSchema: Joi.object({
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USERNAME: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_SYNCHRONIZE: Joi.boolean().default(false),
    MYSQL_LOGGING: Joi.boolean().default(false),
  }),
  isGlobal: true,
  envFilePath: [getEnvFilePath()],
};
