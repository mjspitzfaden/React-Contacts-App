
export function addContact (data) {
  return {
    type: 'ADD_CONTACT',
    data: data
  }
}

export function updateContact (index, data) {
  return {
    type: 'UPDATE_CONTACT',
    index: index,
    data: data
  }
}

export function deleteAttr (index) {
  return {
    type: 'DELETE_ATTR',
    index: index
  }
}

export function loggedIn (user) {
  return {
    type: 'LOGGED_IN',
    user: user
  }
}
