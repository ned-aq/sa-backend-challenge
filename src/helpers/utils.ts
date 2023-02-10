import { GetRepositoryQuery } from './../models/getRepositoryQuery';

export function generateQueryString(params: GetRepositoryQuery) {
  const qualifiers = [];
  if (typeof params.createdAfter !== 'undefined') {
    const createdAfter = new Date(params.createdAfter);
    if (!isNaN(createdAfter.getTime())) {
      qualifiers.push(`created:>${createdAfter.toISOString().substring(0, 10)}`);
    }
  }
  if (typeof params.language !== 'undefined') {
    qualifiers.push(`language:${params.language}`);
  }

  const queryParams = [];
  queryParams.push(`per_page=${params.perPage}`);
  queryParams.push(`sort=${params.sort}`);
  queryParams.push(`order=${params.order}`);

  return `?q=${qualifiers.join('+')}${qualifiers.length ? '&' : ''}${queryParams.join('&')}`;
}
