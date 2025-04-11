import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterClick = () => {
    navigate('/products', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Images with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://creedboutique.com/cdn/shop/files/enhanced_2800x1875_eladaria.jpg?v=1742323470&width=2000"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 transition-transform duration-[2s] transform"
            style={{ 
              transform: `${isVisible ? 'scale(1)' : 'scale(1.05)'} translateY(${scrollY * 0.5}px)`,
              filter: 'brightness(0.9)'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"
            style={{ backdropFilter: 'blur(1px)' }}
          ></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        </div>
        
        {/* Animated Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite'
          }}
        ></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Main Title */}
          <div className="relative mb-4">
            <h1 
              className={`text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.3em] transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: '300ms',
                textShadow: '0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              EASY PARFUM
            </h1>
            <div 
              className={`h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-0 transition-all duration-[1.5s] mx-auto ${
                isVisible ? 'w-full' : 'w-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            ></div>
          </div>
          
          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-white/90 mb-16 tracking-[0.2em] font-light transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: '600ms',
              textShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            ƏTRLƏRIN ECAZKAR DÜNYASINA XOŞ GƏLMİSİNİZ
          </p>

          {/* Enter Button */}
          <button
            onClick={handleEnterClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex flex-col items-center gap-3 text-white group transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: '900ms',
              filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))'
            }}
          >
            <span className="text-base tracking-[0.2em] font-light transition-all duration-300 transform group-hover:scale-110">
              DAXIL OL
            </span>
            <div className={`w-14 h-14 rounded-full border-2 border-white flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'bg-white text-black scale-110 rotate-180' : 'bg-transparent text-white'
            }`}>
              <ArrowDown className={`w-6 h-6 transition-all duration-500`} />
            </div>
          </button>

          {/* Decorative Elements */}
          <div 
            className={`absolute left-10 top-1/2 w-[1px] h-0 bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-1000 ${
              isVisible ? 'h-[200px]' : 'h-0'
            }`}
            style={{ transitionDelay: '1200ms' }}
          ></div>
          <div 
            className={`absolute right-10 top-1/2 w-[1px] h-0 bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-1000 ${
              isVisible ? 'h-[200px]' : 'h-0'
            }`}
            style={{ transitionDelay: '1200ms' }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Home;