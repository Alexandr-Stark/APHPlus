module.exports.PASSWORD = {
    MIN_LENGTH: 6,
    MAX_LENGTH: 10,
    REGEXP_ONE_DIGIT: /(?=.*\d)/,
    REGEXP_ONE_LOWERCASE: /(?=.*[a-z])/,
    REGEXP_ONE_UPPERCASE: /(?=.*[A-Z])/
};

module.exports.EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports.USERNAME = {
    NAME: "",
    SURNAME: "",
    NICKNAME: "",
};

module.exports.PHONE = /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm;