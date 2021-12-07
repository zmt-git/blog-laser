// 用户粉丝
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'user_follow'})
export default class UserFollow {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id', type: "int", comment: '被关注人的id'})
  userId!: number

  @Column({ name: 'follow_id', type: "int", comment: '关注人的id'})
  followId!: number
}
