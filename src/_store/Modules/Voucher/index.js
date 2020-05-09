import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
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
        validDay: ['Mon', 'Tues', 'Wed'],
        expiryDate: '12.04.2023',
        isQuantityBased: true,
        value: 15000,
        quantity: 0,
        isDarkText: true,
        bgColor: '#fff',
        status: 1,
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
    ADD_VOUCHER( { commit, state }, payload )
    {
      console.log('payload', payload)
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