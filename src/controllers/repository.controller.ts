import { Get, JsonController, OnNull, QueryParams } from 'routing-controllers';
import { GetRepositoryQuery } from '../models/getRepositoryQuery';
import { OpenAPI } from 'routing-controllers-openapi';
import { RepositoryProvider } from '../providers/repository.provider';
import { Service } from 'typedi';
import { generateQueryString } from '../helpers/utils';

@JsonController('/repositories')
@Service()
export class RepositoryController {
  public constructor(private repositoryProvider: RepositoryProvider) {}

  /**
   * Return repositories
   */
  @Get()
  @OnNull(404)
  @OpenAPI({
    parameters: [
      {
        in: 'query',
        name: 'language',
      },
      {
        in: 'query',
        name: 'createdAfter',
      },
      {
        in: 'query',
        name: 'sort',
      },
      {
        in: 'query',
        name: 'order',
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
        },
      },
      {
        in: 'query',
        name: 'perPage',
        schema: {
          type: 'array',
          items: {
            type: 'number',
            enum: [10, 50, 100],
          },
        },
      },
    ],
  })
  public async getRepositories(@QueryParams({ validate: true }) query: GetRepositoryQuery) {
    const queryString = generateQueryString(query);
    const result = await this.repositoryProvider.getRepositories(queryString);
    return {
      total_count: result.length,
      items: result,
    };
  }
}
