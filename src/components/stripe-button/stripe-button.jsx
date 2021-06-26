import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey =
        'pk_test_51J6XqBG9uZiLC2w8QMriDuI9cynunLnw3u8tiZjImSlybPHs3OJMLtYarCvPfny4zJq5qpsUTifZ9tA7v4q4tY9Z00nKWdke6q'
    const onToken = (token) => {
        console.log(token)
        alert('Payment successful')
    }
    return (
        <StripeCheckout
            label="Pay now"
            name="E-commerce SHOP"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price} `}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
export default StripeCheckoutButton
