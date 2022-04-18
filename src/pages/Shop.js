import { useContext } from "react";
import { Row, Col, Empty, Spin } from "antd";

import ProductCard from "../components/ProductCard";
import ProductsContext from "../components/ProductsContext";

const COLUMNS = 4;

export default () => {
  const [products] = useContext(ProductsContext);

  if (!products.length)
    return (
      <Empty image={<Spin size="large" />} description="Loading Products" />
    );

  const span = Math.floor(24 / COLUMNS);

  const productColumns = products.map(product => {
    return (
      <Col span={span} key={product.id}>
        <ProductCard product={product} />
      </Col>
    );
  });

  return <Row gutter={[16, 32]}> {productColumns} </Row>;
};
