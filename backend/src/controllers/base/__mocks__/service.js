
const mockService = ({  
  __setMockData: (data) => {
    mockData = data
  },
  findAll: jest.fn(async function () {
    return mockData
  }),
  findOne: jest.fn(async function (id) {
    return mockData.find(item => item._id === id)
  }),
  create: jest.fn(async function (data) {
    mockData.push(data)
    return data
  }),
  update: jest.fn(async function (id, data) {
    const index = mockData.findIndex(item => item._id === id)
    mockData[index] = data
    return data
  }),
  delete: jest.fn(async function (id) {
    return mockData = mockData.find(item => item._id == id)    
  })
})

module.exports = () => mockService