// 样本数据配置
const samples = [
    { 
        image: 'images/sample1.jpg', 
        fileName: 'sample_001.jpg', 
        resolution: '1024 × 2048',
        sceneType: '城市街道'
    },
    { 
        image: 'images/sample2.jpg', 
        fileName: 'sample_002.jpg', 
        resolution: '1024 × 2048',
        sceneType: '高速公路'
    },
    { 
        image: 'images/sample3.jpg', 
        fileName: 'sample_003.jpg', 
        resolution: '1024 × 2048',
        sceneType: '住宅区'
    },
    { 
        image: 'images/sample4.jpg', 
        fileName: 'sample_004.jpg', 
        resolution: '1024 × 2048',
        sceneType: '郊区道路'
    },
    { 
        image: 'images/sample5.jpg', 
        fileName: 'sample_005.jpg', 
        resolution: '1024 × 2048',
        sceneType: '城市夜景'
    }
];

// 主页轮播图片及对应文字
const heroCarouselData = [
    {
        image: './images/planet.png',
        title: 'The Planetscapes Dataset',
        subtitle: '5000 images with high-quality annotations and 20000 images with coarse annotations, 4 different missions and landing sites'
    },
    {
        image: './images/segmentation_examples.png',  // 添加 ./ 前缀
        title: 'The Planetscapes Dataset',
        subtitle: 'Semantic, dense pixel annotations of 18 classes of Martian Scene'
    },
    {
        image: './images/rock-segmentation1.png',
        title: 'The Planetscapes Dataset',
        subtitle: 'The instance segmentation results for rock categories of Martain Scene are also provided'
    },
     {
        image: './images/sample1.jpg',
        title: 'The Planetscapes Dataset',
        subtitle: 'Semantic, dense pixel annotations of X classes of Lunar Scened'
    },
    
    // {
    //     image: 'images/sample4.jpg',
    //     title: '郊区道路场景',
    //     subtitle: '包含乡村和郊区的多样化场景'
    // },
    // {
    //     image: 'images/sample5.jpg',
    //     title: '夜间场景',
    //     subtitle: '挑战性的低光照条件下的场景理解'
    // }
];

let currentSampleIndex = 0;
let currentHeroIndex = 0;
let autoPlayInterval = null;
let isAutoPlaying = true;

// 初始化 - 只保留一个
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在主页 - Hero轮播
    if (document.getElementById('heroCarouselImage')) {
        initHeroCarousel();
    }
    
    // 检查是否在样本页面
    if (document.getElementById('sampleImage')) {
        initSamplePage();
    }
    
    setupEventListeners();
    smoothScroll();
});

// 初始化Hero区域轮播
function initHeroCarousel() {
    createIndicators('heroIndicators', heroCarouselData.length, 'hero');
    loadHeroImage(currentHeroIndex);
    startAutoPlay('hero');
    
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            currentHeroIndex = (currentHeroIndex - 1 + heroCarouselData.length) % heroCarouselData.length;
            loadHeroImage(currentHeroIndex);
            startAutoPlay('hero');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            currentHeroIndex = (currentHeroIndex + 1) % heroCarouselData.length;
            loadHeroImage(currentHeroIndex);
            startAutoPlay('hero');
        });
    }
}

// 加载Hero图片和文字
function loadHeroImage(index) {
    const data = heroCarouselData[index];
    const img = document.getElementById('heroCarouselImage');
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = data.image;
            img.style.opacity = '1';
        }, 400);
    }
    
    // 更新标题和副标题
    if (title) {
        title.style.opacity = '0';
        setTimeout(() => {
            title.textContent = data.title;
            title.style.opacity = '1';
        }, 300);
    }
    
    if (subtitle) {
        subtitle.style.opacity = '0';
        setTimeout(() => {
            subtitle.textContent = data.subtitle;
            subtitle.style.opacity = '1';
        }, 300);
    }
    
    updateIndicators('heroIndicators', index);
}

// 初始化样本页面
function initSamplePage() {
    createIndicators('sampleIndicators', samples.length, 'sample');
    loadSample(currentSampleIndex);
    startAutoPlay('sample');
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            isAutoPlaying = false;
            updatePlayPauseButton();
            currentSampleIndex = (currentSampleIndex - 1 + samples.length) % samples.length;
            loadSample(currentSampleIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            isAutoPlaying = false;
            updatePlayPauseButton();
            currentSampleIndex = (currentSampleIndex + 1) % samples.length;
            loadSample(currentSampleIndex);
        });
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            isAutoPlaying = !isAutoPlaying;
            updatePlayPauseButton();
            if (isAutoPlaying) {
                startAutoPlay('sample');
            } else {
                stopAutoPlay();
            }
        });
    }
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn && prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn && nextBtn.click();
        }
    });
}

// 加载样本
function loadSample(index) {
    const sample = samples[index];
    const img = document.getElementById('sampleImage');
    
    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = sample.image;
            img.style.opacity = '1';
        }, 250);
    }
    
    const fileName = document.getElementById('fileName');
    const resolution = document.getElementById('resolution');
    const sceneType = document.getElementById('sceneType');
    const counter = document.getElementById('sampleCounter');
    
    if (fileName) fileName.textContent = sample.fileName;
    if (resolution) resolution.textContent = sample.resolution;
    if (sceneType) sceneType.textContent = sample.sceneType;
    if (counter) counter.textContent = `${index + 1} / ${samples.length}`;
    
    updateIndicators('sampleIndicators', index);
}

// 创建指示器
function createIndicators(containerId, count, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            stopAutoPlay();
            if (type === 'hero') {
                currentHeroIndex = i;
                loadHeroImage(i);
                startAutoPlay('hero');
            } else if (type === 'sample') {
                isAutoPlaying = false;
                updatePlayPauseButton();
                currentSampleIndex = i;
                loadSample(i);
            }
        });
        
        container.appendChild(dot);
    }
}

// 更新指示器
function updateIndicators(containerId, activeIndex) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const dots = container.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 开始自动播放
function startAutoPlay(type) {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        if (type === 'hero') {
            currentHeroIndex = (currentHeroIndex + 1) % heroCarouselData.length;
            loadHeroImage(currentHeroIndex);
        } else if (type === 'sample' && isAutoPlaying) {
            currentSampleIndex = (currentSampleIndex + 1) % samples.length;
            loadSample(currentSampleIndex);
        }
    }, 4000); // 每4秒切换一次
}

// 停止自动播放
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// 更新播放/暂停按钮
function updatePlayPauseButton() {
    const btn = document.getElementById('playPauseBtn');
    if (btn) {
        btn.textContent = isAutoPlaying ? '⏸ 暂停' : '▶ 播放';
    }
}

// 设置事件监听
function setupEventListeners() {
    // 页面可见性变化时控制自动播放
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            if (document.getElementById('heroCarouselImage')) {
                startAutoPlay('hero');
            } else if (document.getElementById('sampleImage') && isAutoPlaying) {
                startAutoPlay('sample');
            }
        }
    });
}

// 平滑滚动
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 数字动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        animateValue(stat, 0, target, 2000);
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// 检测元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

// 滚动动画
window.addEventListener('scroll', () => {
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
});
