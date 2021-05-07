import { State } from 'reducers'
import { GetPublicUserInputs } from 'shared/page/GetPublicUser'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_COMMIT = 'GET_USER_COMMIT'
export const GET_USER_ROLLBACK = 'GET_USER_ROLLBACK'

export const getUser = ({ username }: GetPublicUserInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: GET_USER_REQUEST,
    payload: { username },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/page/get-user`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { username },
        },
        commit: { type: GET_USER_COMMIT, meta: { username } },
        rollback: { type: GET_USER_ROLLBACK, meta: { username } },
      },
    },
  })
}
