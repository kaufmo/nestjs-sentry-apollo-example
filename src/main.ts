import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app: app.getHttpAdapter().getInstance(),
      }),
      new Tracing.Integrations.Apollo(),
    ],
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());

  await app.listen(3000);
}
bootstrap();
