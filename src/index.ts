import Axios, { AxiosPromise, AxiosInstance } from 'axios'

const API_URL = {
    production: "https://api2.kinguin.net",
    sandbox: "https://api.api-sandbox.kinguin.info"
}

interface IProductFilter {
    page?: number;
    limit?: number;
    name?: string;
    sortBy?: "price";
    sortType?: "ASC" | "DESC";
    priceFrom?: number;
    priceTo?: number;
}

interface IProductOrder {
    kinguinId: number;
    qty: number;
    name: string;
    price: number;
}

class Kinguin {
    axiosInstance: AxiosInstance;
    constructor(key: string, isProd: boolean, version = "v1") {
        this.axiosInstance = Axios.create({
            baseURL: this.createUrl(isProd, version),
            headers: { 'api-ecommerce-auth': key }
        });
    }

    createUrl(isProd: boolean, version: string) {
        return (isProd ? API_URL.production : API_URL.sandbox) + "/integration/" + version
    }

    getProductList(filter?: IProductFilter) {
        return this.axiosInstance.get('/products', { params: filter })
    }

    getProductDetails(kinguinId: number) {
        return this.axiosInstance.get('/products/' + kinguinId)
    }

    placeOrder(products: Array<IProductOrder>) {
        return this.axiosInstance.post('/order', products);
    }

    getOrderID(orderId: number) {
        return this.axiosInstance.post('/order/dispatch', {
            orderId
        });
    }

    getKey(dispatchId: number) {
        return this.axiosInstance.get('/order/dispatch/keys', {
            params: {
                dispatchId
            }
        })
    }

}

export default Kinguin

export {
    Kinguin,
    IProductFilter
}