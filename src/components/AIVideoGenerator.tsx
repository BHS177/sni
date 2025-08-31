import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  PlayIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardContent, Badge, Progress } from './ui';
import type { AIGenerationRequest, AIGenerationResult } from '../types';

interface AIVideoGeneratorProps {
  onClose?: () => void;
}

export function AIVideoGenerator({ onClose }: AIVideoGeneratorProps) {
  const [request, setRequest] = useState<AIGenerationRequest>({
    prompt: '',
    style: 'commercial',
    duration: 30,
    aspectRatio: '16:9'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<AIGenerationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = [
    { id: 'documentary', name: 'Documentary', description: 'Professional and informative' },
    { id: 'commercial', name: 'Commercial', description: 'Marketing and promotional' },
    { id: 'social', name: 'Social Media', description: 'Engaging and viral-ready' },
    { id: 'educational', name: 'Educational', description: 'Clear and instructional' }
  ];

  const aspectRatios = [
    { id: '16:9', name: 'Landscape (16:9)', description: 'YouTube, Desktop' },
    { id: '9:16', name: 'Portrait (9:16)', description: 'TikTok, Instagram Stories' },
    { id: '1:1', name: 'Square (1:1)', description: 'Instagram Posts' },
    { id: '4:3', name: 'Standard (4:3)', description: 'Classic format' }
  ];

  const durations = [15, 30, 60, 120, 300];

  const handleGenerate = async () => {
    if (!request.prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation process
    const steps = [
      'Analyzing prompt...',
      'Generating script...',
      'Creating scenes...',
      'Adding effects...',
      'Rendering video...',
      'Finalizing...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / steps.length) * 100);
    }

    const result: AIGenerationResult = {
      id: Date.now().toString(),
      request,
      status: 'completed',
      progress: 100,
      resultUrl: '/api/generated-video.mp4',
      createdAt: new Date()
    };

    setGenerationResult(result);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGenerationResult(null);
    setProgress(0);
    setIsGenerating(false);
  };

  if (generationResult && generationResult.status === 'completed') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Video Generated Successfully!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your AI-generated video is ready for preview and download.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg relative overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayIcon className="h-16 w-16 text-white opacity-80" />
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="success">Generated</Badge>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                {request.duration}s
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prompt:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{request.prompt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Style:</span>
                <Badge variant="outline">{request.style}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{request.duration} seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aspect Ratio:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{request.aspectRatio}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Generate Another
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline">
              Add to Project
            </Button>
            <Button>
              Download Video
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <SparklesIcon className="h-8 w-8 text-primary-500" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Generating Your Video
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI is creating your video. This may take a few minutes.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} />
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {progress < 20 && 'Analyzing prompt...'}
                  {progress >= 20 && progress < 40 && 'Generating script...'}
                  {progress >= 40 && progress < 60 && 'Creating scenes...'}
                  {progress >= 60 && progress < 80 && 'Adding effects...'}
                  {progress >= 80 && progress < 95 && 'Rendering video...'}
                  {progress >= 95 && 'Finalizing...'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setIsGenerating(false);
              setProgress(0);
            }}
          >
            Cancel Generation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <SparklesIcon className="h-8 w-8 text-primary-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          AI Video Generator
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Describe what you want to create and let AI generate your video.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video Description
            </label>
            <textarea
              value={request.prompt}
              onChange={(e) => setRequest({ ...request, prompt: e.target.value })}
              placeholder="Describe your video idea... e.g., 'A modern product showcase for a sleek smartphone with dynamic camera movements and tech-focused aesthetics'"
              className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Be specific about style, mood, and content for better results
            </p>
          </div>

          {/* Style Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Video Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {styles.map((style) => (
                <div
                  key={style.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    request.style === style.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setRequest({ ...request, style: style.id as any })}
                >
                  <div className="flex items-center space-x-2">
                    <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setRequest({ ...request, duration })}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    request.duration === duration
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <ClockIcon className="h-3 w-3 inline mr-1" />
                  {duration}s
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-3">
              {aspectRatios.map((ratio) => (
                <div
                  key={ratio.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    request.aspectRatio === ratio.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setRequest({ ...request, aspectRatio: ratio.id as any })}
                >
                  <div className="flex items-center space-x-2">
                    <PhotoIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {ratio.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{ratio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Tips */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            💡 Tips for Better Results
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></div>
              <span>Be specific about colors, lighting, and mood</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></div>
              <span>Mention camera angles and movements</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></div>
              <span>Include target audience and use case</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></div>
              <span>Add music or sound preferences</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <div className="flex space-x-3 ml-auto">
          <Button
            variant="outline"
            onClick={() => setRequest({
              prompt: '',
              style: 'commercial',
              duration: 30,
              aspectRatio: '16:9'
            })}
          >
            Reset
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!request.prompt.trim() || isGenerating}
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            Generate Video
          </Button>
        </div>
      </div>
    </div>
  );
}
