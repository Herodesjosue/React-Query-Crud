import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProducts } from "../api/productsAPI";

const ProductsForm = () => {

  const queryClient = useQueryClient();
  
  const addProduct = useMutation({
    mutationFn: createProducts,
    // esta funcion onSuccess me permite ejecutar una funcion
    // cuando la mutacion alla finalizado
    onSuccess: () => {
      console.log("exito");
      queryClient.invalidateQueries();
    },
  });

  function HandleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    // console.log(formdata);
    const data = Object.fromEntries(formdata);
    addProduct.mutate({ ...data, instock: true });
    // console.log(data);
  }

  return (
    <form onSubmit={HandleSubmit}>
      <label htmlFor="name">Nombre</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="description">Descripcion</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Precio</label>
      <input type="number" id="price" name="price" />
      <button>Enviar</button>
    </form>
  );
};

export default ProductsForm;
