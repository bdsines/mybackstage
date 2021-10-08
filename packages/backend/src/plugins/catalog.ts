import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import {MicrosoftGraphOrgReaderProcessor} from '@backstage/plugin-catalog-backend-module-msgraph'
export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  // packages/backend/src/plugins/catalog.ts
builder.addProcessor(
  MicrosoftGraphOrgReaderProcessor.fromConfig(env.config, {
    logger: env.logger,
  }),
);

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
