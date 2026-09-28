import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Lock,
  Smartphone,
  Building2,
  Wallet,
  Trash2,
  CheckCircle
} from 'lucide-react';
import useCartStore from '../../store/cartStore';
import './Checkout.css';

// Day 22: Checkout - Order Review, Shipping & Payment

const SHIPPING_FEE = 80;

function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    country: 'Ethiopia',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const productIds = cartItems.map((item) => item.id)
    .sort((a, b) => a - b).join(',');

  useEffect(() => {
    if (!productIds) { setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');

    const ids = productIds.split(',').map(Number);

    Promise.all(ids.map((id) =>
        fetch(`https://dummyjson.com/products/${id}`).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          return response.json();
        })
      )
    )
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to load checkout products.');
        setLoading(false);
      });
  }, [productIds]);

  const cartProducts = cartItems
    .map((item) => ({...item,
      product: products.find((product) => product.id === item.id)
    }))
    .filter((item) => item.product);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity, 0
  );

  const total = Math.max(0, subtotal + SHIPPING_FEE - discount);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({...currentData,
      [name]: value
    }));
    setFormErrors((currentErrors) => ({...currentErrors,
      [name]: ''
    }));
  }

  function handlePaymentChange(event) {
    setPaymentMethod(event.target.value);
    setFormErrors((currentErrors) => ({
      ...currentErrors, payment: ''
    }));
  }

  function handleCoupon() {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setDiscount(0);
      setCouponMessage('');
      return;
    }
    if (code === 'MINTE40') {
      setDiscount(5);
      setCouponMessage('Coupon applied. You saved 150 ETB.');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid coupon code.');
    }
  }

  function validateForm() {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!formData.firstName.trim()) {
      errors.firstName = 'Enter your first name.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Enter your last name.';
    }
    if (!formData.address.trim()) {
      errors.address = 'Enter your street address.';
    }
    if (!formData.city.trim()) {
      errors.city = 'Enter your city.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Enter your phone number.';
    }
    if (!paymentMethod) {
      errors.payment = 'Select a payment method.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!cartProducts.length) {
      return;
    }
    if (!validateForm()) {
      window.scrollTo({ top: 0,
        behavior: 'smooth'
      });
      return;
    }

    setOrderPlaced(true);
    clearCart();
  }
  if (loading) {
    return (
      <div className="pages checkout-status">
        <div className="checkout-loader">
          Loading checkout...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="pages checkout-status">
        <div className="checkout-error">
          {error}
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success-card">
          <div className="success-icon">
            <CheckCircle size={50} />
          </div>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you for your order. order successfully placed!.
          </p>
          <p className="success-note">
            Payment processing is currently simulated.
          </p>
          <Link to="/" className="checkout-primary-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  if (!cartProducts.length) {
    return (
      <div className="checkout-empty-page">
        <div className="checkout-empty-card">
          <h1>Your cart is empty</h1>
          <p> Add products to your cart before checking out.
          </p>
          <Link to="/" className="checkout-primary-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="checkout-logo">
          Addis Shop
        </Link>
        <div className="checkout-secure">
          <Lock size={18} />
          <span>Secure Checkout</span>
        </div>
      </header>
      <form className="checkout-layout" onSubmit={handleSubmit} >
        <main className="checkout-main">
          <div className="checkout-page-title">
            <h1>Checkout</h1>
            <p>Review your order and complete your purchase.</p>
          </div>
          <section className="checkout-section">
            <div className="section-heading">
              <div>
                <span className="section-number">1</span>
                <div>
                  <h2>Review your order</h2>
                  <p>{cartItems.length} item(s) in your cart</p>
                </div>
              </div>
            </div>
            <div className="checkout-products">
              {cartProducts.map((item) => (
                <div className="checkout-product" key={item.id} >
                  <Link to={`/product/${item.product.id}`} className="checkout-product-image">
                    <img src={item.product.thumbnail} alt={item.product.title} />
                  </Link>
                  <div className="checkout-product-info">
                    <Link to={`/product/${item.product.id}`}
                      className="checkout-product-title" >
                      {item.product.title}
                    </Link>
                    <p className="checkout-product-price">
                      {item.product.price.toFixed(2)} ETB
                    </p>
                    <p className="checkout-stock">
                      In stock
                    </p>
                    <div className="checkout-quantity">
                      <button  type="button"
                        onClick={() => updateQuantity(
                            item.product.id, Math.max(1, item.quantity - 1)
                          )
                        } >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        } >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="checkout-product-right">
                    <strong>
                      {(item.product.price * item.quantity).toFixed(2)} ETB
                    </strong>
                    <button type="button"  className="remove-product"
                      onClick={() => removeFromCart(item.product.id)
                      } >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="checkout-section">
            <div className="section-heading">
              <div>
                <span className="section-number">2</span>
                <div>
                  <h2>Shipping information</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>
            </div>
            <div className="checkout-form">
              <div className="form-group full-width">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'input-error' : ''}
                />
                {formErrors.email && (
                  <span className="form-error">
                    {formErrors.email}
                  </span>
                )}
                <small>
                  Email confirmation sent.
                </small>
              </div>
              <div className="form-group full-width">
                <label>Country or region</label>
                <select  name="country"
                  value={formData.country}
                  onChange={handleInputChange}>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Canada">Canada</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? 'input-error' : ''}
                />
                {formErrors.firstName && (
                  <span className="form-error">
                    {formErrors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Last name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? 'input-error' : ''}
                />

                {formErrors.lastName && (
                  <span className="form-error">
                    {formErrors.lastName}
                  </span>
                )}
              </div>

              <div className="form-group full-width">
                <label>Street address</label>

                <input
                  type="text"
                  name="address"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? 'input-error' : ''}
                />

                {formErrors.address && (
                  <span className="form-error">
                    {formErrors.address}
                  </span>
                )}
              </div>

              <div className="form-group full-width">
                <label>Apartment, suite, etc. (optional)</label>

                <input
                  type="text"
                  name="address2"
                  placeholder="Apartment, suite, unit"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={formErrors.city ? 'input-error' : ''}
                />

                {formErrors.city && (
                  <span className="form-error">
                    {formErrors.city}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Region</label>

                <input
                  type="text"
                  name="region"
                  placeholder="Region / State"
                  value={formData.region}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Postal code</label>

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+251 9XX XXX XXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'input-error' : ''}
                />
                {formErrors.phone && (
                  <span className="form-error">
                    {formErrors.phone}
                  </span>
                )}
              </div>
            </div>
          </section>
          {/* Payment */}
          <section className="checkout-section">
            <div className="section-heading">
              <div>
                <span className="section-number">3</span>
                <div>
                  <h2>Payment method</h2>
                  <p>Choose how you want to pay.</p>
                </div>
              </div>
            </div>

            <div className="payment-options">

              <label
                className={`payment-option ${
                  paymentMethod === 'telebirr'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="telebirr"
                  checked={paymentMethod === 'telebirr'}
                  onChange={handlePaymentChange}
                />

                <div className="payment-icon">
                  <Smartphone size={24} />
                </div>
                <div className="payment-content">
                  <strong>Telebirr</strong>
                  <span>
                    Pay using your Telebirr account.
                  </span>
                </div>
              </label>
              <label
                className={`payment-option ${
                  paymentMethod === 'cbe-birr'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cbe-birr"
                  checked={paymentMethod === 'cbe-birr'}
                  onChange={handlePaymentChange}
                />

                <div className="payment-icon">
                  <Wallet size={24} />
                </div>

                <div className="payment-content">
                  <strong>CBE Birr</strong>
                  <span>
                    Pay using your CBE Birr account.
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === 'awash'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="awash"
                  checked={paymentMethod === 'awash'}
                  onChange={handlePaymentChange}
                />

                <div className="payment-icon">
                  <Building2 size={24} />
                </div>

                <div className="payment-content">
                  <strong>Awash Bank</strong>
                  <span>
                    Pay using Awash Bank payment.
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === 'cbe'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cbe"
                  checked={paymentMethod === 'cbe'}
                  onChange={handlePaymentChange}
                />

                <div className="payment-icon">
                  <CreditCard size={24} />
                </div>

                <div className="payment-content">
                  <strong>CBE</strong>
                  <span>
                    Pay using CBE banking services.
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === 'cash'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentChange}
                />

                <div className="payment-icon">
                  <Wallet size={24} />
                </div>

                <div className="payment-content">
                  <strong>Cash on Delivery</strong>
                  <span>
                    Pay when your order is delivered.
                  </span>
                </div>
              </label>

            </div>

            {formErrors.payment && (
              <span className="form-error payment-error">
                {formErrors.payment}
              </span>
            )}

            {paymentMethod && (
              <div className="payment-notice">
                <Lock size={17} />

                <span>
                  Payment processing. Real payment integration will be connected
                  through a backend later.
                </span>
              </div>
            )}
          </section>
        </main>
  {/* Order Summary */}
  <aside className="order-summary">
    <h2>Order Summary</h2>
      <div className="summary-items">
        {cartProducts.map((item) => (
        <div className="summary-item" key={item.id} >
          <img src={item.product.thumbnail}alt={item.product.title}  />
        <div>
          <span>{item.product.title}</span>
            <small>
              Qty: {item.quantity}
            </small>
        </div>
        <strong>
            {(item.product.price * item.quantity).toFixed(2)} ETB
        </strong>
        </div>
    ))}
    </div>
    <div className="summary-divider"></div>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} ETB</span>
      </div>
    <div className="summary-row">
      <span>Shipping</span>
      <span>{SHIPPING_FEE.toFixed(2)} ETB</span>
      </div>

   {discount > 0 && (
      <div className="summary-row discount">
        <span>Discount</span>
        <span>- {discount.toFixed(2)} ETB</span>
      </div>
    )}

    <div className="coupon-section">
      <input
        type="text"
        placeholder="Coupon code"
        value={coupon}
        onChange={(event) =>
        setCoupon(event.target.value)
      }
      />

    <button  type="button" onClick={handleCoupon}  >
        Apply
    </button>
  </div>
      {couponMessage && (
        <p className={ discount > 0
          ? 'coupon-message success'
          : 'coupon-message'
          }  >
      {couponMessage}
        </p>  )}

  <div className="summary-divider"></div>
    <div className="summary-total">
      <span>Total</span>
      <strong>{total.toFixed(2)} ETB</strong>
  </div>
  <button  type="submit"
    className="confirm-payment-button"  >
      Confirm and Pay
  </button>
    <div className="secure-message">
      <Lock size={18} />
      <div>
      <strong>Secure Checkout</strong>
      <span>
        Your information is protected during checkout.
      </span>
    </div>
    </div>
  </aside>
  </form>
  </div>
  );
}

export default Checkout;