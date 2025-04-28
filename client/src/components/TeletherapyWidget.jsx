import { useState } from 'react';
import useSettingsStore from '../store/settingsStore';

function TeletherapyWidget() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [drawingMode, setDrawingMode] = useState(false);
  
  const { intensityLevel } = useSettingsStore();
  
  const startSession = () => {
    setIsSessionActive(true);
    // In a real implementation, this would initialize a video call
  };
  
  const endSession = () => {
    setIsSessionActive(false);
    setIsMicMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    // In a real implementation, this would end the video call
  };
  
  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    // In a real implementation, this would mute/unmute the microphone
  };
  
  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    // In a real implementation, this would turn on/off the camera
  };
  
  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real implementation, this would start/stop screen sharing
  };
  
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    // In a real implementation, this would enable/disable drawing on the whiteboard
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      return;
    }
    
    const message = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, message]);
    setNewMessage('');
    
    // Simulate a response from the therapist
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: 'Therapist',
        text: 'Thank you for sharing. Let\'s work on that together.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages(prevMessages => [...prevMessages, response]);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Teletherapy Session</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Intensity Level:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${intensityLevel === 'high' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {intensityLevel === 'high' ? 'High (Daily)' : 'Maintenance (3×/week)'}
          </span>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {!isSessionActive ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Start a Teletherapy Session</h3>
            <p className="text-gray-600 mb-6">Connect with your therapist for a virtual session.</p>
            <button
              onClick={startSession}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Session
            </button>
          </div>
        ) : (
          <div>
            <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-4" style={{ height: '300px' }}>
              {isCameraOff ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p>Camera is off</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <p className="text-white">Video feed would appear here</p>
                </div>
              )}
              
              {drawingMode && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-800 mb-2">Whiteboard Mode</p>
                    <p className="text-sm text-gray-600">Draw on the screen to collaborate</p>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                  onClick={toggleMic}
                  className={`p-2 rounded-full ${isMicMuted ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  title={isMicMuted ? 'Unmute' : 'Mute'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                
                <button
                  onClick={toggleCamera}
                  className={`p-2 rounded-full ${isCameraOff ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <button
                  onClick={toggleScreenSharing}
                  className={`p-2 rounded-full ${isScreenSharing ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                
                <button
                  onClick={toggleDrawingMode}
                  className={`p-2 rounded-full ${drawingMode ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  title={drawingMode ? 'Exit Whiteboard' : 'Open Whiteboard'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                
                <button
                  onClick={endSession}
                  className="p-2 rounded-full bg-red-600 text-white"
                  title="End Call"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold mb-2">Session Notes</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 h-40">
                  <p className="text-gray-500">Session notes will appear here...</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Chat</h3>
                <div className="flex flex-col h-40 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex-grow p-2 overflow-y-auto bg-gray-50">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500 text-center text-sm py-4">No messages yet</p>
                    ) : (
                      <div className="space-y-2">
                        {chatMessages.map(message => (
                          <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-3 py-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                              <div className="text-xs font-semibold">{message.sender}</div>
                              <div>{message.text}</div>
                              <div className="text-xs text-right mt-1">{message.timestamp}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={sendMessage} className="flex border-t border-gray-200">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow p-2 focus:outline-none"
                      placeholder="Type a message..."
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-600 text-white"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Upcoming Sessions</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Speech Therapy Session</h4>
                <p className="text-sm text-gray-600">Tomorrow, 3:00 PM - 4:00 PM</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Join
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Reading Fluency Practice</h4>
                <p className="text-sm text-gray-600">Friday, 2:00 PM - 3:00 PM</p>
              </div>
              <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeletherapyWidget;
