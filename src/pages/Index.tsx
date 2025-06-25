
import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AudioPlayer from '@/components/AudioPlayer';
import BookCard from '@/components/BookCard';

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      duration: "4h 32m",
      rating: 4.5,
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      duration: "12h 15m",
      rating: 4.8,
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      duration: "8h 43m",
      rating: 4.7,
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      duration: "11h 28m",
      rating: 4.6,
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BookBeacon
              </h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search books or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedBook ? (
          <div className="max-w-md mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedBook(null)}
              className="mb-4"
            >
              ← Back to Library
            </Button>
            <AudioPlayer
              title={selectedBook.title}
              author={selectedBook.author}
              audioUrl={selectedBook.audioUrl}
            />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Audiobook Library</h2>
              <p className="text-gray-600">Discover and listen to your favorite books</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  duration={book.duration}
                  rating={book.rating}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No books found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
