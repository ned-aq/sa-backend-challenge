import { Repository } from '../helpers/types';
import { Service } from 'typedi';
import axios from 'axios';

@Service()
export class RepositoryProvider {
  private repositoriesURL = 'https://api.github.com/search/repositories';

  /**
   * Get repositories from GitHub
   */
  public async getRepositories(queryString: string): Promise<Repository[]> {
    const repositories = await axios.get(`${this.repositoriesURL}${queryString}`);
    if (!repositories.data?.items) {
      return [];
    }
    // return some properties only for readability. To return full items just return repositories.data.items
    return repositories.data.items.map((repo: any) => {
      const { id, full_name, language, stargazers_count, html_url, created_at } = repo;
      return { id, full_name, language, stargazers_count, html_url, created_at };
    });
  }
}
