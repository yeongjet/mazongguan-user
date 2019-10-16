import { HttpError, HttpStatus, HttpEffect, combineRoutes, EffectFactory, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { getRepository } from 'typeorm'
import { throwError, of, from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { neverNullable } from '@mazongguan_user/util';
import { CustomerDao } from '../customer.dao';
import { ConsumerModel } from '../customer.model'

const validator$ = requestValidator$({
  body: t.type({
    appid: t.number,
    openid: t.string,
    unionid: t.string,
    nickname: t.string,
    gender: t.number,
    cellphone: t.string,
    subscribe: t.number,
    language: t.string,
    city_id: t.number,
    province_id: t.number,
    country_id: t.number,
    headimage_url: t.string,
    remark: t.string,
    group_id: t.number,
    tag_id_list: t.array(t.number)
  })
})

export const createCustomer$ = EffectFactory
  .matchPath('/')
  .matchType('POST')
  .use(req$ =>
    req$.pipe(
      use(validator$),
      mergeMap(req => 
        of(req.body).pipe(
          mergeMap((consumer: ConsumerModel) => from(
            getRepository(ConsumerModel).save(consumer)
          )),
          mergeMap(neverNullable),
          map(customer => ({ body: customer })),
          catchError((error) => throwError(
            new HttpError(`Consumer create fail: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
          ))
        )
      )
    )
  )

