import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
/**
 * We're using the Layout component to wrap the Home component.
 * The Layout component is a wrapper component that will be
 * used to wrap all the pages in the application.
 * It will be used to add the header and footer to the pages.
 * The Layout component is imported from the components folder
 * @returns A function that returns a Layout component with a div that contains a grid of ProductItem components.
 */
export default function Home() {
    return (
        <Layout title={'Home Page'}>
            <div className={'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'}>
                {data.products.map((product) => (
                    <ProductItem key={product.slug} product={product}/>
                ))}
            </div>
        </Layout>
    )
}
