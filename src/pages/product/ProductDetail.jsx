import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../store/useStore';
import ProductDetailTab from '../../components/product/ProductDetailTab';
import ProductShippingTab from '../../components/product/ProductShippingTab';
import ProductReviewTab from '../../components/product/ProductReviewTab';
import ProductAccompaniedBy from '../../components/product/ProductAccompaniedBy';
import './ProductDetail.scss';

function ProductDetail() {
    const { id } = useParams();
    const {
        fetchProducts,
        fetchProductById,
        currentProduct,
        products,
        addToCart,
    } = useStore();

    const [selectedVolume, setSelectedVolume] = useState('');
    const [activeTab, setActiveTab] = useState('details');
    const [isSetProduct, setIsSetProduct] = useState(false);

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, 0);

        const detailData = fetchProductById(id);
        if (detailData) {
            setIsSetProduct(Boolean(detailData.isSet));
            setSelectedVolume(detailData.volumes?.[0]?.volume || 'default');
        }
    }, [fetchProductById, fetchProducts, id]);

    if (!currentProduct) {
        return (
            <div className="product-detail product-detail--empty">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    const { detail, volumes } = currentProduct;
    const currentOption = volumes?.find((volume) => volume.volume === selectedVolume);
    const selectedImage = currentOption?.image || currentProduct.image;
    const displayPrice = currentOption ? currentOption.price : currentProduct.price;
    const isOutOfStock = currentOption
        ? currentOption.stock === 0
        : currentProduct.stock === 0;

    const recommendedProducts = products
        .filter(
            (product) =>
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
        )
        .slice(0, 3);

    const handleAddToCart = () => {
        if (isOutOfStock) {
            return;
        }

        const cartItem = {
            cartId: `${currentProduct.id}-${selectedVolume}`,
            productId: currentProduct.id,
            name: currentProduct.name,
            image: selectedImage,
            volume: selectedVolume,
            price: displayPrice,
            quantity: 1,
            giftWrap: false,
        };

        addToCart(cartItem);
        alert('장바구니에 담았습니다.');
    };

    const renderTabContent = () => {
        if (activeTab === 'shipping') {
            return <ProductShippingTab product={currentProduct} />;
        }

        if (activeTab === 'reviews') {
            return <ProductReviewTab productId={currentProduct.id} />;
        }

        return (
            <ProductDetailTab
                product={currentProduct}
                detail={detail}
                selectedImage={selectedImage}
            />
        );
    };

    return (
        <div className="product-detail">
            <div className="product-detail__top inner">
                <div className="product-detail__gallery">
                    <img src={selectedImage} alt={currentProduct.name} />
                </div>

                <div className="product-detail__info">
                    <nav className="product-detail__breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/product">Product</Link>
                        <span>/</span>
                        <Link to={`/product/${currentProduct.category}`} className="capitalize">
                            {currentProduct.category}
                        </Link>
                    </nav>

                    <div className="product-detail__panel">
                        <p className="product-detail__category">
                            {currentProduct.category.toUpperCase()}
                        </p>
                        <h1 className="product-detail__name">{currentProduct.name}</h1>
                        <p className="product-detail__meta">{detail?.description}</p>
                        <p className="product-detail__shipping-copy">
                            전 제품 무료배송
                            <br />
                            영업일 기준 1~3일 소요
                        </p>

                        {volumes?.length > 0 && (
                            <div className="product-detail__options">
                                <div className="product-detail__options-list">
                                    {volumes.map((volume) => (
                                        <button
                                            key={volume.volume}
                                            className={`product-detail__option-btn ${
                                                selectedVolume === volume.volume ? 'is-active' : ''
                                            } ${volume.stock === 0 ? 'is-disabled' : ''}`}
                                            onClick={() =>
                                                volume.stock > 0 &&
                                                setSelectedVolume(volume.volume)
                                            }
                                            disabled={volume.stock === 0}
                                        >
                                            {isSetProduct ? 'SET' : volume.volume}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className={`product-detail__add-btn ${
                                isOutOfStock ? 'is-disabled' : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            {displayPrice.toLocaleString()}원
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-detail__tabs-wrap">
                <div className="inner">
                    <div className="product-detail__tabs-header">
                        <button
                            className={`product-detail__tab-btn ${
                                activeTab === 'details' ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveTab('details')}
                        >
                            제품 상세
                        </button>
                        <button
                            className={`product-detail__tab-btn ${
                                activeTab === 'shipping' ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            배송 안내
                        </button>
                        <button
                            className={`product-detail__tab-btn ${
                                activeTab === 'reviews' ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            후기
                        </button>
                    </div>

                    <div className="product-detail__tabs-content">{renderTabContent()}</div>
                </div>
            </div>

            <ProductAccompaniedBy products={recommendedProducts} />
        </div>
    );
}

export default ProductDetail;
