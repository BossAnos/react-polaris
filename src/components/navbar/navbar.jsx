import { Link } from "react-router-dom";
import { folder_menu, menu } from "../../utils/const";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="menu-list">
      <div>
        {menu.map((item) => {
          return (
            <Link to={item.to} key={item.id} className="menu-item">
              {item.icon}
              <span className="menu-item-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <Link to={folder_menu.to} className="menu-item">
        {folder_menu.icon}
        <span className="menu-item-label">{folder_menu.label}</span>
      </Link>
    </div>
  );
}

export default Navbar;
