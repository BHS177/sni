import { useState, useCallback } from 'react';
import type { UploadProgress } from '../types';
import { createThumbnail } from '../utils';

export function useFileUpload() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);

  const uploadFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(async (file) => {
      // Generate thumbnail for video files
      let thumbnail: string | undefined;
      try {
        thumbnail = await createThumbnail(file);
      } catch (error) {
        console.warn('Could not generate thumbnail for', file.name, error);
      }

      // Add initial upload state
      setUploads(prev => [...prev, {
        file,
        progress: 0,
        status: 'uploading',
        thumbnail
      }]);

      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          
          setUploads(prev => 
            prev.map(upload => 
              upload.file === file 
                ? { ...upload, progress }
                : upload
            )
          );
        }

        // Mark as completed
        setUploads(prev => 
          prev.map(upload => 
            upload.file === file 
              ? { ...upload, status: 'completed' }
              : upload
          )
        );

      } catch (error) {
        setUploads(prev => 
          prev.map(upload => 
            upload.file === file 
              ? { 
                  ...upload, 
                  status: 'error', 
                  error: error instanceof Error ? error.message : 'Upload failed'
                }
              : upload
          )
        );
      }
    });
  }, []);

  const removeUpload = useCallback((file: File) => {
    setUploads(prev => prev.filter(upload => upload.file !== file));
  }, []);

  const clearCompleted = useCallback(() => {
    setUploads(prev => prev.filter(upload => upload.status !== 'completed'));
  }, []);

  const clearAll = useCallback(() => {
    setUploads([]);
  }, []);

  return {
    uploads,
    uploadFiles,
    removeUpload,
    clearCompleted,
    clearAll
  };
}
