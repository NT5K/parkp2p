import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle_button">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar_logo"><a href="/">THE LOGO</a></div>
            ...
    </nav>
    </header>
)

export default toolbar


// import React from 'react';
// import './Toolbar.css'
// import '../SideDrawer/DrawerToggleButton'
// import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

// const toolbar = props => {
//     return (

//     <header className="toolbar">
//         <nav className="toolbar_navigation">
//             <div>
//                 <DrawerToggleButton click={props.drawerClickHandler} />
//             </div>
//                 <div className="toolbar_logo">
//                 <a href="/">The LOGO</a>
//             </div>
//             <div className="spacer"></div>
//             <div className="toolbar_navigation_items">
//                 <ul>
//                     <li><a href="/">HEllo</a></li>
//                     <li><a href="/">USERS</a></li>
//                 </ul>
//             </div>
//         </nav>
//     </header>
//     )
// }

// export default toolbar