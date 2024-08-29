import { jsx as _jsx } from "react/jsx-runtime";
import styles from './SearchBar.module.css';
var LegacySearchBar = function () {
    return (_jsx("div", { className: styles.container, children: _jsx("input", { className: styles.input, type: "text", placeholder: "Search..." }) }));
};
export default LegacySearchBar;
