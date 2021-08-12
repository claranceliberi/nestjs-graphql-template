import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '20m',
    refreshIn: '40m',
    bcryptSaltOrRound: 10,
  },
  ses: {
    email: {
      from: 'help@hello.com',
      name: 'hello-name'
    },
  }
};

export default (): Config => config;
