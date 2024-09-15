const connectionMySQL = require("./connectionDB");

const JSON_parserData = (FIELDS, VALUES) => {
    return JSON.parse("{" + FIELDS.map((e, i) => `"${e}" : "${VALUES[i]}"`) + "}");
}

const QUERY_MYSQL = async (action = "", name_table = "", FIELDS = [], VALUES = [], EXTRA = {}) => {

    let query = "";
    let message = "";
    let data = {};

    try {
        switch (action) {
            case "INSERT_DATA_SIMPLE":
                query = `INSERT INTO ${name_table} (${FIELDS.map((e) => e)}) VALUES (${FIELDS.map((e, i) => i === FIELDS.length ? "," : `"${VALUES[i]}"`)})`;
                message = "Data inserted correctly";
                data = JSON_parserData(FIELDS, VALUES);
                break;

            case "INSERT_DATA_IF_EXISTS":
                query = `SELECT * FROM ${name_table} WHERE ${EXTRA.field}= "${EXTRA.value}"`;
                message = "Data inserted correctly"
                data = JSON_parserData(FIELDS, VALUES);
                break;

            case "GET_ALL_DATA_SIMPLE":
                query = `SELECT * FROM ${name_table} ${name_table === "reservations" && "INNER JOIN users ON reservations.userId=users.id"} ORDER BY reservation_date DESC`;
                message = "Data obtained correctly"
                break;

            case "GET_ALL_DATA_SEARCHER":
                query = `SELECT * FROM ${name_table} ${name_table === "reservations" && "INNER JOIN users ON reservations.userId=users.id"} WHERE ${EXTRA.field} LIKE '%${EXTRA.value}%' ORDER BY reservation_date ASC`;
                message = "Data obtained correctly"
                break;

            case "GET_ALL_DATA_BY_USER_ID":
                query = `SELECT * FROM ${name_table} ${name_table === "reservations" && "INNER JOIN users ON reservations.userId=users.id"} WHERE ${EXTRA.field}= "${EXTRA.value}" ORDER BY reservation_date ASC`;
                message = "Data obtained correctly"
                break;
        }

        const APPLY_QUERY = await connectionMySQL.query(query, VALUES.map((e) => e));

        return {
            bonus: APPLY_QUERY[0],
            code: "201",
            ok: true,
            data: Object.keys(data).length === 0 ? APPLY_QUERY[0] : data,
            message: message
        }

    } catch (error) {
        return {
            code: "500",
            ok: false,
            data: [],
            message: error.message
        }
    }
}

module.exports = QUERY_MYSQL;