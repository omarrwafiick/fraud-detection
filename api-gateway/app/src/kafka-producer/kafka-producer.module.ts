import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.KAFKA_BROKER_NAME || 'KAFKA_FRAUD_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_BROKER_ID || 'fraud-gateway-producer',
            brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092'],
            connectionTimeout: 3000, // Drop the connection attempt after 3 seconds
            retry: {
              retries: 3, // Don't loop infinitely; fail fast after 3 fast attempts
            },
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaProducerModule {}