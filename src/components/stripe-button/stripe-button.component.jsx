import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_d2ZDzEGW1Lws9pPMIGTr4SqF00uftfGdKf';

   const onToken = token =>{
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
        label='Pay Now' 
        name='Tan Comp'
        billingAddress
        shippingAddress
        image='https://assets2.ignimgs.com/2014/12/13/batman-akpng-877731.png?width=1280'
        description={`Total: ${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )

}

export default StripeCheckoutButton;