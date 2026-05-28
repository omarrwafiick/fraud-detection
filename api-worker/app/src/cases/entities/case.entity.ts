import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Index } from 'typeorm';

enum CaseStatus {
    'OPEN'='OPEN',
    'INVESTIGATING'='INVESTIGATING', 
    'RESOLVED'='RESOLVED',
    'DISMISSED'='DISMISSED',
}

enum CaseSeverity {
    'MEDIUM'='MEDIUM', 
    'HIGH'='HIGH',
    'CRITICAL'='CRITICAL',
}

enum TriggerType{
    'CYCLIC_TRANSFER_DETECTION'='CYCLIC_TRANSFER_DETECTION',
    'CUSTOM_RULE_VIOLATION'='CUSTOM_RULE_VIOLATION',
}

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  tenantId: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column({ type: 'enum', enum: CaseStatus, default: CaseStatus.OPEN })
  status: CaseStatus;

  @Column({ type: 'enum', enum: CaseSeverity, default: CaseSeverity.HIGH })
  severity: CaseSeverity;

  @Column({ type: 'enum', enum: TriggerType, default: TriggerType.CYCLIC_TRANSFER_DETECTION })
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