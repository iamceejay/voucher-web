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
} from 'vee-validate/dist/rules';

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
  message: 'The character length must be greater or equal {length}.' 
});
extend('max_value', {
  ...max_value,
  message: 'The value must be below or equal {max}.' 
});
extend('min_value', {
  ...min_value,
  message: 'The value must be greater or equal {min}.' 
});
// extend('digits_between', {
//   async validate(value, { min, max }) {
//     const res = await validate(value, `numeric|min:${min}|max:${max}`,)
//     return res.valid;
//   },
//   params: ['min', 'max'],
//   message: 'The {_field_} must be between {min} and {max} digits.'
// })