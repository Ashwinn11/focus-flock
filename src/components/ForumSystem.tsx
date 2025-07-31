import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  isLiked: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  color: string;
}

interface ForumSystemProps {
  onCreatePost: (postData: Partial<ForumPost>) => void;
  onLikePost: (postId: string) => void;
  onReplyToPost: (postId: string, content: string) => void;
  className?: string;
}

const mockCategories: ForumCategory[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Open conversations about productivity and focus',
    icon: '💬',
    postCount: 156,
    color: 'from-focus-purple to-focus-purple-light',
  },
  {
    id: 'adhd-support',
    name: 'ADHD Support',
    description: 'Neurodivergent community support and tips',
    icon: '🧠',
    postCount: 89,
    color: 'from-community-teal to-community-teal-light',
  },
  {
    id: 'study-tips',
    name: 'Study Tips',
    description: 'Share and discover effective study techniques',
    icon: '📚',
    postCount: 234,
    color: 'from-flock-coral to-flock-coral-light',
  },
  {
    id: 'success-stories',
    name: 'Success Stories',
    description: 'Celebrate wins and share achievements',
    icon: '🎉',
    postCount: 67,
    color: 'from-dopamine-yellow to-dopamine-yellow-light',
  },
  {
    id: 'accountability',
    name: 'Accountability',
    description: 'Find accountability partners and check-ins',
    icon: '🤝',
    postCount: 123,
    color: 'from-focus-purple to-community-teal',
  },
];

