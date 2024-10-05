class Item{
    constructor(hsl, formality, weather, pinataCid, style) {
        this.hsl = hsl;
        this.formality = formality;
        this.weather = weather;
        this.pinataCid = pinataCid;
    //either integer or string identifier for the style
        this.style = style;
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
    
    getStyle() {
        return this.style;
    }
}

export default Item;