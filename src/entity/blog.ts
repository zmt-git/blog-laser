// 文章实体
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export default class Blog {
  @PrimaryGeneratedColumn({ comment: '文章id'})
  id!: number

  @Column({ type: "varchar", length: 100, comment: '文章标题'})
  title!: string

  @Column({ type: "varchar", length: 200, comment: '文章图片描述', nullable: true })
  img!: string

  @Column({ name: 'read_num', type: "int", comment: '阅读数量', default: 0 })
  readNum!: number

  @Column({ name: 'comment_num', type: "int", comment: '评论数量', default: 0})
  commentNum!: number

  @Column({ type: "int", comment: '点赞数量', default: 0 })
  like!: number

  @Column({ name: 'author_id', type: "int", comment: '文章作者' })
  authorId!: number

  @Column({ name: 'category_id', type: "int", comment: '文章分类', nullable: true  })
  categoryId!: number

  @Column({ type: "text", comment: '文章内容'})
  content!: string

  @CreateDateColumn({ name: 'create_time', type: "timestamp", comment: '文章创建时间'})
  createTime!: Date

  @UpdateDateColumn({ name: 'update_time', type: "timestamp", comment: '文章更新时间'})
  updateTime!: Date
}
