import { Application } from 'express';
import { expect } from 'chai';
import gitHubGetResponse from './mocks/gitHubGetResponse.json';
import nock from 'nock';
import request from 'supertest';

import { startApp } from '../../src/server';
import Container from 'typedi';

const repositoriesURL = 'https://api.github.com';

describe('/repositories route', () => {
  let app: Application;
  before(async () => {
    const result = await startApp();
    app = result.express;
  });

  after(async () => {
    Container.reset();
    nock.cleanAll();
  });

  describe('get repositories', () => {
    it('should get 200 with expected response for given query', async () => {
      nock(repositoriesURL)
        .get('/search/repositories')
        .query(true)
        .reply(200, () => {
          return gitHubGetResponse;
        });
      const response = await request(app)
        .get('/repositories')
        .query({
          language: 'js',
          createdAfter: '2022-01-02',
          perPage: 50,
          sort: 'stars',
          order: 'desc',
        })
        .expect(200);

      const repositories = response.body;
      expect(repositories.items).to.be.an('array');
      expect(repositories.items).to.have.property('length', 2);
      expect(repositories).to.have.property('total_count', 2);
    });

    it('should get 200 with 0 items when no items returned from gitHub', async () => {
      nock(repositoriesURL)
        .get('/search/repositories')
        .query(true)
        .reply(200, () => {
          return null;
        });
      const response = await request(app).get('/repositories').expect(200);

      const repositories = response.body;
      expect(repositories.items).to.be.an('array');
      expect(repositories.items).to.have.property('length', 0);
      expect(repositories).to.have.property('total_count', 0);
    });
  });
});
