import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Index } from 'typeorm';

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  tenantId: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, default: 'HIGH' })
  severity: RuleSeverity;

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

enum RuleSeverity {
  'MEDIUM', 
  'HIGH',
  'CRITICAL'
}