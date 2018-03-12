let API_URL = '/api';

let listScroll = (_this,page,rows) => {
  return _this.$http({
    url: API_URL + '/product/queryProducts',
    method: 'POST',
    data: {
      name: "",
      page: page,
      rows: rows,
      sort: "lastModified",
      proxy: '0'
    }
  })
}

let queryCompanyFuzzy = (_this) => {
    return _this.$http({
      url: API_URL + '/clientCredit/queryCompanyFuzzy',
      method: 'POST',
      data: {
        companyName: '公司'
      }
    })
}

let hh = (_this,productsType,start,pageSize) => {
  return _this.$http({
    url: API_URL + '/products/hotSale?shopSign=7ac2f887ca56e36d',
    method: 'POST',
    data: {
      productsType: productsType,
      start: start,
      pageSize: pageSize,
      
    }
  })
}


export {
	listScroll,
	queryCompanyFuzzy,
  hh
}