const mockPosts: ForumPost[] = [
  {
    id: 'post1',
    title: 'How body doubling changed my productivity game',
    content: 'I used to struggle with starting tasks, but having someone else working nearby (even virtually) has been a game-changer. The gentle accountability helps me stay focused without feeling judged.',
    authorId: 'user1',
    authorName: 'Alex Chen',
    authorAvatar: '🦊',
    category: 'success-stories',
    tags: ['body-doubling', 'productivity', 'adhd'],
    likes: 24,
    replies: 8,
    isLiked: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'post2',
    title: 'Tips for managing ADHD overwhelm during study sessions',
    content: 'When I feel overwhelmed, I break my work into 15-minute chunks and celebrate each completion. The Progress Garden feature really helps visualize my progress without the pressure of perfect streaks.',
    authorId: 'user2',
    authorName: 'Sam Rivera',
    authorAvatar: '🦋',
    category: 'adhd-support',
    tags: ['adhd', 'overwhelm', 'tips'],
    likes: 31,
    replies: 12,
    isLiked: true,
    isPinned: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: 'post3',
    title: 'Looking for study buddies for CS algorithms',
    content: 'Starting a data structures and algorithms study group. Looking for people who want to work through problems together and explain concepts to each other. High energy preferred!',
    authorId: 'user3',
    authorName: 'Jordan Kim',
    authorAvatar: '🦁',
    category: 'accountability',
    tags: ['computer-science', 'algorithms', 'study-group'],
    likes: 15,
    replies: 6,
    isLiked: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

const ForumSystem: React.FC<ForumSystemProps> = ({
  onCreatePost,
  onLikePost,
  onReplyToPost,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'replies'>('recent');

  const filteredPosts = mockPosts
    .filter(post => !selectedCategory || post.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'replies':
          return b.replies - a.replies;
        case 'recent':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className={clsx('max-w-6xl mx-auto space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">💬</span>
              <span>Community Forum</span>
            </CardTitle>
            <Button
              variant="celebration"
              onClick={() => setShowCreatePost(true)}
            >
              ✍️ New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body text-surface-variant">
            Connect with your flock, share experiences, and support each other's productivity journey.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={clsx(
                    'w-full text-left p-3 rounded-lg transition-colors',
                    !selectedCategory ? 'bg-focus-purple text-white' : 'hover:bg-surface-container'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <div className="font-semibold">All Posts</div>
                      <div className="text-tiny opacity-75">
                        {mockPosts.length} posts
                      </div>
                    </div>
                  </div>
                </button>

                {mockCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={clsx(
                      'w-full text-left p-3 rounded-lg transition-colors',
                      selectedCategory === category.id ? 'bg-focus-purple text-white' : 'hover:bg-surface-container'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-tiny opacity-75">
                          {category.postCount} posts
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sort Options */}
          <Card>
            <CardHeader>
              <CardTitle>Sort By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { value: 'recent', label: 'Most Recent', icon: '🕒' },
                  { value: 'popular', label: 'Most Liked', icon: '❤️' },
                  { value: 'replies', label: 'Most Replies', icon: '💬' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={clsx(
                      'w-full text-left p-2 rounded-lg transition-colors flex items-center space-x-2',
                      sortBy === option.value ? 'bg-focus-purple text-white' : 'hover:bg-surface-container'
                    )}
                  >
                    <span>{option.icon}</span>
                    <span className="text-small font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200" interactive>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      {/* Author Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light flex items-center justify-center text-xl text-white font-bold shadow-md">
                        {post.authorAvatar || post.authorName.charAt(0)}
                      </div>

                      <div className="flex-1">
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-bold text-gray-900">{post.authorName}</h4>
                              <span className="text-tiny text-gray-500">•</span>
                              <span className="text-tiny text-gray-500">{getTimeAgo(post.createdAt)}</span>
                              {post.isPinned && (
                                <span className="px-2 py-1 bg-dopamine-yellow text-gray-900 text-tiny rounded-full font-semibold">
                                  📌 Pinned
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-focus-purple/10 text-focus-purple text-tiny rounded-full">
                                {mockCategories.find(c => c.id === post.category)?.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <h3 className="text-h3 font-bold mb-2 text-gray-900">
                          {post.title}
                        </h3>
                        <p className="text-body text-text-secondary mb-4 leading-relaxed">
                          {post.content}
                        </p>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-surface-container text-surface-variant text-tiny rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => onLikePost(post.id)}
                            className={clsx(
                              'flex items-center space-x-2 text-small transition-colors',
                              post.isLiked ? 'text-flock-coral' : 'text-gray-500 hover:text-flock-coral'
                            )}
                          >
                            <span className="text-lg">{post.isLiked ? '❤️' : '🤍'}</span>
                            <span className="font-medium">{post.likes}</span>
                          </button>

                          <button
                            onClick={() => console.log('Reply to post:', post.id)}
                            className="flex items-center space-x-2 text-small text-gray-500 hover:text-focus-purple transition-colors"
                          >
                            <span className="text-lg">💬</span>
                            <span className="font-medium">{post.replies}</span>
                          </button>

                          <button
                            onClick={() => console.log('Share post:', post.id)}
                            className="flex items-center space-x-2 text-small text-gray-500 hover:text-community-teal transition-colors"
                          >
                            <span className="text-lg">📤</span>
                            <span className="font-medium">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <Card className="text-center">
              <CardContent className="py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-flock-coral to-flock-coral-light flex items-center justify-center">
                  <span className="text-2xl text-white">📝</span>
                </div>
                <h3 className="text-h2 font-semibold mb-2">No Posts Yet</h3>
                <p className="text-body text-surface-variant mb-6">
                  {selectedCategory 
                    ? 'No posts in this category yet. Be the first to start the conversation!'
                    : 'Be the first to share with the community!'
                  }
                </p>
                <Button
                  variant="celebration"
                  onClick={() => setShowCreatePost(true)}
                >
                  ✍️ Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={(postData) => {
            onCreatePost(postData);
            setShowCreatePost(false);
          }}
          categories={mockCategories}
        />
      )}
    </div>
  );
};

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: Partial<ForumPost>) => void;
  categories: ForumCategory[];
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim() && formData.category) {
      onSubmit(formData);
      setFormData({ title: '', content: '', category: '', tags: [] });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h2 font-bold">Create New Post</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-small font-medium text-text-secondary mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-small font-medium text-text-secondary mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-small font-medium text-text-secondary mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts, experiences, or questions..."
              rows={6}
              className="w-full px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-small font-medium text-text-secondary mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="ghost" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-focus-purple/10 text-focus-purple text-tiny rounded-full"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-focus-purple-dark"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="celebration" className="flex-1">
              Publish Post
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForumSystem;