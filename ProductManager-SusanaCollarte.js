const  fs = require('fs');

class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]

generaID = () => (ProductManager.producto.length === 0) ? 1: ProductManager.producto[ProductManager.producto.length -1].id +1

abreArchivo = async() => {
  
 
  try{ 
    if(fs.existsSync(this.path))
    {
      ProductManager.producto=await JSON.parse(fs.readFileSync(this.path,'utf-8'));
      return true
    } 
      return false
  }
  catch(error){
    console.log(error);
  }
 
  
  
}


encuentraCode = async(code,id) =>{
  //const todo= this.producto;
  try{
      if (id >1)
      {
          const p1= await ProductManager.producto.find(element => element.codigo === code );
          if(p1 != undefined)
          {
            console.log("no es posible ya existe codigo",p1.codigo);
            return false
          }
          
      }
      return true
}
catch(error){
     console.log(error)
}
}

addproducto=async(product)=>{
        
  try{
          let code=product['codigo'];

          
          this.abreArchivo(); 
          let id = this.generaID(); 
         
          if (this.encuentraCode(code,id))
          {
          
          product['id']=id;
          console.log("grabando",ProductManager.producto); 
           
          ProductManager.producto.push(product);
        
          fs.writeFileSync(this.path, JSON.stringify(ProductManager.producto), (error) => {
              if (error)
                return console.log("error");
            }); 
          }
  }
  catch(error){
    console.log(error);
  }

 }


traeProducts = async() => this.abreArchivo()

traeProductsBy =async(id) =>
 {

      try{
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
    catch(error){
      console.log(error);
    }
 }

 BorrarProducto = async(id) =>{
  try{
    if (this.abreArchivo()){
         
    const arr=ProductManager.producto.map(function(obj){
        return obj;
    });
    
    let arr2=[];
    
    for(let i=0;i< arr.length;i++)
    {
      
        if(arr[i]['id']==id){
           console.log("revisando item", arr[i]['id']);
            console.log('se borra el elemento',id); 
        }else{
        let productoArray=arr[i];
        arr2.push(productoArray);
       }
    }
    ProductManager.producto=arr2;
    console.log('Largo Nuevo array',ProductManager.producto.length);
    try {
    
        fs.writeFileSync(this.path,JSON.stringify(ProductManager.producto,null,2));
    
        } 
        catch (err){
    
        console.log('error',err);
    
        }

    
      }
  }
  catch(error){
    console.log(error);
  }

 }


ModificarProducto = async(id,description) =>{
  try{

    if (this.abreArchivo()){
         
      const arr=ProductManager.producto.map(function(obj){
          return obj;
      });
      
      let arr2=[];
      
      for(let i=0;i< arr.length;i++)
      {
        
          if(arr[i]['id']==id){
             console.log("revisando item", arr[i]['id']);
             arr[i]['description']=description;
              console.log('modificando',id, "descripcion", description); 
          }
          let productoArray=arr[i];
          arr2.push(productoArray);
         
      }
      ProductManager.producto=arr2;
      
      try {
      
          fs.writeFileSync(this.path,JSON.stringify(ProductManager.producto,null,2));
      
          } 
          catch (err){
      
          console.log('error',err);
      
          }
  
      
        }

  }
  catch(error){
    console.log(error);
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

    
 


console.log("LISTADO PRODUCTOS:",producto.traeProducts()) ;

//REPETIDO
console.log("Producto Repetido");
producto.addproducto(producto1);
producto.addproducto(producto2);
producto.addproducto(producto3);
producto.addproducto(producto4);
producto.addproducto(producto5);


console.log("Producto  ",producto.traeProductsBy(3));

console.log("Producto  ",producto.traeProductsBy(6)) ;


console.log('Borrar elemento',producto.BorrarProducto(1));
console.log('Modificar descripcion de id', producto.ModificarProducto(2,"CAMBIADO"))