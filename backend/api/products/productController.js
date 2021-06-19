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
        if(!isNaN(parseInt(query.page)))
            values[1] = query.page; 
    }
    if('limit' in query) { 
        if(!isNaN(parseInt(query.limit)))
            values[2] = query.limit; 
    }
    let offset = (values[1]-1)*values[2];
    let response = {
        status: 200,
        products: []
    };
    try {
        const data = await repo.query(`SELECT * FROM ${values[0]} OFFSET ${offset} LIMIT ${values[2]}`);
        console.log(data.rows);
        response.products = data.rows;
    } catch(error) {
        console.log(error)
    }
    res.json(response);
}

const search = async (req, res) => {
    const query = req.query;
    const queryObj = {
        key: '',
        page: 0,
        limit: ''
    };
    Object.keys(query).forEach((x) => {
        console.log(`Key=${x}`);
        switch(x) {
            case 'key':
                queryObj.key = query.key.toLowerCase();
                break;
            case 'page':
                if(!isNaN(parseInt(query.page)))
                    queryObj.page = query.page;
                break;
            case 'limit':
                if(!isNaN(parseInt(query.limit)))    
                    queryObj.limit = query.limit;
                break;
            default:
                break;
        }
    });

    const sql = {
        name: 'search',
        text: 'SELECT * FROM gpus UNION SELECT * FROM cpus'
    }
    
    const result = [];
    try {
        const data = await repo.query(sql);
        data.rows.forEach((x) => {
            let value = (x.brand+' '+x.model).toLowerCase();
            if(value.includes(queryObj.key)) {
                result.push(x);
            }
        });
    } catch(error) {
        console.log(error)
    }
    console.log(result)
    const response = {status: 200, products: result.slice((queryObj.page-1)*queryObj.limit, (queryObj.page)*queryObj.limit)};
    res.json(response);
}

const getProductByID = async (req, res) => {
    let id = req.params.id;
    const response = {status: 200, products: []};
    try {
        const data = await repo.query(`SELECT * FROM (SELECT * FROM gpus UNION SELECT * FROM cpus) AS tbl WHERE id = '${id}'`);
        if(data.rows.length !== 0) {
            response.products = data.rows;
        }
    } catch(error) {
        console.log(error);
    }
    res.json(response);
}

module.exports = {
    getProducts,
    search,
    getProductByID
}