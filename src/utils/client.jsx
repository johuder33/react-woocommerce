import $ from 'jquery';
import signatureGenerator from 'oauth-signature';

export function initAPI() {
	//const base = 'http://cersolve.com/solididdata/wp-json/wc/v1';
    const base = 'http://localhost:8888/solid-wp/wp-json/wc/v1';
    //oauth_consumer_key: 'ck_43a1ec694e8aeaff040c5fea4ca8b35acd9340da',
    //DEV oauth_consumer_key: 'ck_df19c2b4c2325ba7c1deede83851674b6bdb595a',
    // produccion : ck_9a64197e0be24b3748965c72397b53b0515bb88b
    const params = {
        oauth_consumer_key: 'ck_df19c2b4c2325ba7c1deede83851674b6bdb595a',
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
	//const customerSecret = 'cs_a57089227bedec1033c05e83eb9c0b2d004266a0';
    //DEV const customerSecret = 'cs_701ddd3c596b62be2b9d6befa0007c368b470379';
    // produccion : cs_172359763b8fbc9d6a021201d5f8e6424e3e3c53
    const customerSecret = 'cs_701ddd3c596b62be2b9d6befa0007c368b470379';
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

export function getAllProducts(endpoint, success, error, attrs) {
    const api = initAPI();
    const method = 'GET';
    const params = {};
    Object.assign(params, api.params, attrs);

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

export function getCategories(endpoint, success, error, data) {
    const api = initAPI();
    const method = 'GET';

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
        method,
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

export function getDataFromServer(endpoint, success, error) {
    const base = 'http://localhost:8888/solid-wp/wp-json/wp/v2';
    //const base = 'http://cersolve.com/solididdata/wp-json/wp/v2';
    const url = base + endpoint;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}

export function send(endpoint, success, error, data) {
    const info = data || {};
    const base = 'http://localhost:8888/solid-wp/wp-json/solid/api';
    //const base = 'http://cersolve.com/solididdata/wp-json/solid/api';
    const url = base + endpoint;
    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: info,
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}

export function getContact(endpoint, success, error) {
    const base = 'http://localhost:8888/solid-wp/wp-json/solid/api';
    //const base = 'http://cersolve.com/solididdata/wp-json/solid/api';
    const url = base + endpoint;
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            success(response);
        },
        error: function(err) {
            error(err);
        }
    });
}