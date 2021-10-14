
const rp = require('request-promise');
const urls = require('./constant');
const config = require('./config');
const productSearch = async (payload) => {
  try {
    // let url = urls.amzscoutSearch;
    // url = url.replace('@page', payload.page);
    // url = url.replace('@size', payload.size);
    // url = url.replace('@query', payload.query);
    // const options = {
    //   method: 'GET',
    //   uri: url,
    //   headers:
    //     { 'x-token': config['X-Token'] }
    // }

    const TokenData = await tokenGenerate();
    let url2 = urls.junglescoutSearch;
    let p = Number(payload.size) * Number(payload.page)
    url2 = url2.replace('@page', payload.size);
    url2 = url2.replace('@from', p);
    url2 = url2.replace('@query', payload.query);
    const options2 = {
      method: 'GET',
      uri: url2,
      headers:
      {
        'authorization':TokenData, // config['token'],
        'user-agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36`
      }
    }
    // var resp = await Promise.all([rp(options),rp(options2)]);
    var resp = await Promise.all([rp(options2)]);
    console.log("resprespresp:", resp)
    resp[0] = JSON.parse(resp[0]);
    // resp[1] = JSON.parse(resp[1])
    // return {status:true,data:{amzscout: resp[0],junglescout:resp[1]}}
    return { status: true, data: { junglescout: resp[0] } }
  }
  catch (err) {
    logger.error(`productSearch --> ${err.message}`);
    return { status: false, message: err.message }

  }
}

const opportunityFinder =async (data) => {
  try {
    const TokenData = await tokenGenerate();
    const options2 = {
      method: 'POST',
      uri: urls.jungleOpportunity,
      headers:
      {
        'authorization':TokenData, //config['token'],
        'user-agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36`,
        'content-type': 'application/json'
      },
      body:JSON.stringify(data)
    }
    
    console.log(data)
    const resp = await rp(options2)
    return { status: true, data: { junglesout: JSON.parse(resp) } }

  }
  catch (err) {
    logger.error(`opportunity --> ${err.message}`);
    return { status: false, message: err.message }

  }

}


const tokenGenerate =async () =>{

  const options2 = {
    method: 'POST',
    uri: urls.jungleScoutLogin,
    headers:
    {
      // 'authorization': config['token'],
      'user-agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36`,
      'content-type': 'application/json'
    },
    body:JSON.stringify(config.JungleScoutLoginPayload)
  }  
  
  const resp = await rp(options2)
  var data = JSON.parse(resp)
  return data.data.token
  // console.log("KKKKKKKKKKKKKK:",data.data.token)
  

} 

module.exports = {
  productSearch,
  opportunityFinder
}

// var dataString = `{"jsonrpc": "1.0", "id": "curltest", "method": "createwallet", "params": ["ashokcse505@gmail.con"]}`;  //create wallet