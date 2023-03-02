import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Seeder } from './seeder';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import MongoMemoryServer from 'mongodb-memory-server-core';
import {CoapPlugin} from "./plugins/coap-plugin";
import axios from 'axios';
import {Logger} from "@nestjs/common";
import {CoapServer} from "./servers/coap-server";
import {registerThings} from "./utils/plugins-utils";
import {RiskModelGateway} from "./plugins/risk-model-gateway";
import {AquabioGateway} from "./plugins/aquabio-gateway";
import {WsAdapter} from "@nestjs/platform-ws";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { MailClient } from './mail/mail';

async function bootstrap() {

  const logger = new Logger ('Main.ts');


  // Run with in-memory Mongo
  if (process.env.INMEMORY_MONGODB === 'true') {
    const mongod = new MongoMemoryServer();
    process.env.MONGODB_URI = await mongod.getUri();
  }

  const options = new DocumentBuilder()
      .setTitle('IbathWater Web of Water (WoW) Hub')
      .setDescription('The document corresponds to the API documentation of the Web of Water Hub as a REST and stream architecture to deal with water data.')
      .setVersion('1.0')
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'access_token',
      )
      .build();

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    'origin': configService.get('ORIGIN', '*').split(','),
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
  });

  const seeder = app.get(Seeder);
  await seeder.seed();
  await app.listen(configService.get('PORT', 3000));

  logger.log(`Requesting user at: ${`${process.env.ROOT_URL}/auth/login`}`)

  try {
    const userLogin = await axios.post(`${process.env.ROOT_URL}/auth/login`, {
      username: process.env.APP_ADMIN_USER,
      password: process.env.APP_ADMIN_PASS
    });

    logger.log(`Loading all Things...`);
    const status = await registerThings(userLogin.data.access_token);

    if (!status) process.exit();

    logger.log(`Starting email receiver`)

    const mailClient = new MailClient ('xxxx@eurecat.org', 'xxxxx', 'outlook.office365.com', 993, true);

    mailClient.connectMail();

    /*logger.log(`Starting COAP Server...`);
    const coapPlugin = new CoapPlugin(userLogin.data.access_token, {'simulate': false, 'frequency': 2000, 'deviceId': 'coap-1', 'propName': 'co2'});
    const coapServer = new CoapServer();

    CoapServer.start();
    await coapPlugin.start();

    logger.log(`Starting Risk-Model Plugin...`);

    const riskModel = new RiskModelGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 3000, 'deviceId': 'risk-model', 'propName': ['waterQuality', 'ecoliConcentration']}
        );
    await riskModel.start();

    logger.log(`Starting AquaBio Plugin...`);
    await new AquabioGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 5000, 'deviceId': 'berlin-aquaBio-1', 'propName':"ecoli"}).start()
    await new AquabioGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 5000, 'deviceId': 'berlin-aquaBio-2', 'propName':"ecoli"}).start()
    await new AquabioGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 5000, 'deviceId': 'berlin-aquaBio-3', 'propName':"enteroccoci"}).start()
    await new AquabioGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 5000, 'deviceId': 'berlin-aquaBio-4', 'propName':"enteroccoci"}).start()*/

  } catch(error){
    throw error;
  }

}
bootstrap();
