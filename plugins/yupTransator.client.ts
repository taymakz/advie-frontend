import { setLocale } from 'yup'

export default defineNuxtPlugin(() => {
  setLocale({
    mixed: {
      default: 'ورودی نامعتبر است',
      required: 'لطفا این قسمت را خالی نگذارید',

    },
    string: {
      email: 'ایمیل وارد شده نامعتبر است',
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
})
