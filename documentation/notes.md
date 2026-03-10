# NOTES DEVELOPMENT

## Technical Vanilla JS

* es una maqueta muy estatica, con posicionmes absolutas, ajustando a un ancho y un alto fijo, he cambiado el alto para que sea dnámico pero en caso de que se requiriese se puede mantener el tamaño fijo
* Al ser un tamaño fijo se mantienen las posiones absolutas de frame principal pero lo recomendable sería ajustaarlo a un elemento centrado con CSS mediante display flex (explicar o poner codigo)
* De forma ideal debería ajustarse centrado y ajustando tamaños de forma responsive, se ha hecho tomando medidas absolutas por la petición de la prueba de replicar el diseño

## Technical React TS
* Como se ha hecho a medidas absolutas en el desarrollo `technical-vanilla-js` en este desarrollo se han aplicado sin medidas absolutas sino centrando con flex y grid
* Se ha decidido usar Styled-components aunque actualmente no es lo más recomendable, siendo lo más optimo los css modules ya que actualmente CSS se ha actualizado tanto que hace innc‹esario usar frameworks postCSS.
* Styled-components es simlar a SASS hciendo un wrap de estilos a una etiqueta html creanddo un nuevo componente o aplicandole un wrap a un componente ya existente
* Para proyectos pequeños, pruebas de concepto o desarrollos rápidos sugeriría tailwindcss
