const repo = require('./repo')

function genSQLQuery(query) {
    Object.keys(query).forEach((x) => {
        console.log(`Key=${x}`);
        switch(x) {
            case key:
                break;
            case page:
                break;
            case limit:
                break;
            case retailer:
                break;
            case availability:
                break;
            case order:
                break;
            default:
                break;
        }
    });
}

const getProducts = async (req, res) => {
    const query = req.query;
    const values = ['gpus', 1, 20];
    if('type' in query) {
        if(query.type === 'cpu' || query.type === 'gpu') { values[0] = query.type+'s'; }
    }
    else { values.push(''); }
    if('page' in query) { 
        let page = parseInt(query.page);
        if(!isNaN(page))
            values[1] = (page > 0) ? page : 1;
    }
    if('limit' in query) { 
        let limit = parseInt(query.limit);
        if(!isNaN(limit))
            values[2] = (limit > 0) ? limit : 20; 
    }
    let offset = (values[1]-1)*values[2];
    let response = {
        status: 200,
        products: []
    };
    const data = await repo.fetchData(`SELECT * FROM ${values[0]} OFFSET ${offset} LIMIT ${values[2]}`);
    response.products = data;

    res.json(response);
}

const search = async (req, res) => {
    const query = req.query;
    const queryObj = {
        key: '',
        page: 1,
        limit: 20
    };
    Object.keys(query).forEach((x) => {
        switch(x) {
            case 'key':
                queryObj.key = query.key.toLowerCase();
                break;
            case 'page':
                let page = parseInt(query.page);
                if(!isNaN(page))
                    queryObj.page = (page > 0) ? page : 1;
                break;
            case 'limit':
                let limit = parseInt(query.limit)
                if(!isNaN(limit))    
                    queryObj.limit = (limit > 0) ? limit : 20;
                break;
            default:
                break;
        }
    });

    const result = [];
    if(queryObj.key !== '') {
        const data = await repo.fetchData('SELECT * FROM gpus UNION SELECT * FROM cpus');
        data.forEach((x) => {
            let value = (x.brand+' '+x.model).toLowerCase();
            if(value.includes(queryObj.key)) {
                result.push(x);
            }
        });
    }

    const response = {status: 200, products: result.slice((queryObj.page-1)*queryObj.limit, (queryObj.page)*queryObj.limit)};
    res.json(response);
}

const getProductByID = async (req, res) => {
    let id = req.params.id;
    const response = {status: 200, products: []};
    const data = await repo.fetchData(`SELECT * FROM (SELECT * FROM gpus UNION SELECT * FROM cpus) AS tbl WHERE id = '${id}'`);
    if(data.length !== 0) {
        response.products = data;
    }
    res.json(response);
}

module.exports = {
    getProducts,
    search,
    getProductByID
}