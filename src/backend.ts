/* eslint-disable @typescript-eslint/ban-types */
import { Application } from 'express';
import { createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import Container from 'typedi';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';

/**
 * A generic initializer of our backend
 */
export class Backend {
  public express!: Application;
  private controllers: Function[] = [];

  /**
   * Launch the listen port and optional explorer
   */
  public async start() {
    dotenv.config();
    // Parse class-validator classes into JSON Schema:
    const schema = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/',
    });

    useContainer(Container);

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      {
        controllers: this.controllers,
        defaultErrorHandler: true,
        development: true,
      },
      {
        components: {
          schema,
          securitySchemes: {
            ApiKeyAuth: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
            },
          },
        },
        info: {
          description: 'A backend application for discovering popular repositories on GitHub',
          title: 'Shop Apotheke Backend Coding Challenge API',
          version: '1.0.0',
        },
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
      }
    );

    this.express.use('/explorer', swaggerUi.serve, swaggerUi.setup(spec));

    const listen = '0.0.0.0';
    const port = process.env.PORT;
    this.express.listen(Number(port) || 8000, listen, () => {
      // eslint-disable-next-line no-console
      console.info(`Serving on http://${listen}:${port}`);
    });
  }

  /**
   * Create a new backend instance and configure it
   */
  public static async create(
    controllers: Function[],
    middlewares: Function[],
    development: boolean = true,
    cors: boolean = true,
    validation: boolean = false,
    defaultErrorHandler: boolean = true
  ) {
    const be = new Backend();

    be.express = createExpressServer({
      controllers,
      middlewares,
      defaultErrorHandler,
      validation,
      development,
      cors,
    });

    return be;
  }
}
