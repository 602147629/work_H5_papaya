
var Code = module.exports = {
    OK: 200,
    Failed: 500,
    TIMEOUT: 1000,

    MySQL: {
        DB_ERROR: 1001,
        RECORD_ERROR: 1002,
        PROCEDURE_ERROR: 1003,
        SQL_IS_EMPTY:  1004
    },

    REDIS: {
        REDIS_ERROR: 1101
    },

    HTTP: {
        REQUEST_ERROR: 1201,
        STATUS_ERROR: 1202,
        BODY_ERROR: 1203
    },

    REQUEST: {
        INVALID_PARAMS: 1500,
        INVALID_SIGNATURE: 1501,
        UNZIP_ERROR: 1502,
        JSON_ERROR: 1503,
        TOKEN_ERROR: 1504,
        SDK_ERROR: 1505,
        DATA_ERROR: 1506,
        INVALID_APP: 1507,
        INVALID_CHANNEL: 1508,
        INVALID_PLATFORM: 1509,
        INVALID_SDK: 1510
    },

    USER: {
        RECORD_NULL: 1600,
        VERIFY_ERROR: 1601,
        SDK_VERIFY_ERROR: 1602
    },

    RESPONSE: {
        RECORD_NULL: 1700
    },

    PAY: {
        ORDER_CLOSED: 2001,
        ORDER_NULL: 2002,
        PRODUCT_ERROR: 2003
    },

    ORDER: {
        PENDING: 2100,
        SUCCESS: 2101,
        FAILURE: 2102,
        EXPIRED: 2103,
        EXCEPTION: 2104
    }
};
