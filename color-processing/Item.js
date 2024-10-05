class Item{
    constructor(hsl, formality, weather, pinataCid) {
        this.hsl = hsl;
        this.formality = formality;
        this.weather = weather;
        this.pinataCid = pinataCid;
    }

    getHsl() {
        return this.hsl;
    }

    getFormality() {
        return this.formality;
    }

    getWeather() {
        return this.weather;
    }

    getPinataCid() {
        return this.pinataCid;
    }
} 