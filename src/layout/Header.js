import { Link } from "react-router-dom";
import { Badge, Layout, Menu } from "antd";

const { Header } = Layout;

export default ({ cart }) => {
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <Header>
      <Menu mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <Link to="/">Shop</Link>
        </Menu.Item>

        <Menu.Item key="/cart">
          <Link to="/cart">
            <Badge count={totalItemsInCart} offset={[15]}>
              Cart
            </Badge>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
