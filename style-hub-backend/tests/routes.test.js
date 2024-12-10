import request from 'supertest';
import { app } from '../index.js'; // Importa la instancia de la aplicación


describe("Order Routes", () => {
  test("GET /orders - Debería devolver una lista de órdenes (puede estar vacía)", async () => {
    const response = await request(app).get("/order");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que devuelve un array
  });

  test("GET /orders/:id - Debería devolver una orden específica", async () => {
    const response = await request(app).get("/order/2a1b8305-1a98-4546-ac59-30bd4ad3e948");

    if (response.status === 200) {
      expect(response.body).toHaveProperty("success", true);
    } else {
      expect(response.status).toBe(404);
    }
  });

});

describe("Product Routes", () => {
  test("GET /products - Debería devolver una lista con productos", async () => {
    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que devuelve un array
  });

  test("GET /product/show-quantity/:id - Debería devolver la cantidad de un producto específico", async () => {
    const response = await request(app).get("/product/show-quantity/9");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("showQuantity");
  });
});

describe("Product Warehouse Routes", () => {
  test("GET /product-warehouse - Debería devolver todos los almacenes", async () => {
    const response = await request(app).get("/product-warehouse");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});