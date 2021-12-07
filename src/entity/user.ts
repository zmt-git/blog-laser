// 用户实体
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  PrimaryColumn
} from "typeorm"

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ comment: '用户id'})
  id!: number

  @Column({ type: "int", comment: '用户等级', default: 0 })
  level!: number

  @PrimaryColumn()
  @Column({ type: "varchar", length: 60, comment: '用户名' })
  name!: string

  @Column({ type: "varchar", length: 60, comment: '用户密码', select: false })
  password!: string

  @Column({ type: "varchar", length: 11, comment: '用户电话号码', nullable: true})
  telephone!: number

  @Column({ type: "varchar", length: 60, comment: '用户邮箱号码', nullable: true })
  email!: number

  @Column({ type: "int", comment: '性别 0-未知 1-男 2-女', default: 0 })
  sex!: number

  @Column({ type: "varchar", length: 200, nullable: true, comment: '签名' })
  sign!: number

  @Column({ type: "varchar", length: 1000, nullable: true, comment: '头像' })
  avatar!: number

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '创建时间'})
  createTime!: number
}
