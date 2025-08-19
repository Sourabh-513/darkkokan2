/* Premium iOS Design System for Dark Kokan */
:root {
    --primary-color: #1D1D1F;
    --secondary-color: #FF6B35;
    --accent-color: #007AFF;
    --dark-color: #2C2C2E;
    --background-color: #F5F5F7;
    --card-background: #FFFFFF;
    --text-primary: #1D1D1F;
    --text-secondary: #86868B;
    --border-color: #E8E8ED;
    --shadow-light: 0 2px 16px rgba(0, 0, 0, 0.08);
    --shadow-medium: 0 4px 24px rgba(0, 0, 0, 0.12);
    --shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.16);
    --border-radius: 16px;
    --border-radius-large: 24px;
    --transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --glass-bg: rgba(255, 255, 255, 0.8);
    --gradient-primary: linear-gradient(135deg, var(--secondary-color), #FF8A50);
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #FFFFFF;
        --background-color: #000000;
        --card-background: #1C1C1E;
        --text-primary: #FFFFFF;
        --text-secondary: #98989D;
        --border-color: #38383A;
        --glass-bg: rgba(28, 28, 30, 0.8);
    }
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
    background: var(--background-color);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* Loading Screen */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.loading-screen.hidden {
    opacity: 0;
    visibility: hidden;
}

.loading-animation {
    text-align: center;
}

.loading-text {
    font-size: 32px;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--secondary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Header */
/* Header - Minimal Design */
.header {
    background: var(--glass-bg);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 8px 0;
    transition: var(--transition);
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.channel-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.channel-avatar {
    width: 40px;
    height: 40px;
    background: var(--gradient-primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    cursor: pointer;
}

.avatar-text {
    color: white;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.channel-avatar:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-medium);
}

.channel-details {
    display: none; /* Hide text completely on desktop */
}

.channel-name {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.3px;
    margin-bottom: 2px;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.channel-subtitle {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-color);
}

.subscriber-count {
    display: none;
}

.subscribe-btn {
    background: var(--gradient-primary);
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 16px;
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: var(--transition);
    box-shadow: var(--shadow-light);
    border: none;
    cursor: pointer;
}

.subscribe-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
    background: linear-gradient(135deg, #E55A2B, var(--secondary-color));
}

.subscribe-icon {
    font-size: 14px;
}

/* Show full header info on mobile */
@media (max-width: 768px) {
    .header {
        padding: 12px 0;
    }
    
    .channel-details {
        display: block;
    }
    
    .channel-info {
        gap: 12px;
    }
    
    .channel-avatar {
        width: 45px;
        height: 45px;
    }
    
    .avatar-text {
        font-size: 18px;
    }
    
    .subscribe-btn {
        padding: 10px 18px;
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .header-content {
        flex-direction: row;
        gap: 10px;
    }
    
    .subscribe-btn {
        padding: 8px 14px;
        font-size: 12px;
    }
}

/* Navigation */
.nav {
    background: var(--card-background);
    border-bottom: 1px solid var(--border-color);
    padding: 0;
    position: sticky;
    top: 56px;  /* Updated to match smaller header */
    z-index: 90;
}

.nav-tabs {
    display: flex;
    gap: 0;
    justify-content: center;
}

.nav-tab {
    background: none;
    border: none;
    padding: 20px 32px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    color: var(--text-secondary);
    transition: var(--transition);
    border-bottom: 3px solid transparent;
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-tab.active {
    color: var(--secondary-color);
    border-bottom-color: var(--secondary-color);
}

.nav-tab:hover {
    color: var(--secondary-color);
    background: rgba(255, 107, 53, 0.05);
}

.tab-icon {
    font-size: 18px;
}

/* Main Content */
.main {
    padding: 40px 0 60px;
    min-height: 100vh;
}

/* Tab Content */
.tab-content {
    display: none;
    animation: fadeIn 0.6s ease-out;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { 
        opacity: 0; 
        transform: translateY(20px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

/* Section Header */
.section-header {
    text-align: center;
    margin-bottom: 48px;
}

.section-header h2 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-header p {
    font-size: 18px;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
}

/* Videos Grid */
.videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    margin-bottom: 64px;
}

.video-card {
    background: var(--card-background);
    border-radius: var(--border-radius-large);
    overflow: hidden;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    cursor: pointer;
    border: 1px solid var(--border-color);
    position: relative;
}

.video-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-heavy);
    border-color: var(--secondary-color);
}

.video-thumbnail-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    overflow: hidden;
    background: var(--dark-color);
}

.video-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.video-card:hover .video-thumbnail {
    transform: scale(1.05);
}

.play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
}

.video-card:hover .play-overlay {
    opacity: 1;
}

.play-button {
    width: 72px;
    height: 72px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--secondary-color);
    font-weight: bold;
    box-shadow: var(--shadow-medium);
    transition: var(--transition);
}

.play-button:hover {
    transform: scale(1.1);
    background: white;
}

.video-info {
    padding: 24px;
}

.video-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.3;
    color: var(--text-primary);
}

