import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [beansPositions, setBeansPositions] = useState(
    Array.from({ length: 10 }).map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialMousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      setMousePosition(initialMousePosition);
      setBeansPositions(
        Array.from({ length: 10 }).map((_, index) => ({
          x: initialMousePosition.x + index * 15,
          y: initialMousePosition.y + index * 15,
        }))
      );

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const isCaught = (position: { x: number; y: number }, target: { x: number; y: number }) => {
    const distance = Math.sqrt(
      (target.x - position.x) * (target.x - position.x) +
      (target.y - position.y) * (target.y - position.y)
    );
    return distance < 2;
  };

  useEffect(() => {
    const animateBeans = () => {
      setBeansPositions((prevPositions) => {
        return prevPositions.map((position, index) => {
          const target = index === 0 ? mousePosition : prevPositions[index - 1];
          if (!isCaught(position, target)) {
            const dx = target.x - position.x;
            const dy = target.y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = Math.min(distance / 20, 10);

            return {
              x: position.x + (dx / distance) * speed,
              y: position.y + (dy / distance) * speed,
            };
          }
          return position;
        });
      });

      requestAnimationFrame(animateBeans);
    };

    animateBeans();
  }, [beansPositions, mousePosition]);

  const handleNavigate = () => {
    router.replace('/home');  // Home sayfasına anında geçiş yapılmasını sağlar
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/coffee-bg.jpg')",
        cursor: "url('/images/coffee-cup.png'), auto",
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center relative overflow-hidden">
        {beansPositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: position.x - 25,
              top: position.y - 25,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image src="/images/coffee-beans.png" alt="Coffee Bean" width={35} height={35} />
          </motion.div>
        ))}

        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg relative z-10"
        >
          <div className="flex justify-center mb-6">
            <Image src="/images/coffee-icon.png" alt="Coffee Icon" width={60} height={60} />
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); handleNavigate(); }} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-600 hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
