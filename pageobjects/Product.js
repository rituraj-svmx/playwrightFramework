class Product {

    constructor(page) {
        this.page = page;
        this.product = page.locator('div.KzDlHZ').first();
        this.price = page.locator('div.Nx9bqj._4b5DiR').first();
    }
}

export default Product;