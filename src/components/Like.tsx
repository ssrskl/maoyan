import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { databases } from '@/lib/appwrite';

interface LikeProps {
  blogId: string;
}
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  rotation: number;
  shape: 'circle' | 'star';
}

const Like = ({  blogId }: LikeProps) => {
  // 从 localstorage 中获取点赞状态
  const [isLiked, setIsLiked] = useState(false);
  const controls = useAnimation();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBurst, setShowBurst] = useState(false);
  const heartRef = useRef<HTMLDivElement>(null);
  const { data: blog } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: async () => {
      const response = await databases.getDocument('blog',
        't_blog',
        blogId
      );
      return response;
    }
  })
  useEffect(() => {
    const isLiked = localStorage.getItem(`like_${blogId}`);
    if (isLiked) {
      setIsLiked(true);
    }
  }, [isLiked]);
  // 生成随机粒子
  const generateParticles = () => {
    const particleCount = 20; // 粒子数量
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Twitter点赞效果主要是圆形和星形
      const shapes: Array<'circle' | 'star'> = ['circle', 'star'];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      newParticles.push({
        id: Math.random(),
        x: 0,
        y: 0,
        size: Math.random() * 5 + 2, // 2-7px
        color: [
          '#f91880', // Twitter红色
          '#ffcce6', // 浅粉色
          '#ff66b2', // 中粉色
          '#ffffff', // 白色
          '#ffb3c6', // 淡红色
        ][Math.floor(Math.random() * 5)],
        angle: Math.random() * Math.PI * 2, // 0-360度随机角度
        speed: Math.random() * 2 + 1, // 1-3的随机速度
        rotation: Math.random() * 360, // 随机旋转角度
        shape: randomShape,
      });
    }
    setParticles(newParticles);
  };
  const updateLikeCount = async (type: 'add' | 'sub') => {
    await databases.updateDocument('blog',
      't_blog',
      blogId,
      { likes: blog?.likes + (type === 'add' ? 1 : -1) }
    );
  }
  // 点赞按钮动画
  const handleLike = () => {
    // 如果已经点赞，则取消点赞
    if (isLiked) {
      setIsLiked(false);
      localStorage.removeItem(`like_${blogId}`);
      updateLikeCount('sub');
      return;
    }
    // 如果未点赞，则点赞
    const willLike = !isLiked;
    setIsLiked(willLike);
    // 将点赞状态存储到 localstorage
    localStorage.setItem(`like_${blogId}`, willLike.toString());
    updateLikeCount(willLike ? 'add' : 'sub');

    // 如果是点赞操作，触发动画效果
    if (willLike) {
      // Twitter风格的心跳动画
      controls.start({
        scale: [1, 0, 1.2, 1],
        transition: { 
          times: [0, 0.2, 0.6, 1],
          duration: 0.4,
        }
      });
      
      // 显示爆炸光环
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 300);
      
      // 生成粒子
      generateParticles();
    } else {
      // 取消点赞的简单动画
      controls.start({
        scale: [1, 0.8, 1],
        transition: { duration: 0.3 }
      });
    }
  };

  // 清除粒子
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 700); // 减少粒子持续时间
      
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div className="relative">
      <motion.button
        onClick={handleLike}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <motion.div
          ref={heartRef}
          animate={controls}
          className="relative"
        >
          {/* 爆炸光环效果 */}
          {showBurst && (
            <motion.div 
              className="absolute inset-0 rounded-full" 
              initial={{ scale: 0.1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ 
                backgroundColor: '#f9188033',
                zIndex: -1,
              }}
            />
          )}
          
          <Heart
            className="w-5 h-5"
            fill={isLiked ? '#f91880' : 'none'}
            stroke={isLiked ? '#f91880' : '#657786'}
            strokeWidth={isLiked ? 2 : 1.5}
          />
        </motion.div>
        <span className={`text-sm ${isLiked ? 'text-pink-500' : 'text-gray-500'}`}>
          {blog?.likes? blog.likes : 0}
        </span>
      </motion.button>
      
      {/* 粒子效果 */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              scale: 0.2,
              rotate: 0
            }}
            animate={{ 
              x: Math.cos(particle.angle) * (40 + particle.speed * 20),
              y: Math.sin(particle.angle) * (40 + particle.speed * 20),
              opacity: 0,
              scale: 1,
              rotate: particle.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5 + Math.random() * 0.3,
              ease: "easeOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              top: heartRef.current ? heartRef.current.offsetHeight / 2 : 12,
              left: heartRef.current ? heartRef.current.offsetWidth / 2 : 12,
              borderRadius: particle.shape === 'circle' ? '50%' : '0',
              clipPath: particle.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Like;