import { expect } from 'chai';
import 'mocha';
import Kinguin, { IProductFilter } from './index';
import MockAdapter from 'axios-mock-adapter'
import getProductListResponse from './__mocks__/getProductListResponse';

describe('Kinguin API', () => {

    describe('createUrl', () => {
        it('check sandbox URL', () => {
            const api = new Kinguin("", false, "");
            const url = api.createUrl(false, "v1")
            expect(url).to.equals("https://api.api-sandbox.kinguin.info/integration/v1")
        });

        it('check prod URL', () => {
            const api = new Kinguin("", true, "");
            const url = api.createUrl(true, "v1")
            expect(url).to.equals("https://api2.kinguin.net/integration/v1")
        });

    });

    describe('getProductList', () => {
        it('check plain request', (done) => {
            const api = new Kinguin("test", false, "v1");
            const mock = new MockAdapter(api.axiosInstance);
            mock.onGet('/products').reply(200, getProductListResponse)

            api.getProductList().then((response) => {
                expect(response.config.headers['api-ecommerce-auth']).equals("test");
                done();
            })
        });

        it('check all filters', (done) => {
            const api = new Kinguin("test", false, "v1");
            const mock = new MockAdapter(api.axiosInstance);
            mock.onGet('/products').reply(200, getProductListResponse)
            const filter: IProductFilter = {
                page : 1,
                limit: 10,
                name : "Battlefield",
                sortBy : "price",
                sortType : "ASC",
                priceFrom : 10.11,
                priceTo : 21.37
            }
            api.getProductList(filter).then((response) => {
                expect(response.config.headers['api-ecommerce-auth']).equals("test");
                expect(response.config.params).to.deep.equals(filter);
                done();
            })
        });

    });

});

