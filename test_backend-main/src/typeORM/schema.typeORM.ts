import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar", length: 255 })
    username!: string

    @Column({ type: "varchar", length: 255 })
    password!: string
}