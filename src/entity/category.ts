// 分类实体
import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Category {
  @PrimaryGeneratedColumn({ comment: '分类id'})
  id!: number

  @Column({ type: "int", comment: '分类父id'})
  pid!: number

  @Column({ name: 'category_name', type: "varchar", length: 30, comment: '分类标题'})
  categoryName!: string

  @Column({ name: 'create_user_id', type: "int", comment: '创建用户id'})
  createUserId!: string

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '创建时间'})
  createTime!: number
}
