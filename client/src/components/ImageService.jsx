import { useState } from 'react';

function ImageService() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('local');
  const [error, setError] = useState(null);
  
  const providers = [
    { id: 'local', name: 'Local SDXL-Turbo', description: 'Fast generation using local GPU' },
    { id: 'replicate', name: 'Replicate SDXL', description: 'High-quality cloud-based generation' },
    { id: 'dreamstudio', name: 'DreamStudio', description: 'Fallback option (requires API key)' },
  ];
  
  const generateImage = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the appropriate API
      // For now, we'll simulate the image generation
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate a generated image
      setGeneratedImage(`https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt)}`);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleProviderChange = (providerId) => {
    setSelectedProvider(providerId);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Image Generation Service</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Generate Educational Images</h3>
        
        <div className="mb-6">
          <label htmlFor="provider" className="block text-gray-700 mb-2">Select Provider:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map(provider => (
              <div
                key={provider.id}
                onClick={() => handleProviderChange(provider.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  selectedProvider === provider.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{provider.name}</div>
                <div className="text-sm text-gray-600">{provider.description}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-gray-700 mb-2">Image Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe the educational image you want to generate..."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className={`px-4 py-2 rounded-lg ${
              isGenerating || !prompt.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-600">
            {error}
          </div>
        )}
        
        {generatedImage && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Generated Image:</h4>
            <div className="flex justify-center">
              <img
                src={generatedImage}
                alt="Generated from prompt"
                className="max-w-full h-auto rounded-lg border border-gray-200"
                style={{ maxHeight: '300px' }}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href={generatedImage}
                download="generated-image.png"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download Image
              </a>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          <h4 className="font-semibold mb-1">Provider Selection Logic:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Local SDXL-Turbo: Fastest option, uses your GPU for generation</li>
            <li>Replicate SDXL: Used when local generation fails or for higher quality</li>
            <li>DreamStudio: Final fallback option</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImageService;
