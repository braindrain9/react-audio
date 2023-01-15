import React from 'react';

interface ButtonProps {
    btnClass : string;
    children : string;
    btnClick : any;
    id : string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({btnClass, btnClick, children, id} : ButtonProps, ref ) => (
    <button ref={ref} onClick={btnClick} id={id} type="button" className={`btn btn-lg ${btnClass}`}>
        {children}
    </button>
));

export default Button;
