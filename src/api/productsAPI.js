import axios from "axios";

const productsApi = axios.create({
  // hemos creado como su nombre lo indica la baseUrl
  baseURL: "http://localhost:3000",
});

export const getProducts = async () => {
  // como ya sabemos la base le envias el path final solamente y lo demas es lo mismo
  const res = await productsApi.get("/products");
  return res.data;
};

export const createProducts = (product) =>
  productsApi.post("/products", product);

export const deleteProducts = (id) => productsApi.delete(`products/${id}`);

export const updateProducts = (product) => productsApi.put(`products/${product.id}`,product);
