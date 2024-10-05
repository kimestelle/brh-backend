//input: 2 items output: compatibility score

function calculateCompatibility(item1, item2) {
//hsl comparison, lets just try getting the difference
    let hslComp = compareHsl(item1, item2);

//formality comparison: threshold for ruling out is 0.5 difference
    let formalityComp = Math.abs(item1.getFormality() - item2.getFormality());

//weather comparison: threshold for ruling out is 0.5 difference
    let weatherComp = Math.abs(item1.getWeather() - item2.getWeather());

//combine the comps (hsl: 0.4, formality: 0.3, weather: 0.3), if anything is 0 the result should be 0
//okay this is super basic but we can change it later lol
    let totalComp = (0.4 * hslComp + 0.3 * formalityComp + 0.3 * weatherComp) / 3;
    if (formalityComp === 0 || weatherComp === 0) {
        totalComp = 0;
    }

    return totalComp;
}

function compareHsl(item1, item2) {
    let hsl1 = item1.getHsl();
    let hsl2 = item2.getHsl();

    let style = item1.getStyle();
    //if weather is warm + formality is low, focus on contrasting
    switch (style) {
// add cases based on style, weather, and formality
    }
}

//receive 2 arrays of 3 hsl coded colors

//1. plot both on circle & get degrees

//2. use weather, style, and occasion to figure out which criteria to use

//3. calculate compatibility score from 0 to 1 based on the used criteria, add it to 