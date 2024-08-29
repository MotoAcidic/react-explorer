import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './SideNavbar.module.css';
var LegacySideNavBar = function () {
    return (_jsx("nav", { className: styles.nav, children: _jsxs("ul", { className: styles.menu, children: [_jsx("li", { className: styles.item, children: "Home" }), _jsx("li", { className: styles.item, children: "About" }), _jsx("li", { className: styles.item, children: "Contact" })] }) }));
};
export default LegacySideNavBar;
