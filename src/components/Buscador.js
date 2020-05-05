import React, {useState} from 'react';
import Error from './Error';

const Buscador = ({ guardarBusquedadesdeApp }) => {
  // state para hacer la busqueda de las fotos en la API sera un string pq es lo q el usuario escriba
  const [terminoBusqueda, guardarTerminobusqueda] = useState('');
  const [error, guardarError] = useState(false);

  // para enviar al componente padre
  const buscarImagen = (e) => {
    //prevenir el default behaviour del formulario
    e.preventDefault();

    //validar la busqueda creamos el state error
    if (terminoBusqueda.trim() === '') {
      guardarError(true);
      return;
    }

    //Enviar al componente principal
    guardarError(false);
    guardarBusquedadesdeApp(terminoBusqueda);

  }


  return (
    <form onSubmit={buscarImagen}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una Imagen, ejemplo Cafe"
            onChange={(e) => (guardarTerminobusqueda(e.target.value))}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {(error) ? <Error mensaje="Agrega un termino de Busqueda" /> : null}
    </form>
  );
};

export default Buscador;