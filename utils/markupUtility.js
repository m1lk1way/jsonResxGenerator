const os = require('os');

let instance;

class MarkupUtility {
    constructor() {
        if (instance) {
            return instance;
        }
        this.i_newLine = os.EOL;
        instance = this;
    }

    init(tabSize) {
        const tab = new Array(parseInt(tabSize, 10) + 1).join(' ');
        this.tab = tab;
    }

    get newLine() {
        return this.i_newLine;
    }

    get autoGenStr() {
        return `// This file is AUTOGENERATED, do not edit it manually!!!${this.i_newLine}`;
    }

    get tsLintDisable() {
        return `// tslint:disable${this.i_newLine}`;
    }

    get tsLintDisableLength() {
        return `/* tslint:disable: max-line-length */${this.i_newLine}`;
    }

    get tsIgnore() {
        return `// @ts-ignore${this.i_newLine}`;
    }

    set tab(tab) {
        this.i_tab = tab;
    }

    get tab() {
        return this.i_tab;
    }

    static toSanitizedString(json) {
        const dataString = JSON.stringify(json, null, 4);
        return dataString.replace(/\n/g, os.EOL);
    }

    static parseToJson(string, path) {
        let json;
        try {
            json = JSON.parse(string);
        }
        catch (err) {
            err.message = `${path}${os.EOL}${err.message}`;
            throw err;
        }
        return json;
    }
}

module.exports = MarkupUtility;