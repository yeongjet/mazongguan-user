import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('mzg_enterprise_account')
export class EnterpriseAccountModel {
    @PrimaryGeneratedColumn({ comment: '企业账号id' })
    account_id: number

    @Column('int2', { nullable: false, comment: '账号类型: 0.母账号 1.子账号' })
    account_type: number

    @Column('int2', { nullable: false, comment: '账号状态' })
    account_status: number

    @Index()
    @Column('int4', { nullable: false, comment: '所属企业id' })
    enterprise_id: number

    @Column('string', { nullable: false, comment: '邮箱' })
    email: string

    @Column('string', { nullable: false, comment: '手机号码' })
    cellphone: string

    @Column('string', { nullable: false, comment: '密码' })
    password: string

    @Column('int2', { nullable: false, comment: '密码加密版本' })
    password_encrypt_version: number

    @Column('int2', { nullable: false, comment: '密码修改状态' })
    password_modify_status: number

    @Column('string', { nullable: false, comment: '备注' })
    remark: string
}
