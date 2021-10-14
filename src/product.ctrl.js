
const service = require('./services');
const productSearch = async (req,res,next)=>{
    let obj = {
        page: '0',
        size: '1000',
        query: ''
    }
    if(req.query.page)
    {
        obj.page = req.query.page;
    }
    if(req.query.size)
    {
        obj.size = req.query.size;
    }
    if(req.query.query)
    {
        if(req.query.query.length >1 )
        {
            obj.query = req.query.query;
        }
        else{
            res.json({status: false, message: "search parameter min 2 required" }); 
            return null;
        }
    }
    else{
        res.json({status: false, message: "search parameter required" }); 
        return null;
    }
    const resp = await service.productSearch(obj);
    res.json(resp);
}

const opportunityFinder = async (req,res,next)=>{
    const resp = await service.opportunityFinder(req.body);
    res.json(resp);
}


module.exports = {
    productSearch,
    opportunityFinder
}