.video-description {
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.video-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.video-views {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
}

.youtube-link {
    color: var(--secondary-color);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    border: 1px solid var(--secondary-color);
    border-radius: 20px;
    transition: var(--transition);
}

.youtube-link:hover {
    background: var(--secondary-color);
    color: white;
}

/* Call to Action */
.cta-section {
    background: var(--gradient-primary);
    border-radius: var(--border-radius-large);
    padding: 48px;
    text-align: center;
    box-shadow: var(--shadow-medium);
    color: white;
}

.cta-section h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    color: white;
}

.cta-section p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 32px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.cta-button {
    background: white;
    color: var(--secondary-color);
    text-decoration: none;
    padding: 18px 36px;
    border-radius: 28px;
    font-weight: 700;
    font-size: 18px;
    display: inline-block;
    transition: var(--transition);
    box-shadow: var(--shadow-medium);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
}

/* About Section */
.about-section {
    background: var(--card-background);
    border-radius: var(--border-radius-large);
    padding: 48px;
    box-shadow: var(--shadow-light);
    border: 1px solid var(--border-color);
}

.about-header {
    text-align: center;
    margin-bottom: 40px;
}

.about-header h2 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 24px;
    letter-spacing: -0.5px;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.about-avatar {
    width: 120px;
    height: 120px;
    background: var(--gradient-primary);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border: 3px solid var(--border-color);
    box-shadow: var(--shadow-medium);
}

.about-avatar .avatar-text {
    color: white;
    font-size: 48px;
    font-weight: 800;
}

.about-content {
    margin-bottom: 48px;
}

.channel-description {
    font-size: 17px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 24px;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
}

.stat-card {
    background: var(--background-color);
    padding: 32px 24px;
    border-radius: var(--border-radius);
    text-align: center;
    transition: var(--transition);
    border: 1px solid var(--border-color);
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-light);
}

.stat-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
}

.stat-number {
    display: block;
    font-size: 28px;
    font-weight: 800;
    color: var(--secondary-color);
    margin-bottom: 8px;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 16px;
    font-weight: 600;
}

.contact-section {
    text-align: center;
}

.contact-section h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.social-link {
    color: white;
    text-decoration: none;
    padding: 16px 24px;
    border-radius: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: var(--transition);
    font-size: 16px;
}

.social-link.youtube {
    background: linear-gradient(135deg, #FF0000, #CC0000);
    box-shadow: var(--shadow-light);
}

.social-link:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.social-icon {
    font-size: 18px;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    position: relative;
    width: 90%;
    max-width: 900px;
    background: var(--card-background);
    border-radius: var(--border-radius-large);
    overflow: hidden;
    box-shadow: var(--shadow-heavy);
    border: 1px solid var(--border-color);
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from { transform: scale(0.9) translateY(20px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    z-index: 1001;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

.modal-header {
    padding: 24px 24px 16px;
}

.modal-header h3 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
}

.video-container {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    background: #000;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.modal-footer {
    padding: 16px 24px 24px;
    text-align: center;
}

.modal-youtube-btn {
    color: white;
    background: linear-gradient(135deg, #FF0000, #CC0000);
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    display: inline-block;
    transition: var(--transition);
}

.modal-youtube-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-light);
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }
    
    .header-content {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    
    .channel-info {
        flex-direction: column;
        text-align: center;
        gap: 16px;
    }
    
    .channel-avatar {
        width: 72px;
        height: 72px;
    }
    
    .avatar-text {
        font-size: 28px;
    }
    
    .channel-name {
        font-size: 24px;
    }
    
    .videos-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }
    
    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
    }
    
    .nav-tabs {
        justify-content: center;
    }
    
    .section-header h2 {
        font-size: 28px;
    }
    
    .about-section {
        padding: 32px 24px;
    }
    
    .cta-section {
        padding: 32px 24px;
    }
    
    .modal-content {
        width: 95%;
        margin: 20px;
    }
}

@media (max-width: 480px) {
    .nav-tab {
        padding: 16px 20px;
        font-size: 15px;
    }
    
    .subscribe-btn {
        padding: 14px 24px;
        font-size: 14px;
    }
    
    .video-card {
        margin-bottom: 16px;
    }
    
    .about-avatar {
        width: 100px;
        height: 100px;
    }
    
    .about-avatar .avatar-text {
        font-size: 40px;
    }
}
