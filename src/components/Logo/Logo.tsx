import React, { FC } from 'react';
import logo from '../../assets/radio.png';


interface LogoProps {}

const Logo: FC<LogoProps> = () => (
    <div className="text-center" data-test-id="Logo">
        <img src={logo} className="img-fluid" alt="Radio" width="150px" />
    </div>
);

export default Logo;
