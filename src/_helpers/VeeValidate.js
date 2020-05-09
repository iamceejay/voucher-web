import { extend } from 'vee-validate';
import { required, email, integer, between } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required.'
});
extend('email', {
  ...email,
  message: 'The email address is invalid.'
});
extend('integer', integer);
extend('between', between);