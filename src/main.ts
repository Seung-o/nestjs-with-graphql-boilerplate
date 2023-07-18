import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(passport.initialize());

    await app.listen(process.env.PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
