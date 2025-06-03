// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting, ServerRoute } from '@angular/ssr'; // Importe ServerRoute para a asserção
import { appConfig } from './app.config';
import { routes } from './app.routes'; // Suas rotas de app.routes.ts

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // Faça uma asserção de tipo aqui.
    // Isso diz ao TypeScript: "Eu sei que esses objetos 'routes'
    // (que são AppSsrRoute[]) são compatíveis com o que ServerRoute[] espera".
    provideServerRouting(routes as ServerRoute[]),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);