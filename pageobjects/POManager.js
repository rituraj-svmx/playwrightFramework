import Login from "./Login";
import Product from "./Product";

class POManager {

    constructor(page) {

        this.page = page;
        this.Login = new Login(this.page);
        this.Product = new Product(this.page);

    }

    getLogin() {
        return this.Login;
    }

    getProduct() {
        return this.Product;
    }

}

export default POManager;