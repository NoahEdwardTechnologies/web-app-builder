/* eslint-disable */

export default function fieldRules (type) {
  switch (type) {
    case 'email':
      return {
        rules: [
          {
            message: 'The input is not valid E-mail!',
            type: 'email',
          },
          {
            message: 'Please input your email!',
            required: true,
          }
        ],
      }
    case 'name':
      return {
        rules: [
          {
            required: true,
            message: 'Please input your Name!'
          }
        ],
      }
    default: return {};
  }
}
