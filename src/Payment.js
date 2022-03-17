import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";
import axios from './axios';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded]=useState(false);
    const [processing, setProcessing]=useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        // generate teh stripe secret
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe exects the total in a currencies submits
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (event) =>{
        // all the fancy stripe ..
        event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {payment_method: {
            card: elements.getElement(CardElement)
        }
        }).then(({ paymentIntent }) => {
            // paymentIntent = pyment confirmation
            setSucceeded(true)
            setError(false)
            setProcessing(false)
            navigate('/orders')
        })
    }

    const handleChange = event =>{
        //listen for change
        // and affiche les erreure eventuelle
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

  return (
    <div className="payment">
        <div className="payment__container">
            <h1>Checkout ({basket?.length} items)</h1>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles</p>
                </div>
            </div>
            
            <div className="payment__section">
            <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className="payment__section">
            <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/** erroe */}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment