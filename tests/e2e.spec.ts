import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000/user';

test('GET -> POST -> PUT -> DELETE flow', async ({ request }) => {
  const userId = `user-${Date.now()}`;
  const createdUser = {
    id: userId,
    name: 'E2E User',
    email: 'e2e.user@example.com',
  };

  const getResponseBefore = await request.get(baseURL);
  expect(getResponseBefore.status()).toBe(200);

  const postResponse = await request.post(baseURL, {
    data: createdUser,
  });
  expect(postResponse.status()).toBe(201);

  const createdBody = await postResponse.json();
  expect(createdBody).toMatchObject(createdUser);

  const putResponse = await request.put(`${baseURL}/${userId}`, {
    data: {
      ...createdUser,
      name: 'Updated E2E User',
      email: 'updated.e2e.user@example.com',
    },
  });
  expect(putResponse.status()).toBe(200);

  const updatedBody = await putResponse.json();
  expect(updatedBody).toMatchObject({
    id: userId,
    name: 'Updated E2E User',
    email: 'updated.e2e.user@example.com',
  });

  const deleteResponse = await request.delete(`${baseURL}/${userId}`);
  expect(deleteResponse.status()).toBe(200);

  const getAfterDelete = await request.get(`${baseURL}/${userId}`);
  expect(getAfterDelete.status()).toBe(404);
});
