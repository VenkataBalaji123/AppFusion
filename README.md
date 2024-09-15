import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [algorithm, setAlgorithm] = useState('lossless');

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleCompressionChange = (event) => {
    setCompressionLevel(event.target.value);
  };

  const handleCompress = () => {
    const compressed = [];
    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        const compressedFile = compressFile(reader.result, compressionLevel);
        compressed.push(compressedFile);
        setCompressedFiles(compressed);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const compressFile = (file, compressionLevel) => {
    // TO DO: implement compression algorithm
    return file;
  };

  const downloadCompressedFiles = () => {
    for (const file of compressedFiles) {
      const blob = new Blob([file], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compressed_file';
      a.click();
    }
  };

  const handleAlgorithmChange = (value) => {
    setAlgorithm(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-500">
      <h1 className="text-5xl font-bold text-white mb-8">Compression Toolkit</h1>
      <input type="file" multiple onChange={handleFileChange} className="text-lg font-bold text-white bg-indigo-700 p-2 rounded-lg" />
      <div className="flex items-center space-x-2 mt-8">
        <span className="text-lg font-bold text-white">Compression Level:</span>
        <input type="range" min="1" max="100" value={compressionLevel} onChange={handleCompressionChange} className="w-64 h-2 bg-indigo-700 rounded-lg" />
        <span className="text-lg font-bold text-white">{compressionLevel}%</span>
      </div>
      <div className="flex items-center space-x-4 mt-8">
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleCompress}>Compress</Button>
        <Button variant="secondary" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg" onClick={downloadCompressedFiles}>Download Compressed Files</Button>
      </div>
      <div className="flex items-center space-x-2 mt-8">
        <Select>
          <SelectTrigger className="w-[180px] bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
            <SelectValue placeholder="Select compression algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lossless" onClick={() => handleAlgorithmChange('lossless')}>Lossless</SelectItem>
            <SelectItem value="lossy" onClick={() => handleAlgorithmChange('lossy')}>Lossy</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-lg font-bold text-white">Selected Algorithm: {algorithm}</span>
      </div>
    </div>
  );
}

export default App;
