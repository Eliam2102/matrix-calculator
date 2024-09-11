import React, { useState } from 'react';
import './Calculator.css';
import Swal from 'sweetalert2';
import { FaPlus, FaTimes} from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';
import Fraction from 'fraction.js';
import { inv, det } from 'mathjs';
import Button from './Button';


function MatrixCalculator() {
  // Euso de HOOKS para definir el estado de las matirces
  const [matrizA, setMatrizA] = useState<number[][]>([[0]]);
  const [matrizB, setMatrizB] = useState<number[][]>([[0]]);
  const [dimensionsA, setDimensionsA] = useState({ rows: 1, cols: 1 });
  const [dimensionsB, setDimensionsB] = useState({ rows: 1, cols: 1 });
  const [result, setResult] = useState<any[][] | null>(null);

  // Función para actualizar las dimensiones de la matriz A
  const handleDimensionsAChange = (rows: number, cols: number) => {
    setDimensionsA({ rows, cols });
    setMatrizA(Array.from({ length: rows }, () => Array(cols).fill(0)));
  };

  // Función para actualizar las dimensiones de la matriz B
  const handleDimensionsBChange = (rows: number, cols: number) => {
    setDimensionsB({ rows, cols });
    setMatrizB(Array.from({ length: rows }, () => Array(cols).fill(0)));
  };

  // Función para hacer los inputs dinámicos
  const handleMatrixChange = (setMatrix: React.Dispatch<React.SetStateAction<number[][]>>, row: number, col: number, value: number) => {
    setMatrix(prev => {
      const updated = [...prev];
      updated[row][col] = value;
      return updated;
    });
  };

  // Función para limpiar la calculadora
  const handleClear = () => {
    setMatrizA([[0]]);
    setMatrizB([[0]]);
    setDimensionsA({ rows: 1, cols: 1 });
    setDimensionsB({ rows: 1, cols: 1 });
    setResult(null);
    Swal.fire({
      icon: 'info',
      title: 'Calculadora reiniciada',
      text: 'Todos los campos han sido limpiados.',
      timer: 2000,
      timerProgressBar: true,
    });
  };

  //Inicia el bloque de las funciones para poder realizar los cálculos
  //Función para suma
  const handleSum = () => {
    if (dimensionsA.rows === dimensionsB.rows && dimensionsA.cols === dimensionsB.cols) {
      const resultMatrix = matrizA.map((row, i) =>
        row.map((val, j) => val + matrizB[i][j])
      );
      setResult(resultMatrix);
    Swal.fire({
      icon: 'success',
      title: 'Operación realiza con éxito',
      text: 'A continuación tu resulttado: ',
      timer: 2000,
      timerProgressBar: true,
    });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las matrices deben tener las mismas dimensiones para sumar.',
      });    }
  };

  // Función para la resta
  const handleSubtraction = () => {
    if (
      dimensionsA.rows === dimensionsB.rows &&
      dimensionsA.cols === dimensionsB.cols
    ) {
      const resultMatrix = matrizA.map((row, i) =>
        row.map((val, j) => val - matrizB[i][j])
      );
      setResult(resultMatrix);
      Swal.fire({
        icon: 'success',
        title: 'Operación realizada con éxito',
        text: 'A continuación tu resultado: ',
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las matrices deben tener las mismas dimensiones para restar.',
      });
    }
  };

   // Función para la multiplicación
   const handleMultiplication = () => {
    if (dimensionsA.cols === dimensionsB.rows) {
      const resultMatrix = Array.from({ length: dimensionsA.rows }, () =>
        Array(dimensionsB.cols).fill(0)
      );

      for (let i = 0; i < dimensionsA.rows; i++) {
        for (let j = 0; j < dimensionsB.cols; j++) {
          for (let k = 0; k < dimensionsA.cols; k++) {
            resultMatrix[i][j] += matrizA[i][k] * matrizB[k][j];
          }
        }
      }

      setResult(resultMatrix);
      Swal.fire({
        icon: 'success',
        title: 'Operación realizada con éxito',
        text: 'A continuación tu resultado: ',
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de columnas de A debe ser igual al número de filas de B para multiplicar.',
      });
    }
  };


  //Calcular la inversa
  // Para expresar los números como fracciones
  const convertToFractions = (matrix: number[][]): string[][] => {
    return matrix.map(row => row.map(value => new Fraction(value).toFraction(true)));
  };
  const handleInverseA = () => {
    try {
      const rows = matrizA.length;
      const cols = matrizA[0].length;
  
      // Verificar que la matriz es cuadrada, ya que, es necesario según la formula
      if (rows !== cols) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La matriz debe ser cuadrada para calcular su inversa.',
        });
        return;
      }
  
      // Verificar que la matriz es invertible (determinante no es cero)
      const determinant = det(matrizA);
      if (determinant === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención!!',
          text: 'La matriz es singular y no tiene inversa.',
        });
        return;
      }
  
      // Calcular la inversa
      const inversaA = inv(matrizA);
      const fractionInversaA = convertToFractions(inversaA as number[][]);
      setResult(fractionInversaA);
  
      Swal.fire({
        icon: 'success',
        title: 'Inversa calculada',
        text: 'Matriz A invertida con éxito.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede calcular la inversa de la matriz A.',
      });
    }
  };


  const handleInverseB = () => {
    try {
      const rows = matrizB.length;
      const cols = matrizB[0].length;
  
      // Verificar que la matriz es cuadrada
      if (rows !== cols) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La matriz debe ser cuadrada para calcular su inversa.',
        });
        return;
      }
  
      // Verificar que la matriz es invertible (determinante no es cero)
      const determinant = det(matrizB);
      if (determinant === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención!!',
          text: 'La matriz es singular y no tiene inversa.',
        });
        return;
      }
  
      // Calcular la inversa
      const inversaB = inv(matrizB);
      const fractionInversaB = convertToFractions (inversaB as number[][]);
      setResult(fractionInversaB);
  
      Swal.fire({
        icon: 'success',
        title: 'Inversa calculada',
        text: 'Matriz B invertida con éxito.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede calcular la inversa de la matriz B.',
      });
    }
  };

  return (
    <div>
      <h1>Calculadora de Matrices</h1>

      {/* Dimensiones de la matriz A */}
      <div>
        <h2>Matriz A</h2>
        <label>Filas: </label>
        <input
          type="number"
          value={dimensionsA.rows}
          onChange={e => handleDimensionsAChange(Number(e.target.value), dimensionsA.cols)}
        />
        <label>Columnas: </label>
        <input
          type="number"
          value={dimensionsA.cols}
          onChange={e => handleDimensionsAChange(dimensionsA.rows, Number(e.target.value))}
        />
        {/* Inputs para llenar la matriz A */}
        <div className='inputs-matriz'>
          {matrizA.map((row, i) => (
            <div key={i}>
              {row.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  value={val}
                  onChange={e => handleMatrixChange(setMatrizA, i, j, Number(e.target.value))}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dimensiones de la matriz B */}
      <div>
        <h2>Matriz B</h2>
        <label>Filas: </label>
        <input
          type="number"
          value={dimensionsB.rows}
          onChange={e => handleDimensionsBChange(Number(e.target.value), dimensionsB.cols)}
        />
        <label>Columnas: </label>
        <input
          type="number"
          value={dimensionsB.cols}
          onChange={e => handleDimensionsBChange(dimensionsB.rows, Number(e.target.value))}
        />
        {/* Inputs para llenar la matriz B */}
        <div className='inputs-matriz'>
          {matrizB.map((row, i) => (
            <div key={i}>
              {row.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  value={val}
                  onChange={e => handleMatrixChange(setMatrizB, i, j, Number(e.target.value))}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Botones para operaciones */}
      <div className='botones-operacion'>
        <Button onClick={handleSum}>A <FaPlus/> B</Button>
        <Button onClick={handleSubtraction}>A <FaMinus/> B</Button>
        <Button onClick={handleMultiplication}>A <FaTimes/> B</Button>
        <Button onClick={handleInverseA}>A<sup>-1</sup></Button>
        <Button onClick={handleInverseB}>B<sup>-1</sup></Button>
        <Button onClick={handleClear}>C</Button>
      </div>
      {/* Resultado */}
      <div className='container-resultado'>
        <h2>Resultado</h2>
        {result ? (
          <div className="resultado-contenedor">
            <span className="corchete-izquierdo">[</span>
            <div className="resultado-matriz">
              {result.map((row, i) => (
                <div key={i} className="resultado-fila">
                  {row.map((val, j) => (
                    <span key={j} className="resultado-valor">{val}</span>
                  ))}
                </div>
              ))}
            </div>
            <span className="corchete-derecho">]</span>
          </div>
        ) : (
          <p>No hay resultado aún.</p>
        )}
      </div>
    </div>
  );
}

export default MatrixCalculator;