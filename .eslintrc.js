module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "jsx-a11y/label-has-associated-control":0,
        "brace-style": [0, "allman"],
      "max-len": ["error", { "code": 200}],
      'no-unused-vars' : [ "error", {"args": "none" }],
      'no-plusplus' : 0,
      'no-empty' : ["error"],
      "jsx-a11y/label-has-for":0,
      "no-console": "off",
        "indent": ["error","tab"],
        "react/jsx-indent" : [2, "tab"],
        "react/jsx-indent-props": [2, "tab"],
        "no-tabs" : 0,
        "quotes": [
            0,
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "linebreak-style": 0
    }
};
