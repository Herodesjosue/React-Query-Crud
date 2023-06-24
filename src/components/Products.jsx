import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducts, getProducts, updateProducts } from "../api/productsAPI";

const Products = () => {
  const queryClient = useQueryClient();

  const RemoveProducts = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      console.log("Producto Eliminado con exito");
    },
  });


  const UpdateMutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      console.log("Producto Actualizado con exito");
    },
  })

  const { data, isLoading, isError, error } = useQuery({
    // queryKey es el id por asi decirlo el que identifica en este caso el endpoint
    queryKey: ["products"],
    // le pasas una funcion que se encarga del fetch de datos
    queryFn: getProducts,
    // selecciones los productos y le digo como quiero que los ordene
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  //   Primero valida que los datos se esten cargando
  if (isLoading) return <div>los datos estan cargando...</div>;
  //  Luego valida si ocurre un error pero como isError solo devuelve true o false se utiliza
  // "error" para especificar el tipo de error que ha ocurrido
  else if (isError) return <div>ha ocurrido un error {error}</div>;
  console.log(typeof data);
  return (
    <div>
      <h1>Products List</h1>
      <div>
        {data.map((p) => {
          return (
            <>
              <ul key={p.id}>
                <li>{p.name}</li>
                <li>{p.description}</li>
                <li>{p.price}</li>
              </ul>
              <button
                onClick={() => {
                  console.log(p.id);
                  RemoveProducts.mutate(p.id);
                }}
              >
                Delete
              </button>
              <label htmlFor="">In Stock</label>
              <input type="checkbox"
              checked={p.instock}
              onChange={(e)=>{
                UpdateMutation.mutate({...p,
                instock: e.target.checked
                })
              }} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
