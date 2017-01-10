const OPEN_LEFT_DRAWER = 'OPEN_LEFT_DRAWER'
const CLOSE_LEFT_DRAWER = 'CLOSE_LEFT_DRAWER'

const initialState = {
  menuOpen: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case OPEN_LEFT_DRAWER:
      return {
        menuOpen: true
      }
    case CLOSE_LEFT_DRAWER:
      return {
        menuOpen: false
      }
    default:
      return state
  }
}

export const openLeftDrawer = () => {
  return {
    type: OPEN_LEFT_DRAWER
  }
}

export const closeLeftDrawer = () => {
  return {
    type: CLOSE_LEFT_DRAWER
  }
}
