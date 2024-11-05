import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

const BookSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef(null);

  const books = [
    {
      image: `${process.env.PUBLIC_URL}/images/Trending/view13.jpg`,
      author: 'Ernest Hemingway',
      name: 'The old man and the sea',
      description: 'The Old Man and the Sea by Ernest Hemingway is about an aging fisherman’s struggle with a giant marlin and his enduring spirit',
      quote: 'A man can be destroyed but not defeated',
      id: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
      category: 'Non-fiction'
    },
    {
      image: `${process.env.PUBLIC_URL}/images/Trending/view14.jpg`,
      author: 'Yann Martell',
      name: 'Life of Pi',
      description: 'Life of Pi by Yann Martel is about a young boy stranded on a lifeboat with a Bengal tiger, exploring survival and faith',
      quote: 'Life is a story... You can choose your story',
      id: '36c64692-677f-4f58-b5ec-0dc2cf109e27',
      category: 'Trending'
    },
    {
      image: `${process.env.PUBLIC_URL}/images/Deals for Today/view14.jpg`,
      author: 'Malcolm Gladwell',
      name: 'Talking to Strangers',
      description: 'Talking to Strangers by Malcolm Gladwell investigates the complexities and pitfalls of our interactions with unfamiliar people, revealing insights into human behavior and miscommunication',
      quote: 'The right way to talk to strangers is with caution and humility',
      id: 'bc2847e9-5323-403f-b7cf-57fde044a955',
      category: 'Business'
    },
    {
      image: `${process.env.PUBLIC_URL}/images/Best sellers/view2.jpg`,
      author: 'Peng Shepherd',
      name: 'All This and More',
      description: 'All This and More by Peng Shepherd delves into a dystopian world where love and survival intertwine, offering a powerful and imaginative narrative',
      quote: 'Even in the darkest places, there is beauty and resilience',
      id: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      category: 'Best sellers'
    },
    {
      image: `${process.env.PUBLIC_URL}/images/Best sellers/view4.jpg`,
      author: 'India Holton',
      name: 'Field Guide to Love',
      description: 'Field Guide to Love by India Holton is a whimsical romantic adventure that blends magic, humor, and heart, following a spirited journey of love and discovery',
      quote: 'Love is a map you make as you go',
      id: '5968897c-4d27-4872-89f6-5bcb052746d7',
      category: 'Children'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [books.length]);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.clientHeight);
    }
  }, [activeIndex]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        <Link 
          className="carousel-image"
          to={`/preview/${books[activeIndex].id}`}
        >
          <img src={books[activeIndex].image} alt={books[activeIndex].name} />
        </Link>
        <div className="carousel-details">
          <h2>{books[activeIndex].name}</h2>
          <h3>by {books[activeIndex].author}</h3>
          <div className='description-box'>
            <div className="description-bar">
              <div className="round-end"></div>
              <div style={{ height: descriptionHeight }} className="thin-center"></div>
              <div className="round-end"></div>
            </div>
            <p ref={descriptionRef}>{books[activeIndex].description}</p>
          </div>
        </div>
      </div>

      {/* Thumbnail slider */}
      <div className="thumbnail-container">
        <div className='quote-box'>
          <div className='top-quotation-mark'><FaQuoteLeft/></div>
          <div className='quote'>{books[activeIndex].quote}</div>
          <div className='bottom-quotation-mark'><FaQuoteRight/></div>
        </div>
        <div className="carousel-thumbnail-slider">
          {books.map((book, index) => (
            <div
              key={index}
              className={`thumbnail ${index === activeIndex ? 'active-thumbnail' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={book.image} alt={book.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookSwiper