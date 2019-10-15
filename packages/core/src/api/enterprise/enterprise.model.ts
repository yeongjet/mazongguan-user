import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('mzg_enterprise')
export class BatchModel {
    @PrimaryGeneratedColumn({ comment: '企业id' })
    enterprise_id: number

    @Column('int4', { nullable: false, comment: '企业名称' })
    enterpris_name: number

    @Column('string', { nullable: false, comment: '企业logo' })
    enterpris_logo: string

    @Column('string', { nullable: false, comment: '企业标语' })
    enterpris_slogan: string

    @Column('string', { nullable: false, comment: '商户号' })
    mchid: string

    @Column('string', { nullable: false, comment: '支付api密钥' })
    mch_secret_key: string
    
    @Column('string', { nullable: false, comment: '加密支付证书的密钥' })
    mch_cert_crypto_key: string

    @Column('jsonb', { nullable: false, comment: '支付证书相关信息' })
    mch_cert_info: {
        no: string;
        valid_begin_date: string;
        valid_end_date: string;
    }

    @Column('number', { nullable: false, comment: '余额' })
    balance: number

    @Column('array', { nullable: false, comment: '触发预警的余额列表' })
    warn_balance_list: number[]

    @Column('array', { nullable: false, comment: '预警通知的账号列表' })
    warn_account_list: number[]
}