import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar';
import { CartContext } from '../Components/CartContext';

const Checkout = () => {
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const { cart, handleUpdateQuantity, handleDeleteItem } = useContext(CartContext);
  console.log(cart);
  // const today = day

  const handleDeliveryChange = (productId, deliveryOption) => {
    setSelectedDelivery(prev => ({
      ...prev,
      [productId]: deliveryOption
    }));
  };

  const formatCurrency = (priceCents) => {
    return (Math.round(priceCents) / 100).toFixed(2);
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + formatCurrency(item.priceCents) * item.quantity, 0);
  };

  const getDeliveryDates = (option) => {
    const today = new Date();
    switch (option) {
      case 'first':
        return new Date(today.setDate(today.getDate() + 7)).toDateString();
      case 'second':
        return new Date(today.setDate(today.getDate() + 3)).toDateString();
      case 'third':
        return new Date(today.setDate(today.getDate() + 1)).toDateString();
      default:
        return new Date(today.setDate(today.getDate() + 7)).toDateString();
    }
  };

  const deliveryOptions = {
    first: { label: `${getDeliveryDates('first')}`, price: formatCurrency(499) },
    second: { label: `${getDeliveryDates('second')}`, price: formatCurrency(599) },
    third: { label: `${getDeliveryDates('third')}`, price: formatCurrency(999) }
  };

  return (
    <>
    <Navbar />
    <div className="checkout-container">
        <div className="product-display">
            <h1>Review your order</h1>
          <div className="product-display-container">
            <div className="order-summary">
                    {cart.map((item) => (
              <div className="item" key={item.id}>
                <h2>{(new Date().toDateString(('dddd, MMMM D')))}</h2>
                <div className="product-info">
                  <div className="product-details">
                    <img src={`${process.env.PUBLIC_URL}/${item.image}`} alt="" />
                    <div className="product-further-info">
                                <div className="name">{item.name}</div>
                                <div className="price">
                                    ${formatCurrency(item.priceCents)}
                                </div>
                                <div className="quantity">
                                    <p>Quantity:</p>
                                    <select
                                      value={item.quantity}
                                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                                    >
                                      {[...Array(10).keys()].map(n => (
                                        <option 
                                          key={n + 1} 
                                          value={n + 1}
                                        >
                                          {n + 1}
                                        </option>
                                      ))}
                                    </select>
                                    <button 
                                      type='button' 
                                      onClick={() => handleDeleteItem(item.id)}
                                    >
                                      Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="delivery-options">
                        <h3>Choose a delivery option.</h3>
                        <div className="delivery-options-box">
                        {Object.entries(deliveryOptions).map(([key, option]) => (
                          <div key={key} className='option'>
                            <input
                              type="radio"
                              id={`${item.id}-${key}`}
                              name={`delivery-${item.id}`}
                              value={key}
                              checked={selectedDelivery[item.id] === key}
                              onChange={() => handleDeliveryChange(item.id, key)}
                            />
                            <label htmlFor={`${item.id}-${key}`}>{option.label} - ${option.price}</label>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>))}
                </div>

                <div className="payment-summary">
                  <div className="price-outline">
                    <h2>Payment summary</h2>
                    <div className="price-per-quantity">
                      <div className="item-price">
                        <div className="before-tax">
                          <p>Items ({cart.length}):</p>
                          <p>${calculateTotal()}</p>
                        </div>
                        <div className="shipping">
                          <p>Shipping & handling:</p>
                          <p>{cart.length === 0 ? '$0' : '$4.99'}</p>
                        </div>
                      </div>
                      <div className="tax-calculation">
                        <div className="total-before-tax">
                          <p>Total before tax:</p>
                          <p>{cart.length === 0 ? '$0' : '$4.77'}</p>
                        </div>
                        <div className="estimated">
                          <p>Estimated tax (10%)</p>
                          <p>${(calculateTotal() * 0.10).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="place-order">
                    <div className="contain-price-summation">
                      <h3>Order Total:</h3>
                      <h3>${cart.length === 0 ? '0' : (calculateTotal() + 4.99 + (calculateTotal() * 0.10)).toFixed(2)}</h3>
                    </div>
                    <button type="button">Place your order</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Checkout