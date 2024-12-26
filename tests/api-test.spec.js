const { test, expect } = require("@playwright/test");
const { default: Ajv} = require("ajv");

const ajv = new Ajv()

test('Test Case 1', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects/7');
    expect(response.status()).toBe(200)

      const responseData = await response.json()
      expect(responseData.id).toBe("7")
      expect(responseData.name).toBe("Apple MacBook Pro 16")
      expect(responseData.data.year).toBe(2019)
      expect(responseData.data["CPU model"]).toBe("Intel Core i9")

      const valid = ajv.validate(require('./jsonschema/get-object-schema.json'),responseData)

      if(!valid) {
        console.log("AJV validation Errors:", ajv.errorsText());
      }
      expect(valid).toBe(true);

    });
    
    
    test('Test Case 2', async ({ request }) => {
        const bodydata = {
                "name": "Laptop Nael",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }
        
        const headerdata = {
            accept: 'application/json'
        }

        const response = await request.post('https://api.restful-api.dev/objects', {
        Headers: headerdata,
        data: bodydata
    })
    expect(response.status()).toBe(200)
});