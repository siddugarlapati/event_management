import { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, MonitorOff } from 'lucide-react';
import styles from './VideoChat.module.css';

const VideoChat = ({ socket, roomId, userId, userName }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const screenStreamRef = useRef(null);

  // ICE servers configuration (using free STUN servers)
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ]
  };

  useEffect(() => {
    if (!socket) return;

    // WebRTC signaling handlers
    socket.on('video-offer', handleVideoOffer);
    socket.on('video-answer', handleVideoAnswer);
    socket.on('ice-candidate', handleIceCandidate);
    socket.on('call-ended', handleCallEnded);
    socket.on('user-left', handleCallEnded);

    return () => {
      socket.off('video-offer');
      socket.off('video-answer');
      socket.off('ice-candidate');
      socket.off('call-ended');
      socket.off('user-left');
      cleanup();
    };
  }, [socket]);

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
    setIsCallActive(false);
    setCallStatus('idle');
  };

  const startCall = async () => {
    try {
      setCallStatus('calling');
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(iceServers);
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', {
            roomId,
            candidate: event.candidate
          });
        }
      };

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
        setCallStatus('connected');
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          setCallStatus('connected');
          setIsCallActive(true);
        } else if (peerConnection.connectionState === 'disconnected' || 
                   peerConnection.connectionState === 'failed') {
          handleCallEnded();
        }
      };

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit('video-offer', {
        roomId,
        offer,
        userId,
        userName
      });

    } catch (error) {
      console.error('Error starting call:', error);
      alert('Failed to start call. Please check camera/microphone permissions.');
      setCallStatus('idle');
    }
  };

  const handleVideoOffer = async ({ offer, userId: senderId, userName: senderName }) => {
    if (senderId === userId) return; // Ignore own offers

    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(iceServers);
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', {
            roomId,
            candidate: event.candidate
          });
        }
      };

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
        setCallStatus('connected');
      };

      // Set remote description and create answer
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit('video-answer', {
        roomId,
        answer,
        userId,
        userName
      });

      setIsCallActive(true);
      setCallStatus('connected');

    } catch (error) {
      console.error('Error handling offer:', error);
      alert('Failed to answer call. Please check camera/microphone permissions.');
    }
  };

  const handleVideoAnswer = async ({ answer, userId: senderId }) => {
    if (senderId === userId) return;

    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async ({ candidate, userId: senderId }) => {
    if (senderId === userId) return;

    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };

  const handleCallEnded = () => {
    cleanup();
  };

  const endCall = () => {
    socket.emit('call-ended', { roomId });
    cleanup();
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Switch back to camera
      const videoTrack = localStream.getVideoTracks()[0];
      const sender = peerConnectionRef.current
        .getSenders()
        .find(s => s.track?.kind === 'video');
      
      if (sender) {
        sender.replaceTrack(videoTrack);
      }
      
      setIsScreenSharing(false);
    } else {
      // Start screen sharing
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: 'always' },
          audio: false
        });
        
        screenStreamRef.current = screenStream;
        const screenTrack = screenStream.getVideoTracks()[0];
        
        const sender = peerConnectionRef.current
          .getSenders()
          .find(s => s.track?.kind === 'video');
        
        if (sender) {
          sender.replaceTrack(screenTrack);
        }
        
        // Handle screen share stop
        screenTrack.onended = () => {
          toggleScreenShare();
        };
        
        setIsScreenSharing(true);
      } catch (error) {
        console.error('Error sharing screen:', error);
        alert('Failed to share screen');
      }
    }
  };

  return (
    <div className={styles.videoChat}>
      <div className={styles.videoContainer}>
        {/* Remote Video (Main) */}
        <div className={styles.remoteVideo}>
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={styles.video}
            />
          ) : (
            <div className={styles.placeholder}>
              <Video size={64} />
              <p>{callStatus === 'calling' ? 'Calling...' : 'Waiting for other user...'}</p>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        {localStream && (
          <div className={styles.localVideo}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={styles.video}
            />
            {!isVideoEnabled && (
              <div className={styles.videoOff}>
                <VideoOff size={32} />
              </div>
            )}
          </div>
        )}

        {/* Call Status */}
        {callStatus !== 'idle' && (
          <div className={styles.callStatus}>
            <span className={`${styles.statusDot} ${callStatus === 'connected' ? styles.connected : styles.calling}`}></span>
            <span>{callStatus === 'connected' ? 'Connected' : 'Connecting...'}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {!isCallActive ? (
          <button onClick={startCall} className={styles.startCallBtn}>
            <Video size={20} />
            Start Video Call
          </button>
        ) : (
          <>
            <button
              onClick={toggleVideo}
              className={`${styles.controlBtn} ${!isVideoEnabled ? styles.disabled : ''}`}
              title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
              onClick={toggleAudio}
              className={`${styles.controlBtn} ${!isAudioEnabled ? styles.disabled : ''}`}
              title={isAudioEnabled ? 'Mute' : 'Unmute'}
            >
              {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`${styles.controlBtn} ${isScreenSharing ? styles.active : ''}`}
              title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
            >
              {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
            </button>

            <button
              onClick={endCall}
              className={`${styles.controlBtn} ${styles.endCall}`}
              title="End call"
            >
              <PhoneOff size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
