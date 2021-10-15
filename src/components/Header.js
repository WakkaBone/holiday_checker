import React, {useState} from 'react';

const Header = () => {
    const [toggle, setToggle] = useState(true)
    const change = setTimeout(() => {
        setToggle(!toggle)
    }, 2000)
    return (
        <h1 className='heading'><span className={toggle ? 'verticalAlignSub' : 'verticalAlignSuper'}>Holiday</span> <span className={toggle ? 'verticalAlignSuper' : 'verticalAlignSub'}>Checker</span></h1>
    );
};

export default Header;