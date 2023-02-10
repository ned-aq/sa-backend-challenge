// tslint:disable:no-any no-identical-functions one-variable-per-declaration

import { Application } from 'express';
import { expect } from 'chai';
import request from 'supertest';

import { startApp } from '../../src/server';
import Container from 'typedi';

describe('/ route', () => {
  let app: Application;
  before(async () => {
    const result = await startApp();
    app = result.express;
  });

  after(async () => {
    Container.reset();
  });

  describe('get health', () => {
    it('should return valid values', async () => {
      const response = await request(app).get('/').expect(200);
      const repositories = response.body;
      expect(repositories).to.have.property('health', 'ok');
    });
  });
});
