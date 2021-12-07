// 评论
import { Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn({ comment: '评论id'})
  id!: number

  @Column({ name: 'blog_id', type: "int", comment: '文章id'})
  blogId!: number

  @Column({ name: 'user_id', type: "int", comment: '评论人id'})
  userId!: number

  @Column({ type: "varchar", length: 2000, comment: '评论内容'})
  content!: string

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '创建时间'})
  createTime!: number

  @Column({ name: 'user_id_parent', type: "int", comment: '回复人id'})
  userIdParent!: number
}
