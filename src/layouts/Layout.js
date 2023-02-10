import { Outlet } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import LayoutCSS from "./Layout.module.css";


function Layout() {

    // 노란색 강조 표시 
    // const {highLight, setHighLight} = useState('Home');

    return (
        <>
            <Header/>
            <main className={ LayoutCSS.main }>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;