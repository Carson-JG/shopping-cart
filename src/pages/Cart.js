import { useContext, useEffect, useState } from "react";

import { Table, Image, Button } from "antd";

import ProductsContext from "../components/ProductsContext";
import CartContext from "../components/CartContext";

export default () => {
  const [cart] = useContext(CartContext);

  if (!cart.length) return <h2>Head over to the Shop to select some items!</h2>;

  const [products] = useContext(ProductsContext);

  const [dataSource, updateDataSource] = useState([]);

  useEffect(() => {
    let subTotal = 0;
    let totalCount = 0;
    const newData = cart.map(item => {
      const product = products.find(product => product.id === item.id);
      const total = product.price * item.count;
      subTotal += total;
      totalCount += item.count;
      return Object.assign({ total }, product, item);
    });
    newData.push({
      title: "Sub Total",
      count: totalCount,
      total: subTotal,
    });

    const taxes = subTotal * 0.06;

    newData.push({
      title: "Taxes (6%)",
      total: taxes,
    });

    const grandTotal = subTotal + taxes;

    newData.push({
      title: "Total",
      total: grandTotal,
    });

    updateDataSource(newData);
  }, [cart, products]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: image => (
        <Image
          style={{
            margin: "auto",
            width: "unset",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
          src={image}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: price => (price ? "$" + price.toFixed(2) : ""),
    },
    {
      title: "Qty",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: total => (total ? "$" + total.toFixed(2) : ""),
    },
  ];

  return (
    <div style={{ textAlign: "right" }}>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <br />
      <Button
        type="primary"
        onClick={e => {
          e.preventDefault();
          alert("Not Implemented.");
        }}
      >
        Check Out
      </Button>
    </div>
  );
};
