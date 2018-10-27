import Axios, { AxiosPromise, AxiosInstance } from 'axios'

const API_URL = {
    production: "https://api2.kinguin.net",
    sandbox: "https://api.api-sandbox.kinguin.info"
}

class Kinguin {
    axiosInstance: AxiosInstance;
    constructor(isProd: boolean, version = "v1") {
        this.axiosInstance = Axios.create({
            baseURL: this.createUrl(isProd, version)
        });
    }

    private createUrl(isProd: boolean, version: string) {
        return (isProd ? API_URL.production : API_URL.sandbox) + "/integration/" + version
    }
}

export default Kinguin

export {
    Kinguin
}