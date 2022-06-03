import Image from "next/image";
import Link from "next/link";
import React from 'react';
/**
 * It returns a div with a link to the product page, an image, a link to the product page, a product name, a product brand,
 * a product price, and a button
 * @returns A div with a link to the product page, an image, a link to the product page, a paragraph, a paragraph, a
 * paragraph, and a button.
 */
function ProductItem({product}) {
    return (
        <div className={'card'}>
            <Link href={`/product/${product.slug}`}>
                  <Image
                      className={'rounded shadow cursor-pointer'}
                      layout={'responsive'}
                      src={product.image}
                      alt={product.name}
                      width={'100%'}
                      height={'100%'}
                  />
            </Link>
            <div className={'flex flex-col items-center justify-center p-5'}>
                <Link href={`/product/${product.slug}`}>
                    <a><h2 className={'text-lg'}>{product.name}</h2></a>
                </Link>
                <p className={'mb-2'}>{product.brand}</p>
                <p className={'mb-2'}>${product.price}</p>
                {/*<button
                    onClick={() => router.push('login?redirect=/shipping')}
                    className={'primary-button'}
                    type={'button'}
                >Add to cart</button>*/}
            </div>
        </div>
    );
}

export default ProductItem;