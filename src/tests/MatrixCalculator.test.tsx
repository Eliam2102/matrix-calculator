import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MatrixCalculator from '../Calculator';
import '@testing-library/jest-dom';


describe ('MatrixCalculator', () => {
    it('se debe presentar el componente y sus funcionalidaes', () => {
    //Primero debemos ver que se rednerice el componente por que si no se renderiza pues que vamos a testear xdxd
    render(<MatrixCalculator />);

    //Una vez renderizado el componente pasamos a testear qeu se presnete lo que esta dentro del componente
    //Testeamos en la pantalla que aprezca el titulo
    expect(screen.getByText(/Calculadora de Matrices/i)).toBeInTheDocument();
    
    //Prueba de funcionamiento del btn de clear
    const buttonClear = screen.getByText(/Clear/i);
    expect(buttonClear).toBeInTheDocument();
    
    // Simula el click el botón clear 'C'
    fireEvent.click(buttonClear);

    });
});
