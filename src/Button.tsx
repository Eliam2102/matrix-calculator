import React from "react";
import { z } from 'zod';


// Definir el esquema con Zod
const ButtonPropsSchema = z.object({
    onClick: z.function().returns(z.void()),
    children: z.any(),
    className: z.string().optional(),
});

// Obtener el tipo de props a partir del esquema
type ButtonProps = z.infer<typeof ButtonPropsSchema>;

// Componente botón
const Button: React.FC<ButtonProps> = (props) => {
    React.useEffect(() => {
        try {
            ButtonPropsSchema.parse(props);
        } catch (e: unknown) {
            if (e instanceof z.ZodError) {
                console.error("Invalid props:", e.errors);
            } else {
                console.error("Unexpected error:", e);
            }
        }
    }, [props]);

    const { onClick, children, className } = props;

    return (
        <button onClick={onClick} className={`button ${className ?? ''}`}>
            {children}
        </button>
    );
};

export default Button;
