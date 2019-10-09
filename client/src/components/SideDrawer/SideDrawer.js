import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'side_drawer'
    if (props.show) {
        drawerClasses = 'side_drawer open'
    }
    return (
        <nav className={drawerClasses}>
            <ul>...</ul>
        </nav>
    )
}

export default sideDrawer

// import React from 'react';
// import './SideDrawer.css';

// const sideDrawer = props => {
//     return (
//         <nav className="side_drawer">
//             <ul>
//                 <li><a href="/">Products</a></li>
//                 <li><a href="/">Users</a></li>
//             </ul>
//         </nav>
//     )
// }

// export default sideDrawer