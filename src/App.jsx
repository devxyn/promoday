import { useState } from "react";
import Navbar from "./components/Navbar";
import { promos, products, promocode } from "./utils/data";

function App() {
  const [oneWay, setOneWay] = useState({ product: "One-way ticket", quantity: 0 });
  const [roundTrip, setRoundTrip] = useState({ product: "Round trip ticket", quantity: 0 });
  const [halfYear, setHalfYear] = useState({ product: "Half a year unli Travel subscription", quantity: 0 });
  const [fullYear, setFullYear] = useState({ product: "Full year unli Travel subscription", quantity: 0 });
  const [cart, setCart] = useState([]);
  const [discountedItems, setDiscountedItems] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [total, setTotal] = useState(0);

  //const discountedItems = [];
  const freeItem = [];

  const handleCart = () => {
    setCart([oneWay, roundTrip, halfYear, fullYear]);
  };

  const addToDiscountedItems = (product, price) => {
    setDiscountedItems((prev) => [...prev, { product, price }]);
  };

  const subTotal = cart
    .map((item) => item.quantity * products[item.product])
    .reduce((acc, currentVal) => acc + currentVal, 0);

  const discountTotal = discountedItems.map((item) => item.price).reduce((acc, currentVal) => acc + currentVal, 0);
  console.log(discountedItems, discountTotal);

  const checkOut = () => {
    promos.forEach((promo) => {
      if (promo.product in products) {
        const productQuantity = cart
          .filter((item) => item.product === promo.product)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (promo.requiredQuantity && productQuantity >= promo.requiredQuantity) {
          if (promo.product === "One-way ticket") {
            const freeQuantity = Math.floor((productQuantity / promo.requiredQuantity) * promo.freeQuantity);
            freeItem.push({ product: "One-way ticket", quantity: freeQuantity });
          }
        }

        if (promo.discountPercent) {
          const discountedQuantity = Math.min(productQuantity, promo.maxDiscountedQuantity || productQuantity);
          const discountedAmount = (products[promo.product] * promo.discountPercent * discountedQuantity) / 100;
          addToDiscountedItems(promo.product, discountedAmount);
        }
      }
    });

    setTotal(subTotal - discountTotal);
  };

  const handleVoucher = (e) => {
    setVoucher(e.target.value);
  };

  function applyPromoCode(code) {
    promocode.filter((item) => {
      if (item === "FREETWOWAY") {
        freeItem.push({ product: "Round trip ticket", quantity: 1 });
      }
      if (item === "5OFF") {
        let discount = total * 0.05;

        setTotal((prev) => prev - discount);
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen justce">
        <div className="w-full">
          <h2 className="text-center">Agency Products</h2>
          <div className="w-full flex justify-between">
            <ul>
              <li>One-way ticket</li>
              <li>Round trip ticket</li>
              <li>Half a year unli travel subscription</li>
              <li>Full year unli travel subscription</li>
            </ul>
            <ul>
              <li>5,000php</li>
              <li>1,000php</li>
              <li>50,000php</li>
              <li>100,000php</li>
            </ul>
          </div>
          <div className="w-full">
            <h2 className="text-center">Available Promos</h2>
            <ul className="text-left">
              {promos.map((promo) => (
                <li key={promo.name}>{promo.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2>Buy tickets</h2>
          <div className="flex justify-between">
            <label htmlFor="one-way">One-way Ticket:</label>
            <input
              className="border border-black"
              type="number"
              name="one-way"
              placeholder="0"
              onChange={(e) => setOneWay({ product: "One-way ticket", quantity: +e.target.value })}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="roundtrip">Round Trip Ticket:</label>
            <input
              className="border border-black"
              type="number"
              name="roundtrip"
              placeholder="0"
              onChange={(e) => setRoundTrip({ product: "Round trip ticket", quantity: +e.target.value })}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="halfYear">Half a Year Unli Travel Subscription:</label>
            <input
              className="border border-black"
              type="number"
              name="halfYear"
              placeholder="0"
              onChange={(e) =>
                setHalfYear({ product: "Half a year unli Travel subscription", quantity: +e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="one-way">Full Year Unli Travel Subscription:</label>
            <input
              className="border border-black"
              type="number"
              name="fullYear"
              placeholder="0"
              onChange={(e) =>
                setFullYear({ product: "Full year unli Travel subscription", quantity: +e.target.value })
              }
            />
          </div>
        </div>
        <button onClick={handleCart}>Add to cart</button>

        <div>
          <h2>Cart</h2>
          <div className="w-full flex justify-between">
            <ul>
              {cart.map((item) => (
                <li key={item.product}>{item.product} : </li>
              ))}
            </ul>
            <ul>
              {cart.map((item) => (
                <li key={item.product}>{item.quantity}</li>
              ))}
            </ul>
          </div>
          <button className="border border-black" onClick={checkOut}>
            Checkout
          </button>
          <div>
            <ul>
              <li>Discount:</li>
              <li>{discountTotal}php</li>
            </ul>
            <ul>
              <li>Subtotal</li>
              <li>{subTotal}php</li>
            </ul>
            <div>
              <label htmlFor="voucher">Apply promo code:</label>
              <div>
                <input
                  className="border border-black"
                  type="text"
                  name="voucher"
                  onChange={handleVoucher}
                  value={voucher}
                />
              </div>
              <button className="border border-black" onClick={() => applyPromoCode(voucher)}>
                Apply Code
              </button>
            </div>
          </div>
          <div>
            <h2>Total</h2>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
