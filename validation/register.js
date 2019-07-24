const validator = require('validator')

const isEmpty = require('./is-empty')

const validateRegisterInpute = data => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.pass = !isEmpty(data.pass) ? data.pass : ''
  data.pass2 = !isEmpty(data.pass2) ? data.pass2 : ''
  data.email = !isEmpty(data.email) ? data.email : ''

  if (validator.isEmpty(data.name)) {
    errors.name = '用户名不能为空'
  } else if (!validator.isLength(data.name, {
    min: 6,
    max: 30
  })) {
    errors.name = '用户名不能短于6个字符，且不能长于30个字符'
  }

  if (validator.isEmpty(data.pass)) {
    errors.pass = '密码不能为空'
  } else if (!validator.isLength(data.pass, {
    min: 6,
    max: 30
  })) {
    errors.pass = '密码不能短于6个字符，且不能长于30个字符'
  }
  if (!validator.equals(data.pass2, data.pass)) {
    errors.pass2 = '两次密码输入不一致'
  }

  if (validator.isEmpty(data.email)) {
    errors.email = '邮箱不能为空'
  } else if (!validator.isEmail(data.email)) {
    errors.email = '邮箱不合法'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateRegisterInpute
