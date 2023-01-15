import React, { FC } from 'react';


interface WrapperProps {
    children : React.ReactNode;
    wrapperClass ?: string;
}

const Wrapper: FC<WrapperProps> = ({children, wrapperClass}) => (
    <div data-testid="Wrapper" className={wrapperClass}>{children}</div>
);

export default Wrapper;
