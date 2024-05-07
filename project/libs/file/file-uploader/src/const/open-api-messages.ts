export const OpenApiMessages = {
  id: {
    description: 'The uniq user ID',
    example: '6621683a9775bcf7c8f2606b',
  },
  originalName: {
    description: 'originalName',
    example: 'file-uploader.http',
  },
  hashName: {
    description: 'hashName',
    example: 'b9c8f0b0-3cf6-4cb7-93d4-30a810f6efa6.txt',
  },
  subDirectory: {
    description: 'subDirectory',
    example: '2024\\05',
  },
  mimetype: {
    description: 'mimetype',
    example: 'text/plain',
  },
  size: {
    description: 'size file',
    example: '22',
  },
} as const;
