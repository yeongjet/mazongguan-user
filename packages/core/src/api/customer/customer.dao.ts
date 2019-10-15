import { from } from 'rxjs'
import { getRepository } from 'typeorm'
import { ConsumerModel } from './customer.model'

export namespace CustomerDao {

    export const create = (consumer: ConsumerModel) => from(
        getRepository(ConsumerModel).save(consumer)
    )
  
    export const findById = (id: number) => from(
        getRepository(ConsumerModel).findOne(id)
    )
}
  