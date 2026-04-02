/**
 * Database Model Template
 * Use this as a template for creating database models
 *
 * For Prisma: Create models in schema.prisma
 * For TypeORM: Create entities with decorators
 */

// ============ PRISMA SCHEMA EXAMPLE ============

/*
model Event {
  id        Int     @id @default(autoincrement())
  uuid      String  @unique @default(cuid())
  title     String
  description String?
  startDate DateTime
  endDate   DateTime
  location  String?
  branch    Branch  @relation(fields: [branchId], references: [id])
  branchId  Int
  
  // Relations
  rsvps     EventRSVP[]
  gallery   Gallery[]
  
  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  
  @@map("events")
  @@index([branchId])
  @@index([startDate])
}

model EventRSVP {
  id       Int    @id @default(autoincrement())
  event    Event  @relation(fields: [eventId], references: [id])
  eventId  Int
  user     User   @relation(fields: [userId], references: [id])
  userId   Int
  status   String @default("confirmed") // confirmed, declined, maybe
  
  createdAt DateTime @default(now())
  
  @@unique([eventId, userId])
  @@index([eventId])
  @@index([userId])
}
*/

// ============ TYPEORM ENTITY EXAMPLE ============

/*
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';

@Entity('events')
@Index(['branchId'])
@Index(['startDate'])
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Branch, (branch) => branch.events)
  branch: Branch;

  @Column()
  branchId: number;

  @OneToMany(() => EventRSVP, (rsvp) => rsvp.event)
  rsvps: EventRSVP[];

  @OneToMany(() => Gallery, (gallery) => gallery.event)
  gallery: Gallery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
*/

// ============ MONGODB SCHEMA EXAMPLE ============

/*
const eventSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: String,
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
    },
    capacity: Number,
    rsvps: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        status: {
          type: String,
          enum: ['confirmed', 'declined', 'maybe'],
          default: 'confirmed',
        },
        registeredAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
*/

// ============ GENERIC MODEL CLASS ============

export interface BaseModelFields {
  id: number | string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class BaseModel implements BaseModelFields {
  id!: number | string;
  uuid!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  /**
   * Soft delete - marks record as deleted without removing it
   */
  delete(): void {
    this.deletedAt = new Date();
  }

  /**
   * Check if record is soft deleted
   */
  isDeleted(): boolean {
    return this.deletedAt !== null && this.deletedAt !== undefined;
  }

  /**
   * Restore soft deleted record
   */
  restore(): void {
    this.deletedAt = undefined;
  }
}

/**
 * Example: Event Model extending BaseModel
 */
export class EventModel extends BaseModel {
  title!: string;
  description?: string;
  startDate!: Date;
  endDate!: Date;
  location?: string;
  branchId!: number;
  capacity?: number;

  constructor(data: Partial<EventModel>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Calculate event duration in hours
   */
  getDurationHours(): number {
    return (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60);
  }

  /**
   * Check if event has passed
   */
  hasPassed(): boolean {
    return this.endDate < new Date();
  }

  /**
   * Check if event is upcoming
   */
  isUpcoming(): boolean {
    return this.startDate > new Date();
  }

  /**
   * Check if event is currently happening
   */
  isHappening(): boolean {
    const now = new Date();
    return now >= this.startDate && now <= this.endDate;
  }
}

// ============ VALIDATION SCHEMAS ============

/*
// Using Zod for validation
import { z } from 'zod';

export const EventCreateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().optional(),
  branchId: z.number().int().positive(),
  capacity: z.number().int().positive().optional(),
});

export type EventCreateInput = z.infer<typeof EventCreateSchema>;
*/

export {};
