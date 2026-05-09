'use client';

import { useEffect, useRef, useState } from 'react';
import { DynaPuff } from 'next/font/google';

const dyna = DynaPuff({
  subsets: ['latin'],
  weight: ['700'],
});

const skillsData = {
  'Languages': [
    { name: 'JavaScript', icon: '⚙️', color: '#F7DF1E' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Java', icon: '☕', color: '#007396' },
    
    { name: 'HTML/CSS', icon: '🎨', color: '#E34C26' },
    { name: 'JavaScript', icon: '📘', color: '#3178C6' },
    { name: 'SQL', icon: '🗄️', color: '#336791' },
  ],
  'Frontend': [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Tailwind CSS', icon: '🎯', color: '#06B6D4' },
    { name: 'Vue.js', icon: '💚', color: '#4FC08D' },
    { name: 'Redux', icon: '🔄', color: '#764ABC' },
  ],
  'Backend': [
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Express.js', icon: '⚙️', color: '#000000' },
    { name: 'MongoDB', icon: '🍃', color: '#13AA52' },
    { name: 'REST API', icon: '🔌', color: '#FF6B6B' },
  ],
  'Tools & DevOps': [
    { name: 'Git', icon: '🔗', color: '#F1502F' },
    { name: 'VS Code', icon: '💻', color: '#007ACC' },
    { name: 'Figma', icon: '🎭', color: '#F24E1E' },
    { name: 'Linux', icon: '🐧', color: '#FCC624' },
    { name: 'GitHub', icon: '🐙', color: '#181717' },
  ],
  'Concepts': [
    { name: 'Data Structures', icon: '📊', color: '#FF6B9D' },
    { name: 'Algorithms', icon: '🧩', color: '#C44569' },
    { name: 'OOP', icon: '🏗️', color: '#A8E6CF' },
    { name: 'DBMS', icon: '💾', color: '#FFD3B6' },
    { name: 'Web Development', icon: '🌐', color: '#FFAAA5' },
  ],
};

function SkillCard({ skill, index, categoryLength }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '20px',
        borderRadius: '12px',
        background: isHovered
          ? 'rgba(255, 51, 102, 0.15)'
          : 'rgba(255, 255, 255, 0.05)',
        border: isHovered
          ? '1.5px solid #ff3366'
          : '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 12px 28px rgba(255, 51, 102, 0.2), 0 0 20px rgba(255, 51, 102, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          marginBottom: '12px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
          display: 'inline-block',
        }}
      >
        {skill.icon}
      </div>

      <h3
        style={{
          color: isHovered ? '#ff3366' : '#fff',
          fontSize: '14px',
          fontWeight: 600,
          transition: 'color 0.3s ease',
          margin: '0',
          marginBottom: '8px',
        }}
      >
        {skill.name}
      </h3>

      {/* Progress bar effect */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: isHovered ? '100%' : '0%',
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}, #ff3366)`,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}

function SkillCategory({ categoryName, skills }) {
  const [isVisible, setIsVisible] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => {
      if (categoryRef.current) {
        observer.unobserve(categoryRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={categoryRef}
      style={{
        marginBottom: '50px',
        opacity: isVisible ? 1 : 0.5,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}
    >
      <h3
        className={dyna.className}
        style={{
          fontSize: '20px',
          color: '#ff3366',
          marginBottom: '24px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#ff3366',
            boxShadow: '0 0 12px rgba(255, 51, 102, 0.6)',
          }}
        />
        {categoryName}
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
        }}
      >
        {skills.map((skill, index) => (
          <SkillCard
            key={`${categoryName}-${skill.name}`}
            skill={skill}
            index={index}
            categoryLength={skills.length}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
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
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 51, 102, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 20s infinite ease-in-out',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 25s infinite ease-in-out reverse',
          pointerEvents: 'none',
        }}
      />

      {/* Keyframe animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
          }

          @keyframes shimmer {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
      </style>

      <div
        style={{
          maxWidth: '1200px',
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
            My Skills
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
            A comprehensive overview of the technologies, languages, and tools I've mastered
            as a Computer Science student
          </p>
        </div>

        {/* Skills Grid */}
        <div>
          {Object.entries(skillsData).map(([category, skills]) => (
            <SkillCategory
              key={category}
              categoryName={category}
              skills={skills}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
            animation: 'bounce 2s infinite',
          }}
        >
          <style>
            {`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); opacity: 0.6; }
                50% { transform: translateY(12px); opacity: 1; }
              }
            `}
          </style>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.6';
            }}
            onClick={() => {
              window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              More
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                color: '#ff3366',
                animation: 'float-down 2s infinite',
              }}
            >
              <style>
                {`
                  @keyframes float-down {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(8px); }
                  }
                `}
              </style>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
