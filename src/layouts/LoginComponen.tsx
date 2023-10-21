import React, { ReactNode, useEffect, useState } from 'react';

interface p {
    children: React.ReactNode
}

const LoginComponen = (props: p) => {

    return <div className='c'>
        {props.children}
    </div>

}

export default LoginComponen;