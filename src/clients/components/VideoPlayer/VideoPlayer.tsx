import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Slider, Button, Space, Dropdown } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, SoundOutlined, FullscreenOutlined, FullscreenExitOutlined, SettingOutlined } from '@ant-design/icons';
import './VideoPlayer.scss';

// Mở rộng interface để nhận thêm props
interface VideoPlayerProps {
    videoUrl: string;
    autoPlay?: boolean; // Prop để điều khiển tự động phát
    poster?: string;    // Prop cho ảnh bìa
    onReady?: () => void; // Prop callback khi video sẵn sàng
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoUrl,
    autoPlay = false, // Giá trị mặc định là false
    poster,
    onReady
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [qualityLevels, setQualityLevels] = useState<{ height: number; }[]>([]);
    const [currentQuality, setCurrentQuality] = useState(-1); // -1 for auto

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, []);

    // Format time for display
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Handlers for video events
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setProgress(video.currentTime);
        const handleDurationChange = () => setDuration(video.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    // HLS.js setup
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        // Reset video state when URL changes
        setIsPlaying(false);
        setProgress(0);
        setDuration(0);

        if (poster) video.poster = poster;

        const setupHls = () => {
            // Destroy existing HLS instance if any
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            const hls = new Hls();
            hlsRef.current = hls;
            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
                console.log('Video ready to play');
                setQualityLevels(data.levels);
                setCurrentQuality(hls.currentLevel);
                onReady?.();
                if (autoPlay) video.play().catch(err => console.error("Autoplay failed:", err));
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                setCurrentQuality(data.level);
            });

            hls.on(Hls.Events.ERROR, (_, data) => console.error('HLS.js error:', data));
        };

        const setupNative = () => {
            // Clear existing source
            video.src = '';
            video.load();

            video.src = videoUrl;
            video.addEventListener('loadedmetadata', () => {
                console.log('Native HLS ready to play');
                onReady?.();
                if (autoPlay) video.play().catch(err => console.error("Autoplay failed:", err));
            });
        };

        if (Hls.isSupported()) {
            setupHls();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            setupNative();
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            // Reset video source
            if (video) {
                video.src = '';
                video.load();
            }
        };
    }, [videoUrl, autoPlay, poster, onReady]);

    // Control handlers
    const handlePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
        }
    };

    const handleSeek = (value: number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = value;
            setProgress(value);
        }
    };

    const handleVolumeChange = (value: number) => {
        const video = videoRef.current;
        if (video) {
            video.volume = value;
            setVolume(value);
        }
    };

    const handleQualityChange = (levelIndex: number) => {
        if (hlsRef.current) {
            hlsRef.current.currentLevel = levelIndex;
            setCurrentQuality(levelIndex);
        }
    };

    const handleToggleFullScreen = () => {
        const playerContainer = playerContainerRef.current;
        if (!playerContainer) return;

        if (!isFullScreen) {
            if (playerContainer.requestFullscreen) {
                playerContainer.requestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    const qualityMenu = {
        items: [
            {
                key: -1,
                label: 'Auto',
                onClick: () => handleQualityChange(-1),
            },
            ...qualityLevels.map((level, index) => ({
                key: index,
                label: `${level.height}p`,
                onClick: () => handleQualityChange(index),
            }))
        ],
        selectable: true,
        selectedKeys: [String(currentQuality)],
    };

    return (
        <div ref={playerContainerRef} className="video-container">
            <video
                ref={videoRef}
                className="video-element"
                playsInline
                onClick={handlePlayPause} // Play/pause on video click
            />
            <div className="video-controls">
                <Button
                    type="text"
                    icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    onClick={handlePlayPause}
                    className="control-button"
                />
                <Slider
                    min={0}
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                    className="progress-bar"
                    tooltip={{ formatter: (value) => formatTime(value || 0) }}
                />
                <span className="time-display">{formatTime(progress)} / {formatTime(duration)}</span>
                <Space>
                    <Dropdown menu={{
                        items: [{
                            key: '1',
                            label: (
                                <div className="volume-slider">
                                    <Slider
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        vertical
                                    />
                                </div>
                            )
                        }]
                    }} placement="topRight">
                        <Button type="text" icon={<SoundOutlined />} className="control-button" />
                    </Dropdown>
                    {qualityLevels.length > 1 && (
                        <Dropdown menu={qualityMenu} placement="topRight">
                            <Button type="text" icon={<SettingOutlined />} className="control-button" />
                        </Dropdown>
                    )}
                    <Button
                        type="text"
                        icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                        onClick={handleToggleFullScreen}
                        className="control-button"
                    />
                </Space>
            </div>
        </div>
    );
};

export default VideoPlayer;