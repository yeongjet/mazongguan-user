import { HttpError, HttpStatus, EffectFactory, use } from '@marblejs/core'
import { requestValidator$, t } from '@marblejs/middleware-io'
import { getRepository } from 'typeorm'
import { throwError, of, from } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { neverNullable } from '@mazongguan-common/filter'
import { EnterpriseAccountModel } from '../../model'

const validator$ = requestValidator$({
    body: t.type({
        enterprise_id: t.number,
        password: t.string,
        email: t.string
    })
})

export const createEnterpriseAccount$ = EffectFactory.matchPath(
    '/enterprise/account'
)
    .matchType('POST')
    .use(req$ =>
        req$.pipe(
            use(validator$),
            mergeMap(req =>
                of(req.body).pipe(
                    mergeMap(enterprise =>
                        from(
                            getRepository(EnterpriseAccountModel).save({
                                ...enterprise,
                                account_type: 0,
                                account_status: 1,
                                cellphone: '12302304320',
                                password_encrypt_version: 1,
                                password_modify_status: 1,
                                remark: '主账号'
                            })
                        )
                    ),
                    mergeMap(neverNullable),
                    map(customer => ({
                        body: {
                            code: 10000,
                            data: {
                                customer: customer
                            }
                        }
                    })),
                    catchError(error =>
                        throwError(
                            new HttpError(
                                `Consumer create fail: ${error}`,
                                HttpStatus.INTERNAL_SERVER_ERROR
                            )
                        )
                    )
                )
            )
        )
    )
