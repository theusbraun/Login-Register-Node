import React from 'react'
import Side from './bar.css'
import { SidebarData } from './SidebarData'
import Logo from './MultiColor.png'

function Sidebar() {
    return (
        <div className="Sidebar">
        <img src={Logo } className="logo"/>
            <ul className="SidebarList" >
                {SidebarData.map((val, key) => {
                    return (
                        <li className="row" key={key} onClick={() => { window.location.pathname = val.link }}>
                            {" "}
                            <div id="icon">{val.icon}</div>{" "}
                            <div id="title">
                                {val.title}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar