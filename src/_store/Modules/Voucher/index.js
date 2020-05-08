import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    vouchers: [
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
      },
      {
        name: 'Voucher Name',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true, 
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