// src/pages/SMB/Community/PostCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { FiMessageCircle, FiThumbsUp, FiEye, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import loyalShiftV2Theme from '../../../themes/loyalshift-v2.theme'; // Adjust path
import { useLocalization } from '../../../components/LocalizationContext'; // Adjust path

const theme = loyalShiftV2Theme;

const PostCard = ({ post }) => {
  const { t } = useLocalization();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  return (
    <motion.div 
      className={`${theme.surfaceCard} rounded-xl border ${theme.borderLight} ${theme.cardShadow} p-5 transition-all duration-300 hover:${theme.cardHoverShadow} hover:border-cyan-500/30`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center mb-3">
        {/* Placeholder for author avatar */}
        <div className={`w-8 h-8 rounded-full ${theme.surfaceMuted} flex items-center justify-center mr-3`}>
          <FiUser className={`w-4 h-4 ${theme.textMuted}`} />
        </div>
        <div>
          <p className={`text-xs ${theme.textSecondary}`}>
            Posted by <span className={`${theme.textPrimary} font-medium`}>{post.authorName || 'Anonymous'}</span>
          </p>
          <p className={`text-xs ${theme.textMuted}`}>
            {formatDate(post.createdAt)} in <span className={`${theme.textHighlight} font-medium`}>{post.categoryName || 'General'}</span>
          </p>
        </div>
      </div>

      <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-2 hover:underline`}>
        <Link to={`/smb/studio/community/post/${post.id}`}>
          {post.title || t('smbCommunity.postCard.untitled', 'Untitled Post')}
        </Link>
      </h2>
      
      <p className={`${theme.textSecondary} text-sm mb-4 line-clamp-3`}>
        {post.excerpt || t('smbCommunity.postCard.noExcerpt', 'No excerpt available...')}
      </p>

      <div className={`flex items-center justify-between text-xs ${theme.textMuted} pt-3 border-t ${theme.borderLight}`}>
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <FiThumbsUp className="w-3.5 h-3.5 mr-1" /> {post.upvotes || 0}
          </span>
          <span className="flex items-center">
            <FiMessageCircle className="w-3.5 h-3.5 mr-1" /> {post.commentCount || 0}
          </span>
        </div>
        <span className="flex items-center">
          <FiEye className="w-3.5 h-3.5 mr-1" /> {post.viewCount || 0} {t('smbCommunity.postCard.views', 'views')}
        </span>
      </div>
    </motion.div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    authorName: PropTypes.string,
    createdAt: PropTypes.string, // ISO Date string
    categoryName: PropTypes.string,
    excerpt: PropTypes.string,
    upvotes: PropTypes.number,
    commentCount: PropTypes.number,
    viewCount: PropTypes.number,
  }).isRequired,
};

export default PostCard;
