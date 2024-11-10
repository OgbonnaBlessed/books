import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import formatCurrency from '../utils/format';
import { motion } from 'framer-motion';

const Checkout = () => {
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const { cart, handleUpdateQuantity, handleDeleteItem } = useContext(CartContext);

  // Set the initial selected delivery option for each item to 'first'
  useEffect(() => {
    const initialDelivery = cart.reduce((acc, item) => {
      acc[item.id] = 'first';
      return acc;
    }, {});

    setSelectedDelivery(initialDelivery);
  }, [cart]);

  const handleDeliveryChange = (productId, deliveryOption) => {
    setSelectedDelivery((prev) => ({
      ...prev,
      [productId]: deliveryOption,
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.priceCents * item.quantity, 0) / 100;
  };

  const calculateShipping = () => {
    return Object.entries(selectedDelivery).reduce((total, [productId, deliveryOption]) => {
      const item = cart.find((item) => item.id === productId);
      return item ? total + parseFloat(deliveryOptions[deliveryOption].price) : total;
    }, 0);
  }; 

  const calculateTotalBeforeTax = () => {
    return (calculateTotal() + calculateShipping()).toFixed(2);
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  
    return `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${date.toLocaleDateString('en-US', { month: 'short' })} ${dayWithSuffix}`;
  };

  const getDeliveryDates = (option) => {
    const today = new Date();
    switch (option) {
      case 'first':
        today.setDate(today.getDate() + 7);
        break;
      case 'second':
        today.setDate(today.getDate() + 3);
        break;
      case 'third':
        today.setDate(today.getDate() + 1);
        break;
      default:
        today.setDate(today.getDate() + 7);
    }

    return formatDate(today);
  };

  const deliveryOptions = {
    first: { label: `${getDeliveryDates('first')}`, price: formatCurrency(499) },
    second: { label: `${getDeliveryDates('second')}`, price: formatCurrency(599) },
    third: { label: `${getDeliveryDates('third')}`, price: formatCurrency(999) },
  };

  return (
    <>
      <motion.div 
        className="checkout-container"
        initial={{
          opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        transition={{ 
            duration: 1, 
            ease: "easeInOut" 
        }} // Smooth transition
      >
        <div className="product-display">
          <h1>Review your order</h1>
          <div className="product-display-container">
            <div className="order-summary">
              {cart.map((item) => (
                <div className="item" key={item.id}>
                  <h2>{formatDate(new Date())}</h2>
                  <div className="product-info">
                    <div className="product-details">
                      <img src={`${process.env.PUBLIC_URL}/${item.image}`} alt="" />
                      <div className="product-further-info">
                        <div className="name">{item.name}</div>
                        <div className="price">${formatCurrency(item.priceCents)}</div>
                        <div className="quantity">
                          <p>Quantity:</p>
                          <select
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                          >
                            {[...Array(10).keys()].map((n) => (
                              <option key={n + 1} value={n + 1}>
                                {n + 1}
                              </option>
                            ))}
                          </select>
                          <button type="button" onClick={() => handleDeleteItem(item.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="delivery-options">
                      <h3>Choose a delivery option.</h3>
                      <div className="delivery-options-box">
                        {Object.entries(deliveryOptions).map(([key, option]) => (
                          <div key={key} className="option">
                            <input
                              type="radio"
                              id={`${item.id}-${key}`}
                              name={`delivery-${item.id}`}
                              value={key}
                              checked={selectedDelivery[item.id] === key}
                              onChange={() => handleDeliveryChange(item.id, key)}
                            />
                            <label htmlFor={`${item.id}-${key}`}>
                              {option.label} 
                              <p>${option.price}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="payment-summary">
              <div className="price-outline">
                <h2>Payment summary</h2>
                <div className="price-per-quantity">
                  <div className="item-price">
                    <div className="before-tax">
                      <p>Items ({cart.length}):</p>
                      <p>${calculateTotal().toFixed(2)}</p>
                    </div>
                    <div className="shipping">
                      <p>Shipping & handling:</p>
                      <p>${calculateShipping().toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="tax-calculation">
                    <div className="total-before-tax">
                      <p>Total before tax:</p>
                      <p>${calculateTotalBeforeTax()}</p>
                    </div>
                    <div className="estimated">
                      <p>Estimated tax (10%)</p>
                      <p>${(calculateTotalBeforeTax() * 0.10).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="place-order">
                <div className="contain-price-summation">
                  <h3>Order Total:</h3>
                  <h3>${(parseFloat(calculateTotalBeforeTax()) + calculateTotalBeforeTax() * 0.10).toFixed(2)}</h3>
                </div>
                <button type="button">Place your order</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Checkout;