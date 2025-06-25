
import React from 'react';
import { Clock, Star } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  duration: string;
  rating: number;
  coverUrl?: string;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  title, 
  author, 
  duration, 
  rating, 
  coverUrl, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer p-4 hover:scale-105"
    >
      <div className="flex space-x-4">
        <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
          {coverUrl ? (
            <img src={coverUrl} alt={title} className="w-full h-full object-cover rounded-md" />
          ) : (
            <div className="text-lg font-bold text-blue-600">{title.charAt(0)}</div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">{author}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
