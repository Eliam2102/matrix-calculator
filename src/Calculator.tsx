import React, { useState } from 'react';
import './Calculator.css';
import { FaPlus, FaTimes} from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';

function MatrixCalculator() {
  // Estados para matrices A y B
  const [matrizA, setMatrizA] = useState<number[][]>([[0]]);
  const [matrizB, setMatrizB] = useState<number[][]>([[0]]);
  const [dimensionsA, setDimensionsA] = useState({ rows: 1, cols: 1 });
  const [dimensionsB, setDimensionsB] = useState({ rows: 1, cols: 1 });
  const [result, setResult] = useState<number[][] | null>(null);

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

  // Función para manejar cambios en los inputs de la matriz
  const handleMatrixChange = (setMatrix: React.Dispatch<React.SetStateAction<number[][]>>, row: number, col: number, value: number) => {
    setMatrix(prev => {
      const updated = [...prev];
      updated[row][col] = value;
      return updated;
    });
  };

  // Funciones para operaciones (ejemplo de suma)
  const handleSum = () => {
    if (dimensionsA.rows === dimensionsB.rows && dimensionsA.cols === dimensionsB.cols) {
      const resultMatrix = matrizA.map((row, i) =>
        row.map((val, j) => val + matrizB[i][j])
      );
      setResult(resultMatrix);
    } else {
      alert('Las matrices deben tener las mismas dimensiones para sumar.');
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
        <button onClick={handleSum}><FaPlus /></button>
        <button><FaMinus /></button>
        <button><FaTimes /></button>
        <button>A<sup>-1</sup></button>
        <button>B<sup>-1</sup></button>
      </div>

      {/* Resultado */}
      <div>
        <h2>Resultado</h2>
        {result ? (
          <div>
            {result.map((row, i) => (
              <div key={i}>
                {row.map((val, j) => (
                  <span key={j}>{val} </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay resultado aún.</p>
        )}
      </div>
    </div>
  );
}

export default MatrixCalculator;