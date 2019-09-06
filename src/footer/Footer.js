import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <small>Copyright &copy; Tamada Brothers</small>
                </div>
            </footer>
        );
    }
}

export default Footer;