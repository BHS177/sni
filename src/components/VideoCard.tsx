
import { motion } from 'framer-motion';
import {
  PlayIcon,
  } from '@heroicons/react/24/outline';
import { Card, CardContent, Badge } from '../components/ui';
import { formatDuration, formatFileSize, formatDate } from '../utils';
import type { Video } from '../types';


type VideoCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'title' | 'description'> & Video;

export default function VideoCard(props: VideoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group cursor-pointer"
            onClick={props.onClick}
        >
            <Card hover className="overflow-hidden">
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-70" />
                    </div>
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" size="sm">
                            {props.status}
                        </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(props.duration)}
                    </div>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                        {props.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                        {props.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatFileSize(props.fileSize)}</span>
                        <span>{formatDate(props.uploadDate)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {props.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}