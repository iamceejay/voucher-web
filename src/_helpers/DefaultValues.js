import moment from 'moment'

export const getAllMonths = [
  {
    value: 0,
    text: 'January',
  }, {
    value: 1,
    text: 'February',
  }, {
    value: 2,
    text: 'March',
  }, {
    value: 3,
    text: 'April',
  }, {
    value: 4,
    text: 'May',
  }, {
    value: 5,
    text: 'June',
  }, {
    value: 6,
    text: 'July',
  }, {
    value: 7,
    text: 'August',
  }, {
    value: 8,
    text: 'September',
  }, {
    value: 9,
    text: 'October',
  }, {
    value: 10,
    text: 'November',
  }, {
    value: 11,
    text: 'December'
  },
]

export const categories = [
  {
    id: 1,
    label: 'Book',
    icon: 'fa-book',
    status: 1
  },{
    id: 2,
    label: 'Mall',
    icon: 'fa-building',
    status: 1
  },{
    id: 3,
    label: 'Hotel',
    icon: 'fa-building',
    status: 1
  },{
    id: 4,
    label: 'Restaurant',
    icon: 'fa-building',
    status: 1
  },{
    id: 5,
    label: 'Gadgets',
    icon: 'fa-mobile',
    status: 1
  },
]

export const templates = [
  {
    id: 1,
    name: 'Book',
    photo: '',
    status: 1
  },{
    id: 2,
    name: 'Mall',
    photo: '',
    status: 1
  },{
    id: 3,
    name: 'Hotel',
    photo: '',
    status: 1
  },{
    id: 4,
    name: 'Restaurant',
    photo: '',
    status: 1
  },{
    id: 5,
    name: 'Gadgets',
    photo: '',
    status: 1
  },
]

export const getWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const users = [
  {
    id: 1,
    email: 'john@gmail.com',
    username: 'john123',
    user_role: 1,
    detail: {
      user_id: 1,
      firstName: 'John',
      lastName: 'Joe',
    },
    user_role: {
      id: 1,
      role_id: 2,
      role: {
        id: 2,
        name: 'seller'
      }
    }
  }, {
    id: 2,
    email: 'luka@gmail.com',
    username: 'luka123',
    user_role: 2,
    detail: {
      user_id: 2,
      firstName: 'Luka',
      lastName: 'Joe',
    },
    user_role: {
      id: 2,
      role_id: 2,
      role: {
        id: 2,
        name: 'seller'
      }
    }
  }, {
    id: 3,
    email: 'ben@gmail.com',
    username: 'ben123',
    user_role: 3,
    detail: {
      user_id: 3,
      firstName: 'Ben',
      lastName: 'Joe',
    },
    user_role: {
      id: 3,
      role_id: 2,
      role: {
        id: 2,
        name: 'seller'
      }
    }
  }, {
    id: 4,
    email: 'lea@gmail.com',
    username: 'lea123',
    user_role: 4,
    detail: {
      user_id: 4,
      firstName: 'Lea',
      lastName: 'Joe',
    },
    user_role: {
      id: 4,
      role_id: 2,
      role: {
        id: 2,
        name: 'seller'
      }
    }
  }, {
    id: 5,
    email: 'elias@gmail.com',
    username: 'elias123',
    user_role: 5,
    detail: {
      user_id: 5,
      firstName: 'Elias',
      lastName: 'Joe',
    },
    user_role: {
      id: 5,
      role_id: 3,
      role: {
        id: 3,
        name: 'user'
      }
    }
  }, {
    id: 6,
    email: 'jonas@gmail.com',
    username: 'jonas123',
    user_role: 6,
    detail: {
      user_id: 6,
      firstName: 'Jonas',
      lastName: 'Joe',
    },
    user_role: {
      id: 6,
      role_id: 3,
      role: {
        id: 3,
        name: 'user'
      }
    }
  }, {
    id: 7,
    email: 'leon@gmail.com',
    username: 'leon123',
    user_role: 7,
    detail: {
      user_id: 7,
      firstName: 'Loen',
      lastName: 'Joe',
    },
    user_role: {
      id: 7,
      role_id: 3,
      role: {
        id: 3,
        name: 'user'
      }
    }
  }, {
    id: 8,
    email: 'anna@gmail.com',
    username: 'anna123',
    user_role: 8,
    detail: {
      user_id: 8,
      firstName: 'Anna',
      lastName: 'Joe',
    },
    user_role: {
      id: 8,
      role_id: 3,
      role: {
        id: 3,
        name: 'user'
      }
    }
  }, 
]

export const vouchers = [
  {
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
  {
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
  },
  {
    id: 3,
    name: 'Voucher Name 3',
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
    value: 1500,
    quantity: 4,
    isDarkText: true,
    bgColor: '#fff',
    isPopular: 1,
    isFeatured: 0,
    created_at: moment().local().subtract(5, 'day').format('YYYY-MM-DD'),
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
      id: 3,
      label: 'Hotel',
      icon: 'fa-building'
    }
  },
  {
    id: 4,
    name: 'Voucher Name 4',
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
    value: 5000,
    quantity: 10,
    isDarkText: false,
    bgColor: '#010101',
    isPopular: 0,
    isFeatured: 1,
    created_at: moment().local().subtract(4, 'day').format('YYYY-MM-DD'),
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
  },
  {
    id: 5,
    name: 'Voucher Name 5',
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
    value: 100,
    quantity: 7,
    isDarkText: false,
    bgColor: '#010101',
    isPopular: 1,
    isFeatured: 0,
    created_at: moment().local().subtract(3, 'day').format('YYYY-MM-DD'),
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
  {
    id: 6,
    name: 'Voucher Name 6',
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
    value: 1400,
    quantity: 8,
    isDarkText: true,
    bgColor: '#ccc',
    isPopular: 0,
    isFeatured: 0,
    created_at: moment().local().subtract(2, 'day').format('YYYY-MM-DD'),
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
      id: 3,
      label: 'Hotel',
      icon: 'fa-building'
    }
  },
  {
    id: 7,
    name: 'Voucher Name 7',
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
    value: 600,
    quantity: 3,
    isDarkText: true,
    bgColor: '#808080',
    isPopular: 1,
    isFeatured: 1,
    created_at: moment().local().subtract(1, 'day').format('YYYY-MM-DD'),
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
]