import { test, expect } from '@playwright/test';
const baseURL = 'http://localhost:3000/user';

test.describe.serial('Full API CRUD - Serial', () => {

  test('Full flow GET -> POST -> PUT -> DELETE', async ({ request }) => {
 
    // 2. POST - create 102
    const postRes = await request.post(baseURL, {
      data: { id: '102', name: 'Kumar', email: 'kumar@test.com' }
    });
    expect(postRes.status()).toBe(201);
    console.log('POST Created 102');



    // 1. GET
    const getRes = await request.get(baseURL);
    expect(getRes.status()).toBe(200);
    console.log('GET OK');

    
    // 3. PUT - update 102 (ippo 102 kandippa irukkum)
    const putRes = await request.put(`${baseURL}/102`, {
      data: { name: 'Kumar Updated', email: 'kumar.updated@test.com' }
    });
    console.log('PUT Status:', putRes.status());
    expect(putRes.status()).toBe(200);
    
    // 4. DELETE
    const delRes = await request.delete(`${baseURL}/102`);
    expect(delRes.status()).toBe(200);
    console.log('DELETE Success');
  });

});