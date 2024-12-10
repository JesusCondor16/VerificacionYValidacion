## ⚙️Preparación del entorno

Clonamos el repositorio mediante el siguiente comando:

`git clone https://github.com/JesusCondor16/VerificacionYValidacion.git`

> [!IMPORTANT]
> Debes tener instalado git en tu sistema

Prepararemos el entorno mediante la instalación de las librerías para el backend y frontend.

> [!NOTE]
> Al usarse _node_ podemos instalar las librerías definidas en el `package.json` con el propio node package manager (npm)

Ejecutamos `npm install` en el directorio del backend y también del frontend para instalar las librerías necesarias.

**Frontend**

```sh
cd proyecto-tienda-stylehub
npm install
```

**Backend**

```sh
cd style-hub-backend
npm install
```

## 🔨Construcción Automática

Para la construcción del proyecto utilizaremos el empaquetador [esbuild🪧](https://esbuild.github.io/).

#### Construcción del Backend

El comando para realizar la construcción se encontrará ya configurado en el `package.json`, el cual ejecuta un archivo `esbuild.js` que tiene las configuraciones necesarias que se utilizarán en la construcción.

**📄 Package.json:**

```js
{
  ...
  "scripts": {
    ...,
    "build": "node esbuild.js"
  },
  ...
}
```

**📄 esbuild.js:**

```js
esbuild.js:
{
    entryPoints: [resolve(process.cwd(), 'index.js')],
    bundle: true,
    platform: 'node',
    target: 'node23',
    format: 'esm',
    packages: 'external',
    outfile: resolve(process.cwd(), 'dist/bundle.js'),
    minify: true,
    metafile: true,
}
```

Ejecutamos el comando `npm run build` para ejecutar la construcción. En la terminal observaremos un output similar al siguiente:

```text
Build successful!

Analysis:

  dist/bundle.js                                     22.9kb  100.0%
   ├ src/models/order.model.js                        8.2kb   35.9%
   ├ src/models/product.model.js                      2.4kb   10.6%
   ├ src/controllers/payment.controller.js            1.8kb    7.9%
   ├ src/models/productWarehouse.model.js             1.4kb    6.3%
   ├ src/models/payment.model.js                      1.4kb    6.2%
   ├ src/controllers/order.controller.js              1.1kb    4.9%
   ├ src/controllers/product.controller.js            1.1kb    4.8%
   ├ src/util/validations/orderValidations.js         1.0kb    4.4%
   ├ src/controllers/productWarehouse.controller.js   949b     4.1%
   ├ index.js                                         819b     3.5%
   ├ src/util/convertPENtoUSD.js                      667b     2.8%
   ├ src/config/config.js                             429b     1.8%
   ├ src/config/db.js                                 321b     1.4%
   ├ src/routes/product.routes.js                     287b     1.2%
   ├ src/routes/payment.routes.js                     242b     1.0%
   ├ src/routes/productWarehouse.routes.js            234b     1.0%
   ├ src/util/constants.js                            207b     0.9%
   ├ src/routes/order.routes.js                       150b     0.6%
   ├ src/util/errorHandler.js                         113b     0.5%
   └ src/util/logic.js                                 49b     0.2%
```

Con esto tendriamos el archivo listo en la ruta `dist/bundle.js`.

#### Construcción del Frontend

Para el frontend será más sencillo ya que en el proyecto se está empleando [vite⚡](https://vite.dev/), el cual utiliza [esbuild🪧](https://esbuild.github.io/) por detrás.

**📄 Package.json:**

```
{
    ...
    "scripts": {
        "dev": "vite",
        "test": "vitest",
        "build": "vite build",
        "preview": "vite preview"
    },
    ...
}
```

Solamente tendremos que ejecutar el comando `npm run build`, el cual nos mostrará un output similar al siguiente:

```sh
vite v5.4.11 building for production...
✓ 171 modules transformed.
dist/assets/favicon-Buox2Dog.ico                     0.51 kB
dist/index.html                                      2.03 kB │ gzip:   0.62 kB
dist/assets/complaints-book-DyilRhB5.png            24.04 kB
dist/assets/logo-CymwLGOz.png                       29.20 kB
dist/assets/backgroundElectronics-B1SnOJ_t.png      29.99 kB
dist/assets/backgroundMens-DpBN1buu.png             52.45 kB
dist/assets/backgroundJewelry-D1J-NPPn.png          52.67 kB
dist/assets/backgroundWomens-BMLKNt1X.png           75.78 kB
dist/assets/categoryWomensClothing-CfPKvLSG.png    678.61 kB
dist/assets/categoryMensClothing-CYwf0-hx.png      720.89 kB
dist/assets/categoryJewelry-iWU5TLOc.png           809.83 kB
dist/assets/categoryElectronics-upTO2q7f.png       864.76 kB
dist/assets/carouselElectronics-Dksry9h2.png     2,107.78 kB
dist/assets/imagePoster-B0eMC5AF.png             2,218.52 kB
dist/assets/carouselMensClothing-DwEsXdPA.png    2,309.54 kB
dist/assets/carouselJewelry-BTYwQrFB.png         2,344.40 kB
dist/assets/carouselWomensClothing-FI074qA2.png  3,263.51 kB
dist/assets/index-B_4DQmjs.css                      30.09 kB │ gzip:   5.60 kB
dist/assets/index-BVLu7UZM.js                      383.85 kB │ gzip: 119.69 kB
✓ built in 16.07s
```

Con esto habríamos terminado con la construcción del proyecto.

```sh
pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git (
                    url: 'https://github.com/JesusCondor16/VerificacionYValidacion.git',
                    branch: "SantiagoCumpa",
                    changelog: true,
                    poll: true
                )
            }

        }
        stage('Prepare Backend Environment'){
            steps {
                dir("style-hub-backend"){
                    bat "npm install"
                    bat "npm build"
                }
            }
        }
        stage('Prepare Frontend Environment'){
            steps {
                dir("proyecto-tienda-stylehub"){
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }
    }
}

```
## Pruebas Unitarias
Las pruebas unitarias implementadas a la aplicación para verificar el correcto funcionamiento de las rutas y controladores.

## Tecnologías Utilizadas
+ Jest: Framework para pruebas de JavaScript.
+ Supertest: Librería para realizar solicitudes HTTP y probar endpoints de aplicaciones.

### Ruta: /order
Verifica que el endpoint devuelva una lista de órdenes.
```
test("GET /order - Debería devolver una lista de órdenes (puede estar vacía)", async () => {
  const response = await request(app).get("/order");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true); // Verifica que devuelve un array
});
```

### Ruta: /order/:id
Verifica que el endpoint devuelva los datos de una orden específica.
Si la orden no existe, debería devolver un código de estado 404.
```
test("GET /order/:id - Debería devolver una orden específica", async () => {
  const response = await request(app).get("/order/2a1b8305-1a98-4546-ac59-30bd4ad3e948");

  if (response.status === 200) {
    expect(response.body).toHaveProperty("success", true);
  } else {
    expect(response.status).toBe(404);
  }
});

```

### Ruta /product
Verifica que el endpoint devuelva una lista de productos.
Si la orden no existe, debería devolver un código de estado 404.
```
test("GET /product - Debería devolver una lista con productos", async () => {
  const response = await request(app).get("/product");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true); // Verifica que devuelve un array
});

```

## Analisis de SonarQube

SonarQube es una herramienta que nos ayuda a poder analizar el código fuente e identificar problemas relacionados a seguridad y/o buenas practicas de codificación.


### Objetivo

Garantizar que:

+ Calidad de codigo: En lo que respecta fiabilidad, mantenibilidad y seguridad.

+ Conformidad con estándares.

+ Prevención de problemas a largo plazo .

### Instalación

* Java instalado: Se puede usar desde el Java version 17. Para comprobar si java esta instalado se puede usar el comando "java -version" en una terminal.

* Google Chrome: Instalado y actualizado.

* Sonarqube: Se debe descargar e instalar en la computadora. 

## Resultados 

| **Metrica Evaluada**                   | **Descripción**                                                                                              | **Resultado **         | 
| -------------------------------------  | ------------------------------------------------------------------------------------------------------------ | ---------------------- | 
| **Seguridad**                          | Identifica errores potenciales que podrían causar fallos en la ejecución, mejorando la estabilidad.          |  0                     | 
| **Fiabilidad**                         |  Analiza la complejidad del código para facilitar futuras modificaciones y correcciones.                     |  91                    | 
| **Mantenimiento**                      |  Mide la facilidad con la que el código puede ser actualizado o corregido.                                   | 1.1 k                  | 
| **Hostpost revisado**                  | Marca áreas críticas que necesitan revisión manual por posibles riesgos de seguridad.                        | 0.0%                   | 
| **Cobertura**                          | Mide el porcentaje de código evaluado por pruebas, asegurando su correcto funcionamiento.                    | 0.0%                   |
| **Duplicación**                        | Detecta fragmentos de código repetido, ayudando a reducir redundancia y mejorar la calidad.                  | 15.8%                  |


### Ejemplo de recibo generado tras la prueba automatizada:
![image](https://github.com/JesusCondor16/VerificacionYValidacion/blob/65fff934f7363d34450ee3962979dbe7fa414359/Analisis%20SonarQube.jpg)

## Pipeline

pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQube Scanner' // Nombre de la herramienta configurada en Jenkins
    }

    stages {
        stage('Clonar Proyecto') {
            steps {
                git branch: 'main', url: 'https://github.com/JesusCondor16/VerificacionYValidacion'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                bat """
                "%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.token=sqp_e8745cd3a94c801d500c6a31e85fd0cc5b5a8ce3 ^
                -Dsonar.projectKey=stylehub ^
                -Dsonar.projectName=stylehub ^
                -Dsonar.sources=. ^
                -Dsonar.exclusions=/node_modules/,/build/** ^
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov-report/index.html ^
                -Dsonar.html.sourceDirs=src ^
                -Dsonar.css.sourceDirs=src ^
                -Dsonar.javascript.sourceDirs=src
                """
            }
        }
    }
}



## Pruebas Funcionales

Este documento explica paso a paso cómo ejecutar un test funcional utilizando Selenium WebDriver en Node.js. Además, se proporciona una tabla de verificación para documentar el estado de las funcionalidades probadas.

### Descripción del Test

El test funcional PFCompras.spec.cjs tiene como objetivo validar las interacciones principales de un usuario con la plataforma web de la tienda, desde la navegación inicial hasta la finalización de una compra exitosa. Este test asegura que los elementos clave de la interfaz funcionen según lo esperado.

### Pasos de Prueba

1. Navegar a la página principal del sitio web.
2. Añadir múltiples productos de diferentes categorías al carrito de compras.
3. Completar el formulario de compra con datos válidos.
4. Confirmar la compra.
5. Verificar la redirección a la página de confirmación de compra.
6. Validar que se muestren errores adecuados al ingresar datos inválidos en el formulario.

### Objetivo

Garantizar que:

+ La funcionalidad de navegación, selección de productos, y finalización de la compra está operativa.

+ Los errores se manejan correctamente en caso de entradas no válidas.

+ La experiencia del usuario es consistente y sin interrupciones.

### Instalación

* Node.js instalado: Asegúrate de tener Node.js instalado en tu máquina. Puedes verificarlo con el comando node -v.

* Google Chrome: Instalado y actualizado.

* Chromedriver: Debe ser compatible con tu versión de Chrome.

* Selenium WebDriver: Instalado como una dependencia en tu proyecto.

### Resumen de las Pruebas Funcionales

| **Función Probada**                   | **Descripción**                                                                                              | **Resultado Esperado**                                                                                       | **CHECK** |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | --------- |
| **Navegación a la página principal**         | Verifica que la aplicación carga correctamente la página principal. | Los datos enviados deben coincidir con la estructura esperada y ser recibidos correctamente por el servidor. | ✔️        |
| **Selección de productos**               | Asegura que se puede agregar productos al carrito.                                    | Muestra los productos en el carrito                                                          | ✔️        |
| **Rellenar formulario de compra**                 | Al finalizar de seleccionar los productos debe rellenar los campos de un formulario                                                 | El formulario carga correctamente y muestra en pantalla los productos del carrito.                         | ✔️  
| **Validación de campos obligatorios** | Verifica que todos los campos obligatorios estén llenos antes de permitir el envío del formulario.           | Muestra un modal de error si algún campo obligatorio está vacío.                                             | ✔️        |
| **Recibo de compra** | Al completar el formulario se debe mostrar en pantalla un recibo de compra.           | El recibo se carga correctamente en pantalla mostrando la información de la compra realizada.                                             | ✔️        |

### Selenium IDE:
![image](https://github.com/user-attachments/assets/21199f30-6454-41b4-b41d-ea852b025636)

### Ejemplo de recibo generado tras la prueba automatizada:
![image](https://github.com/user-attachments/assets/117fdb48-e595-4c27-a191-0f5bf35b633b)


### Pipeline script:

    pipeline {
      agent any

      environment {
          NODEJS_HOME = '/usr/local/bin/node' // Cambia según tu instalación de Node.js
      }

      stages {
          stage('Checkout') {
              steps {
                  script {
                      // Clona desde un repositorio o accede directamente al directorio
                      dir('INGRESA AQUI LA DIREECIÓN DEL PROYECTO') {
                          echo 'Using project from local directory...'
                      }
                  }
              }
          }
          stage('Run Tests') {
              steps {
                  script {
                       bat "node ${env.TEST_PATH}\\pbCompras.spec.cjs"
                      }
                  }
              }
          }
      }

      post {
          always {
              echo 'Pipeline finished.'
          }
          success {
              echo 'Tests passed!'
          }
          failure {
              echo 'Tests failed.'
          }
      }
    }

En caso de realizar todo correctamente en "Stages" de Jenkins se debería visualizar lo siguiente:

![Imagen de WhatsApp 2024-11-30 a las 21 46 47_0bf42be7](https://github.com/user-attachments/assets/2caeb564-edc7-4f29-902d-5db7071c0d1e)

## Pruebas de Rendimiento

El objetivo principal de Apache JMeter es realizar pruebas de rendimiento y carga en aplicaciones web y otros servicios. Es una herramienta de código abierto diseñada para evaluar y medir el rendimiento, la capacidad de respuesta y la estabilidad de las aplicaciones bajo diferentes cargas de usuarios.
##Informe de Pruebas de Carga con JMeter
El presente informe detalla los resultados y configuraciones obtenidos durante las pruebas de rendimiento realizadas con JMeter sobre tres escenarios funcionales del sistema bajo prueba (SUT). A continuación, se describe cada caso evaluado, así como su porcentaje de participación en la carga total.

| Escenario              | URL                | Usuarios | Ramp-Up | Ciclos | Total Solicitudes | Duración Aceptable | % Carga Total |
| ---------------------- | ------------------ | -------- | ------- | ------ | ----------------- | ------------------ | ------------- |
| Ver Producto           | /product/{id}      | 200      | 20s     | 2      | 400               | 1s                 | 56.76%        |
| Crear Producto Almacen | /product-warehouse | 5        | 1s      | 2      | 10                | 2s                 | 1.42%         |
| Crear Orden            | /order             | 150      | 10s     | 3      | 450               | 3s                 | 63.82%        |
| TOTAL                  | -                  | 355      | -       | -      | -                 | 860                | 100%          |

## Errores Generales:

![image](https://github.com/user-attachments/assets/a767e1ca-13ed-4591-8ce0-8ea2415c85f5)

El porcentaje global de errores (1.98%) está dentro de un rango aceptable, aunque el escenario CrearProductoAlmacen requiere atención debido a su tasa elevada de 10%.
Cumplimiento de Tiempos:
El escenario CrearOrden tiene los mayores tiempos de respuesta (promedio de 5.91 ms) y el mayor número de incidentes superando límites, indicando una posible optimización necesaria en este proceso.

## Resultados

El grupo ha analizado los resultados obtenidos con una carga de 860 usuarios, donde se presentó una tasa de fallos del 1.98%, equivalente a 17 fallos en total. Si bien estos resultados son aceptables para esta cantidad de usuarios, hemos considerado que si se aumentara el número de usuarios a 1200, el número de fallos podría aumentar proporcionalmente, alcanzando aproximadamente 24 fallos, lo que representaría un incremento de 7 fallos adicionales.
Aunque los resultados actuales son adecuados para esta cantidad de usuarios, recomendamos realizar más pruebas en el futuro si se considera necesario escalar la carga o si se identifican problemas de rendimiento adicionales. Esto permitirá asegurar que la infraestructura siga siendo capaz de manejar mayores volúmenes de tráfico sin afectar la calidad del servicio.

![image](https://github.com/user-attachments/assets/63a92b7b-bb27-43a4-9ac5-304a47f29faf)

Pipeline script:

    pipeline {
        agent any
        stages {
            stage('Preparar entorno') {
                steps {
                    script {
                        // Crear las carpetas en el workspace de Jenkins
                        echo "Creando carpetas en el workspace..."
                        bat '''
                            if not exist "%WORKSPACE%\\JmeterCodigo" mkdir "%WORKSPACE%\\JmeterCodigo"
                            if not exist "%WORKSPACE%\\Prueba01" mkdir "%WORKSPACE%\\Prueba01"
                            if not exist "%WORKSPACE%\\Prueba01\\html-report" mkdir "%WORKSPACE%\\Prueba01\\html-report"
                        '''
                        // Verificar que JMeter está instalado correctamente
                        echo "Verificando instalación de JMeter..."
                        bat "jmeter -v"  // Usar bat en lugar de sh en Windows
                    }
                }
            }
            stage('Ejecutar prueba JMeter') {
                steps {
                    script {
                        // Ejecutar JMeter en modo no gráfico con las rutas absolutas de los archivos .jmx y los resultados
                        echo "Ejecutando prueba JMeter..."
                        bat '''
                        jmeter -n -t "%WORKSPACE%\\JmeterCodigo\\Test-Plan-Style-hub.jmx" -l "%WORKSPACE%\\Prueba01\\logs.jtl" -e -o "%WORKSPACE%\\Prueba01\\html-report"
                        '''
                    }
                }
            }
        }
    }

Se debe agregar la direccion del jmeter/bin en variables de entorno para que el jenkis pueda ejecutarlo.
El script creara carpetas en el workspace de jenkis donde en JmeterCodigo estara el archivo de jmter para ejecutarlo y en Prueba01 se guardara los logs y el html del resultado de la prueba:

![image](https://github.com/user-attachments/assets/36393749-1b74-424c-8be1-699a6fe41d5a)




## Pruebas De seguridad

El propósito del análisis fue identificar vulnerabilidades de seguridad en la configuración y en las respuestas de los servidores, con el objetivo de fortalecer las defensas contra posibles ataques.
Sitios

Pipeline script
pipeline {
agent any
stages {
stage('Start ZAP') {
steps {
dir("C:/Zap/Zed Attack Proxy") {
bat '''
.\\zap.bat -port 8084 -cmd -quickurl http://localhost:5173/ -quickout ./report.html -quickprogress
'''
}
}
}
}
}

![alt text](image.png)
ejecución:
![alt text](image-1.png)
Informe: report.html
Se incluyeron los siguientes sitios:

http://localhost:5173

Niveles de riesgo
Incluido: Alto, Medio, Bajo, Informativo

Excluido: Ninguno

Niveles de confianza
Incluido: Confirmado por Usuario, Alta, Media, Baja

Excluido: Confirmado por Usuario, Alta, Media, Baja, Falso positivo

Resúmenes
Recuentos de alertas por riesgo y confianza
Esta tabla muestra el número de alertas para cada nivel de riesgo y confianza incluido en el informe.

(Los porcentajes entre paréntesis representan el recuento como un porcentaje del número total de alertas incluidas en el informe, redondeado a un decimal).

                                                                        Confianza
                            Confirmado por Usuario	        Alta	                Medio	            Baja California     	Total
    	Contralto	        0 (0,0 %)                    0 (0,0 %)                  0 (0,0 %)	        1 (11,1 %)	         1 (11,1 %)
        Medio               0 (0,0 %)                    1 (11,1 %)                 2 (22,2 %)	        0 (0,0 %)	         3 (33,3 %)

Riesgo Bajo 0 (0,0 %) 0 (0,0 %) 2 (22,2 %) 1 (11,1 %) 3 (33,3 %)
Informativo 0 (0,0 %) 0 (0,0 %) 1 (11,1 %) 1 (11,1 %) 2 (22,2 %)
Total 0 (0,0 %) 1 (11,1 %) 5 (55,6 %) 3 (33,3 %) 9 (100%)

Recuentos de alertas por sitio y riesgo
Esta tabla muestra, para cada sitio para el que se generaron una o más alertas, el número de alertas generadas en cada nivel de riesgo.

Las alertas con un nivel de confianza de "falsos positivos" se han excluido de estos recuentos.

(Los números entre paréntesis son el número de alertas generadas para el sitio en o por encima de ese nivel de riesgo).

Riesgo
Alto
Alto(= Alto) Medio(>= Medio) Bajo(>= Bajo) Informativo(>= Informativo)
Sitio http://localhost:5173
1 (1) 3 (4) 3 (7) 2 (9)

Recuentos de alertas por tipo de alerta
Esta tabla muestra el número de alertas de cada tipo de alerta, junto con el nivel de riesgo del tipo de alerta.

(Los porcentajes entre paréntesis representan cada recuento como un porcentaje, redondeado a un decimal, del número total de alertas incluidas en este informe).

                    Tipo de alerta	                                       Riesgo 	Contar

Metadatos de la Nube Potencialmente Expuestos Contralto 1 (11,1 %)
Política de Seguridad de Contenidos (CSP) de Cabecera no configurada Medio 5 (55,6 %)
Configuración Incorrecta Cross-Domain Medio 119(1.322,2 %)
Falta de cabecera Anti-Clickjacking Medio 5 (55,6 %)
Divulgación de Marcas de Tiempo - Unix Bajo 1 (11,1 %)
Falta encabezado X-Content-Type-Options Bajo 120(1.333,3 %)
Revelación de IP privada Bajo 4 (44,4 %)
Aplicación Web Moderna Informativo 5 (55,6 %)
Divulgación de información - Comentarios sospechosos Informativo 115(1.277,8 %)
Total 9

Alertas
Riesgo = Alto, Confianza = Baja (1)
http://localhost:5173 (1)
Metadatos de la Nube Potencialmente Expuestos (1)
GET http://localhost:5173/latest/meta-data/
Riesgo=Medio, Confianza=Alta (1)
http://localhost:5173 (1)
Política de Seguridad de Contenidos (CSP) de Cabecera no configurada (1)
GET http://localhost:5173/robots.txt
Riesgo=Medio, Confianza=Medios (2)
http://localhost:5173 (2)
Configuración incorrecta Cross-Domain (1)
GET http://localhost:5173/favicon.ico
Falta de cabecera Anti-Clickjacking (1)
GET http://localhost:5173/sitemap.xml
Riesgo = Bajo, Confianza = Medios (2)
http://localhost:5173 (2)
Falta encabezado X-Content-Type-Options (1)
GET http://localhost:5173/favicon.ico
Revelación de IP privada (1)
GET http://localhost:5173/node_modules/.vite/deps/react-icons_fa.js?v=1a13706b
Riesgo = Bajo, Confianza = Baja (1)
http://localhost:5173 (1)
Divulgación de Marcas de Tiempo - Unix (1)
GET http://localhost:5173/node_modules/.vite/deps/sweetalert2.js?v=1a13706b
Riesgo=Informativo, Confianza=Medios (1)
http://localhost:5173 (1)
Aplicación Web Moderna (1)
GET http://localhost:5173/robots.txt
Riesgo=Informativo, Confianza=Baja (1)
http://localhost:5173 (1)
Divulgación de información - Comentarios sospechosos (1)
GET http://localhost:5173/src/main.jsx
