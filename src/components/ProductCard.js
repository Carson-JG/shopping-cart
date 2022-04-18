import { useContext } from "react";
import CartContext from "./CartContext";

import { Card, Image, Badge, Popover, Tag, InputNumber } from "antd";

export default ({ product }) => {
  const { title, image, description, price, category } = product;
  const [cart, updateCart] = useContext(CartContext);

  const { count = 0 } = cart.find(({ id }) => id === product.id) || {};

  const onChange = value => {
    let item = cart.find(({ id }) => id === product.id);

    if (!item) {
      item = { id: product.id };
      cart.push(item);
    }

    item.count = value;
    const newCart = cart.filter(item => item.count && item.count > 0);
    updateCart(newCart);
  };

  const popoverStyle = { maxWidth: "300px" };
  const popoverTitle = <div style={popoverStyle}>{title}</div>;
  const popoverContent = (
    <>
      <p style={popoverStyle}>{description}</p>
      <Tag>{category}</Tag>
    </>
  );

  const priceFormatted = "$" + price.toFixed(2);

  const imageStyle = { width: "unset", height: "200px" };

  const cardStyle = {
    textAlign: "center",
    height: "100%",
    overflow: "hidden",
    marginBottom: "30px",
  };

  const inputStyle = { width: "100%" };

  return (
    <Badge.Ribbon color="green" text={priceFormatted}>
      <Popover placement="bottom" title={popoverTitle} content={popoverContent}>
        <Card
          title={title}
          cover={<Image src={image} alt={title} style={imageStyle} />}
          style={cardStyle}
        >
          <InputNumber
            addonAfter="In Cart"
            style={inputStyle}
            defaultValue={count}
            min={0}
            onChange={onChange}
          />
        </Card>
      </Popover>
    </Badge.Ribbon>
  );
};
