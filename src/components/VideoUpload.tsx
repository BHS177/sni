import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Button, Card, CardContent, Progress, Badge } from './ui';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatFileSize, isVideoFile } from '../utils';
import type { UploadProgress } from '../types';

interface VideoUploadProps {
  onNext?: () => void;
}

export function VideoUpload({ onNext }: VideoUploadProps) {
  const { uploads, uploadFiles, removeUpload, clearCompleted } = useFileUpload();
  const [dragActive, setDragActive] = useState(false);

  // Check if all uploads are completed
  const allUploadsCompleted = uploads.length > 0 && uploads.every(upload => upload.status === 'completed' || upload.status === 'error');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFiles = acceptedFiles.filter(isVideoFile);
    if (videoFiles.length > 0) {
      // Create a proper FileList-like object
      const dt = new DataTransfer();
      videoFiles.forEach(file => dt.items.add(file));
      uploadFiles(dt.files);
    }
  }, [uploadFiles]);


  const handleUploadMore = () => {
    // Clear the success state to show the upload area again
    // Or trigger file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        uploadFiles(target.files);
      }
    };
    input.click();
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    multiple: true,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  const getStatusColor = (status: UploadProgress['status']) => {
    switch (status) {
      case 'uploading': return 'text-blue-500';
      case 'processing': return 'text-yellow-500';
      case 'completed': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: UploadProgress['status']) => {
    switch (status) {
      case 'completed': return CheckCircleIcon;
      case 'error': return ExclamationCircleIcon;
      default: return DocumentIcon;
    }
  };

  return (
    <div className="space-y-6">
      {(uploads.length === 0) && (
        <Card>
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragActive || dragActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={{ scale: isDragActive ? 1.05 : 1 }}
                className="space-y-4"
              >
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <CloudArrowUpIcon className="h-8 w-8 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isDragActive ? 'Drop videos here' : uploads.length > 0 ? 'Upload more videos' : 'Upload your videos'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Drag and drop your video files here, or click to browse
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Supports: MP4, MOV, AVI, MKV, WebM (Max 500MB per file)
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      )}

      {allUploadsCompleted && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Videos Uploaded Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your videos have been uploaded and are ready for editing. What would you like to do next?
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload More Videos
                </Button>
                <Button
                  className="flex items-center"
                >
                  Next Step
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Queue */}
      {uploads.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Queue ({uploads.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
                disabled={!uploads.some(u => u.status === 'completed')}
              >
                Clear Completed
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {uploads.map((upload, index) => {
                  const StatusIcon = getStatusIcon(upload.status);
                  
                  return (
                    <motion.div
                      key={`${upload.file.name}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      {/* File Thumbnail/Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                          {upload.thumbnail ? (
                            <img
                              src={upload.thumbnail}
                              alt={upload.file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <StatusIcon className={`h-6 w-6 ${getStatusColor(upload.status)}`} />
                            </div>
                          )}
                          {upload.status === 'completed' && (
                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                          {upload.status === 'uploading' && upload.progress < 100 && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <div className="text-xs text-white font-medium">
                                {upload.progress}%
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {upload.file.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={upload.status === 'completed' ? 'success' : 'secondary'}>
                              {upload.status}
                            </Badge>
                            <button
                              onClick={() => removeUpload(upload.file)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <span>{formatFileSize(upload.file.size)}</span>
                          <span>{upload.progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <Progress value={upload.progress} />

                        {/* Error Message */}
                        {upload.error && (
                          <p className="text-sm text-red-500 mt-2">{upload.error}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upload Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <strong>Best Quality:</strong> Upload in 1080p or higher for best results
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <strong>File Size:</strong> Maximum 500MB per video file
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <strong>Formats:</strong> MP4 recommended for fastest processing
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <strong>Audio:</strong> Clear audio improves AI caption accuracy
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
