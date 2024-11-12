import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaHome, FaPhone, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate email format
      if (!validateEmail(formData.email)) {
        setModalMessage('Kindly input a valid email address');
        setShowModal(true);
        return;
      }
  
      // Structure the data to be sent with EmailJS
      const templateParams = {
        from_name: formData.firstName,
        from_email: formData.email,
        to_name: 'Ogbonna Blessed', // Your name as the recipient
        message: formData.message,
      };
  
      // Send email using EmailJS
      emailjs.send('service_hqfwqmk', 'template_pd3kupt', templateParams, 'tigbX2rKt4LPzq3U6')
        .then((result) => {
          // Success message
          setModalMessage('Your message has been received, and we\'ll get in touch with you shortly.');
          setShowModal(true);
  
          // Reset form data after sending
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          });
        }, (error) => {
          // Error handling
          setModalMessage('Something went wrong. Please try again later.');
          setShowModal(true);
        });
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);

      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [showModal]);

  return (
    <motion.div 
      className='contact-container'
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
      <div className='contact-form'>
        <div className='reach-us-text'>
          <p className='get-in-touch'>Get in Touch</p>
          <div>Let's Chat, Reach Out To Us</div>
          <p>Have questions or feedback? We are here to help. Send us a message, and we'll reply in the next 24 hours.</p>
        </div>
        <form className='input-container' onSubmit={handleSubmit}>
            <div className="name-box">
                <div className="name">
                    <p>First name</p>
                    <input 
                        type="text" 
                        placeholder='First name'
                        required
                        name='firstName'
                        id='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />
                </div>
                <div className="name">
                    <p>Last name</p>
                    <input 
                        type="text" 
                        placeholder='Last name'
                        required
                        name='lastName'
                        id='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />
                </div>
            </div>
            <div className="input-box">
                <p>Email Address</p>
                <input 
                    type="email" 
                    placeholder='Email address'
                    required
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
            </div>
            <div className="input-box">
                <p>Message</p>
                <textarea 
                    name="message"
                    placeholder='Leave us a message'
                    id='message'
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    autoComplete='off'
                ></textarea>
            </div>
            <button type="submit">Submit</button>
            <Link to='/'>
                <FaHome className='back-to-home'/>
            </Link>
        </form>
      </div>
      <div className='contact-form-right'>
        <img src={`${process.env.PUBLIC_URL}/images/contact-us.jpeg`} alt="" />
        <div className='more-contact-details'>
            <div className='_more-contact-details'>
                <FaEnvelope className='contact-icon-1'/>
                <div>
                    <p>Email</p>
                    <p>bookfield@support.com</p>
                </div>
            </div>
            <div className='_more-contact-details'>
                <FaPhone className='contact-icon-2'/>
                <div>
                    <p>Phone</p>
                    <p>(+234) 9088776346</p>
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal &&
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-container"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-box"
            >
              <FaTimes 
                className='close-modal'
                onClick={() => setShowModal(false)}
              />
              <p className='modal-text'>{modalMessage}</p>
              <motion.div className="actions">
                <button type="button" onClick={() => setShowModal(false)}>OK</button>
              </motion.div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default Contact
