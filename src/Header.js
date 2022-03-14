import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
const Header = () => {
  const [{basket}, dispatch] = useStateValue();
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="header__logo"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to="/login">
          <div className="header__option">
            <span className="header__OptionLineOne"> Hello Guest</span>
            <span className="header__OptionLineTwo">Sign In</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__OptionLineOne"> Returns</span>
          <span className="header__OptionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__OptionLineOne">Your</span>
          <span className="header__OptionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;