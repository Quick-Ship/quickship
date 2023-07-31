import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const context_ = GqlExecutionContext.create(context);
    const request = context_.getContext().req;
    const token = request?.headers['authorization'];
    const user = token ? true : false;
    return user;
  }
}
