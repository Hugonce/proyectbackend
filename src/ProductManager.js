const fs = require("fs").promises;

class ProductManager {
    
    static ultId = 0;
    
    constructor(){
        this.products = [];
        this.path = "./productos.json";
    }

    async addProduct({title, description, price, thumbnail, code, stock}){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Debe completar todos los campos");
            return;
        }else{
            
            const codigos = this.products.find(codigo => codigo.code === code);
            if(!codigos){
            const newProduct = {
                id: ++ProductManager.ultId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
                this.products.push(newProduct);
                console.log("Se agrego el producto")
                await this.guardarArchivo(this.products);
            }else{
                console.log("El código se encuentra repetido")
                return;
            }
        }

        
        
        
    }

    async getProducts(){
        try{
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch(error){
            console.log("Error leyendo el archivo");
        }
    }

    async getProductsById(id){
        try{
            const arrayProductos = await this.getProducts();
            const buscoId = arrayProductos.find(item => item.id === id);
            if(!buscoId){
                console.log("No existe un producto con esa Id")}
            else{
                console.log(buscoId);
                return buscoId;
            }
        }catch(error){
            console.log("otro error")
        }
}
    async updateProduct(id,{title, description, price, thumbnail, code, stock}){
        const todosLosProductos = this.products;
        const actualizarProducto = todosLosProductos.find(item => item.id === id);
        if(title){
                actualizarProducto.title =title;
        }
        if(description){
            actualizarProducto.description =description;
        }
        if(price){
            actualizarProducto.price =price;
        }
        if(thumbnail){
            actualizarProducto.thumbnail =thumbnail;
        }
        if(code){
            actualizarProducto.code =code;
        }
        if(stock){
            actualizarProducto.stock =stock;
        }
        await this.guardarArchivo(todosLosProductos);

    }
    async deleteProduct(id){
        const resultado = this.products.filter(item => item.id != id);
        this.products = resultado;
            await this.guardarArchivo(resultado);
    }
    
    async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch(error){
            console.log("Error guardando el archivo");
        }
    }
}

const testing = new ProductManager();

testing.addProduct({title: "Producto prueba", description: "Este es un producto prueba",price:  "200", thumbnail: "Sin imagen",code: "abc123",stock: "25"});
testing.addProduct({title: "Producto prueba 2", description: "Este es un producto prueba 2",price:  "200", thumbnail: "Sin imagen",code: "abcd123",stock:"25"});
testing.addProduct({title: "Producto prueba 3", description: "Este es un producto prueba 3",price:  "200", thumbnail: "Sin imagen",code: "abcde123",stock: "25"});

testing.getProducts();

//testing.getProductsById(1);

//testing.getProductsById(3);

//testing.deleteProduct(2);

testing.updateProduct(1,{title: "Producto editado", description: "Este es un producto editado",price:  "290", thumbnail: "Sin imagen",code: "abc123",stock: "45"})

