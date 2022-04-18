import { Switch, Route } from "react-router-dom";
import { Shop, Cart } from "../pages";
import { Layout } from "antd";

const { Content } = Layout;

export default ({}) => {
  return (
    <Content style={{ padding: "0 50px" }}>
      <div
        style={{
          minHeight: "100%",
          padding: "24px",
          background: "#fff",
        }}
      >
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/">
            <Shop />
          </Route>
        </Switch>
      </div>
    </Content>
  );
};
