import { HttpError, HttpStatus, EffectFactory, use } from '@marblejs/core'
import { requestValidator$, t } from '@marblejs/middleware-io'
import { getRepository } from 'typeorm'
import { throwError, of, from } from 'rxjs'
import { mergeMap, map, catchError, merge } from 'rxjs/operators'
import { neverNullable } from '@mazongguan-common/filter'
import { validator$, Joi } from '@yeongjet/middleware-joi'
import { ConsumerModel } from '../../model/customer.model'
import { JSCODE2SESSION, COMPONENT_APPID } from '../../../../mazongguan-session/src/common/constant'
import axios from 'axios'


const validator = validator$({
    body: Joi.object({
        appid: Joi.string().min(1).required(),
        code: Joi.string().min(1).required() // 登录凭证，有效期5分钟
    })
})

export const createCustomer$ = EffectFactory.matchPath('/customer')
    .matchType('POST')
    .use(req$ =>
        req$.pipe(
            use(validator),
            mergeMap(req =>
                of(req.body).pipe(
                    mergeMap(body =>
                        from(
                            axios.get(JSCODE2SESSION, {
                                params:{
                                    appid: body.appid,
                                    js_code: body.code,
                                    grant_type: 'authorization_code',
                                    component_appid: COMPONENT_APPID,
                                    component_access_token: 
                                }
                            })
                        )
                    ),
                    mergeMap(),
                    mergeMap(neverNullable),
                    map(customer => ({ body: customer })),
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
