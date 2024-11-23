import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const courses = [
  {
    id: 1,
    title: 'Fundamentals of AI',
    description: 'Learn the basics of artificial intelligence and machine learning with hands-on projects',
    duration: '8 weeks',
    level: 'Beginner',
    students: 1234,
    price: 99,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'AI Fundamentals',
    originalPrice: 199
  },
  {
    id: 2,
    title: 'Advanced Prompt Engineering',
    description: 'Master the art of crafting effective prompts for AI models and LLMs',
    duration: '6 weeks',
    level: 'Intermediate',
    students: 856,
    price: 149,
    category: 'Prompt Engineering',
    originalPrice: 249,
   
  },
  {
    id: 3,
    title: 'AI Applications Development',
    description: 'Build practical AI applications using modern frameworks and best practices',
    duration: '10 weeks',
    level: 'Advanced',
    students: 567,
    category: 'Development',
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
    
  },
  {
    id: 4,
    title: 'LLM Fine-tuning Masterclass',
    description: 'Learn advanced techniques for fine-tuning large language models',
    duration: '8 weeks',
    level: 'Advanced',
    category: 'AI Advanced',
    originalPrice: 349,
    price: 249,
    image: 'https://images.unsplash.com/photo-1686191128892-3e72b3b0f3c4?auto=format&fit=crop&q=80&w=800&h=600',
     
  }
];

const categories = ['All', 'AI Fundamentals', 'Prompt Engineering', 'Development', 'AI Advanced'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Available Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Choose from our selection of professional courses in AI and prompt engineering
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:ring-blue-500 focus:border-blue-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              duration={course.duration}
              level={course.level}
              students={course.students ?? 0}
              image={course.image ?? 'https://via.placeholder.com/800x600'}
              price={course.price ?? 0}
              originalPrice={course.originalPrice ?? 0}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;