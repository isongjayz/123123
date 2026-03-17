// AE-GUNG - K 콘텐츠 관련 큐레이션 페이지 (준비 중)
import { Link } from 'react-router-dom';
import './style.scss';
import MainVisual from '../../components/aegung/MainVisual';
import About from '../../components/aegung/About';
import Banner from '../../components/aegung/Banner';
import Product from '../../components/aegung/Product';

const AeGung = () => {
    return (
        <div className="aegung">
            <MainVisual />
            <About />
            <Product />
            {/* <Packaging />
            <SpecialStores /> */}

        </div>
    );
};
export default AeGung;
