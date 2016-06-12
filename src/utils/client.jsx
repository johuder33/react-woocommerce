import $ from 'jquery';
import signatureGenerator from 'oauth-signature';

export function initAPI() {
	const base = 'http://machinesoft.com.ve/projects/solid/wp-json/wc/v1';

    const params = {
        oauth_consumer_key: 'ck_43a1ec694e8aeaff040c5fea4ca8b35acd9340da',
        oauth_nonce: new Date().getTime(),
        oauth_timestamp: new Date().getTime().toString().substring(0, 10),
        oauth_signature_method: 'HMAC-SHA1'
    };

    return {
        base,
        params
    }
}

export function generateURL(method, base, endpoint, params) {
	const customerSecret = 'cs_a57089227bedec1033c05e83eb9c0b2d004266a0';
	const baseURL = base + endpoint;
	const signature = signatureGenerator.generate(method, baseURL, params, customerSecret, null);
    params.oauth_signature = signature;

    // extract keys of params
    const keys = Object.keys(params).sort();

    // loop and create the right url
    const cleanUrl = keys.map((item) => {
        const value = params[item];
        return item + '=' + value;
    });

    const urlGenerated = baseURL + '?' + cleanUrl.join('&');

    return urlGenerated;
}

export function searchProduct(endpoint, data, success, error) {
	const api = initAPI();
    const method = 'GET';

    const params = Object.assign(api.params, data);

    const url = generateURL(method, api.base, endpoint, params);

    $.ajax({
        url: url,
        method: method,
        data: data,
        dataType: 'json',
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}

export function getProductById(endpoint, success, error) {
	const api = initAPI();
    const method = 'GET';

    //const params = Object.assign({}, api.params, data);

    const url = generateURL(method, api.base, endpoint, api.params);

    $.ajax({
        url: url,
        method: method,
        dataType: 'json',
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}

export function getAllProducts(endpoint, success, error) {
    const api = initAPI();
    const method = 'GET';

    const params = Object.assign({}, api.params, {per_page: 16});

    const url = generateURL(method, api.base, endpoint, params);

    $.ajax({
        url: url,
        method: method,
        success: function(response, status, request) {
            success(response, request);
        },
        error: function(err) {
            error(err);
        }
    });
}

export function createProduct(endpoint, data, success, error) {
	const api = initAPI();
    const method = 'POST';

   	const params = Object.assign({}, api.params, data);
    const url = generateURL(method, api.base, endpoint, api.params);

    $.ajax({
	  url: url,
	  method: method,
	  data: data,
	  dataType: 'json',
	  success: function(response) {
          success(response);
	  },
	  error: function(err) {
          error(err);
	  }
	});
}

export function setOrder(endpoint, data, success, error) {
    const api = initAPI();
    const method = 'POST';

    const params = Object.assign({}, api.params, data);
    const url = generateURL(method, api.base, endpoint, api.params);

    $.ajax({
        url: url,
        method: method,
        data: data,
        dataType: 'json',
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}