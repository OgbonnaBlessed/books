import React from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import './Testimonial.css'
import { motion } from 'framer-motion';

const Testimonial = () => {
    const testimonials = [
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user1.jpeg`,
            name: 'Femi Williams',
            position: 'Founder of Kings College',
            review: "The books I purchased from this store have been invaluable for both personal and academic growth. The selection is diverse, and the quality of service is top-notch!"
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user2.jpeg`,
            name: 'Deborah Grant',
            position: 'CEO of Digital Hub',
            review: "I have found some of the most insightful business and technology books here. This platform has truly enhanced my professional journey!"
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user3.jpeg`,
            name: 'Samantha Lee',
            position: 'Marketing Director at TrueVision',
            review: "Amazing collection of books! I can always rely on this store to find the latest marketing trends and inspiration for my career."
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user4.jpeg`,
            name: 'John Smith',
            position: 'Writer & Author',
            review: "I always turn to this bookstore for the latest fiction releases. Their recommendations are always spot-on, and their delivery is incredibly fast!"
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user5.jpeg`,
            name: 'Olivia Davis',
            position: 'Artist & Illustrator',
            review: "The art book section is phenomenal. I’ve discovered so many new techniques and artists through this site!"
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user6.jpeg`,
            name: 'James Wilson',
            position: 'Entrepreneur',
            review: "I always find valuable books to help with my business growth. A must-visit for any entrepreneur looking to improve their craft!"
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user7.jpeg`,
            name: 'Isabel Clark',
            position: 'Educator',
            review: "As a teacher, I rely on this bookstore to find the most relevant educational materials for my students. It’s a great resource for anyone in education."
        },
        {
            image: `${process.env.PUBLIC_URL}/images/testimonials/user8.jpeg`,
            name: 'Marcus King',
            position: 'Content Creator',
            review: "The range of books here is incredible! Whether I’m looking for something to inspire my next video or just a good read, this site has it all."
        }
    ];

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // Number of testimonials to show at a time
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    // Define animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 200 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 1, 
                ease: "easeInOut",
            } 
        }
    };

  return (
    <motion.div 
        className='testimonial-container'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
    >
        <h1>What Our Readers Say</h1>
        <Slider {...settings} className='slider'>
            {testimonials.map((testimonial, i) => (
                <div key={i} className='testimonial-card'>
                    <div className="user-box">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <div>
                            <p>{testimonial.name}</p>
                            <p className='testimonial-position'>{testimonial.position}</p>
                        </div>
                    </div>
                    <div>{testimonial.review}</div>
                </div>
            ))}
        </Slider>
    </motion.div>
  )
}

export default Testimonial