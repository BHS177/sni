import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent, Badge } from './ui';
import { formatDuration } from '../utils';
import type { Video, Caption } from '../types';

interface CaptionEditorProps {
  video: Video;
  onClose: () => void;
}

export function CaptionEditor({ video, onClose }: CaptionEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<Caption | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock caption data
  useEffect(() => {
    const mockCaptions: Caption[] = [
      {
        id: '1',
        videoId: video.id,
        text: 'Welcome to our product demonstration',
        startTime: 0,
        endTime: 3,
        style: {
          fontFamily: 'Arial',
          fontSize: 24,
          color: '#ffffff',
          backgroundColor: '#000000',
          position: 'bottom',
          alignment: 'center',
          bold: false,
          italic: false,
          underline: false
        }
      },
      {
        id: '2',
        videoId: video.id,
        text: 'Let me show you the key features',
        startTime: 3.5,
        endTime: 6,
        style: {
          fontFamily: 'Arial',
          fontSize: 24,
          color: '#ffffff',
          backgroundColor: '#000000',
          position: 'bottom',
          alignment: 'center',
          bold: false,
          italic: false,
          underline: false
        }
      }
    ];
    setCaptions(mockCaptions);
  }, [video.id]);

  const handleGenerateAICaptions = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const aiCaptions: Caption[] = [
      {
        id: '3',
        videoId: video.id,
        text: 'This feature will revolutionize your workflow',
        startTime: 6.5,
        endTime: 9,
        style: {
          fontFamily: 'Arial',
          fontSize: 24,
          color: '#ffffff',
          backgroundColor: '#000000',
          position: 'bottom',
          alignment: 'center',
          bold: false,
          italic: false,
          underline: false
        }
      },
      {
        id: '4',
        videoId: video.id,
        text: 'And here\'s how you can get started',
        startTime: 9.5,
        endTime: 12,
        style: {
          fontFamily: 'Arial',
          fontSize: 24,
          color: '#ffffff',
          backgroundColor: '#000000',
          position: 'bottom',
          alignment: 'center',
          bold: false,
          italic: false,
          underline: false
        }
      }
    ];
    
    setCaptions(prev => [...prev, ...aiCaptions]);
    setIsGenerating(false);
  };

  const handleAddCaption = () => {
    const newCaption: Caption = {
      id: Date.now().toString(),
      videoId: video.id,
      text: 'New caption',
      startTime: currentTime,
      endTime: currentTime + 2,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: '#000000',
        position: 'bottom',
        alignment: 'center',
        bold: false,
        italic: false,
        underline: false
      }
    };
    setCaptions(prev => [...prev, newCaption]);
    setSelectedCaption(newCaption);
  };

  const handleDeleteCaption = (captionId: string) => {
    setCaptions(prev => prev.filter(c => c.id !== captionId));
    if (selectedCaption?.id === captionId) {
      setSelectedCaption(null);
    }
  };

  const handleUpdateCaption = (captionId: string, updates: Partial<Caption>) => {
    setCaptions(prev =>
      prev.map(c => c.id === captionId ? { ...c, ...updates } : c)
    );
    if (selectedCaption?.id === captionId) {
      setSelectedCaption(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const getCurrentCaptions = () => {
    return captions.filter(c => currentTime >= c.startTime && currentTime <= c.endTime);
  };

  return (
    <div className="space-y-6">
      {/* Video Player Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Preview */}
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative overflow-hidden">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayIcon className="h-16 w-16 text-white opacity-50" />
              </div>
              
              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {getCurrentCaptions().map(caption => (
                  <motion.div
                    key={caption.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center ${caption.style.position === 'top' ? 'mb-auto' : ''}`}
                    style={{
                      fontFamily: caption.style.fontFamily,
                      fontSize: `${caption.style.fontSize}px`,
                      color: caption.style.color,
                      backgroundColor: caption.style.backgroundColor,
                      fontWeight: caption.style.bold ? 'bold' : 'normal',
                      fontStyle: caption.style.italic ? 'italic' : 'normal',
                      textDecoration: caption.style.underline ? 'underline' : 'none',
                      textAlign: caption.style.alignment as any,
                      padding: '8px 16px',
                      borderRadius: '4px'
                    }}
                  >
                    {caption.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Video Controls */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5" />
                  ) : (
                    <PlayIcon className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {formatDuration(currentTime)} / {formatDuration(video.duration)}
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={video.duration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                
                {/* Caption Timeline */}
                <div className="relative h-6 bg-gray-100 dark:bg-gray-800 rounded">
                  {captions.map(caption => (
                    <div
                      key={caption.id}
                      className="absolute h-full bg-primary-500/80 rounded cursor-pointer hover:bg-primary-500"
                      style={{
                        left: `${(caption.startTime / video.duration) * 100}%`,
                        width: `${((caption.endTime - caption.startTime) / video.duration) * 100}%`
                      }}
                      onClick={() => setSelectedCaption(caption)}
                      title={caption.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Caption Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Caption Controls
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateAICaptions}
                  loading={isGenerating}
                  disabled={isGenerating}
                >
                  <SparklesIcon className="h-4 w-4 mr-1" />
                  AI Generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddCaption}
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {selectedCaption ? (
              <div className="space-y-4">
                <Input
                  label="Caption Text"
                  value={selectedCaption.text}
                  onChange={(e) => handleUpdateCaption(selectedCaption.id, { text: e.target.value })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Time (s)"
                    type="number"
                    step="0.1"
                    value={selectedCaption.startTime}
                    onChange={(e) => handleUpdateCaption(selectedCaption.id, { startTime: Number(e.target.value) })}
                  />
                  <Input
                    label="End Time (s)"
                    type="number"
                    step="0.1"
                    value={selectedCaption.endTime}
                    onChange={(e) => handleUpdateCaption(selectedCaption.id, { endTime: Number(e.target.value) })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <select
                      value={selectedCaption.style.position}
                      onChange={(e) => handleUpdateCaption(selectedCaption.id, {
                        style: { ...selectedCaption.style, position: e.target.value as any }
                      })}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="top">Top</option>
                      <option value="center">Center</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alignment
                    </label>
                    <select
                      value={selectedCaption.style.alignment}
                      onChange={(e) => handleUpdateCaption(selectedCaption.id, {
                        style: { ...selectedCaption.style, alignment: e.target.value as any }
                      })}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCaption.style.bold}
                        onChange={(e) => handleUpdateCaption(selectedCaption.id, {
                          style: { ...selectedCaption.style, bold: e.target.checked }
                        })}
                        className="rounded border-gray-300 text-primary-500"
                      />
                      <span className="ml-2 text-sm">Bold</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCaption.style.italic}
                        onChange={(e) => handleUpdateCaption(selectedCaption.id, {
                          style: { ...selectedCaption.style, italic: e.target.checked }
                        })}
                        className="rounded border-gray-300 text-primary-500"
                      />
                      <span className="ml-2 text-sm">Italic</span>
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCaption(selectedCaption.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AdjustmentsHorizontalIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a caption to edit or add a new one
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Caption List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Captions ({captions.length})
          </h3>
          <div className="space-y-2">
            {captions.map(caption => (
              <div
                key={caption.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCaption?.id === caption.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedCaption(caption)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {caption.text}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDuration(caption.startTime)} - {formatDuration(caption.endTime)}
                    </p>
                  </div>
                  <Badge variant="outline" size="sm">
                    {formatDuration(caption.endTime - caption.startTime)}
                  </Badge>
                </div>
              </div>
            ))}
            {captions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No captions yet. Add one or generate with AI.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline">
            Export Captions
          </Button>
          <Button>
            Save & Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
