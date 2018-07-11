"use strict";

// Your Business Logic

const greeting = process.env.GREETING;
const defaultName = process.env.DEFAULT_NAME;

class Greetings {
    static greetingsFor(name) {
        console.log('name: ', name);
        if ((name === undefined) || (name === null) || (name == '')) {
            name = defaultName || 'World';
        }
        const greetings = (greeting || 'Hello') + ' ' + name + '!';
        console.log('greetings: ', greetings);
        return greetings;
    }
}

module.exports = Greetings;