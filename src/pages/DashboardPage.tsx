import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  DocumentTextIcon,
  SparklesIcon,
  VideoCameraIcon,
  FolderIcon,
  ClockIcon,
  CircleStackIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Modal } from '../components/ui';
import { VideoUpload } from '../components/VideoUpload';
import { CaptionEditor } from '../components/CaptionEditor';
import { AIVideoGenerator } from '../components/AIVideoGenerator';
import { formatDate } from '../utils';
import type { Video, Project } from '../types';
import VideoCard from '../components/VideoCard';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'captions' | 'ai-generator'>('overview');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showCaptionEditor, setShowCaptionEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Mock data for demonstration
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Product Demo Video',
      description: 'Showcase of our latest product features',
      thumbnail: '/api/placeholder/320/180',
      duration: 120,
      fileSize: 25600000,
      format: 'MP4',
      uploadDate: new Date('2025-01-08'),
      status: 'ready',
      tags: ['product', 'demo', 'marketing']
    },
    {
      id: '2',
      title: 'Tutorial: Getting Started',
      description: 'Step-by-step guide for new users',
      thumbnail: '/api/placeholder/320/180',
      duration: 300,
      fileSize: 52400000,
      format: 'MP4',
      uploadDate: new Date('2025-01-07'),
      status: 'processing',
      tags: ['tutorial', 'education']
    },
    {
      id: '3',
      title: 'Company Culture Video',
      description: 'Behind the scenes at our office',
      thumbnail: '/api/placeholder/320/180',
      duration: 180,
      fileSize: 38200000,
      format: 'MP4',
      uploadDate: new Date('2025-01-06'),
      status: 'ready',
      tags: ['culture', 'team']
    }
  ];

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Q1 Marketing Campaign',
      videos: mockVideos.slice(0, 2),
      captions: [],
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-08'),
      status: 'draft'
    },
    {
      id: '2',
      name: 'Onboarding Series',
      videos: [mockVideos[1]],
      captions: [],
      createdAt: new Date('2025-01-03'),
      updatedAt: new Date('2025-01-07'),
      status: 'processing'
    }
  ];

  const stats = {
    totalVideos: mockVideos.length,
    totalProjects: mockProjects.length,
    processingTime: '2.3 hrs',
    storageUsed: '1.2 GB'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'upload', label: 'Upload', icon: ArrowUpTrayIcon },
    { id: 'captions', label: 'Captions', icon: ChatBubbleBottomCenterTextIcon },
    { id: 'ai-generator', label: 'AI Generator', icon: CpuChipIcon }
  ];

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setShowCaptionEditor(true);
  };

  const handleUploadNext = () => {
    // After upload is complete, navigate to captions tab
    setActiveTab('captions');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your videos and create amazing content
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowAIGenerator(true)}
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            AI Generator
          </Button>
          <Button onClick={() => setActiveTab('upload')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Videos', value: stats.totalVideos, icon: VideoCameraIcon },
          { label: 'Projects', value: stats.totalProjects, icon: FolderIcon },
          { label: 'Processing Time', value: stats.processingTime, icon: ClockIcon },
          { label: 'Storage Used', value: stats.storageUsed, icon: CircleStackIcon }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg mr-3">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Videos */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.map((video) => (
                    <VideoCard {...video} key={video.id} onClick={() => handleVideoSelect(video)} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                          <DocumentTextIcon className="h-6 w-6 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {project.videos.length} videos • Updated {formatDate(project.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={project.status === 'completed' ? 'success' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <EllipsisVerticalIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'upload' && (
          <VideoUpload onUpload={handleUploadNext} onClose={() => {}} />
        )}

        {activeTab === 'captions' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Caption Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No captions yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Upload a video and start adding captions
                  </p>
                  <Button onClick={() => setActiveTab('upload')}>
                    Upload Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'ai-generator' && (
          <AIVideoGenerator />
        )}
      </div>

      {/* Caption Editor Modal */}
      <Modal
        isOpen={showCaptionEditor}
        onClose={() => setShowCaptionEditor(false)}
        title="Caption Editor"
        size="xl"
      >
        {selectedVideo && (
          <CaptionEditor
            video={selectedVideo}
            onClose={() => setShowCaptionEditor(false)}
          />
        )}
      </Modal>

      {/* AI Generator Modal */}
      <Modal
        isOpen={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        title="AI Video Generator"
        size="lg"
      >
        <AIVideoGenerator onClose={() => setShowAIGenerator(false)} />
      </Modal>
    </div>
  );
}
