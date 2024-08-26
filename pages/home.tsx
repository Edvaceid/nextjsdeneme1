// pages/home.tsx

import React from 'react';
import { FaCoffee, FaFilter, FaMugHot, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const coffeeRecipes = [
  {
    title: 'Espresso',
    icon: <FaCoffee size={60} className="text-yellow-500" />,
    steps: [
      'Kahve çekirdeklerini ince öğütün.',
      'Portafiltreyi hazırlayın ve kahveyi sıkıştırın.',
      'Makineyi ısıtın ve suyu portafiltreden geçirin.',
      'Servis edin ve tadını çıkarın.',
    ],
    image: '/images/espresso.jpg',
  },
  {
    title: 'French Press',
    icon: <FaMugHot size={60} className="text-green-500" />,
    steps: [
      'Orta-kalınlıkta kahve çekirdeklerini öğütün.',
      'French Press’i ısıtın ve kahveyi ekleyin.',
      'Sıcak suyu ekleyin ve 4 dakika demleyin.',
      'Pistonu bastırın ve kahveyi dökün.',
    ],
    image: '/images/french-press.jpg',
  },
  {
    title: 'Pour Over',
    icon: <FaFilter size={60} className="text-blue-500" />,
    steps: [
      'Orta-ince kahve çekirdeklerini öğütün.',
      'Filtreyi yıkayın ve kahveyi ekleyin.',
      'Yavaşça sıcak suyu dökün ve kahvenin demlenmesini bekleyin.',
      'Kahveyi fincana dökün ve tadını çıkarın.',
    ],
    image: '/images/pour-over.jpg',
  },
  {
    title: 'Aeropress',
    icon: <FaLeaf size={60} className="text-red-500" />,
    steps: [
      'İnce kahve çekirdeklerini öğütün.',
      'Filtreyi yerleştirin ve ıslatın.',
      'Kahveyi ekleyin ve sıcak suyu dökün.',
      'Pistonu bastırarak kahveyi çıkarın.',
    ],
    image: '/images/aeropress.jpg',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/coffee-bg.jpg')" }}>
      <div className="bg-black bg-opacity-50 min-h-screen p-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-center text-white mb-12"
        >
          3. Nesil Kahve Tarifleri
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {coffeeRecipes.map((recipe, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 opacity-20"
              />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  {recipe.icon}
                  <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>
                </div>
                <ol className="mt-4 list-decimal list-inside space-y-3 text-gray-700 text-lg">
                  {recipe.steps.map((step, stepIndex) => (
                    <motion.li
                      key={stepIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                      className="relative pl-4"
                    >
                      <span className="absolute left-0 top-0 text-xl">☕</span> {step}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
