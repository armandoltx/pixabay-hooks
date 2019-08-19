import React, {useState, useEffect} from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  // state
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  // anadimos 2 state para calcular las paginas que necesitamos para el paginador
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(
    () => {
      // que no se ejecute al principio de cargar el componente
      if(busqueda === '') return;

      // consultar la API
      const consultarApi = async () => {
        const imagenesPorPagina = 30;
        const key = '13351206-b4955c7ef775c9c20c0e532d4';

        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=${imagenesPorPagina}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json(); // when uising fetch we need to do this way.

        // console.log(respuesta);
        // console.log(resultado);
        // console.log(resultado.hits);
        guardarImagenes(resultado.hits);

        // calculamos el total de paginas sera el total de imagenes dividido por el numero de imagenes por pagina:
        // Hay q redondear hacia arriba, pq neccesitamos un integer
        console.log(resultado.totalHits);  // total de imagenes q nos puede ensenar la busqueda

        const calcularTotalPaginas = Math.ceil((resultado.totalHits / imagenesPorPagina));

        guardarTotalPaginas(calcularTotalPaginas);
      }

      consultarApi();
    },[busqueda]);

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Buscador guardarBusquedadesdeApp={guardarBusqueda}/>

      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
