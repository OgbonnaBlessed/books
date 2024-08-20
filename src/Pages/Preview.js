import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Preview = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(prevState => !prevState);
    }

  return (
    <>
    <Navbar />
     <div className="preview-container">
            <div className="preview-item">
                <img className='preview-image' src={`${process.env.PUBLIC_URL}/images/Trending/view1.jpg`} alt="" />
                <h1 className='title'>Book Title by <i>Ogbonna Blessed</i></h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores laudantium distinctio sequi incidunt iste maxime corporis amet perspiciatis nostrum libero commodi rerum voluptas aliquam minima placeat harum rem quidem dolorem assumenda eos, unde alias odit! Vero voluptatum ad maxime, et architecto eaque quibusdam dicta omnis temporibus cupiditate quas voluptas enim!
                </p>
                <div className="rating-box">
                    <img className='product-rating-stars' src={`${process.env.PUBLIC_URL}/images/ratings/rating-20.png`} alt="" />
                    <div className='product-rating-count'>127</div>
                </div>
                <div className="price">$1342</div>
                <div class="product-quantity-container">
                    <select class = "quantity-selector">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <button type="button">Add to cart</button>
                <FaHeart 
                    className='preview-heart-icon' 
                    onClick={handleClick}
                    style={{
                        color: clicked ? 'rgba(255, 240, 31, 0.87)' : 'white'
                    }}
                />
            </div>
     </div> 
     <Footer />
    </>
  )
}

export default Preview
