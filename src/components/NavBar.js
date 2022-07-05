import { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../assets/images/logo.svg';
import Dollar from '../assets/images/dollar.svg';
import Cart from '../assets/images/cart.svg';
import Dropdown from './Dropdown';
import rotate from '../assets/styles/animation';

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  padding: 1.75rem 6.3125rem 0;
  align-items: flex-start;
  background: var(--white);
  box-shadow: var(--shadow-1);

  > nav {
        display: flex;

        .links {
          color: var(--text-color-1);
          padding: 0 1rem 2rem;
          font-size: 1rem;
          line-height: 120%;
          font-weight: 400;
        }
  }

  > div {

    &:nth-of-type(1) {
      img {
        animation: ${rotate} 2s linear;
      }
    }

    &:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 2.375rem;

      img {
        cursor: pointer;
      }

      div {
        position: relative;

        span {
          position: absolute;
          bottom: 12px;
          right: -8px;
          font-size: 12px;
          font-weight: 550;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background: black;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
`;

const links = [
  {
    id: 1,
    path: '/',
    text: 'ALL',
  },
  {
    id: 2,
    path: '/tech',
    text: 'TECH',
  },
  {
    id: 3,
    path: '/clothes',
    text: 'CLOTHES',
  },
];

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavBar: false,
    };
  }

  handleToggle = () => {
    const { showNavBar } = this.state;
    this.setState({ showNavBar: !showNavBar });
  }

  render() {
    const { showNavBar } = this.state;
    const { cart } = this.props;

    const getQty = () => {
      let itemsNum;
      if (cart.length > 0) {
        itemsNum = cart.reduce((a, b) => a.qty + b.qty);
        if (cart.length === 1) itemsNum = itemsNum.qty;
        return itemsNum;
      }
      return itemsNum;
    };

    return (
      <div>
        <Header>
          <nav>
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className="links"
                style={({ isActive }) => ({
                  color: isActive && '#5ECE7B',
                  borderBottom: isActive && 'solid 2px var(--primary-color)',
                  fontWeight: isActive && '600',
                })}
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
          <div>
            <img src={Logo} alt="site logo" />
          </div>
          <div>
            <img src={Dollar} alt="site logo" />
            <div>
              <img src={Cart} alt="site logo" onClick={this.handleToggle} />
              <span>{getQty() || 0}</span>
            </div>
          </div>
        </Header>
        <Dropdown show={showNavBar} handleToggle={this.handleToggle} />
      </div>
    );
  }
}

export default connect((({ cartReducer }) => ({ cart: cartReducer.cart })))(NavBar);
// export default NavBar;
