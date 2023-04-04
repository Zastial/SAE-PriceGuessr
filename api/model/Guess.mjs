'use strict'

export default class Guess {
    productId
    guessRemaining
    constructor(obj) {
        this.productId = obj.productId || ""
        if(obj.guess == null) {
            this.guessRemaining = process.env.MAX_GUESS
        } else {
            this.guessRemaining = process.env.MAX_GUESS - obj.guess
        }
    }
}