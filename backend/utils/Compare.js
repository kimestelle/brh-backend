//input: 2 items output: compatibility score

// math reference: https://blog.matthewgove.com/2021/07/02/color-theory-a-simple-exercise-in-mathematics-and-graphic-design/

function calculateCompatibility(item1, item2) {
//hsl comparison, lets just try getting the difference
    let hslComp = compareHsl(item1, item2);

//formality comparison: threshold for ruling out is 0.5 difference
    let formalityComp = Math.abs(item1.getFormality() - item2.getFormality());

//weather comparison: threshold for ruling out is 0.5 difference
    let weatherComp = Math.abs(item1.getWeather() - item2.getWeather());

//combine the comps (hsl: 0.4, formality: 0.3, weather: 0.3), if anything is 0 the result should be 0
//okay this is super basic but we can change it later lol
    let totalComp = (0.4 * hslComp + 0.3 * formalityComp + 0.3 * weatherComp);
    if (formalityComp === 0 || weatherComp === 0) {
        totalComp = 0;
    }

    return totalComp;
}

//giant function and helper function cluster to get hsl comparison lol
function compareHsl(item1, item2) {
    let hsl1 = item1.getHsl();
    let hsl2 = item2.getHsl();

    let style = item1.getStyle();
    //if weather is warm + formality is low, focus on contrasting
    let theory = switchStyle(item1);

    switch (theory) {
        case 'complimentary':
            return getComplementaryScore(hsl1, hsl2);
        case 'adjacent':
            return getAdjacencyScore(hsl1, hsl2);
        case 'tricolor':
            return getTricolorScore(hsl1, hsl2);
        case 'monochrome':
            return getMonochromeScore(hsl1, hsl2);
    }
}

function switchStyle(item1) {
    switch (item1.getStyle()) {
        // add cases based on style, weather, and formality
                case 'preppy':
                    if (item1.getWeather() < 0.5) {
                        return 'adjacent';
                    } else {
                        return 'monochrome';
                    }
                case 'street':
                    if (item1.getWeather() < 0.5) {
                        return 'adjacent';
                    } else {
                        return 'monochrome';
                    }
        
                case 'vintage':
                    if (item1.getWeather() < 0.5) {
                        return 'adjacent';
                    } else {
                        return 'monochrome';
                    }
        
                case 'minimal':
                    if (item1.getWeather() < 0.5) {
                        return 'adjacent';
                    } else {
                        return 'monochrome';
                    }
        
                case 'fancy':
                    if (item1.getWeather() < 0.5) {
                        return 'adjacent';
                    } else {
                        return 'monochrome';
                    }
        
            }
}

///helper functions to get adjacency score based on each color theory
///kinda bs rn and the magnitude of scores is probably different across the cases but will adjust later - just want this to return something

// weights (h: 0.4, s: 0.5, l: 0.1)
// wait my modulo and normalizing back to scale of 255 in the next line might be bs
// getting difference between actual complementary color and hsl2
function getComplementaryScore(hsl1, hsl2) {
    let angle1 = hsl1[0] * 360 / 255;
    let angle2 = hsl2[0] * 360 / 255;

    let complementaryDifference = Math.abs((angle1 + 180) % 360 - angle2) * 255 / 360;
    return (0.4 * complementaryDifference + 
            0.5 * Math.abs(hsl1[1] - hsl2[1]) +
            0.1 * Math.abs(hsl1[2] - hsl2[2])) / 255;
}   

// 30° to 45° is the optimum range, but anywhere between 20° and 60° is acceptable
// measure of adjacency: difference between abs(angle1 - angle2) and optimal number (37.5)
// weights (h: 0.4, s: 0.5, l: 0.1)
function getAdjacencyScore(hsl1, hsl2) {
    let angle1 = hsl1[0] * 360 / 255;
    let angle2 = hsl2[0] * 360 / 255;

    let adjacencyDifference = Math.abs(Math.abs(angle1 - angle2) - 37.5) * 255 / 360;
    return (0.4 * adjacencyDifference +
            0.5 * Math.abs(hsl1[1] - hsl2[1]) +
            0.1 * Math.abs(hsl1[2] - hsl2[2])) / 255;
}

// adjacency but convert angle1 to complementary angle
// weights (h: 0.4, s: 0.5, l: 0.1)
function getTricolorScore(hsl1, hsl2) {
    let angle1 = hsl1[0] * 360 / 255;
    let angle2 = hsl2[0] * 360 / 255;

    let tricolorDifference = Math.abs(Math.abs((angle1 + 180) % 360 - angle2) - 37.5) * 255 / 360;
    return (0.4 * tricolorDifference +
            0.5 * Math.abs(hsl1[1] - hsl2[1]) +
            0.1 * Math.abs(hsl1[2] - hsl2[2])) / 255;
}

// hue as close as possible, saturation somewhat important, lightness doesnt matter
// weights (h: 0.8, s: 0.15, l: 0.05)
function getMonochromeScore(hsl1, hsl2) {
    let angle1 = hsl1[0] * 360 / 255;
    let angle2 = hsl2[0] * 360 / 255;

    let monochromeDifference = Math.abs(angle1 - angle2);
    return (0.8 * monochromeDifference +
            0.15 * Math.abs(hsl1[1] - hsl2[1]) +
            0.05 * Math.abs(hsl1[2] - hsl2[2])) / 255;
}

module.exports = calculateCompatibility();