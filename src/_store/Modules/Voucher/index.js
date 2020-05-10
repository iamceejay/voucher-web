import { post, get } from '_helpers/ApiService'
import moment from 'moment'

export default {
  state: () => ({
    categories: [
      {
        id: 1,
        label: 'Book',
        icon: 'fa-book'
      },{
        id: 2,
        label: 'Mall',
        icon: 'fa-building'
      },{
        id: 3,
        label: 'Hotel',
        icon: 'fa-building'
      },{
        id: 4,
        label: 'Restaurant',
        icon: 'fa-building'
      },{
        id: 5,
        label: 'Gadgets',
        icon: 'fa-mobile'
      },
    ],
    vouchers: [
      {
        id: 1,
        name: 'Voucher Name 1',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 1000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 1,
        created_at: moment().local().subtract(7, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 2,
        name: 'Voucher Name 2',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 3000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 0,
        created_at: moment().local().subtract(6, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 3,
        name: 'Voucher Name 3',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 1500,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 1,
        created_at: moment().local().subtract(5, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 4,
        name: 'Voucher Name 4',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 5000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 0,
        created_at: moment().local().subtract(4, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 5,
        name: 'Voucher Name 5',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 100,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 1,
        created_at: moment().local().subtract(3, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 6,
        name: 'Voucher Name 6',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 1400,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 0,
        created_at: moment().local().subtract(2, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
      {
        id: 7,
        name: 'Voucher Name 7',
        companyName: 'Company Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit.',
        customNote: '',
        validDates: [
          {
            start: '2020-05-09',
            end: '2020-05-09',
          }
        ],
        validDay: ['Monday', 'Sunday'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 600,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        isPopular: 1,
        created_at: moment().local().subtract(1, 'day').format('YYYY-MM-DD'),
        status: 1,
      },
    ]
  }),
  getters: {
    VOUCHERS(state) {
      return state.vouchers;
    },
    CATEGORIES(state) {
      return state.categories;
    },
  },
  mutations: {
    SET_VOUCHERS(state, payload) {
      state.vouchers = payload;
    },
  },
  actions: {
    ADD_VOUCHER( { commit, state }, payload )
    {
      commit('SET_VOUCHERS', [
        ...state.vouchers,
        {
          id: ++state.vouchers.length,
          ...payload,
        }
      ])
    },
    UPDATE_VOUCHER( { commit, state }, payload )
    {
      const newList = state.vouchers.map( vouch => {
        if(vouch.id == payload.id) {
          vouch = payload
        }
        return vouch
      });
      commit('SET_VOUCHERS', newList)
    },
    DEACTIVATE_VOUCHER( { commit, state }, payload )
    {
      const newList = state.vouchers.map( vouch => {
        if(vouch.id == payload.id) {
          vouch.status = !vouch.status
        }
        return vouch
      });
      commit('SET_VOUCHERS', newList)
    },
    DELETE_VOUCHER( { commit, state }, payload )
    {
      console.log('payload', payload)
      const newList = state.vouchers.filter( vouch => vouch.id != payload.id);
      console.log('newList', newList)
      commit('SET_VOUCHERS', newList)
    }
  },
}