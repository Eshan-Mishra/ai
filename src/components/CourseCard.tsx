import React from 'react';
import { BookOpen, Clock, Star, Users } from 'lucide-react';

interface CourseProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  students: number;
  image: string;
  price: number;
  originalPrice: number;
}

const CourseCard = ({ title, description, duration, level, students, image, price, originalPrice }: CourseProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
          <span className="line-through text-gray-300 mr-2">${originalPrice}</span>
          <span className="font-semibold">${price}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Clock className="h-5 w-5 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Star className="h-5 w-5 mr-2" />
            <span>{level}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-2" />
            <span>{students} students enrolled</span>
          </div>
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;