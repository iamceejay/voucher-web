import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    vouchers: [
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDate: {
          start: '12.04.2020',
          end: '30.04.2020',
        },
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        type: 'value',
        value: 15000,
        quantity: 0
      },
    ]
  }),
  getters: {
    VOUCHERS(state) {
      return state.vouchers;
    },
  },
  mutations: {
    SET_VOUCHERS(state, payload) {
      state.vouchers = payload;
    },
  },
  actions: {
  },
}