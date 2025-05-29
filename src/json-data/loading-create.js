const create = {
    "dateRange": {
        "from": new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        "to": new Date().toISOString().split('T')[0]
    },

    "entry": {
        "AND": [{ "condition": [], "switch": true }],
        "switch": true
    },

    "entryPrice": { "condition": [] },

    "quantity": { "condition": [] },

    "exitCollection": [{
        "exit": {
            "AND": [{ "condition": [], "switch": true }],
            "switch": true
        },



        "exitPrice": { "condition": [] },
        "label": "",
        "switch": true

    }]
}
const group = { "AND": [{ "condition": [], "switch": true }], "switch": true }
const condition = { "condition": [], "switch": true }
const indicator = { "indicator": [] }
const addExit = {
    "exit": {
        "AND": [{ "condition": [], "switch": true }],
        "switch": true
    },
    "exitPrice": { "condition": [] },
    "label": "",
    "switch": true
}

export { create, group, condition, indicator, addExit }