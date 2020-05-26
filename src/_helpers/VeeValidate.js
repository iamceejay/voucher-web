import { extend, validate } from 'vee-validate';
import { 
  required, 
  email, 
  integer, 
  between,
  min,
  max,
  min_value,
  max_value,
  numeric,
  image,
  password,
  unique,
} from 'vee-validate/dist/rules';
import { post } from '_helpers/ApiService'

const isUnique = ( value, data ) => {
  // this.validating = true
  const params = {
    field: {
      [data[1]]: value
    },
    model: data[0],
    entity: data[1],
  }
  return post('auth/unique', params).then( ({ data } ) => {
    // this.validating = false
    return data
    
  }).catch(err => {
    if( err?.response?.status == 422 ) {
      return err.response.data.errors[data[1]][0]
    }
    return ''
    // throw error
    // this.validating = false
  })
} 

extend('integer', integer);
extend('between', between);
extend('numeric', numeric);
extend('image', image);
extend('required', {
  ...required,
  message: 'This field is required.'
});
extend('email', {
  ...email,
  message: 'The email address is invalid.'
});
extend('max', {
  ...max,
  message: 'The character length must be below or equal {length}.' 
});
extend('min', {
  ...min,
  message: 'The character length must be atleast {length}.' 
});
extend('max_value', {
  ...max_value,
  message: 'The value must be below or equal {max}.' 
});
extend('min_value', {
  ...min_value,
  message: 'The value must be atleast {min}.' 
});
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match.'
});
extend('unique', {
  validate: isUnique,
  getMessage: (field, params, data) => data
});
// extend('digits_between', {
//   async validate(value, { min, max }) {
//     const res = await validate(value, `numeric|min:${min}|max:${max}`,)
//     return res.valid;
//   },
//   params: ['min', 'max'],
//   message: 'The {_field_} must be between {min} and {max} digits.'
// })