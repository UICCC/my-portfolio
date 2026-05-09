'use client';

import { useState } from 'react';
import { DynaPuff } from 'next/font/google';

const dyna = DynaPuff({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f1f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 51, 102, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2
            className={dyna.className}
            style={{
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #fff 0%, #ff3366 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get In Touch
          </h2>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '16px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Have a question or want to work together? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(75, 192, 75, 0.1)',
              border: '1px solid rgba(75, 192, 75, 0.3)',
              color: '#4bc04b',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px',
              animation: 'slideIn 0.3s ease',
            }}
          >
            <style>
              {`
                @keyframes slideIn {
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(255, 71, 87, 0.1)',
              border: '1px solid rgba(255, 71, 87, 0.3)',
              color: '#ff4757',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px',
              animation: 'slideIn 0.3s ease',
            }}
          >
            {error}
          </div>
        )}

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Name Input */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#ff3366',
                marginBottom: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.border = '1px solid rgba(255, 51, 102, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#ff3366',
                marginBottom: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.border = '1px solid rgba(255, 51, 102, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#ff3366',
                marginBottom: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              required
              rows="6"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.border = '1px solid rgba(255, 51, 102, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '14px 28px',
              background: isLoading ? 'rgba(255, 51, 102, 0.5)' : '#ff3366',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.background = '#e02255';
                e.target.style.boxShadow = '0 8px 28px rgba(255, 51, 102, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.background = '#ff3366';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Alternative Contact */}
        <div
          style={{
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 51, 102, 0.2)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          >
            Or reach out directly:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a
              href="mailto:your.email@example.com"
              style={{
                color: '#ff3366',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ff3366';
                e.target.style.textDecoration = 'none';
              }}
            >
              📧 your.email@example.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff3366',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ff3366';
                e.target.style.textDecoration = 'none';
              }}
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
