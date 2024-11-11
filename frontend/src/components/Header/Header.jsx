import { Link } from 'react-router-dom';
import buttonContents from './HeaderContents.json';

const Header = () => {
    return(
        <nav style={{
            position: "fixed",
        }}>
            {buttonContents.map((buttonContent, index) => (
                <Link key={index} to = {buttonContent.path}>{buttonContent.name}  </Link>
            ))}
        </nav>
    );
};

export default Header;