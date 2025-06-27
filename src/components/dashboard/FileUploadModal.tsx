import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, File, Image, FileText, Presentation, FileSpreadsheet } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
}

const allowedFileTypes = {
  'image/*': { icon: Image, label: 'Images', extensions: '.jpg, .jpeg, .png, .gif, .webp' },
  'application/pdf': { icon: FileText, label: 'PDF', extensions: '.pdf' },
  'text/*': { icon: FileText, label: 'Text', extensions: '.txt' },
  'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation': { 
    icon: Presentation, 
    label: 'PowerPoint', 
    extensions: '.ppt, .pptx' 
  },
  'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document': { 
    icon: FileText, 
    label: 'Word', 
    extensions: '.doc, .docx' 
  },
  'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { 
    icon: FileSpreadsheet, 
    label: 'Excel', 
    extensions: '.xls, .xlsx' 
  }
};

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onFileUpload
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter(file => isValidFileType(file));
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => isValidFileType(file));
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'text/plain',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type === 'application/pdf') return FileText;
    if (file.type.startsWith('text/')) return FileText;
    if (file.type.includes('presentation')) return Presentation;
    if (file.type.includes('word')) return FileText;
    if (file.type.includes('sheet') || file.type.includes('excel')) return FileSpreadsheet;
    return File;
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      onFileUpload(uploadedFiles);
      setUploadedFiles([]);
      onClose();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-card border border-white/20 rounded-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Upload Files</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-500/10' 
                    : 'border-white/20 hover:border-white/30 bg-white/[0.02]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  accept="image/*,.pdf,.txt,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Drop files here or click to browse
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Support for images, PDF, text, PowerPoint, Word, and Excel files
                    </p>
                  </div>
                </div>
              </div>

              {/* Supported File Types */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(allowedFileTypes).map(([type, info]) => {
                  const Icon = info.icon;
                  return (
                    <div key={type} className="flex items-center gap-2 p-3 bg-white/[0.05] rounded-lg">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-white">{info.label}</div>
                        <div className="text-xs text-gray-500">{info.extensions}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file, index) => {
                      const Icon = getFileIcon(file);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="text-sm font-medium text-white truncate max-w-xs">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-400 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button variant="glass" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpload}
                  disabled={uploadedFiles.length === 0}
                >
                  Upload {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};