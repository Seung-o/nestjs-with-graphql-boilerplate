import { CanActivate, ExecutionContext, mixin, Optional, Type, UnauthorizedException } from '@nestjs/common';
import { defaultOptions } from '@nestjs/passport/dist/options';
import { AuthModuleOptions, IAuthGuard } from '@nestjs/passport';
import { memoize } from '@nestjs/passport/dist/utils/memoize.util';
import * as passport from 'passport';
import { Request, Response } from 'express';

export const AuthGuard: (type?: string | string[]) => Type<IAuthGuard> = memoize(createAuthGuard);

function createAuthGuard(): Type<CanActivate> {
  class MixinAuthGuard<TUser = any> implements CanActivate {
    constructor(@Optional() protected readonly options: AuthModuleOptions) {
      this.options = this.options || {};
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const options = { ...defaultOptions, ...this.options };
      const [request, response] = [this.getRequest(context), context.switchToHttp().getResponse()];
      const passportFn = createPassportContext(request, response);
      const user = await passportFn(
        // changed
        request.body.provider || this.options.defaultStrategy,
        options,
        (err, user, info, status) => this.handleRequest(err, user, info, context, status),
      );
      request[options.property || defaultOptions.property] = user;
      return true;
    }

    getRequest<T = any>(context: ExecutionContext): T {
      return context.switchToHttp().getRequest();
    }

    async logIn<TRequest extends { logIn: Function } = any>(request: TRequest): Promise<void> {
      const user = request[this.options.property || defaultOptions.property];
      await new Promise((resolve, reject) => request.logIn(user, (err: any) => (err ? reject(err) : resolve({}))));
    }

    handleRequest(err: any, user: TUser, _info, _context, _status): TUser {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
  }
  const guard = mixin(MixinAuthGuard);
  return guard;
}

const createPassportContext =
  (request: Request, response: Response) =>
  (strategy: string | string[] | passport.Strategy, options: passport.AuthenticateOptions, callback: Function) =>
    new Promise((resolve, reject) =>
      passport.authenticate(
        strategy,
        options,
        (err: any, user: Express.User, info?: object | string | Array<string | undefined>, status?: number | Array<number | undefined>) => {
          try {
            request.authInfo = info;
            return resolve(callback(err, user, info, status));
          } catch (err) {
            reject(err);
          }
        },
      )(request, response, (err: any) => (err ? reject(err) : resolve({}))),
    );
