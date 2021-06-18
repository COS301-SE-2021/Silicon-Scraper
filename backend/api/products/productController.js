const repo = require('./repo')
const mockData = require('../mocks/productMocks')

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
    const data = await repo.query('SELECT * FROM gpus');
    res.json(data);
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
                queryObj.key = query[x];
                break;
            case 'page':
                queryObj.page = query[x];
                break;
            case 'limit':
                queryObj.limit = query[x];
                break;
            default:
                break;
        }
    });

    const sql = {
        name: 'search',
        text: 'SELECT * FROM gpus UNION SELECT * FROM cpus'
    }
    
    const data = await repo.query(sql);
    const result = [];
    data.rows.forEach((x) => {
        let value = (x.brand+' '+x.model).toLowerCase();
        if(value.includes(queryObj.key)) {
            result.push(x);
        }
    });
    console.log(result)
    res.json(result.slice((queryObj.page-1)*queryObj.limit, (queryObj.page)*queryObj.limit));
}

const getProductByID = async (req, res) => {
    let id = req.params.id;
    let product = {};
    const data = await repo.query('');
    mockData.forEach((x) => {
        if (x.id == parseInt(id.toString())) {
            product = x;
        }
    });
    res.json(product);
}

module.exports = {
    getProducts,
    search,
    getProductByID
}