import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { List } from '../list.model';

@ObjectType()
export class ListConnection extends PaginatedResponse(List) { }
