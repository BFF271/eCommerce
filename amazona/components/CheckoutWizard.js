/* Importing the React library. */
import React from 'react';

/**
 * It returns the CheckoutWizard component.
 * @param [activeStep=0] - The current step of the checkout process.
 * @returns It returns the CheckoutWizard component.
 */
export default function CheckoutWizard( { activeStep = 0 } ) {
    return (
        <div className={ 'mb-5 flex flex-wrap' }>
            {
                [ 'User Login', 'Shipping Address', 'Payment Method', 'Place Order' ].map(
                    ( step, index ) => (
                        <div
                            key={ step }
                            className={ `flex-1 border-b-2 text-center
                                ${
                                index <= activeStep
                                ? 'border-indigo-700 text-indigo-700'
                                : 'border-gray-300 text-gray-300'
                            }
                            ` }
                        >
                            { step }
                        </div>
                    )
                )
            }
        </div>
    );
}