import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('routes')
export class Routes extends Resource {
  id: string;
  title: string
  description?: string
  type: string
  creationDate: Date
  createdBy: User
  uri: string

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
