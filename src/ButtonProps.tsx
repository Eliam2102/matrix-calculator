// EXPORTAMOS DIRECTO LA INTERFACE DONDE DEFINIMOS LAS PROPS
export interface ButtonProps{
    //Props definidias unas condicionales y otra no (className)
    onClick:()=> void;
    children: React.ReactNode;
    className?: string;
}