const  fs = require('fs');

class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]
generaID = () => (ProductManager.producto.length === 0) ? 1: ProductManager.producto[ProductManager.producto.length -1].id +1

abreArchivo = () => {
  
 if(fs.existsSync(this.path)){
  ProductManager.producto=fs.readFileSync(this.path,'utf-8');
    return true
  } 
return false
  
}




encuentraCode = (code,id) =>{
  //const todo= this.producto;
  
  if (id >1)
  {
      const p1= ProductManager.producto.find(element => element.codigo === code );
      if(p1 != undefined)
      {
        console.log("no es posible ya existe codigo",p1.codigo);
        return false
      }
      
  }
  return true
}

addproducto (product){
        //const id=this.counter++;
          let code=product['codigo'];

          
          this.abreArchivo(); 
          let id = this.generaID(); 
         
          if (this.encuentraCode(code,id))
          {
          
          product['id']=id;
          console.log("grabando",ProductManager.producto); 
          console.log("grabando ---",product); 
          ProductManager.producto.push(product);
        
          fs.writeFileSync(this.path,JSON.stringify(ProductManager.producto), (error) =>{
            if (error) return console.log("error");
          }); 
          }
        

 }


getProducts = () => this.abreArchivo()

getProductsBy =(id) =>
 {
  if (this.abreArchivo()){
  const producto = ProductManager.producto.find(item => item.id === id)
  if(producto === undefined)
  { 
    return `${id} NO EXISTE `;
  }

  else
  {
  return producto;
  }
  
 }
 }
}


let producto= new ProductManager;
producto.path ='./ejemplo1.txt';
producto1={id:0, codigo: 'PS4 Pro', description:'descripcion producto',title:'title 1',stock: 3, thumbail:'https://www.shutterstock.com/image-vector/black-yellow-grunge-modern-thumbnail-600w-2098712566.jpg', price: 399.99 , discount: 0.1 };
producto2={ id:0, codigo: 'Xbox One X', description:'descripcion producto', title:'title 1', stock: 1, thumbail:'https://www.shutterstock.com/image-vector/black-yellow-grunge-modern-thumbnail-600w-2098712566.jpg',price: 499.99, discount: 0.1 };
producto3={ id:0,codigo: 'Nintendo Switch', description:'descripcion producto', title:'title 1', stock: 4,thumbail:'https://www.shutterstock.com/image-vector/black-yellow-grunge-modern-thumbnail-600w-2098712566.jpg', price: 299.99 };
producto4={id:0, codigo: 'PS2 Console', description:'descripcion producto', title:'title 1', stock: 1,thumbail:'https://www.shutterstock.com/image-vector/black-yellow-grunge-modern-thumbnail-600w-2098712566.jpg', price: 299.99, discount: 0.8 }
producto5={id:0,codigo: 'Nintendo 64', description:'descripcion producto', title:'title 1', stock: 2, thumbail:'https://www.shutterstock.com/image-vector/black-yellow-grunge-modern-thumbnail-600w-2098712566.jpg',price: 199.99, discount: 0.65 }; 

    
 


console.log("LISTADO PRODUCTOS:",producto.getProducts()) ;

//REPETIDO
console.log("Producto Repetido");
producto.addproducto(producto1);
producto.addproducto(producto2);

//console.log("Producto  ",producto1.getProductsBy(3))

//console.log("Producto  ",producto1.getProductsBy(6))
  