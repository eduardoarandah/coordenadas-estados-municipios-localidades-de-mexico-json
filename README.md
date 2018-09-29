# Coordenadas, Estados, Municipios y Localidades De Mexico en formato Json

![mapa](https://user-images.githubusercontent.com/4065733/46239202-d0104400-c35a-11e8-9565-e8255cc37778.png)

**Visualizador:** 

Véalo en acción: [https://localidades-de-mexico.netlify.com/](https://localidades-de-mexico.netlify.com/) 

**Descripción**

Estados, municipios y localidades de México, con coordenadas, extraídas del INEGI y organizadas jerárquicamente

El objetivo es tomar los más de **300mil registros** de localidades del inegi y transformarlos en un árbol jerárquico de coordenadas en formato JSON

Para visualizar estas coordendas, se incluye un visualizador que nos llevará a navegar por los diferentes niveles: 

- Estados
- Municipios
- Localidades

**El archivo de localidades se llama "data.csv"**

**Los puntos geográficos se encuentran en la carpeta "data"**

# Cómo usar el visualizador en su propio sitio web

Nota: para usar el visualizador en su propio sitio web, cambie la API KEY en el archivo "index.html"

	https://maps.googleapis.com/maps/api/js?key=AQUI_SU_API

[https://developers.google.com/maps/documentation/geocoding/get-api-key](https://developers.google.com/maps/documentation/geocoding/get-api-key) 

# Cómo usar el visualizador para otros datos

El visualizador de puntos puede funcionar para cualquier tipo de proyecto, únicamente siga el mismo esquema jerárquico de datos. 

El código javascript está hecho con [Vue.js](https://vuejs.org/v2) y puede encontrar el código en main.js

# Fuente

La información de este repositorio fue extraída de:

Catálogo Único de Claves de Áreas Geoestadísticas Estatales, Municipales y Localidades - consulta y descarga
[http://www.inegi.org.mx/geo/contenidos/geoestadistica/catalogoclaves.aspx](http://www.inegi.org.mx/geo/contenidos/geoestadistica/catalogoclaves.aspx) 

Usando estos parámetros: 

![parametros](https://user-images.githubusercontent.com/4065733/46239085-3bf1ad00-c359-11e8-961f-21ff442e1624.jpg)

# Pendientes

- Agregar vue-router para que la URL sea más amigable
- Agregar enlaces de descarga de archivos json


# Contáctame

Puedes contactarme en: https://eduardoarandah.github.io/