import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

  return (
    <motion.div 
      className="about-container"
      initial={{
        opacity: 0
      }}
      animate={{
          opacity: 1
      }}
      exit={{
          opacity: 0
      }}
      transition={{ 
          duration: 1, 
          ease: "easeInOut" 
      }} // Smooth transition
    >
      
      {/* Section 1: Our Story */}
      <section className="about-section">
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image1.jpeg`}
          alt="Bookstore Journey"
          className="about-image left"
        />
        <div className="about-text">
          <h1>Our Story: The Passion for Books</h1>
          <p>
            From a small corner in our hearts to an expansive online collection, 
            our journey began with a simple love for books. We believe that every 
            book holds a universe within its pages — a universe of knowledge, 
            adventure, inspiration, and transformation. What started as a humble 
            endeavor has grown into an extensive online bookstore offering a wide 
            variety of books for readers of all ages and interests. Explore our 
            carefully curated collection and discover a world of literary treasures.
          </p>
        </div>
      </section>

      {/* Section 2: A World of Endless Possibilities */}
      <section className="about-section">
        <div className="about-text">
          <h1>A World of Endless Possibilities</h1>
          <p>
            At our bookstore, we celebrate diversity in literature. We offer a 
            selection that spans from thrilling fiction novels and thought-provoking 
            non-fiction to engaging children's stories and insightful business guides. 
            Whether you're a lover of art, a fan of fantasy, or searching for the next 
            big read in self-help, we have something for everyone. Dive into our vast 
            collection and let your reading journey begin.
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image2.jpeg`}
          alt="Diverse Books Collection"
          className="about-image right"
        />
      </section>

      {/* Section 3: Why Choose Us? */}
      <section className="about-section">
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image3.jpeg`}
          alt="Customer Satisfaction"
          className="about-image left"
        />
        <div className="about-text">
          <h1>Why Choose Us?</h1>
          <p>
            We don’t just sell books; we offer an experience. Every title in our 
            collection is handpicked with love, care, and the understanding of its 
            value to our readers. We partner with authors and publishers worldwide 
            to bring you high-quality, carefully chosen books at competitive prices. 
            Our customer support is always ready to assist, ensuring you have the 
            best shopping experience. Join our community of book enthusiasts and 
            discover the joy of reading with us.
          </p>
        </div>
      </section>

      {/* Section 4: The Gift of Reading */}
      <section className="about-section">
        <div className="about-text">
          <h1>The Gift of Reading</h1>
          <p>
            Books make the perfect gift — whether it’s for a birthday, a special 
            celebration, or simply to show someone you care. We offer beautifully 
            packaged gift sets, personalized recommendations, and gift cards for when 
            you’re unsure what to choose. We believe that gifting a book is more than 
            just a present; it’s a shared experience, a story waiting to be told. 
            Explore our gift section and find the perfect book for your loved ones.
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image4.jpeg`}
          alt="Gifting Books"
          className="about-image right"
        />
      </section>

      {/* Section 5: Join Our Community */}
      <section className="about-section">
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image5.jpeg`}
          alt="Community of Readers"
          className="about-image left"
        />
        <div className="about-text">
          <h1>Join Our Community of Book Lovers</h1>
          <p>
            Reading is more than a hobby — it’s a lifestyle. Our bookstore is a 
            vibrant community of book enthusiasts who share a passion for literature. 
            Join our newsletter to get updates on new arrivals, exclusive deals, 
            author interviews, and book club events. Connect with us on social media 
            and be part of our growing family of readers. Together, let’s explore the 
            wonderful world of books and discover stories that inspire and transform.
          </p>
        </div>
      </section>

      {/* Section 6: Your Journey Begins Here */}
      <section className="about-section">
        <div className="about-text">
          <h1>Your Journey Begins Here</h1>
          <p>
            At our bookstore, every reader deserves a book that resonates with their 
            soul. We aim to be your go-to source for all your reading needs. From 
            trending books to literary classics, we invite you to take your time 
            exploring our collection. Your next great read is just a click away — 
            start shopping now and experience the magic of books like never before!
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/about/image6.jpeg`}
          alt="Start Your Reading Journey"
          className="about-image right"
        />
      </section>
    </motion.div>
  );
};

export default About;