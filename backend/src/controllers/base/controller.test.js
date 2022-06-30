const { mockRequest, mockResponse } = require('jest-mock-req-res');

const addressModel = require('../../models/address.model');
const baseController = require('./controller')(addressModel, []);
const base_Service = require('./service')();
jest.mock('./service');

describe('base controller', () => {
  let response;
  const nextFunction = jest.fn();

  const mockData = [
    {
      _id: 1,
      firstName: 'Fiorenze',
      lastName: 'Dyneley',
    },
    {
      _id: 2,
      firstName: 'Owen',
      lastName: 'Jirka',
    },
    {
      _id: 3,
      firstName: 'Terra',
      lastName: 'Hurdman',
    },
    {
      _id: 4,
      firstName: 'Thomasin',
      lastName: 'de Keep',
    },
    {
      _id: 5,
      firstName: 'Lawrence',
      lastName: 'Tearle',
    },
  ];

  beforeEach(() => {
    base_Service.__setMockData(mockData);
    response = mockResponse();
  });

  describe('create', () => {
    it('should create a person', async () => {
      const request = mockRequest({
        body: {
          firstName: 'Jack',
          lastName: 'London',
        },
      });
      await baseController.create(request, response, nextFunction);
      expect(base_Service.create).toHaveBeenCalledWith(request.body);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Jack',
          lastName: 'London',
        })
      );
    });
  });

  describe('findAll', () => {
    it('should return all people', async () => {
      await baseController.findAll(mockRequest(), response, nextFunction);
      expect(base_Service.findAll).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('findOne', () => {
    it('should return a person', async () => {
      const request = mockRequest({
        params: {
          id: 1,
        },
      });

      await baseController.findOne(request, response, nextFunction);
      expect(base_Service.findOne).toHaveBeenCalledWith(1);
      expect(response.json).toHaveBeenCalledWith(mockData[0]);
    });
  });

  describe('update', () => {
    it('should update a person', async () => {
      const request = mockRequest({
        params: {
          id: 2,
        },
        body: {
          _id: 2,
          firstName: 'Jill',
          lastName: 'Doe',
        },
      });

      await baseController.update(request, response, nextFunction);
      expect(base_Service.update).toHaveBeenCalledWith(
        request.params.id,
        request.body
      );
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Jill',
        })
      );
    });
  });

  describe('delete', () => {
    it('should delete a person', async () => {
      const request = mockRequest({
        params: {
          id: 1,
        },
      });

      await baseController.delete(request, response, nextFunction);
      expect(base_Service.delete).toHaveBeenCalledWith(1);
      expect(response.json).toHaveBeenCalledWith(mockData[0]);
    });
  });  
});
