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

    getProductDetails() {

    }

    placeOrder() {

    }

    getOrderID() {

    }

    getKey() {

    }


}

export default Kinguin

export {
    Kinguin,
    IProductFilter
}