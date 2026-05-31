import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { NEO4J_DRIVER } from './graph.module';
import neo4j, { Driver } from 'neo4j-driver';

@Injectable()
export class GraphService implements OnModuleInit {
    constructor(
        @Inject(NEO4J_DRIVER) 
        private readonly neo4jDriver: Driver,
    ) {}

    async onModuleInit() {
        const session = this.neo4jDriver.session();
        try {
            /**
             * Constraint is to prevent data leaks by make each account live in
             * a separate sub graph + create an index for fast lookups
             */
            await session.run(`
                CREATE CONSTRAINT unique_account_per_tenant IF NOT EXISTS
                FOR (a:Account) REQUIRE (a.id, a.tenantId) IS UNIQUE
            `);
        } finally {
            await session.close();
        }
    }

    async syncTransactionEdge(dto: {
        tenantId: number;
        transactionId: string;
        senderAccountId: string;
        receiverAccountId: string;
        amount: number;
        status: string;
    }): Promise<void> {
        const session = this.neo4jDriver.session();
        
        const cypher = `
            MERGE (s:Account { id: $senderAccountId, tenantId: $tenantId })
            MERGE (r:Account { id: $receiverAccountId, tenantId: $tenantId })
            CREATE (s)-[t:TRANSACTED_WITH {
                id: $transactionId,
                amount: $amount,
                status: $status,
                timestamp: datetime()
            }]->(r)
        `;

        try {
        await session.run(cypher, {
            tenantId: neo4j.int(dto.tenantId),
            senderAccountId: dto.senderAccountId,
            receiverAccountId: dto.receiverAccountId,
            transactionId: dto.transactionId,
            amount: dto.amount,
            status: dto.status,
        });
        } finally {
        await session.close();
        }
    }
}
