import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';

@Injectable()
export class SocialAuthGuard extends AuthGuard() {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const { input } = ctx.getArgs();

    request.body = {
      ...request.body,
      accessToken: input.accessToken,
      provider: input.provider,
    };

    return true;
  }
}
