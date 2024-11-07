import { create } from "zustand"

export const useProductScore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    //Create
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all the fields" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)

        })

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "We've added the product in the Database" }
    },
    //Read
    fetchProducts: async () => {
        const res = await fetch("api/products");
        const data = await res.json()// extract to adata to json
        set({ products: data.data })
    },

    //Update 
    updateProduct: async (productId, updatedproduct) => {
        const res = await fetch(`/api/products/${productId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedproduct)    
        })
        const data = await res.json();
        if(!data.success) return{success:false,message:data.message}
        set((state) => {
            const updatedProducts = state.products.map((product) =>
              product._id === productId ? { ...product, ...updatedproduct } : product
            );
            return { products: updatedProducts };
          });
        
        return { success: true, message: "Product Updated" };

    },
    
    //Delete
    deleteProduct: async (productId) => {
        const res = await fetch(`/api/products/${productId}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: "Failed to delete product" };

        //update the ui wihout refreshing the browseer
        set((state) => ({
            products: state.products.filter(product => product._id !== productId)
        }));
        return { success: true, message: "We've deleted the product from the Database" }
    }
}));

//https://zustand.docs.pmnd.rs/getting-started/introduction