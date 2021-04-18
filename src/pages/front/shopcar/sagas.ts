import { put } from 'redux-saga/effects'
import * as types from './actions'

function* GetShopCar(action: any) {
  yield put({ type: types.GETSHOP })

}

export { types, GetShopCar };
