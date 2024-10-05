class Item{
    constructor(h, s, l, formality, weather, pinataCid, style) {
        this.h = h; // hue
        this.s = s; // saturation
        this.l = l; // lightness
        this.formality = formality;
        this.weather = weather;
        this.pinataCid = pinataCid;
    //either integer or string identifier for the style
        this.style = style;
    }

    getHsl() {
        return [this.h, this.s, this.l];
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

module.exports = Item;