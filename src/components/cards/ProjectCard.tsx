import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Lock } from 'lucide-react';
import { ROUTES } from '../../config/routes';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    duration: string;
    investment: string;
    participants: string;
    image: string;
    accessType: 'free' | 'paid';
    isVip?: boolean;
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-lift animate-scale-in ${className}`}>
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        {project.isVip && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Lock className="h-3 w-3 mr-1 animate-pulse" />
            VIP
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {project.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {project.participants}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600 font-semibold">
            {project.investment}
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              project.accessType === 'paid'
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {project.accessType === 'paid' ? 'Payante' : 'Accès gratuit'}
            </span>
            <Link
              to={ROUTES.PROJECT_DETAIL.replace(':id', project.id.toString())}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105 hover:shadow-lg"
            >
              Voir détails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;