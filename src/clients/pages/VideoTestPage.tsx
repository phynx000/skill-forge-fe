import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, message, Alert } from 'antd';
import { PlayCircleOutlined, LinkOutlined } from '@ant-design/icons';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import './VideoTestPage.scss';

const { Title, Text, Paragraph } = Typography;

const VideoTestPage: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Bunny.net CDN authentication token
    const BUNNY_CDN_TOKEN = '7aec43d5-f3be-440f-b740-55fd5e455cf4';

    // Sample HLS URLs for testing
    const sampleUrls = [
        {
            url: 'https://vz-11106c72-014.b-cdn.net/16c15a77-9f54-4520-9a4a-af3c6e353784/playlist.m3u8',
            type: 'Header Auth',
            description: 'Bunny.net CDN với header authentication'
        },
        {
            url: 'https://vz-11106c72-014.b-cdn.net/bcdn_token=2-YB2jmeVKVeC4dtRFFRkFOLZcun9tyrGcidevLeBjE&expires=1753623128&token_path=%252F16c15a77-9f54-4520-9a4a-af3c6e353784%252F/16c15a77-9f54-4520-9a4a-af3c6e353784/playlist.m3u8',
            type: 'URL Token (Working)',
            description: 'Bunny.net CDN với token trong URL - double encoded token_path'
        },
        {
            url: 'https://vz-11106c72-014.b-cdn.net/bcdn_token=1H16O8hhP6iJoWC9IX4LMbSOVGYtT0b31vWQMhzL6hY&expires=1753608632&token_path=%252Fab36f7af-95f6-463b-adcb-cf6882221e61%252F/ab36f7af-95f6-463b-adcb-cf6882221e61/playlist.m3u8',
            type: 'URL Token (Example)',
            description: 'Bunny.net CDN với token trong URL - example URL'
        },
        {
            url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
            type: 'Public',
            description: 'Demo public HLS stream'
        }
    ];

    const handlePlayVideo = () => {
        if (!videoUrl.trim()) {
            message.warning('Vui lòng nhập URL video!');
            return;
        }

        if (!videoUrl.includes('.m3u8') && !videoUrl.includes('playlist')) {
            message.warning('URL không hợp lệ! Vui lòng sử dụng URL HLS (.m3u8)');
            return;
        }

        setIsPlaying(true);
        message.success('Đang tải video...');
    };

    const handleProgress = (currentTime: number, duration: number) => {
        console.log(`Video progress: ${currentTime.toFixed(2)}s / ${duration.toFixed(2)}s`);
    };

    return (
        <div className="video-test-page">
            <div className="container">
                <Title level={2}>Video Player Test - HLS Streaming</Title>
                <Paragraph type="secondary">
                    Trang test để kiểm tra tính năng phát video HLS từ các CDN như Bunny.net
                </Paragraph>

                {/* URL Input Section */}
                <Card title="Nhập URL Video HLS" className="input-card">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>Video URL (.m3u8):</Text>
                        <Input
                            placeholder="https://vz-xxxx.b-cdn.net/xxxxxxxx/playlist.m3u8"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            prefix={<LinkOutlined />}
                            size="large"
                        />

                        <Space wrap>
                            <Button
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                onClick={handlePlayVideo}
                                size="large"
                            >
                                Phát Video
                            </Button>
                            <Button
                                onClick={() => {
                                    setVideoUrl('');
                                    setIsPlaying(false);
                                }}
                            >
                                Reset
                            </Button>
                        </Space>

                        <Alert
                            message="Lưu ý"
                            description="Chỉ hỗ trợ video HLS với format .m3u8. Đảm bảo URL có thể truy cập được."
                            type="info"
                            showIcon
                        />
                    </Space>
                </Card>

                {/* Sample URLs */}
                <Card title="URL Mẫu để Test" className="samples-card">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text strong>Chọn một URL mẫu:</Text>
                        {sampleUrls.map((sample, index) => (
                            <div key={index} className="sample-url">
                                <div style={{ marginBottom: '8px' }}>
                                    <Text strong>{sample.type}</Text>
                                    <Text type="secondary" style={{ marginLeft: '8px' }}>
                                        {sample.description}
                                    </Text>
                                </div>
                                <Text code style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                    {sample.url}
                                </Text>
                                <Button
                                    size="small"
                                    type="link"
                                    onClick={() => setVideoUrl(sample.url)}
                                >
                                    Sử dụng
                                </Button>
                            </div>
                        ))}
                    </Space>
                </Card>

                {/* Video Player */}
                {isPlaying && videoUrl && (
                    <Card title="Video Player" className="player-card">
                        <VideoPlayer
                            videoUrl={videoUrl}
                            title="Test Video HLS"
                            onProgress={handleProgress}
                            authToken={BUNNY_CDN_TOKEN}
                        />
                    </Card>
                )}

                {/* Technical Info */}
                <Card title="Thông tin kỹ thuật" className="info-card">
                    <Space direction="vertical">
                        <div>
                            <Text strong>Hỗ trợ:</Text>
                            <ul>
                                <li>HLS Streaming (.m3u8)</li>
                                <li>Adaptive bitrate</li>
                                <li>Multiple quality levels</li>
                                <li>Cross-browser compatibility</li>
                                <li>CDN Authentication (Bunny.net)</li>
                            </ul>
                        </div>

                        <div>
                            <Text strong>CDN hỗ trợ:</Text>
                            <ul>
                                <li>Bunny.net (vz-xxxxx.b-cdn.net) - với authentication</li>
                                <li>AWS CloudFront</li>
                                <li>Cloudflare Stream</li>
                                <li>Và các CDN khác hỗ trợ HLS</li>
                            </ul>
                        </div>

                        <div>
                            <Text strong>MIME Type Support:</Text>
                            <ul>
                                <li><Text code>application/x-mpegurl</Text> - Standard HLS MIME type</li>
                                <li><Text code>application/vnd.apple.mpegurl</Text> - Apple HLS MIME type</li>
                                <li>Player tự động override MIME type cho compatibility</li>
                            </ul>
                        </div>

                        <div>
                            <Text strong>Authentication Status:</Text>
                            <ul>
                                <li><Text type="warning">⚠️ Authentication tạm thời bị tắt</Text></li>
                                <li>Video sẽ phát với MIME type: <Text code>application/x-mpegurl</Text></li>
                                <li>Không sử dụng Bearer token hiện tại</li>
                            </ul>
                        </div>

                        <div>
                            <Text strong>Format URL mẫu:</Text>
                            <ul>
                                <li><Text code>https://vz-11106c72-014.b-cdn.net/[video-id]/playlist.m3u8</Text></li>
                                <li><Text code>https://domain.com/path/to/video/master.m3u8</Text></li>
                            </ul>
                        </div>
                    </Space>
                </Card>
            </div>
        </div>
    );
};

export default VideoTestPage;
