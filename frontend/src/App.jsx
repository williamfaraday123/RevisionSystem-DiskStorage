import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import UserUI from './pages/UserUI';
import AdminUI from './pages/AdminUI';
import LayoutUI from './pages/LayoutUI';

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" Component = {LayoutUI}>
                    <Route path = "user" Component = {UserUI} />
                    <Route path = "admin" Component = {AdminUI} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;