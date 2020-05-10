import { extend } from 'vee-validate';
import { 
  required, 
  email, 
  integer, 
  between,
  min,
  max,
} from 'vee-validate/dist/rules';

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
  message: 'The character length must be equal or below {length}.' 
});
extend('min', min);
extend('integer', integer);
extend('between', between);