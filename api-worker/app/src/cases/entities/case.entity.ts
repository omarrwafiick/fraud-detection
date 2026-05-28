import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Index } from 'typeorm';

@Entity('cases')
export class CaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  tenantId: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column({ type: 'varchar', length: 20, default: 'OPEN' })
  status: CaseStatus;

  @Column({ type: 'varchar', length: 20 })
  severity: CaseSeverity;

  @Column({ type: 'varchar', length: 100 })
  triggerType: TriggerType; 

  @Column({ type: 'varchar' })
  suspectEntityId: string;

  @Column({ type: 'jsonb' })
  metadata: any;

  @Column({ type: 'text', nullable: true })
  resolutionNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

enum CaseStatus {
    'OPEN',
    'INVESTIGATING', 
    'RESOLVED',
    'DISMISSED',
}

enum CaseSeverity {
    'MEDIUM', 
    'HIGH',
    'CRITICAL'
}

enum TriggerType{
    'CYCLIC_TRANSFER_DETECTION',
    'CUSTOM_RULE_VIOLATION',
}