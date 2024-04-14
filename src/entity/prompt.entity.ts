import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'prompt' })
export class PromptEntity {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 64 })
    id = v4();

    @Column({ name: 'name', type: 'varchar', length: 64 })
    prompt!: string;

    @Column({ name: 'extension', type: 'varchar', length: 8 })
    content!: string;
}
