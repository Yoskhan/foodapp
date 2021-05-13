import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumb, item) => {
    return curNumb + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setButtonIsHighLighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighLighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
