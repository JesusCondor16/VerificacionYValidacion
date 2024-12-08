import $ from"express";import gr from"cors";import Or from"morgan";import nr from"dotenv";nr.config();var H=process.env.PORT??1234,I=`http://localhost:${H}`,B="http://localhost:5173",V=process.env.DB_HOST,G=process.env.DB_USER,J=process.env.DB_PASSWORD,Q=process.env.DB_DATABASE,K=process.env.DB_PORT,W=process.env.PAYPAL_CLIENT_ID,Y=process.env.PAYPAL_KEY_SECRET,L="https://api-m.sandbox.paypal.com",dr=process.env.EXCHANGERATE_KEY_SECRET,z=`https://v6.exchangerate-api.com/v6/${dr}/latest/PEN`;var k=(n,e,r,o)=>{r.status(n.statusCode??500).json({success:!1,error:n.message??"Error interno del servidor."})};import fr from"node-cron";import{Router as yr}from"express";import ir from"mysql2/promise";var ur={host:V,user:G,password:J,database:Q,port:K,decimalNumbers:!0},p=ir.createPool(ur),lr=async()=>{try{let n=await p.getConnection();console.log("Conexi\xF3n exitosa a la Base de Datos."),n.release()}catch(n){console.error("Error en la conexi\xF3n a la Base de Datos",n.message)}};lr();var w={SHIPPING:"Shipping",PICK_UP:"Pick up in store"},b={PAYPAL:"Paypal",YAPE:"Yape",DEPOSIT:"Bank Deposit"},q=9,x={PENDING:"Pending",PAID:"Paid",CANCELED:"Canceled"},X="http://localhost:5173",D="notValid";var Z=n=>n.reduce((e,r)=>e+r.price*r.quantity,0);import rr from"dayjs";var E=class{static async getOrders({deliveryOption:e,paymentOption:r}){try{let o=`
          SELECT 
            oc.id_order AS idOrder,
            c.first_name AS firstName, 
              c.last_name AS lastName,
              c.dni,
              c.cell_phone AS cellPhone,
              c.email,
              c.name_paypal AS namePaypal,
              c.email_paypal AS emailPaypal,
              l.address,
              l.district,
              l.province,
              l.department,
              l.country,
              oc.order_date AS orderDate,
              oc.status,
              oc.delivery_type AS deliveryOption,
              p.amount,
              p.payment_type AS paymentOption
          FROM order_customer oc 
          INNER JOIN customer c ON oc.id_customer = c.id_customer
          LEFT JOIN location l ON c.id_customer = l.id_customer
          INNER JOIN payment p ON oc.id_order = p.id_order
          WHERE 1=1
      `,t=[];e&&(o+="AND LOWER(oc.delivery_type) = LOWER(?)",t.push(e)),r&&(o+="AND LOWER(p.payment_type) = LOWER(?)",t.push(r)),o+="ORDER BY oc.order_date";let[a]=await p.query(o,t);for(let d of a){let{idOrder:u,orderDate:l,deliveryOption:c,paymentOption:s}=d,y=rr(l).format("YYYY-MM-DD HH:mm:ss");d.orderDate=y,c===w.PICK_UP&&(delete d.address,delete d.district,delete d.province,delete d.department,delete d.country),s!==b.PAYPAL&&(delete d.namePaypal,delete d.emailPaypal);let[S]=await p.query(`
            SELECT  
              od.id_order_details AS idOrderDetails,
              od.quantity,
              od.unit_price AS unitPrice,
              pw.name,
              ca.name AS category,
              pw.price AS precioOriginalAlmacen
            FROM order_details od
            INNER JOIN product p ON od.id_product = p.id_product
            INNER JOIN product_warehouse pw ON p.id_product_warehouse = pw.id_product_warehouse
            INNER JOIN category ca ON pw.id_category = ca.id_category
            WHERE id_order = ?
        `,[u]);d.productList=S}return a}catch(o){throw console.error("Error en getOrders en order.controller.js",o.message),o}}static async getOrder({id:e}){try{let[r]=await p.query(`
          SELECT 
            oc.id_order AS idOrder,
            c.first_name AS firstName, 
              c.last_name AS lastName,
              c.dni,
              c.cell_phone AS cellPhone,
              c.email,
              c.name_paypal AS namePaypal,
              c.email_paypal AS emailPaypal,
              l.address,
              l.district,
              l.province,
              l.department,
              l.country,
              oc.order_date AS orderDate,
              oc.status,
              oc.delivery_type AS deliveryOption,
              p.amount,
              p.payment_type AS paymentOption
          FROM order_customer oc 
          INNER JOIN customer c ON oc.id_customer = c.id_customer
          LEFT JOIN location l ON c.id_customer = l.id_customer
          INNER JOIN payment p ON oc.id_order = p.id_order
          WHERE oc.id_order = ?
        `,[e]);if(r.length===0){let s=new Error("El pedido no existe.");throw s.statusCode=404,s}let o=r[0],{orderDate:t,deliveryOption:a,paymentOption:d}=o,l=rr(t).format("YYYY-MM-DD HH:mm:ss");o.orderDate=l,a===w.PICK_UP&&(delete o.address,delete o.district,delete o.province,delete o.department,delete o.country),d!==b.PAYPAL&&(delete o.namePaypal,delete o.emailPaypal);let[c]=await p.query(`
        SELECT
          p.id_product AS id,
          od.quantity,
          od.unit_price AS price,
          pw.name,
          pw.image,
          ca.name AS category,
          pw.price AS precioOriginalAlmacen
        FROM order_details od
        INNER JOIN product p ON od.id_product = p.id_product
        INNER JOIN product_warehouse pw ON p.id_product_warehouse = pw.id_product_warehouse
        INNER JOIN category ca ON pw.id_category = ca.id_category
        WHERE id_order = ?
      `,[e]);return o.productList=c,{success:!0,data:o}}catch(r){throw console.error("Error en getOrder en order.model.js"),r}}static async createOrder({productList:e,checkoutData:r}){let o;try{o=await p.getConnection();for(let c of e){let[s]=await p.query("SELECT show_quantity FROM product WHERE id_product = ?",[c.id]);if(s.length===0){let y=new Error(`El producto "${c.name}" no existe.`);throw y.statusCode=404,y}if(s.show_quantity-c.quantity<0){let y=new Error(`La cantidad solicitada "${c.quantity}" del producto "${c.name}" supera el stock permitido "${s.show_quantity}"`);throw y.statusCode=422,y}}await o.beginTransaction();let[t]=await o.query("INSERT INTO customer (first_name, last_name, dni, cell_phone, email, name_paypal, email_paypal) VALUES (?, ?, ?, ?, ?, ?, ?)",[r.firstName,r.lastName,r.dni,r.cellPhone,r.email,"-","-"]);if(t.affectedRows===0){let c=new Error("Error al insertar un clinete en la tabla customer");throw c.statusCode=500,c}if(r.deliveryOption===w.SHIPPING){let[c]=await o.query("INSERT INTO location (address, district, province, department, country, id_customer) VALUES (?, ?, ?, ?, ?, ?)",[r.address,r.district,r.province,r.department,r.country,t.insertId]);if(c.affectedRows===0){let s=new Error("Error al insertar los datos de la ubicaci\xF3n del pedido en la tabla location");throw s.statusCode=500,s}}let[a]=await o.query("INSERT INTO order_customer (id_order, order_date, status, delivery_type, id_customer) VALUES (?, ?, ?, ?, ?)",[r.idOrder,r.orderDate,x.PENDING,r.deliveryOption,t.insertId]);if(a.affectedRows===0){let c=new Error("Error al insertar los datos del pedido en la tabla order_customer");throw c.statusCode=500,c}let d=Z(e);r.deliveryOption===w.SHIPPING&&(d+=q);let[u]=await o.query("INSERT INTO payment (id_payment, amount, payment_type, id_order) VALUES (?, ?, ?, ?)",[r.idPayment,d,r.paymentOption,r.idOrder]);if(u.affectedRows===0){let c=new Error("Error al insertar los datos del pago en la tabla payment");throw c.statusCode=500,c}for(let c of e){let[s]=await o.query("INSERT INTO order_details (quantity, unit_price, id_order, id_product) VALUES (?, ?, ?, ?)",[c.quantity,c.price,r.idOrder,c.id]);if(s.affectedRows===0){let _=new Error("Error al insertar los detalles del pedido en la tabla order_details");throw _.statusCode=500,_}}await o.commit();let l={...r};return l.productList=e,delete l.idPayment,{success:!0,data:l}}catch(t){throw o&&await o.rollback(),console.error("Error en createOrder en order.model.js",t.message),t}finally{o&&o.release()}}static async deleteOrder({id:e}){let r;try{r=await p.getConnection();let[o]=await r.query("SELECT id_customer, delivery_type FROM order_customer WHERE id_order = ?",[e]);if(o.length===0){let s=new Error(`El pedido "${e}" no existe.`);throw s.statusCode=404,s}let{id_customer:t,delivery_type:a}=o[0];await r.beginTransaction();let[d]=await r.query("DELETE FROM order_details WHERE id_order = ?",[e]);if(d.affectedRows===0){let s=new Error("No se eliminaron los datos de order_details");throw s.statusCode=500,s}let[u]=await r.query("DELETE FROM payment WHERE id_order = ?",[e]);if(u.affectedRows===0){let s=new Error("No se eliminaron los datos de payment");throw s.statusCode=500,s}let[l]=await r.query("DELETE FROM order_customer WHERE id_order = ?",[e]);if(l.affectedRows===0){let s=new Error("No se eliminaron los datos de order");throw s.statusCode=500,s}if(a===w.SHIPPING){let[s]=await r.query("DELETE FROM location WHERE id_customer = ?",[t]);if(s.affectedRows===0){let _=new Error("No se eliminaron los datos de location");throw _.statusCode=500,_}}let[c]=await r.query("DELETE FROM customer WHERE id_customer = ?",[t]);if(c.affectedRows===0){let s=new Error("No se eliminaron los datos de customer");throw s.statusCode=500,s}return await r.commit(),`Se ha eliminado exitosamente el pedido con ID "${e}"`}catch(o){throw r&&await r.rollback(),console.error("Error en deleteOrder en order.model.js",o.message),o}finally{r&&r.release()}}static async deletePendingOrders({hours:e}){try{let[r]=await p.query(`
        SELECT id_order FROM order_customer
        WHERE status = 'pending' AND order_date + INTERVAL ? HOUR <= NOW()
      `,[e]);if(r.length===0)return;for(let o of r)try{await this.deleteOrder({id:o.id_order})}catch(t){console.error("Error eliminando el pedido ID ${order.id_order}. Continuando... ",t.message)}}catch(r){console.error("Error en deletePendingOrder en order.model.js",r.message)}}};import{z as i}from"zod";import pr from"dayjs";var tr=i.enum(Object.values(w)),mr=i.array(i.object({id:i.number().int(),name:i.string().min(1),image:i.string().url(),price:i.number().positive(),quantity:i.number().int().positive().min(1)})),er=i.object({email:i.string().email(),deliveryOption:tr,country:i.string().min(1).refine(n=>n!==D),firstName:i.string().min(1),lastName:i.string().min(1),dni:i.string().regex(/^\d{8}$/),address:i.string().min(1),department:i.string().min(1).refine(n=>n!==D),province:i.string().min(1).refine(n=>n!==D),district:i.string().min(1).refine(n=>n!==D),cellPhone:i.string().regex(/^\d{9}$/),paymentOption:i.string().min(1),idOrder:i.preprocess(()=>crypto.randomUUID(),i.string()),idPayment:i.preprocess(()=>crypto.randomUUID(),i.string()),orderDate:i.preprocess(()=>pr().format("YYYY-MM-DD HH:mm:ss"),i.string())}),v=n=>mr.safeParse(n),U=(n,e)=>{let r=tr.safeParse(e);return r.success?e===w.PICK_UP?er.omit({country:!0,address:!0,department:!0,province:!0,district:!0}).safeParse(n):er.safeParse(n):r};var f=class{static async getOrders(e,r,o){try{let{deliveryOption:t,paymentOption:a}=e.query,d=await E.getOrders({deliveryOption:t,paymentOption:a});r.json(d)}catch(t){console.error("Error en getOrders en order.controller.js",t.message),o(t)}}static async getOrder(e,r,o){try{let{id:t}=e.params,a=await E.getOrder({id:t});r.json(a)}catch(t){console.error("Error en getOrder en order.controller.js",t.message),o(t)}}static async createOrder(e,r,o){try{let{productList:t,checkoutData:a}=e.body,d=v(t),u=U(a,a.deliveryOption);if(!d.success||!u.success){let c=new Error("Error en la Validaci\xF3n de los datos.");throw c.statusCode=400,c}let l=await E.createOrder({productList:d.data,checkoutData:u.data});r.json(l)}catch(t){console.error("Error en createOrder en order.controller.js",t.message),o(t)}}static async deleteOrder(e,r,o){try{let{id:t}=e.params,a=await E.deleteOrder({id:t});r.json({message:a})}catch(t){console.error("Error en deleteOrder en order.controller.js",t.message),o(t)}}},or=async n=>{try{await E.deletePendingOrders({hours:n})}catch(e){console.error("Error en deletePendingOrders en order.controller.js",e.message)}};var N=yr();N.get("/",f.getOrders);N.get("/:id",f.getOrder);N.post("/",f.createOrder);N.delete("/:id",f.deleteOrder);import{Router as wr}from"express";import M from"axios";import Er from"axios";var _r=async()=>{try{return(await Er.get(z)).data.conversion_rates.USD}catch(n){throw console.error("Error al obtener el tipo de cambio",n),n}},ar=(n,e)=>{try{return(n*e).toFixed(2)}catch(r){console.error("",r.message)}},sr=async(n,e)=>{try{let r=await _r(),o=n.map(a=>({name:a.name,unit_amount:{currency_code:"USD",value:ar(a.price,r)},quantity:String(a.quantity)}));e===w.SHIPPING&&o.push({name:"Shipping Cost",unit_amount:{currency_code:"USD",value:ar(q,r)},quantity:String(1)});let t=o.reduce((a,d)=>Number(d.unit_amount.value)*Number(d.quantity)+a,0);return{itemListUSD:o,amountTotalUSD:t.toFixed(2)}}catch(r){console.error("",r.message)}};var j=class{static async updateOrder({idOrder:e,namePaypal:r,emailPaypal:o,productList:t}){let a;try{a=await p.getConnection();let[d]=await a.query("UPDATE order_customer SET status = ? WHERE id_order = ?",[x.PAID,e]);if(d.affectedRows===0){let c=new Error("El pedido ha sido pagado exitosamente, pero no se ha podido actualizar su estado.");throw c.statusCode=500,c}await a.beginTransaction();for(let c of t){let[s]=await a.query("SELECT show_quantity FROM product WHERE id_product = ?",[c.id]),_=s[0].show_quantity-c.quantity,[y]=await a.query("UPDATE product SET show_quantity = ? WHERE id_product = ?",[_,c.id]);if(y.affectedRows===0){let S=new Error(`Error al actualizar la nueva cantidad a mostrar del producto "${c.name}"`);throw S.statusCode=500,S}}await a.commit();let[u]=await a.query("SELECT id_customer FROM order_customer WHERE id_order = ?",[e]);if(u.length===0){let c=new Error("No se encontr\xF3 un id_customer asociado a este id_order");throw c.statusCode=404,c}let[l]=await a.query("UPDATE customer SET name_paypal = ?, email_paypal = ? WHERE id_customer = ?",[r,o,u[0].id_customer]);if(l.affectedRows===0){let c=new Error("El pedido ha sido pagado exitosamente, pero no se ha podido actualizar name_paypal ni email_paypal.");throw c.statusCode=500,c}return"Se actualizaron correctamos los datos del pedido"}catch(d){throw a&&await a.rollback(),console.error("Error en updateOrder en payment.model.js",d.message),d}finally{a&&a.release()}}};var R=class{static async createOrder(e,r,o){let{productList:t,checkoutData:a}=e.body;try{let d=v(t),u=U(a,a.deliveryOption);if(!d.success||!u.success){let F=new Error("Error en la Validaci\xF3n de los datos.");throw F.statusCode=400,F}let{data:l}=await E.createOrder({productList:d.data,checkoutData:u.data}),{itemListUSD:c,amountTotalUSD:s}=await sr(t,a.deliveryOption),_={intent:"CAPTURE",purchase_units:[{reference_id:l.idOrder,amount:{currency_code:"USD",value:s,breakdown:{item_total:{currency_code:"USD",value:s}}},items:c}],payment_source:{paypal:{experience_context:{brand_name:"Mi Tienda",landing_page:"NO_PREFERENCE",user_action:"PAY_NOW",return_url:`${I}/payment/capture-order`,cancel_url:`${I}/payment/cancel-order?idOrder=${l.idOrder}`}}}},y=new URLSearchParams;y.append("grant_type","client_credentials");let{data:{access_token:S}}=await M.post(`${L}/v1/oauth2/token`,y,{auth:{username:W,password:Y}}),cr=await M.post(`${L}/v2/checkout/orders`,_,{headers:{Authorization:`Bearer ${S}`}});r.json(cr.data)}catch(d){console.error("",d),o(d)}}static async captureOrder(e,r,o){try{let{token:t}=e.query,a=await M.post(`${L}/v2/checkout/orders/${t}/capture`,{},{auth:{username:W,password:Y}}),d=a.data.purchase_units[0].reference_id,u=`${a.data.payer.name.given_name} ${a.data.payer.name.surname}`,l=a.data.payer.email_address,c=await E.getOrder({id:d}),{data:{productList:s}}=c;await j.updateOrder({idOrder:d,namePaypal:u,emailPaypal:l,productList:s}),r.redirect(`${B}/order-completion?idOrder=${d}`)}catch(t){console.error("Error en captureOrder en payment.controller.js",t.message),o(t)}}static async cancelOrder(e,r,o){try{let{idOrder:t}=e.query;await E.deleteOrder({id:t}),r.redirect("http://localhost:5173/checkout")}catch(t){console.error("Error en cancelOrder en payment.controller.js",t.message),o(t)}}};var T=wr();T.get("/",(n,e,r)=>{e.status(200).json({message:`Est\xE1s en ${n.originalUrl}`})});T.post("/create-order",R.createOrder);T.get("/capture-order",R.captureOrder);T.get("/cancel-order",R.cancelOrder);import{Router as Pr}from"express";var A=class{static async getProducts({}){try{let[e]=await p.query(`
          SELECT id_product AS id, show_quantity AS showQuantity, pw.name, price, description, image, c.name AS category
          FROM product p
          INNER JOIN product_warehouse pw ON p.id_product_warehouse = pw.id_product_warehouse
          INNER JOIN category c ON pw.id_category = c.id_category
        `);return e}catch(e){throw console.error("Error en getProducts en product.model.js",e.message),e}}static async getProduct({}){try{}catch(e){throw console.error("Error en getProduct en product.model.js",e.message),e}}static async getProductShowQuantity({id:e}){try{let[r]=await p.query("SELECT show_quantity FROM product WHERE id_product = ?",[e]);return{showQuantity:r[0].show_quantity}}catch(r){throw console.error("Error en getProductShowQuantity en product.model.js",r.message),r}}static async createProduct({productData:e}){let r;try{r=await p.getConnection();let{showQuantity:o,idProductWarehouse:t}=e,[a]=await r.query("SELECT quantity FROM product_warehouse WHERE id_product_warehouse = ?",[t]);if(a.length===0){let s=new Error(`El idProductWarehouse: ${t} no existe.`);throw s.statusCode=404,s}let d=a[0].quantity,u=d-o;if(u<0){let s=new Error(`La cantidad deseada "${o}" del producto a mostrar supera la a la cantidad disponible "${d}" en el almac\xE9n.`);throw s.statusCode=422,s}await r.beginTransaction();let[l]=await r.query("INSERT INTO product (show_quantity, id_product_warehouse) VALUES (?, ?)",[o,t]);if(l.affectedRows===0){let s=new Error("Error al insertar un producto en la tabla product");throw s.statusCode=500,s}let[c]=await r.query("UPDATE product_warehouse SET quantity = ? WHERE id_product_warehouse = ?",[u,t]);if(c.affectedRows===0){let s=new Error("Error al actualizar el quantity de la Tabla product_warehouse");throw s.statusCode=500,s}return await r.commit(),`El producto ${t} del almac\xE9n se insert\xF3 exitosamente en la Tabla product.`}catch(o){throw r&&await r.rollback(),console.error("Error en createProduct en product.model.js",o.message),o}finally{r&&r.release()}}static async partiallyUpdateProduct({}){try{}catch(e){throw console.error("Error en partiallyUpdateProduct en product.model.js",e.message),e}}static async fullyUpdateProduct({}){try{}catch(e){throw console.error("Erro en fullyUpdateProduct en product.model.js",e.message),e}}static async deleteProduct({}){try{}catch(e){throw console.error("Erro en deleteProduct en product.model.js",e.message),e}}};var P=class{static async getProducts(e,r,o){try{let t=await A.getProducts({});r.status(200).json(t)}catch(t){console.error("Error en getProducts en product.controller.js",t.message),o(t)}}static async getProduct(e,r,o){try{}catch(t){console.error("Error en getProduct en product.controller.js"),t.message,o(t)}}static async getProductShowQuantity(e,r,o){try{let{id:t}=e.params,a=await A.getProductShowQuantity({id:t});r.json(a)}catch(t){console.error("Error en getProductShowQuantity en product.controller.js",t.message),o(t)}}static async createProduct(e,r,o){try{let t=e.body,a=await A.createProduct({productData:t});r.json({message:a})}catch(t){console.error("Error en createProduct en product.controller.js",t),o(t)}}static async partiallyUpdateProduct(e,r,o){try{}catch(t){console.error("Error en partiallyUpdateProduct en product.controller.js",t.message),o(t)}}static async fullyUpdateProduct(e,r,o){try{}catch(t){console.error("Erro en fullyUpdateProduct en product.controller.js",t.message)}}static async deleteProduct(e,r,o){try{}catch(t){console.error("Erro en deleteProduct en product.controller.js",t.message)}}};var h=Pr();h.get("/",P.getProducts);h.get("/:id",P.getProduct);h.get("/show-quantity/:id",P.getProductShowQuantity);h.post("/",P.createProduct);h.patch("/:id",P.partiallyUpdateProduct);h.put("/:id",P.fullyUpdateProduct);h.delete("/:id",P.deleteProduct);import{Router as hr}from"express";var C=class{static async getProducts({}){try{let[e]=await p.query("SELECT * FROM product_warehouse");return e}catch(e){throw console.error("Error en getProducts en productWarehouse.model.js",e.message),e}}static async getProduct({}){try{}catch(e){throw console.error("Error en getProduct en productWarehouse.model.js"),e.message,e}}static async createProduct({productData:e}){try{let{name:r,price:o,description:t,idCategory:a,image:d,quantity:u}=e,[l]=await p.query("SELECT id_category FROM category WHERE id_category = ?",[a]);if(l.length===0){let s=new Error(`El ${a} no existe.`);throw s.statusCode=404,s}let c=await p.query("INSERT INTO product_warehouse (name, price, description, id_category, image, quantity) VALUES (?, ?, ?, ?, ?, ?)",[r,o,t,a,d,u]);if(c[0].affectedRows===0){let s=new Error("Error al realizar la inserci\xF3n del producto.");throw s.statusCode=500,s}return{message:"Producto insertado en el almac\xE9n",dataInsert:c}}catch(r){throw console.error("Error en createProduct en productWarehouse.model.js",r.message),r}}static async partiallyUpdateProduct({}){try{}catch(e){throw console.error("Error en partiallyUpdateProduct en productWarehouse.model.js",e.message),e}}static async fullyUpdateProduct({}){try{}catch(e){throw console.error("Erro en fullyUpdateProduct en productWarehouse.model.js",e.message),e}}static async deleteProduct({}){try{}catch(e){throw console.error("Erro en deleteProduct en productWarehouse.model.js",e.message),e}}};var g=class{static async getProducts(e,r,o){try{let t=await C.getProducts({});r.status(200).json(t)}catch(t){console.error("Error en getProducts en productWarehouse.controller.js",t.message),o(t)}}static async getProduct(e,r,o){try{}catch(t){console.error("Error en getProduct en productWarehouse.controller.js"),t.message}}static async createProduct(e,r,o){try{let t=e.body,a=await C.createProduct({productData:t});r.json(a)}catch(t){console.error("Error en createProduct en productWarehouse.controller.js",t),o(t)}}static async partiallyUpdateProduct(e,r,o){try{}catch(t){console.error("Error en partiallyUpdateProduct en productWarehouse.controller.js",t.message),o(t)}}static async fullyUpdateProduct(e,r,o){try{}catch(t){console.error("Erro en fullyUpdateProduct en productWarehouse.controller.js",t.message)}}static async deleteProduct(e,r,o){try{}catch(t){console.error("Erro en deleteProduct en productWarehouse.controller.js",t.message)}}};var O=hr();O.get("/",g.getProducts);O.get("/:id",g.getProduct);O.post("/",g.createProduct);O.patch("/:id",g.partiallyUpdateProduct);O.put("/:id",g.fullyUpdateProduct);O.delete("/:id",g.deleteProduct);import Sr from"node:path";import Nr from"dayjs";var m=$();m.disable("x-powered-by");m.use(gr({origin:X}));m.use(Or("dev"));m.use($.json());m.use($.static(Sr.resolve("src","public")));m.get("/",(n,e,r)=>{e.json({message:`Hola, est\xE1s en ${n.url}`})});m.use("/order",N);m.use("/product",h);m.use("/product-warehouse",O);m.use("/payment",T);m.use((n,e)=>{e.status(404).json({message:"Error 404 Not Found"})});fr.schedule("0 * * * *",async()=>{try{await or(24),console.log("Se termin\xF3 de ejecutar deletePendingOrders a las:",Nr().format("YYYY-MM-DD HH:mm:ss"))}catch(n){console.error("Error en la tarea programada deletePendingOrders:",n.message)}});m.use(k);m.listen(H,()=>{console.log(`Servidor ejecut\xE1ndose en ${I}`)});