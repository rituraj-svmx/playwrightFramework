class Login {

    constructor(page) {

        this.page = page;
        this.search = page.getByPlaceholder("Search for Products, Brands and More")

    }

    async goTo() {
        await this.page.goto('https://www.flipkart.com/');
    }

}
export default Login;