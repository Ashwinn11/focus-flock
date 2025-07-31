import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { StudyGroup, StudyGroupMember, User, EnergyLevel, SessionType } from '@/types';

interface GroupSystemProps {
  onCreateGroup: (groupData: Partial<StudyGroup>) => void;
  onJoinGroup: (groupId: string) => void;
  className?: string;
}

interface GroupCardProps {
  group: StudyGroup;
  onJoin: (groupId: string) => void;
  onView: (groupId: string) => void;
  className?: string;
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupData: Partial<StudyGroup>) => void;
}

const mockGroups: StudyGroup[] = [
  {
    id: 'group1',
    name: 'CS Study Squad',
    description: 'Computer Science students working on algorithms and data structures',
    hostId: 'host1',
    members: [
      { userId: 'host1', joinedAt: new Date(), role: 'host', isActive: true },
      { userId: 'user2', joinedAt: new Date(), role: 'member', isActive: true },
      { userId: 'user3', joinedAt: new Date(), role: 'member', isActive: true },
    ],
    maxMembers: 8,
    tags: ['computer-science', 'algorithms', 'study'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'group2',
    name: 'Creative Writers Circle',
    description: 'Writers supporting each other through daily writing sessions',
    hostId: 'host2',
    members: [
      { userId: 'host2', joinedAt: new Date(), role: 'host', isActive: true },
      { userId: 'user4', joinedAt: new Date(), role: 'member', isActive: true },
      { userId: 'user5', joinedAt: new Date(), role: 'member', isActive: true },
      { userId: 'user6', joinedAt: new Date(), role: 'member', isActive: true },
      { userId: 'user7', joinedAt: new Date(), role: 'member', isActive: true },
    ],
    maxMembers: 6,
    tags: ['writing', 'creative', 'daily-practice'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'group3',
    name: 'ADHD Productivity Support',
    description: 'Neurodivergent folks supporting each other with gentle accountability',
    hostId: 'host3',
    members: [
      { userId: 'host3', joinedAt: new Date(), role: 'host', isActive: true },
      { userId: 'user8', joinedAt: new Date(), role: 'moderator', isActive: true },
      { userId: 'user9', joinedAt: new Date(), role: 'member', isActive: true },
    ],
    maxMembers: 10,
    tags: ['adhd', 'neurodivergent', 'support', 'gentle'],
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const GroupCard: React.FC<GroupCardProps> = ({ group, onJoin, onView, className }) => {
  const activeMembers = group.members.filter(m => m.isActive);
  const hasSpace = activeMembers.length < group.maxMembers;

  return (
    <Card className={clsx('h-full', className)} interactive>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-xl">👥</span>
              <span>{group.name}</span>
            </CardTitle>
            {group.description && (
              <p className="text-small text-gray-600 mt-1 line-clamp-2">
                {group.description}
              </p>
            )}
          </div>
          {group.isPrivate && (
            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-tiny rounded-full">
              Private
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Member Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {activeMembers.slice(0, 4).map((member, i) => (
                <div
                  key={member.userId}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-community-teal to-community-teal-light border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ zIndex: 4 - i }}
                >
                  {member.userId.slice(-2).toUpperCase()}
                </div>
              ))}
              {activeMembers.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                  +{activeMembers.length - 4}
                </div>
              )}
            </div>
            <span className="text-small text-gray-600">
              {activeMembers.length}/{group.maxMembers} members
            </span>
          </div>
          
          <div className={clsx(
            'px-2 py-1 rounded-full text-tiny font-medium',
            hasSpace ? 'bg-community-teal/10 text-community-teal' : 'bg-gray-100 text-gray-600'
          )}>
            {hasSpace ? 'Open' : 'Full'}
          </div>
        </div>

        {/* Tags */}
        {group.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {group.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-focus-purple/10 text-focus-purple text-tiny rounded-full"
              >
                #{tag}
              </span>
            ))}
            {group.tags.length > 3 && (
              <span className="text-tiny text-gray-500">
                +{group.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(group.id)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onJoin(group.id)}
            disabled={!hasSpace}
            className="flex-1"
          >
            {hasSpace ? 'Join Group' : 'Full'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxMembers: 6,
    isPrivate: false,
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
      setFormData({
        name: '',
        description: '',
        maxMembers: 6,
        isPrivate: false,
        tags: [],
      });
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
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h2 font-bold">Create Study Group</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-small font-medium text-gray-700 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., CS Study Squad, Writing Circle"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-small font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What will your group focus on?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-small font-medium text-gray-700 mb-2">
              Maximum Members
            </label>
            <input
              type="range"
              min="3"
              max="12"
              value={formData.maxMembers}
              onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-tiny text-gray-500">
              <span>3</span>
              <span className="font-semibold">{formData.maxMembers} members</span>
              <span>12</span>
            </div>
          </div>

          <div>
            <label className="block text-small font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent text-sm"
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

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-sm">Private Group</h4>
              <p className="text-tiny text-gray-600">Only invited members can join</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-focus-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-focus-purple"></div>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="celebration" className="flex-1">
              Create Group
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const GroupSystem: React.FC<GroupSystemProps> = ({
  onCreateGroup,
  onJoinGroup,
  className,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(mockGroups.flatMap(group => group.tags)));
  
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = !searchQuery || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => group.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className={clsx('max-w-6xl mx-auto space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👥</span>
              <span>Study Groups</span>
            </CardTitle>
            <Button
              variant="celebration"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Create Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body text-gray-600 mb-6">
            Join study groups to connect with like-minded learners and build lasting study relationships.
          </p>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groups by name or description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focus-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-small font-medium text-gray-700 mb-2">
                Filter by tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={clsx(
                      'px-3 py-1 rounded-full text-small font-medium transition-colors',
                      selectedTags.includes(tag)
                        ? 'bg-focus-purple text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <GroupCard
                group={group}
                onJoin={onJoinGroup}
                onView={(groupId) => console.log('View group:', groupId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredGroups.length === 0 && (
        <Card className="text-center">
          <CardContent className="py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-flock-coral to-flock-coral-light flex items-center justify-center">
              <span className="text-2xl text-white">🔍</span>
            </div>
            <h3 className="text-h2 font-semibold mb-2">No Groups Found</h3>
            <p className="text-body text-gray-600 mb-6">
              {searchQuery || selectedTags.length > 0 
                ? 'Try adjusting your search or filters'
                : 'Be the first to create a study group!'
              }
            </p>
            <Button
              variant="celebration"
              onClick={() => setShowCreateModal(true)}
            >
              🚀 Create First Group
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={onCreateGroup}
      />
    </div>
  );
};

export default GroupSystem;