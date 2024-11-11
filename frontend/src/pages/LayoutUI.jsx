import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header';

const LayoutUI = () => {
    return(
        <div style = {{
            width: "100vw",
            height: "100vh"
        }}>
            <Header />
            <div style = {{
                paddingTop: "30px"
            }}>
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutUI;