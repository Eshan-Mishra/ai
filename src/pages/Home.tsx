import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Clock, Star, Briefcase, TrendingUp, GraduationCap, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLearnNow = () => {
    if (isAuthenticated) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  };

  const featuredCourses = [
    {
      id: 1,
      title: 'Fundamentals of AI',
      description: 'Master the basics of artificial intelligence and machine learning',
      duration: '8 weeks',
      level: 'Beginner',
      students: 1234,
      price: 99,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600'
    },
    {
      id: 2,
      title: 'Advanced Prompt Engineering',
      description: 'Learn to craft effective prompts for AI models and LLMs',
      duration: '6 weeks',
      level: 'Intermediate',
      students: 856,
      price: 149,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1686191128892-3e72b3b0f3c4?auto=format&fit=crop&q=80&w=800&h=600'
    }
  ];

  const careerOpportunities = [
    {
      title: 'AI Engineer',
      salary: '$120,000 - $200,000',
      icon: Briefcase,
    },
    {
      title: 'Prompt Engineer',
      salary: '$90,000 - $150,000',
      icon: TrendingUp,
    },
    {
      title: 'AI Research Scientist',
      salary: '$130,000 - $250,000',
      icon: GraduationCap,
    },
    {
      title: 'AI Product Manager',
      salary: '$100,000 - $180,000',
      icon: DollarSign,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master AI & Prompt Engineering
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Learn from industry experts in collaboration with Google Developer Group
              and AWS Community Vadodara
            </p>
            <button
              onClick={handleLearnNow}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Career Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Launch Your Career in AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerOpportunities.map((career, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <career.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                <p className="text-gray-600">Average Salary Range:</p>
                <p className="text-blue-600 font-semibold">{career.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Star className="h-5 w-5 mr-2" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="line-through text-gray-400 mr-2">${course.originalPrice}</span>
                      <span className="text-blue-600 font-semibold">${course.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLearnNow}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Learn Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Program?</h2>
            <p className="text-xl text-gray-600">Transform your career with industry-recognized certification</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Industry Recognition</h3>
              <p className="text-gray-600">
                Earn certificates recognized by leading tech companies. Our certification
                adds credibility to your resume.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Mentorship</h3>
              <p className="text-gray-600">
                Learn directly from industry professionals with years of experience in
                AI and prompt engineering.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Practical Learning</h3>
              <p className="text-gray-600">
                Work on real-world projects and build a portfolio that showcases your
                skills to potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;