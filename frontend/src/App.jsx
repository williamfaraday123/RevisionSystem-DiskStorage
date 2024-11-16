import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import AdminDeleteUI from './pages/AdminDeleteUI';
import AdminUploadUI from './pages/AdminUploadUI';
import LayoutUI from './pages/LayoutUI';
import UserUI from './pages/UserUI';

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" Component = {LayoutUI}>
                    <Route path = "user" Component = {UserUI} />
                    <Route path = "admin-upload" Component = {AdminUploadUI} />
                    <Route path = "admin-delete" Component = {AdminDeleteUI} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;