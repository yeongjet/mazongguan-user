import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('mzg_customer')
export class ConsumerModel {
    @PrimaryGeneratedColumn({ comment: '顾客id' })
    customer_id: number

    @Column('int4', { nullable: false, comment: '所属小程序/公众号id' })
    appid: number

    @Column('string', { nullable: false, comment: 'openid' })
    openid: string

    @Column('string', { nullable: false, comment: 'unionid' })
    unionid: string

    @Column('string', { nullable: false, comment: '昵称' })
    nickname: string

    @Column('int2', { nullable: false, comment: '性别: 1.未知 2.男 3.女' })
    gender: number
    
    @Column('string', { nullable: false, comment: '手机号' })
    cellphone: string

    @Column('int2', { nullable: false, comment: '是否关注了微信公众号: 1.未关注 2.已关注' })
    subscribe: number

    @Column('string', { nullable: false, comment: '语言' })
    language: string

    @Column('int8', { nullable: false, comment: '城市id' })
    city_id: number

    @Column('int8', { nullable: false, comment: '省份id' })
    province_id: number

    @Column('int4', { nullable: false, comment: '国家id' })
    country_id: number

    @Column('string', { nullable: false, comment: '头像地址' })
    headimage_url: string

    @Column('string', { nullable: false, comment: '备注' })
    remark: string

    @Column('int4', { nullable: false, comment: '分组id' })
    group_id: number

    @Column('array', { nullable: false, comment: '标签id列表' })
    tag_id_list: number[]

    @Column('int2', { nullable: false, comment: '关注的渠道: 1.ADD_SCENE_SEARCH 公众号搜索 2.ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移 3.ADD_SCENE_PROFILE_CARD 名片分享 4.ADD_SCENE_QR_CODE 扫描二维码 5.ADD_SCENE_PROFILE_ LINK 图文页内名称点击 6.ADD_SCENE_PROFILE_ITEM 图文页右上角菜单 7.ADD_SCENE_PAID 支付后关注 8.ADD_SCENE_OTHERS 其他' })
    subscribe_scene: number

    @Column('int4', { nullable: false, comment: '二维码扫码场景' })
    qr_scene: number

    @Column('string', { nullable: false, comment: '二维码扫码场景描述' })
    qr_scene_str: string
}