class Item{
    constructor(type, h, s, l, formality, weather, pinataCid, style, name) {
    //code type as integers (0: tops, 1: outers, 2: bottoms, 4: onepieces)
        this.type = type;
    // hsl in floats (0% to 100%)
        this.h = h; // hue
        this.s = s; // saturation
        this.l = l; // lightness
    //0:not formal 1:crazy formal
        this.formality = formality;
    //0: cold, 1: hot
        this.weather = weather;
        this.pinataCid = pinataCid;
    //either integer or string identifier for the style
        this.style = style;
        this.compatibility = 0;
        this.name = name;
    }

    //getters
    getType() {
        return this.type;
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
    
    getComp() {
        return this.compatibility;
    }

    getName() {
        return this.name;
    }

    //setters
    setComp(score) {
        this.compatibility = score;
    }
}

module.exports = Item;