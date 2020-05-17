import { post, get } from '_helpers/ApiService'
import moment from 'moment'

export default {
  state: () => ({
    wallet: null,
    wallets: [
      {
        id: 1,
        type: "",
        user_id: 3,
        value: "2",
        isPaid: true,
        personalized: null,
        voucher: {
          id: 8,
          name: 'Voucher Name 8',
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
          created_at: moment().local().subtract(8, 'day').format('YYYY-MM-DD'),
          status: 1,
          seller_id: 2,
          seller: {
            user: {
              id: 2,
              detail: {
                fristName: 'Chris',
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
        isPaid: true,
        personalized: null,
        voucher: {
          id: 9,
          name: 'Voucher Name 9',
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
          created_at: moment().local().subtract(9, 'day').format('YYYY-MM-DD'),
          status: 1,
          seller_id: 2,
          seller: {
            user: {
              id: 2,
              detail: {
                fristName: 'Chris',
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
    ],
  }),
  getters: {
    WALLET(state) {
      return state.wallet
    },
    WALLETS(state) {
      return state.wallets
    },
  },
  mutations: {
    SET_WALLET(state, payload) {
      state.wallet = payload;
    },
    SET_WALLETS(state, payload) {
      state.wallets = payload;
    },
  },
  actions: {
    async FETCH_WALLET( { commit, state }, payload )
    {
      const data = state.wallets.filter( row => row.id == payload )[0]
      await commit('SET_WALLET', data)
      return data
    },
    async ADD_WALLET( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.wallets.length + 1,
      }
      await commit('SET_WALLETS', [
        ...state.wallets,
        data
      ])
      return data
    },
    UPDATE_WALLET( { commit, state }, payload )
    {
      const newList = state.wallets.map( row => {
        if(row.id == payload.id) {
          row = payload
        }
        return row
      });
      commit('SET_WALLET', payload)
      commit('SET_WALLETS', newList)
    },
    DELETE_WALLET( { commit, state }, payload )
    {
      const newList = state.wallets.filter( row => row.id != payload.id);
      commit('SET_WALLETS', newList)
    }
  },
}