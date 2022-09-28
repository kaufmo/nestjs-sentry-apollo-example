import { Resolver, Query } from '@nestjs/graphql';
import { Author } from './dto/author.object';
import { plainToInstance } from 'class-transformer';

@Resolver(() => Author)
export class AppResolver {
  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return [
      plainToInstance(Author, {
        id: 'bfc9d640-ab1b-4f16-92ee-565056066163',
        firstName: 'John',
        lastName: 'Doe',
      }),
      plainToInstance(Author, {
        id: '43522bdd-2142-4464-bd2c-1c7eb59375c8',
        firstName: 'Jane',
        lastName: 'Doe',
      }),
    ];
  }
}
