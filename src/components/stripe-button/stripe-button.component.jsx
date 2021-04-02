import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IbfH9FOKjAGcWELKkpzixa77U1MLn4f52YrozZPzTVjCDPePu03xhE7GcemY5agAlp9HyjtbCRpjfRfGtavzzrv00cy6BmJ3F';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Distro Ltd.'
            billingAddress
            shippingAddress
            image='https://freesvg.org/storage/img/thumb/1616928666star-shape-logo-element.png'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;