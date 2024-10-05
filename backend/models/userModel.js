const calculateCompatibility = require('../utils/Compare');

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.tops = [];
        this.outers = [];
        this.bottoms = [];
        this.onepieces = [];

        this.closet = {
            top: this.tops,
            outer: this.outers,
            bottom: this.bottoms,
            onepiece: this.onepieces
        };
    }

    addItem(item) {
        this.closet[item.getType()].push(item);
    }

    deleteItem(item) {
        this.#findAndDelete(item, this.closet[item.getType()]);
    }

    #findAndDelete(item, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                return;
            }
        }
    }

    getRankings(item, type) {
        if (!this.closet[type]) {
            return [-1];
        }

        let allItems = this.closet[type];
        let topTen = [];

        for (let i = 0; i < allItems.length; i++) {
            let compItem = allItems[i];
            let compatibilityScore = calculateCompatibility(item, compItem);

            topTen.push({ item: compItem, score: compatibilityScore });

            topTen.sort((a, b) => a.score - b.score);

            if (topTen.length > 10) {
                topTen.pop();
            }
        }

        return topTen.map(entry => entry.item);
    }
}

module.exports = User;