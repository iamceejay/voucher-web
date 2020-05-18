import { post, get } from '_helpers/ApiService'
import moment from 'moment'

export default {
  state: () => ({
    carts: [
      {
        id: 1,
        type: "",
        user_id: 3,
        value: "2",
        voucher: {
          id: 1,
          name: 'Voucher Name 1',
          companyName: 'Company Name',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.',
          customNote: '',
          validDates: [
            {
              start: '2020-05-09',
              end: '2020-05-09',
            }
          ],
          validDay: ['Monday', 'Sunday'],
          expiryDate: '12.04.2023',
          isQuantityBased: false,
          minVal: 0,
          maxVal: 10000,
          value: 1000,
          quantity: 4,
          isDarkText: true,
          bgColor: '#fff',
          isPopular: 1,
          isFeatured: 1,
          created_at: moment().local().subtract(7, 'day').format('YYYY-MM-DD'),
          status: 1,
          seller_id: 2,
          seller: {
            user: {
              id: 2,
              detail: {
                firstName: 'Chris',
                lastName: 'Joe',
                address: 'Germany',
                region: 'X'
              },
              seller_detail: {
                user_id: 2,
                webUrl: 'www.test.com',
                logo: '@/_assets/img/company-default-logo.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                companyName: "Chris's Corp"
              }
            }
          },
          category: {
            id: 1,
            label: 'Book',
            icon: 'fa-book'
          }
        },
      }, {
        id: 2,
        type: "",
        user_id: 3,
        value: "222",
        voucher: {
          id: 2,
          name: 'Voucher Name 2',
          companyName: 'Company Name',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.',
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
          minVal: 0,
          maxVal: 10000,
          value: 3000,
          quantity: 5,
          isDarkText: true,
          bgColor: '#fff',
          isPopular: 0,
          isFeatured: 0,
          created_at: moment().local().subtract(6, 'day').format('YYYY-MM-DD'),
          status: 1,
          seller_id: 2,
          seller: {
            user: {
              id: 2,
              detail: {
                firstName: 'Chris',
                lastName: 'Joe',
                address: 'Germany',
                region: 'X'
              },
              seller_detail: {
                user_id: 2,
                webUrl: 'www.test.com',
                logo: '@/_assets/img/company-default-logo.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                companyName: "Chris's Corp"
              }
            }
          },
          category: {
            id: 2,
            label: 'Mall',
            icon: 'fa-building'
          }
        }
      }
    ]
  }),
  getters: {
    CARTS(state) {
      return state.carts;
    },
  },
  mutations: {
    SET_CARTS(state, payload) {
      console.log('payload', payload)
      state.carts = payload;
    },
  },
  actions: {
    async ADD_CART( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.carts.length + 1,
      }
      await commit('SET_CARTS', [
        ...state.carts,
        data
      ])
      return data
    },
    UPDATE_CART( { commit, state }, payload )
    {
      const newList = state.carts.map( row => {
        if(row.id == payload.id) {
          row = payload
        }
        return row
      });
      commit('SET_CARTS', newList)
    },
    DELETE_CART( { commit, state }, payload )
    {
      const newList = state.carts.filter( row => row.id != payload.id);
      commit('SET_CARTS', newList)
    }
  },
}