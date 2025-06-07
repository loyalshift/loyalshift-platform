// src/pages/SMB/Community/SMBCommunityPage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiPlusCircle,
  FiSearch,
  FiLoader,
  FiMessageSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom"; // For "Create Post" button

import { useLocalization } from "../../components/LocalizationContext"; // Adjust path
import loyalShiftV2Theme from "../../themes/loyalshift-v2.theme"; // Adjust path
import Button from "../../components/Button"; // Adjust path
import CommunityPageLayout from "../../components/SMB/Community/CommunityPageLayout";
import PostCard from "../../components/SMB/Community/PostCard";
import CategoryList from "../../components/SMB/Community/CategoryList";

const theme = loyalShiftV2Theme;

// Animation Variants
const viewportSettings = { once: true, amount: 0.1 };
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Mock Data - Replace with API calls
const mockPosts = [
  {
    id: "1",
    title: "Welcome to the LoyalShift SMB Community!",
    authorName: "LoyalShift Team",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    categoryName: "Announcements",
    excerpt:
      "We are thrilled to launch this space for our users to connect, share, and learn. Introduce yourself and let us know what you think!",
    upvotes: 15,
    commentCount: 3,
    viewCount: 120,
  },
  {
    id: "2",
    title: "Best way to use the Blog Editor for SEO?",
    authorName: "Maria P.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    categoryName: "Studio Tips & Tricks",
    excerpt:
      "I'm trying to optimize my blog posts for search engines using the SMB Studio. Any tips on keyword placement or meta descriptions?",
    upvotes: 8,
    commentCount: 5,
    viewCount: 95,
  },
  {
    id: "3",
    title: "Showcase: My New Homepage with SMB Studio",
    authorName: "Carlos R.",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    categoryName: "Showcase",
    excerpt:
      "Just launched my new business homepage built with the SMB Studio! Check it out and let me know your thoughts. It was surprisingly easy.",
    upvotes: 22,
    commentCount: 7,
    viewCount: 250,
  },
  {
    id: "4",
    title: "Marketing ideas for a small bakery?",
    authorName: "Ana G.",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    categoryName: "Marketing Strategies",
    excerpt:
      "Looking for creative and budget-friendly marketing ideas for my local bakery. What has worked for you?",
    upvotes: 12,
    commentCount: 10,
    viewCount: 150,
  },
];

export default function SMBCommunityPage() {
  const { t } = useLocalization();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' or category.id

  useEffect(() => {
    // Simulate fetching posts
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, filter posts based on searchTerm and activeCategory here or via API
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, [searchTerm, activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger useEffect or make API call
    console.log("Searching for:", searchTerm);
  };

  const sidebar = (
    <div className="space-y-6">
      <Button
        to="/smb/studio/community" // todo: /smb/studio/community/new-post
        className={`w-full ${theme.buttonPrimaryBg} ${theme.buttonTextLight} ${theme.buttonPrimaryHoverBg}`}
        icon={<FiPlusCircle className="w-5 h-5 mr-2" />}
      >
        {t("smbCommunity.createPostButton", "Create New Post")}
      </Button>
      <CategoryList
        onSelectCategory={(categoryId) => {
          setActiveCategory(categoryId);
          console.log("Selected category:", categoryId);
        }}
        activeCategory={activeCategory}
      />
      {/* Other sidebar content like popular tags, recent members, etc. can go here */}
      <div
        className={`${theme.surfaceCard} p-4 rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
      >
        <h4 className={`text-sm font-semibold ${theme.textSecondary} mb-2`}>
          {t(
            "smbCommunity.sidebar.communityGuidelinesTitle",
            "Community Guidelines"
          )}
        </h4>
        <p className={`text-xs ${theme.textMuted}`}>
          {t(
            "smbCommunity.sidebar.communityGuidelinesText",
            "Be respectful, share generously, and help us build a supportive environment for all SMBs."
          )}
          <Link
            to="/smb/studio/community" // todo: /smb/studio/community/guidelines
            className={`ml-1 ${theme.linkStyle}`}
          >
            {t("smbCommunity.sidebar.readMore", "Read more")}
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <CommunityPageLayout sidebarContent={sidebar}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${theme.textPrimary}`}>
            {t("smbCommunity.pageTitle", "SMB Community Hub")}
          </h1>
          <p className={`${theme.textSecondary} mt-2`}>
            {t(
              "smbCommunity.pageSubtitle",
              "Connect, share, and learn with fellow SMB owners and the LoyalShift team."
            )}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          variants={fadeInUp}
          className={`mb-8 flex gap-2 p-4 rounded-lg ${theme.surfaceMuted} border ${theme.borderLight}`}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t(
              "smbCommunity.searchPlaceholder",
              "Search discussions, topics, or members..."
            )}
            className={`flex-grow px-4 py-2.5 text-sm ${theme.inputBg} ${theme.inputBorder} rounded-md ${theme.inputFocusStyle} ${theme.textPrimary}`}
          />
          <Button
            type="submit"
            className={`${theme.buttonSecondaryBg} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} !px-4`}
          >
            <FiSearch className="w-5 h-5" />
          </Button>
        </motion.form>

        {isLoading ? (
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center py-20"
          >
            <FiLoader
              className={`w-10 h-10 ${theme.textHighlight} animate-spin`}
            />
            <p className={`ml-3 ${theme.textSecondary}`}>
              {t("smbCommunity.loadingPosts", "Loading discussions...")}
            </p>
          </motion.div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {/* TODO: Add Pagination component here */}
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className={`text-center py-20 ${theme.surfaceCard} rounded-xl border ${theme.borderLight} ${theme.cardShadow}`}
          >
            <FiMessageSquare
              className={`w-16 h-16 ${theme.textMuted} mx-auto mb-4`}
            />
            <p className={`${theme.textSecondary} text-lg`}>
              {t(
                "smbCommunity.noPostsFound",
                "No discussions found matching your criteria."
              )}
            </p>
            <p className={`${theme.textMuted} text-sm mt-2`}>
              {t(
                "smbCommunity.tryDifferentSearch",
                "Try a different search or category, or be the first to start a new discussion!"
              )}
            </p>
          </motion.div>
        )}
      </motion.div>
    </CommunityPageLayout>
  );
}
