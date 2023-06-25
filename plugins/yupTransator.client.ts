import { addMethod, setLocale, string } from 'yup'

export default defineNuxtPlugin((nuxtApp) => {
  setLocale({
    mixed: {
      default: 'ورودی نامعتبر است',
      required: 'لطفا این قسمت را خالی نگذارید',

    },
    string: {
      email: 'ایمیل نامعتبر است',
      // eslint-disable-next-line no-template-curly-in-string
      min: ' حداقل مقدار ${path} ${min} است',
      // eslint-disable-next-line no-template-curly-in-string
      max: ' حداقل مقدار ${path} ${max} است',
    },
    number: {
      // eslint-disable-next-line no-template-curly-in-string
      min: ' حداقل مقدار ${path} ${min} است',
    },
  })
  addMethod(string, 'phoneNumber', function phoneNumber() {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    return this.test(
      'phoneNumber',
      'شماره موبایل وارد شده نامعتبر است',
      (value) => {
        if (value === undefined)
          return true
        return validatePhoneNumber(value?.toString())
      },
    )
  })

  addMethod(string, 'email', function email() {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    return this.test(
      'email',
      'ایمیل وارد شده نامعتبر است',
      (value) => {
        if (value === undefined)
          return true
        return validateEmail(value?.toString())
      },
    )
  })

  addMethod(string, 'username', function username() {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    return this.test(
      'username',
      'شماره موبایل و یا ایمیل نامعتبر است',
      (value) => {
        if (value === undefined)
          return true
        return validateUsername(value?.toString())
      },
    )
  })
})
