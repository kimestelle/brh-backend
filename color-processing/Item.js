class Item{
    constructor(hsl, formality, weather) {
        this.hsl = hsl;
        this.formality = formality;
        this.weather = weather;
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
} 