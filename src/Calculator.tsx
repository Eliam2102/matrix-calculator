import { useState } from 'react';
import Button from './Button';
import './Calculator.css';
import './MatrixDisplay.css';
import casio from './assets/casio.png';

function Calculator() {
  const [matrizDisplayValue, setMatrizDisplayValue] = useState<number[][][]>([[[0]]]);
  const [matrixType, setMatrixType] = useState<'1D' | '2D' | '3D'>('1D');
  const [columns, setColumns] = useState<number>(1);

  function initializeMatrix(type: '1D' | '2D' | '3D', columns: number): number[][][] {
    switch (type) {
      case '1D':
        return [[[...Array(columns).fill(0)]]];
      case '2D':
        return [[...Array(2).fill(0).map(() => Array(columns).fill(0))]];
      case '3D':
        return [...Array(3).fill(0).map(() => Array(columns).fill(0))];
      default:
        return [[[0]]];
    }
  }

  function handleMatrixTypeChange(type: '1D' | '2D' | '3D') {
    setMatrixType(type);
    setMatrizDisplayValue(initializeMatrix(type, columns));
  }

  function handleColumnsChange(newColumns: number) {
    setColumns(newColumns);
    setMatrizDisplayValue(initializeMatrix(matrixType, newColumns));
  }

  function handleNumberClick(value: number, rowIndex: number, colIndex?: number, depthIndex?: number) {
    let newMatrix = JSON.parse(JSON.stringify(matrizDisplayValue));

    if (matrixType === '1D') {
      (newMatrix[0][0] as number[])[colIndex!] = value;
    } else if (matrixType === '2D') {
      (newMatrix[0][rowIndex] as number[])[colIndex!] = value;
    } else if (matrixType === '3D') {
      (newMatrix[rowIndex] as number[])[colIndex!] = value;
    }

    setMatrizDisplayValue(newMatrix);
  }

  const getMatrixDisplayStyle = () => {
    let columnsCount;
    switch (matrixType) {
      case '1D':
        columnsCount = columns;
        break;
      case '2D':
        columnsCount = columns;
        break;
      case '3D':
        columnsCount = columns;
        break;
      default:
        columnsCount = 1;
    }

    return {
      gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
    };
  };

  return (
    <div className="calculator-container">
      <div className="logo">
        <img src={casio} alt="Mi Calculadora Logo" className="logo-image" />
      </div>

      <div className="matrix-display" style={getMatrixDisplayStyle()}>
        {matrixType === '1D' && matrizDisplayValue[0][0].map((val, colIndex) => (
          <input
            key={colIndex}
            type="number"
            value={val}
            onChange={(e) => handleNumberClick(Number(e.target.value), 0, colIndex)} />
        ))}

        {matrixType === '2D' && matrizDisplayValue[0].map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'contents' }}>
            {row.map((val, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={val}
                onChange={(e) => handleNumberClick(Number(e.target.value), rowIndex, colIndex)} />
            ))}
          </div>
        ))}

        {matrixType === '3D' && matrizDisplayValue.map((layer, layerIndex) => (
          <div key={layerIndex} style={{ display: 'contents' }}>
            {layer.map((val, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={val}
                onChange={(e) => handleNumberClick(Number(e.target.value), layerIndex, colIndex)} />
            ))}
          </div>
        ))}
      </div>

      <div className="matrix-type-selector">
        <Button className="button" value="1D" onClick={() => handleMatrixTypeChange('1D')} />
        <Button className="button" value="2D" onClick={() => handleMatrixTypeChange('2D')} />
        <Button className="button" value="3D" onClick={() => handleMatrixTypeChange('3D')} />
      </div>

      <div className="button-container">
        <label>
          Número de columnas:
          <input
            type="number"
            value={columns}
            onChange={(e) => handleColumnsChange(Number(e.target.value))}
            min={1}
          />
        </label>
      </div>

      <div className="button-container">
        <Button className="button" value="0" onClick={() => {}} />
        <Button className="button" value="1" onClick={() => {}} />
        <Button className="button" value="2" onClick={() => {}} />
        <Button className="button" value="+" onClick={() => {}} />
        <Button className="button" value="-" onClick={() => {}} />
        <Button className="button" value="=" onClick={() => {}} />
      </div>
    </div>
  );
}

export default Calculator;
