DROP DATABASE IF EXISTS style_hub;

CREATE DATABASE style_hub;

USE style_hub;

CREATE TABLE customer (
	id_customer INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dni CHAR(8) NOT NULL,
    cell_phone CHAR(9) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name_paypal VARCHAR(255),
    email_paypal VARCHAR(255)
);

CREATE TABLE location (
	id_location INT AUTO_INCREMENT PRIMARY KEY,
    address TEXT NOT NULL,
    district VARCHAR(45) NOT NULL,
    province VARCHAR(45) NOT NULL,
    department VARCHAR(45) NOT NULL,
    country VARCHAR(45) NOT NULL,
    id_customer INT NOT NULL UNIQUE
);

CREATE TABLE order_customer (
	id_order CHAR(36) PRIMARY KEY,
    order_date DATETIME NOT NULL,
    status ENUM("pending", "paid", "canceled") NOT NULL,
    delivery_type VARCHAR(50) NOT NULL,
    id_customer INT NOT NULL UNIQUE
);

CREATE TABLE payment (
	id_payment VARCHAR(36) PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    -- status
    payment_type VARCHAR(50) NOT NULL,
    id_order VARCHAR(36) NOT NULL UNIQUE
);

CREATE TABLE order_details (
	id_order_details INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    id_order VARCHAR(36) NOT NULL,
    id_product INT NOT NULL
);

CREATE TABLE product (
	id_product INT AUTO_INCREMENT PRIMARY KEY,
    show_quantity INT NOT NULL,
    id_product_warehouse INT NOT NULL UNIQUE
);

CREATE TABLE product_warehouse (
	id_product_warehouse INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    id_category INT NOT NULL
);

CREATE TABLE category (
	id_category INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

ALTER TABLE location
ADD CONSTRAINT fk_location_id_customer
FOREIGN KEY (id_customer) REFERENCES customer(id_customer); 

ALTER TABLE order_customer
ADD CONSTRAINT fk_order_customer_id_customer
FOREIGN KEY (id_customer) REFERENCES customer(id_customer);

ALTER TABLE payment
ADD CONSTRAINT fk_payment_id_order
FOREIGN KEY (id_order) REFERENCES order_customer(id_order);

ALTER TABLE order_details
ADD CONSTRAINT fk_order_details_id_order
FOREIGN KEY (id_order) REFERENCES order_customer(id_order);

ALTER TABLE order_details
ADD CONSTRAINT fk_order_details_id_product
FOREIGN KEY (id_product) REFERENCES product(id_product);

ALTER TABLE product
ADD CONSTRAINT fk_product_id_product_warehouse
FOREIGN KEY (id_product_warehouse) REFERENCES product_warehouse(id_product_warehouse);

ALTER TABLE product_warehouse
ADD CONSTRAINT fk_product_warehouse_id_category
FOREIGN KEY (id_category) REFERENCES category(id_category);

-- INSERTANDO DATOS EN category
INSERT INTO category (name) VALUES ("electronics"), ("jewelery"), ("men's clothing"), ("women's clothing");

-- INSERTANDO DATOS EN product_warehouse
INSERT INTO product_warehouse (name, price, description, id_category, image, quantity) VALUES
('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 3, 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 120),
('Mens Casual Premium Slim Fit T-Shirts', 22.3, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.', 3, 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 259),
('Mens Cotton Jacket', 55.99, 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.', 3, 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 500),
('Mens Casual Slim Fit', 15.99, 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 3, 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 430),
('John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695, 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean''s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.', 2, 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', 400),
('Solid Gold Petite Micropave', 168, 'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.', 2, 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 70),
('White Gold Plated Princess', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine''s Day...', 2, 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', 400),
('Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel', 2, 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 100),
('WD 2TB Elements Portable External Hard Drive - USB 3.0', 64, 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system', 1, 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', 203),
('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109, 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)', 1, 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', 470),
('Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109, '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.', 1, 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg', 319),
('WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114, 'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer''s limited warranty', 1, 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg', 400),
('Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', 599, '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz', 1, 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', 250),
('Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED', 999.99, '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag', 1, 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', 140),
('BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 56.99, 'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates', 4, 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', 235),
('Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket', 29.95, '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON', 4, 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg', 340),
('Rain Jacket Women Windbreaker Striped Climbing Raincoats', 39.99, 'Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully striped Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn''t overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.', 4, 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', 200),
('MBJ Women''s Solid Short Sleeve Boat Neck V', 9.85, '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort / Ribbed on sleeves and neckline / Double stitching on bottom hem', 4, 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg', 180),
('Opna Women''s Short Sleeve Moisture', 7.95, '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away', 4, 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', 200),
('DANVOUY Womens T Shirt Casual Cotton Short', 12.99, '95%Cotton,5%Spandex, Features Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees The fabric is soft and has some stretch. Casual and loose, comfortable wear.', 4, 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg', 200);

-- INSERTAR DATOS EN LA TABLA product
INSERT INTO product (show_quantity, id_product_warehouse) VALUES
(57, 1),
(127, 2),
(250, 3),
(215, 4),
(200, 5),
(35, 6),
(200, 7),
(50, 8),
(101, 9),
(235, 10),
(160, 11),
(200, 12),
(125, 13),
(70, 14),
(117, 15),
(170, 16),
(100, 17),
(90, 18),
(100, 19),
(100, 20);



